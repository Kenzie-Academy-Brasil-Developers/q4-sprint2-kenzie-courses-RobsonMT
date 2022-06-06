import { Router } from "express";
import { userController } from "../controllers";
import {
  getUserByIdOr404,
  validateSchema,
  validateToken,
  verifiUserExists,
  verifiUserExistsUpdate,
  verifyAdmin,
  verifyPermission,
} from "../middlewares";
import {
  loginUserSchema,
  createUserSchema,
  userUpdateSchema,
} from "../schemas";

const userRouter = Router();

userRouter.post(
  "/users",
  validateSchema(createUserSchema),
  verifiUserExists,
  userController.createUser
);
userRouter.post(
  "/login",
  validateSchema(loginUserSchema),
  userController.loginUser
);
userRouter.get(
  "/users",
  validateToken,
  verifyPermission,
  userController.getAll
);
userRouter.get(
  "/users/:id",
  validateToken,
  getUserByIdOr404,
  verifyAdmin,
  userController.getById
);
userRouter.patch(
  "/users/:id",
  validateToken,
  verifyAdmin,
  validateSchema(userUpdateSchema),
  verifiUserExistsUpdate,
  getUserByIdOr404,
  userController.update
);

export default userRouter;
