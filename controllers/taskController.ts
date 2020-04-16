import { Request, Response } from "express";
import Task from "../models/Task";
import { isNull } from "../helpers/predicates";

export default {
  async create(req: Request, res: Response) {
    try {
      if (!req.fields) throw "Missing body";
      const { title, project, contexts } = req.fields;

      const newTask = await Task.create({ title, project, contexts });
      res.json({ success: true, task: newTask });
    } catch (error) {
      res.json({ success: false, error });
    }
  },
  async read(req: Request, res: Response) {
    try {
      if (!req.fields) throw "Missing body";
      const { contextsId = null, projectId = null } = req.fields;
      let tasksList;

      if (isNull(projectId)) {
        tasksList = await Task.find({
          contexts: { $in: contextsId },
        });
      } else if (isNull(contextsId)) {
        tasksList = await Task.find({ project: projectId });
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

      console.log(title, contexts, project);
      let updatedTask;
      if (!isNull(title))
        updatedTask = await Task.findByIdAndUpdate(taskId, { title });
      if (!isNull(contexts))
        updatedTask = await Task.findByIdAndUpdate(taskId, { contexts });
      if (!isNull(project))
        updatedTask = await Task.findByIdAndUpdate(taskId, { project });
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

      const updatedTask = await Task.findByIdAndRemove(taskId);
      if (isNull(updatedTask)) throw "Task does not exist.";
      res.json({ success: true, message: "Task deleted successfully." });
    } catch (error) {
      res.json({ success: false, error });
    }
  },
};
