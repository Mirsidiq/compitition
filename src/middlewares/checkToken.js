import { customError } from "../exception/customError.js";
import { UsersModel } from "../modules/users/model.js";
import {
  checkAccounter,
  checkAdmin,
  checkStudent,
  checkTeacher,
} from "../utils/checkAdmin.js";
import { verify } from "../utils/jwt.js";
const findUser = async (decode) => {
  const id = decode?.id ?? 0;
  const user = await UsersModel.findByPk(id);
  if (user) {
    if (await checkAdmin(user)) {
      return { admin: true };
    } else if (await checkTeacher(user)) {
      const { pos_id } = await checkTeacher(user);
      return {
        teacher: true,
        pos_id,
        user_id: id,
      };
    } else if (await checkStudent(user)) {
      const { pos_id } = await checkStudent(user);
      return {
        student: true,
        pos_id,
        user_id: id,
      };
    } else if (await checkAccounter(user)) {
      {
        const { pos_id } = await checkAccounter(user);
        return {
          accounter: true,
          pos_id,
          user_id: id,
        };
      }
    }
  }
  return false;
};
const checkAdminToken = async (req, _, next) => {
  const token = req.headers?.token;
  const decode = await verify(token).catch((err) =>
    next(new customError(400, err.message))
  );
  let temp = await findUser(decode);
  if (temp.admin) {
    next();
  } else {
    next(new customError(401, "unauthorized"));
  }
};

export { checkAdminToken, findUser };
