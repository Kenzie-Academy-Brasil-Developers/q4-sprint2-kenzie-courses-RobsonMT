import { Request, Response } from "express";
import { courseService } from "../services";
import mailerService from "../services/mailer.service";

class CourseController {
  createCourse = async (req: Request, res: Response) => {
    const course = await courseService.createCourse(req);
    return res.status(201).json(course);
  };

  readAll = async (req: Request, res: Response) => {
    const courses = await courseService.readAllCourses(req);
    return res.status(200).json(courses);
  };

  updateCourse = async (req: Request, res: Response) => {
    const course = await courseService.updateCourse(req);
    return res.status(200).json(course);
  };

  registerStudent = async (req: Request, res: Response) => {
    const user = await courseService.registerStudent(req);
    return mailerService.welcomeEmail(req, res, user);
  };
}

export default new CourseController();
