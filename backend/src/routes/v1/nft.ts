import { Router } from "express";
import { NFTController } from "../../controllers/v1/nft";
export const nftRouter = Router();
const ctrl = new NFTController();

nftRouter.get("/leaderboard/moralis/:contractAddress/:tokenId", ctrl.getLeaderboardForMoralis);
nftRouter.get("/leaderboard/sound/:contractAddress", ctrl.getLeaderboardForSound);
nftRouter.get("/leaderboard/zora/:contractAddress", ctrl.getLeaderboardForZora);
nftRouter.get("/leaderboard/prohobition/:contractAddress", ctrl.getNumberOfMintsAcrossThreeProhobition);
nftRouter.get("/reservoir/api/:contractAddress/:network/:tokenId?", ctrl.getReservoirApi);
nftRouter.get("/mintactivity/:contractAddress/:network/:tokenId?", ctrl.getMintActivityForLeaderboard);


nftRouter.get("/meta", ctrl.getTokenMetadata);
