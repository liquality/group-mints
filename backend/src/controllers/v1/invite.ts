import { RequestHandler } from "express";
import { InvitesService } from "../../services/invites";
import { AuthService } from "../../services/auth";

export class InviteController {
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

  public findBycode: RequestHandler = async (req, res) => {
    const { code } = req.params;
    if (!code) {
      res.status(400).send({ error: "code is required" });
    } else {
      try {
        const invite = await InvitesService.findByCode(code);

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

  public findAllByGroup: RequestHandler = async (req, res) => {
    const { id, userId } = req.params;
    let _top = req.query.top ? Number(req.query.top) : 1;
    if (!id || !userId) {
      res.status(400).send({ error: "group and user are required" });
    } else {
      try {
        const invites = await InvitesService.findAllByGroup(id, userId, _top);

        if (!invites) {
          res.status(404).send({ error: "invites not found" });
        } else {
          res.status(200).send(invites);
        }
      } catch (err: any) {
        res.status(500).send({ error: err.message });
      }
    }
  };

  public findAllByUser: RequestHandler = async (req, res) => {
    const { id } = req.params;
    if (!id) {
      res.status(400).send({ error: "group is required" });
    } else {
      try {
        const invites = await InvitesService.findAllByUser(id);

        if (!invites) {
          res.status(404).send({ error: "invites not found" });
        } else {
          res.status(200).send(invites);
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
