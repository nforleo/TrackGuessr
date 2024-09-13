import express from "express";
import * as authController from "../controllers/auth.controller";

const router = express.Router();

router.route(`/login`).get(authController.athenticateToSpotify);

export default router;
