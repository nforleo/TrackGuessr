import express from "express";
import * as databaseController from "../controllers/database.controller";

const router = express.Router();

router.route(`/getUserInfo`).get(databaseController.updateState);

export default router;