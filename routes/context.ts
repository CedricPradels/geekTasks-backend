import express from "express";
const router = express.Router();
import contextController from "../controllers/contextController";

router
  .route("/context")
  .post(contextController.create)
  .get(contextController.read);

router
  .route("/context/:contextId")
  .patch(contextController.update)
  .delete(contextController.delete);

export default router;
