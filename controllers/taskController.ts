import { Request, Response } from "express";
import Task from "../models/Task";
import { isNull } from "../helpers/predicates";

import getBearer from "../helpers/getBearer";
import findUserIdWithToken from "../helpers/findUserIdWithToken";

export default {
  async create(req: Request, res: Response) {
    try {
      if (!req.fields) throw "Missing body";
      const { title, project, contexts } = req.fields;

      const token = getBearer(req);
      const owner = await findUserIdWithToken(String(token));

      const newTask = await Task.create({ title, project, contexts, owner });
      res.json({ success: true, task: newTask });
    } catch (error) {
      res.json({ success: false, error });
    }
  },
  async read(req: Request, res: Response) {
    try {
      if (!req.fields) throw "Missing body";
      const { contextsId = null, projectId = null } = req.fields;

      const token = getBearer(req);
      const owner = await findUserIdWithToken(String(token));

      let tasksList;
      if (isNull(projectId) && isNull(contextsId)) {
        tasksList = await Task.find({ owner });
      } else if (isNull(projectId)) {
        tasksList = await Task.find({
          owner,
          contexts: { $in: contextsId },
        });
      } else if (isNull(contextsId)) {
        tasksList = await Task.find({ project: projectId, owner });
      } else {
        throw "Incorrect fields.";
      }
      res.json({ success: true, tasks: tasksList });
    } catch (error) {
      res.json({ success: false, error });
    }
  },
  async update(req: Request, res: Response) {
    try {
      const { taskId } = req.params;
      if (!req.fields) throw "Missing body.";
      const { title = null, contexts = null, project = null } = req.fields;

      const token = getBearer(req);
      const owner = await findUserIdWithToken(String(token));

      let updatedTask;
      if (!isNull(title))
        updatedTask = await Task.findOneAndUpdate(
          { _id: taskId, owner },
          { title }
        );
      if (!isNull(contexts))
        updatedTask = await Task.findOneAndUpdate(
          { _id: taskId, owner },
          { contexts }
        );
      if (!isNull(project))
        updatedTask = await Task.findOneAndUpdate(
          { _id: taskId, owner },
          { project }
        );
      if (isNull(updatedTask)) throw "Task does not exist.";

      res.json({
        success: true,
        message: "Task updated successfully.",
      });
    } catch (error) {
      res.json({ success: false, error });
    }
  },
  async delete(req: Request, res: Response) {
    try {
      const { taskId } = req.params;
      if (!req.fields) throw "Missing body.";

      const token = getBearer(req);
      const owner = await findUserIdWithToken(String(token));

      const updatedTask = await Task.findOneAndRemove({ _id: taskId, owner });
      if (isNull(updatedTask)) throw "Task does not exist.";
      res.json({ success: true, message: "Task deleted successfully." });
    } catch (error) {
      res.json({ success: false, error });
    }
  },
};
