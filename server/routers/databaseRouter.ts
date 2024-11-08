import express from "express";
import * as databaseController from "../controllers/database.controller";

const router = express.Router();

router.route(`/updateStats`).get(databaseController.updateStats);
router.route(`/getUserStats`).get(databaseController.getUserStats);

export default router;