import { RequestHandler } from "express";
import { AuthService } from "../../services/auth";
import { UserService } from "../../services/user";

export class UserController {
  public getMints: RequestHandler = async (req, res) => {
    const user = await AuthService.find((req as any).auth?.sub);

    if (!user) {
      res.status(401).send({ error: "Authentication required" });
    } else {
      try {
        const userMints = await UserService.getMints(user.id);
        res.status(200).send(userMints);
      } catch (err: any) {
        res.status(500).send({ error: err.message });
      }
    }
  };

  public getRewardsSummary: RequestHandler = async (req, res) => {
    const user = await AuthService.find((req as any).auth?.sub);

    if (!user) {
      res.status(401).send({ error: "Authentication required" });
    } else {
      try {
        const summary = await UserService.getRewardsSummary(user.id);
        res.status(200).send(summary);
      } catch (err: any) {
        res.status(500).send({ error: err.message });
      }
    }
  };
}
