import express from "express";
import * as authController from "../controllers/auth.controller";

const router = express.Router();

router.route(`/login`).get(authController.athenticateToSpotify);
router.route(`/callback`).post();

export default router;
