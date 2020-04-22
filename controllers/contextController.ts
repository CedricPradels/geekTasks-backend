import { Request, Response } from "express";
import Context from "../models/Context";
import { isString, isNull } from "../helpers/predicates";
import getBearer from "../helpers/getBearer";
import findUserIdWithToken from "../helpers/findUserIdWithToken";

export default {
  async create(req: Request, res: Response) {
    try {
      // ERRORS CHECK
      if (!req.fields) throw "Missing datas";
      let { title } = req.fields;
      const token = getBearer(req);
      if (!isString(title) || title === "") throw "Wrong datas";

      const owner = await findUserIdWithToken(String(token));

      const newContext = await Context.create({ title, owner });
      res.json({ success: true, context: newContext });
    } catch (error) {
      res.json({ success: false, error });
    }
  },
  async read(req: Request, res: Response) {
    try {
      const token = getBearer(req);
      const owner = await findUserIdWithToken(String(token));
      const contextsList = await Context.find({ owner });
      res.json({ success: true, contexts: contextsList });
    } catch (error) {
      res.json({ success: false, error });
    }
  },
  async update(req: Request, res: Response) {
    try {
      const { contextId } = req.params;
      if (!req.fields) throw "Missing body";
      const { title: newTitle } = req.fields;
      const token = getBearer(req);
      const owner = await findUserIdWithToken(String(token));
      const updatedContext = await Context.findOneAndUpdate(
        { _id: contextId, owner },
        {
          title: newTitle,
        }
      );
      if (isNull(updatedContext)) throw "Context does not exist.";
      res.json({ success: true, message: "Context successfully updated." });
    } catch (error) {
      res.json({ success: false, error });
    }
  },
  async delete(req: Request, res: Response) {
    try {
      const { contextId } = req.params;
      const token = getBearer(req);
      const owner = await findUserIdWithToken(String(token));
      const removedContext = await Context.findOneAndRemove({
        _id: contextId,
        owner,
      });
      if (isNull(removedContext)) throw "Context does not exist.";

      res.json({ success: true, message: "Context successfully deleted." });
    } catch (error) {
      res.json({ success: false, error });
    }
  },
};
