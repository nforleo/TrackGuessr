import express from "express";
import * as gameController from "../controllers/game.controller";

const router = express.Router();

router.route(`/daily`).get(gameController.getDailyTracks);
router.route(`/playSong`).put(gameController.playSong);

export default router;
