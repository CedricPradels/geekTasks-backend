import express from "express";
const router = express.Router();
import projectController from "../controllers/projectController";

router
  .route("/project")
  .post(projectController.create)
  .get(projectController.read);

router
  .route("/project/:projectId")
  .patch(projectController.update)
  .delete(projectController.delete);

export default router;
