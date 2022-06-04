import { NextFunction, Request, Response } from "express";
import { ErrorHandler } from "../errors/errors";
import { courseRepository, userRepository } from "../repositories";

const getCourseByIdOr404 = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const course = await courseRepository.retrieve({ id: id });

  if (!course) {
    throw new ErrorHandler(404, `course with id ${id} not found`);
  }

  req.course = course;

  return next();
};

export default getCourseByIdOr404;
