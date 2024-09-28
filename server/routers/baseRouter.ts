import express from "express";
import authRouter from "./authRouter";
import gameRouter from "./gameRouter";

const router = express.Router();

router.use(`/auth`, authRouter);
router.use(`/game`, gameRouter);

export default router;
