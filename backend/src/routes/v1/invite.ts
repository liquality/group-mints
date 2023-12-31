import { Router } from "express";
import { authentication } from "../../middlewares";
import { InviteController } from "../../controllers/v1/invite";
export const inviteRouter = Router();
const ctrl = new InviteController();


inviteRouter.post("/:id/claim", authentication, ctrl.claim);
inviteRouter.get("/:id", ctrl.find);
inviteRouter.get("/code/:code", ctrl.findBycode);
inviteRouter.get("/group/:id/user/:userId", ctrl.findAllByGroup);
inviteRouter.get("/user/:id", ctrl.findAllByUser);
