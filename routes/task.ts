import express from "express";
const router = express.Router();
import taskController from "../controllers/taskController";

router.route("/task").post(taskController.create).search(taskController.read);
router
  .route("/task/:taskId")
  .patch(taskController.update)
  .delete(taskController.delete);

export default router;
