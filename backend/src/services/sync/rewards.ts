import { ethers } from "ethers";
import { dbClient } from "../../data";
import {
  convertToDate,
  fetchReservoirData,
  getTokenMetadataFromZora,
} from "../../utils";
import * as MyCollectives from "@koderholic/my-collectives";
import { Config } from "@koderholic/my-collectives";

export class SyncRewardsService {
  constructor() {
    MyCollectives.setConfig({} as Config);
  }

  async getRewardsData(memberAddress: string, pools: string[]) {
    let result: any[] = [];
    for (const pool of pools) {
      const participationResponse = await MyCollectives.Pool.getParticipation(
        pool,
        memberAddress
      );

      if (participationResponse && participationResponse.id != "") {
        const participation = {
          address: participationResponse.id,
          contribution: participationResponse.contribution?.toString(),
          rewardAmount: ethers.utils.formatEther(
            participationResponse.rewardedAmount
          ),
          rewardAvailable: ethers.utils.formatEther(
            participationResponse.rewardAvailable
          ),
        };

        const totalContributions =
          await MyCollectives.Pool.getTotalContributions(pool);
        const rewards = await MyCollectives.Pool.getPoolReward(pool);

        result.push({
          pool,
          participation,
          totalContributions,
          rewards,
        });
      }
    }

    return result;
  }
}
