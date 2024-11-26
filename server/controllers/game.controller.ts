import { NextFunction, Request, Response } from "express";
import * as gameService from "../services/game.service";

export const getDailyTracks = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<unknown> => {
  try {
    const data = await gameService.getDailyTracks();
    return res.json(data);
  } catch (error: unknown) {
    return next(error);
  }
};

export const getCustomTracks = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<unknown> => {
  try {
    const numTracks = parseInt(req.query.n as string);
    const data = await gameService.getNTracks(numTracks);
    return res.json(data);
  } catch (error: unknown) {
    return next(error);
  }
};

export const playSong = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<unknown> => {
  try {
    const uri = (req.query.uri as string) || "";
    await gameService.playSong(uri);
    return res.json();
  } catch (error: unknown) {
    return next(error);
  }
};
