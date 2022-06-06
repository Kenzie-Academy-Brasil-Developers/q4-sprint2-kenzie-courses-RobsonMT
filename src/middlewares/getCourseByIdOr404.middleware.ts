import { NextFunction, Request, Response } from "express";
import { ErrorHandler } from "../errors/errors";
import { courseRepository } from "../repositories";

const getCourseByIdOr404 = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const course = await courseRepository.retrieve({ id: id });

    if (!course) {
      throw new Error();
    }

    req.course = course;

    next();
  } catch (err: any) {
    if (err instanceof Error) {
      throw new ErrorHandler(404, `course with id ${req.params.id} not found`);
    }
  }
};

export default getCourseByIdOr404;
