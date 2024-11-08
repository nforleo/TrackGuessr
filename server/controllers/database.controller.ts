import { NextFunction, Request, Response } from "express";
import * as databaseService from "../services/database.service";

export const updateStats = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<unknown> => {
  try {
    const params = {
        email: req.query.email as string,
        stats: {
            mistakes: parseInt(req.query.mistakes as string),
            score: parseInt(req.query.score as string),
            time: parseInt(req.query.time as string)
        }
    }

    const data = await databaseService.updateStats(params);
    return res.json(data);
  } catch (error: unknown) {
    return next(error);
  }
};

export const getUserStats = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<unknown> => {
  try {
    const email = req.query.email as string;

    const data = await databaseService.getUserStats(email);
    return res.json(data);
  } catch (error: unknown) {
    return next(error);
  }
};