import validateSchema from "./validateSchema.middleware";
import validateToken from "./validateToken.middleware";
import verifiUserExists from "./verifyUserExists.middleware";
import verifyPermission from "./verifyPermission.middleware";
import getUserByIdOr404 from "./getUserByIdOr404.middleware";
import verifyAdmin from "./verifyAdmin.middleware";
import verifiUserExistsUpdate from "./verifyUserExistsUpdate.middleware";
import getCourseByIdOr404 from "./getCourseByIdOr404.middleware";
import verifyCourseExists from "./verifyCourseExists.middleware";

export {
  validateSchema,
  validateToken,
  verifiUserExists,
  verifyPermission,
  getUserByIdOr404,
  verifyAdmin,
  verifiUserExistsUpdate,
  verifyCourseExists,
  getCourseByIdOr404,
};
