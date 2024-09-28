import { NextFunction, Request, Response } from "express";
import * as gameService from "../services/game.service";

export const getDailyTracks = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<unknown> => {
  try {
    // const n = parseInt(req.query.n as string);
    // const data = await gameService.getDailyTracks(n);
    const data = await gameService.getDailyTracks();
    return res.json(data);
  } catch (error: unknown) {
    return next(error);
  }
};
