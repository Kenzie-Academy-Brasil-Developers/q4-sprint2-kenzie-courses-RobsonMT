import { NextFunction, Request, Response } from "express";
import { Course } from "../entities";
import { ErrorHandler } from "../errors/errors";
import { courseRepository } from "../repositories";

const verifyCourseExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if ((req.validated as Partial<Course>).courseName) {
    const foundCourse: Course = await courseRepository.retrieve({
      courseName: (req.validated as Course).courseName,
    });

    if (foundCourse) {
      throw new ErrorHandler(409, "Course already exists");
    }
  }

  return next();
};

export default verifyCourseExists;
