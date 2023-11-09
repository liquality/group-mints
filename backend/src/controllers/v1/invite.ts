import { RequestHandler } from "express";
import { InvitesService } from "../../services/invites";
import { AuthService } from "../../services/auth";
import { io } from "../../io";

export class InviteController {
  public create: RequestHandler = async (req, res) => {
    const { groupId } = req.body;
    const user = await AuthService.find((req as any).auth?.sub);
    try {
      const invite = await InvitesService.create({ groupId }, user.id);

      res.status(200).send(invite);
    } catch (err) {
      console.error(err);
      res.status(500).send({ error: "An error occurred" });
    }
  };

  public find: RequestHandler = async (req, res) => {
    const { id } = req.params;
    if (!id) {
      res.status(400).send({ error: "id is required" });
    } else {
      try {
        const invite = await InvitesService.find(id);

        if (!invite) {
          res.status(404).send({ error: "invite not found" });
        } else {
          res.status(200).send(invite);
        }
      } catch (err: any) {
        res.status(500).send({ error: err.message });
      }
    }
  };

  public claim: RequestHandler = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await AuthService.find((req as any).auth?.sub);
      const claim = await InvitesService.claim(id, user.id);
      res.status(200).send(claim);
    } catch (err) {
      console.error(err);
      res.status(500).send({ error: "An error occurred" });
    }
  };
}