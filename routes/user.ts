import express from "express";
const router = express.Router();

import UserController from "../controllers/userController";

router.route("/user/signin").post(UserController.signin);
router.route("/user/signup").post(UserController.signup);

export default router;
