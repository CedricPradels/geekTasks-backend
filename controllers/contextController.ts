import { Request, Response } from "express";
import Context from "../models/Context";
import { isString, isNull } from "../helpers/predicates";

export default {
  async create(req: Request, res: Response) {
    try {
      // ERRORS CHECK
      if (!req.fields) throw "Missing datas";
      let { title } = req.fields;
      if (!isString(title) || title === "") throw "Wrong datas";

      const newContext = await Context.create({ title });
      res.json({ success: true, context: newContext });
    } catch (error) {
      res.json({ success: false, error });
    }
  },
  async read(req: Request, res: Response) {
    try {
      const contextsList = await Context.find();
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
      const updatedContext = await Context.findByIdAndUpdate(contextId, {
        title: newTitle,
      });
      if (isNull(updatedContext)) throw "Context does not exist.";
      res.json({ success: true, message: "Context successfully updated." });
    } catch (error) {
      res.json({ success: false, error });
    }
  },
  async delete(req: Request, res: Response) {
    try {
      const { contextId } = req.params;
      const removedContext = await Context.findByIdAndRemove(contextId);
      if (isNull(removedContext)) throw "Context does not exist.";

      res.json({ success: true, message: "Context successfully deleted." });
    } catch (error) {
      res.json({ success: false, error });
    }
  },
};
