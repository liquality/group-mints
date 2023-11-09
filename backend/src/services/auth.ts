import jwt from "jsonwebtoken";
import { ethers } from "ethers";
import { UserRecord, dbClient } from "../data";
import jwtConfig from "./../config/jwt";

const config = jwtConfig[process.env.NODE_ENV || "development"];
export class AuthService {
  public static createNonce() {
    return Math.floor(Math.random() * 1000000).toString(16);
  }

  public static async loginWithPublicAddress(
    publicAddress: string,
    signature: string
  ): Promise<string | null> {
    const user = await dbClient("users")
      .where("publicAddress", "=", publicAddress)
      .first("id", "nonce");
    if (user) {
      const decodedAddress = ethers.utils.verifyMessage(user.nonce, signature);

      //TODO: improve validation and secret env var
      if (publicAddress.toLowerCase() === decodedAddress.toLowerCase()) {
        const token = jwt.sign(
          {
            publicAddress,
          },
          config.secret,
          { expiresIn: config.expiresIn, subject: user.id }
        );
        // update the nonce in the database, should not be reusable after the login
        const nonce = this.createNonce();
        await dbClient("users").where("id", "=", user.id).update({ nonce });

        return token;
      }
    }

    return null;
  }

  public static async createUser({ publicAddress }: { publicAddress: string }) {
    const nonce = this.createNonce();
    const result = await dbClient("users").insert(
      {
        publicAddress,
        nonce,
      },
      ["id"]
    );
    if (result.length > 0) {
      return {
        id: result[0].id,
        publicAddress,
        nonce,
      };
    }
    return null;
  }

  public static getNonce(publicAddress: string) {
    return dbClient("users")
      .where("publicAddress", "=", publicAddress)
      .first("nonce");
  }

  public static find(id: string): Promise<UserRecord> {
    return dbClient("users").where("id", "=", id).first();
  }
}