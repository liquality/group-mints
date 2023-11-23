import { RequestHandler } from "express";
import { GroupsService } from "../../services/groups";
import { AuthService } from "../../services/auth";

export class GroupsController {
  public findByUserAddress: RequestHandler = async (req, res) => {
    const { address } = req.params;

    if (!address) {
      res.status(400).send({ error: "address is required" });
    } else {
      try {
        const groups = await GroupsService.findByUserAddress(address);

        res.status(200).send(groups);
      } catch (err: any) {
        res.status(500).send({ error: err.message });
      }
    }
  };

  public find: RequestHandler = async (req, res) => {
    const { id } = req.params;
    if (!id) {
      res.status(400).send({ error: "id is required" });
    } else {
      try {
        const group = await GroupsService.find(id);

        if (!group) {
          res.status(404).send({ error: "group not found" });
        } else {
          res.status(200).send(group);
        }
      } catch (err: any) {
        res.status(500).send({ error: err.message });
      }
    }
  };

  public create: RequestHandler = async (req, res) => {
    const { group, pools } = req.body;
    console.log(group, pools, 'group and pools?')
    const user = await AuthService.find((req as any).auth?.sub);
    if (!group.name) {
      res.status(400).send({ error: "name is required" });
    } else {
      try {
        const createdGroup = await GroupsService.create(
          group, pools, user.id
        );

        if (!createdGroup) {
          throw new Error("Group not created");
        }

        res.status(200).send(createdGroup);
      } catch (err: any) {
        console.error(err)
        res.status(500).send({ error: err.message });
      }
    }
  };

  public findMembers: RequestHandler = async (req, res) => {
    const { id } = req.params;
    if (!id) {
      res.status(400).send({ error: "id is required" });
    } else {
      try {
        const members = await GroupsService.findMembers(id);

        if (!members) {
          res.status(404).send({ error: "group not found" });
        } else {
          res.status(200).send(members);
        }
      } catch (err: any) {
        res.status(500).send({ error: err.message });
      }
    }
  };
}
