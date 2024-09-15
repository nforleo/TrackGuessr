import { NextFunction, Request, Response } from "express";
import * as authService from "../services/auth.services";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<unknown> => {
  try {
    const data = authService.login();
    res.redirect(data);
  } catch (error: unknown) {
    return next(error);
  }
};

export const callback = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<unknown> => {
  try {
    await authService.callback({
      code: (req.query.code as string) || "",
    });

    res.redirect("/");
  } catch (error: unknown) {
    return next(error);
  }
};

export const token = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<unknown> => {
  try {
    const data = authService.token();

    res.json(data);
  } catch (error: unknown) {
    return next(error);
  }
};
