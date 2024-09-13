import { NextFunction, Request, Response } from "express";
import * as authService from "../services/auth.services";

export const athenticateToSpotify = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<unknown> => {
  try {
    const data = authService.authorize();
    res.redirect(data);
  } catch (error: unknown) {
    return next(error);
  }
};

export const spotifyCallback = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<unknown> => {
  try {
    await authService.spotifyCallback({
      code: (req.query.code as string) || "",
    });

    res.redirect("/");
  } catch (error: unknown) {
    return next(error);
  }
};

export const getAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<unknown> => {
  try {
    const data = authService.getAccessToken();

    res.json(data);
  } catch (error: unknown) {
    return next(error);
  }
};
