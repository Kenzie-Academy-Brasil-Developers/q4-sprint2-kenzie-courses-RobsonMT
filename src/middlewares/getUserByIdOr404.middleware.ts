import { NextFunction, Request, Response } from "express";
import { ErrorHandler } from "../errors/errors";
import { userRepository } from "../repositories";

const getUserByIdOr404 = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const user = await userRepository.retrieve({ id: id });

    if (!user) {
      throw new Error();
    }

    req.user = user;

    next();
  } catch (err: any) {
    if (err instanceof Error) {
      throw new ErrorHandler(404, "User not found");
    }
  }
};

export default getUserByIdOr404;
