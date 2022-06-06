import { Router } from "express";
import { courseController } from "../controllers";
import {
  getCourseByIdOr404,
  validateSchema,
  validateToken,
  verifyCourseExists,
  verifyPermission,
} from "../middlewares";
import { courseSchema, courseUpdateSchema } from "../schemas";

const courseRouter = Router();

courseRouter.post(
  "/courses",
  validateToken,
  verifyPermission,
  validateSchema(courseSchema),
  verifyCourseExists,
  courseController.createCourse
);
courseRouter.get("/courses", validateToken, courseController.readAll);
courseRouter.patch(
  "/courses/:id",
  validateToken,
  verifyPermission,
  getCourseByIdOr404,
  validateSchema(courseUpdateSchema),
  verifyCourseExists,
  courseController.updateCourse
);
courseRouter.post(
  "/courses/:id/users",
  validateToken,
  getCourseByIdOr404,
  courseController.registerStudent
);
export default courseRouter;
