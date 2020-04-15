import { Request, Response } from "express";
import Project from "../models/Project";
import { isString, isNull } from "../helpers/predicates";

export default {
  async create(req: Request, res: Response) {
    try {
      // ERRORS CHECK
      if (!req.fields) throw "Missing datas";
      let { title } = req.fields;
      if (!isString(title) || title === "") throw "Wrong datas";

      const newProject = await Project.create({ title });
      res.json({ success: true, project: newProject });
    } catch (error) {
      res.json({ success: false, error });
    }
  },
  async read(req: Request, res: Response) {
    try {
      const projectsList = await Project.find();
      res.json({ success: true, projects: projectsList });
    } catch (error) {
      res.json({ success: false, error });
    }
  },
  async update(req: Request, res: Response) {
    try {
      const { projectId } = req.params;
      if (!req.fields) throw "Missing body";
      const { title: newTitle } = req.fields;
      const updatedProject = await Project.findByIdAndUpdate(projectId, {
        title: newTitle,
      });
      if (isNull(updatedProject)) throw "Project does not exist.";
      res.json({ success: true, message: "Project successfully updated." });
    } catch (error) {
      res.json({ success: false, error });
    }
  },
  async delete(req: Request, res: Response) {
    try {
      const { projectId } = req.params;
      const removedProject = await Project.findByIdAndRemove(projectId);
      if (isNull(removedProject)) throw "Project does not exist.";

      res.json({ success: true, message: "Project successfully deleted." });
    } catch (error) {
      res.json({ success: false, error });
    }
  },
};
