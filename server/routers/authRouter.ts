import express from "express";
import * as authController from "../controllers/auth.controller";

const router = express.Router();

router.route(`/login`).get(authController.login);
router.route(`/callback`).get(authController.callback);
router.route(`/token`).get(authController.token)
router.route(`/logout`).post(authController.logout);

export default router;
