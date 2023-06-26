import { customError } from "../exception/customError.js";
import { UsersModel } from "../modules/users/model.js";
import {
  checkAssistent,
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
      return { 
        role: "admin",
        user_id: id,
      };
    } else if (await checkTeacher(user)) {
      return {
        role: "teacher",
        user_id: id,
      };
    } else if (await checkStudent(user)) {
      return {
        role: "student",
        user_id: id,
      };
    } else if (await checkAssistent(user)) {
      {
        return {
          role: "assistent",
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
 if(decode){
  let temp = await findUser(decode);
  if (temp.role=="admin") {
    next();
  } else {
    next(new customError(401, "you have no permission"));
  }
 }
};
const checkTeacherToken = async (req, _, next) => {
  const token = req.headers?.token;
  const decode = await verify(token).catch((err) =>
    next(new customError(400, err.message))
  );
 if(decode){
  let temp = await findUser(decode);
  if (temp.role=="teacher") {
    next();
  } else {
    next(new customError(401, "you have no permission"));
  }
 }
};
const checkAssistentToken = async (req, _, next) => {
  const token = req.headers?.token;
  const decode = await verify(token).catch((err) =>
    next(new customError(400, err.message))
  );
 if(decode){
  let temp = await findUser(decode);
  if (temp.role=="assistent") {
    next();
  } else {
    next(new customError(401, "you have no permission"));
  }
 }
};
const checkStudentToken = async (req, _, next) => {
  const token = req.headers?.token;
  const decode = await verify(token).catch((err) =>
    next(new customError(400, err.message))
  );
  if(decode){
    let temp = await findUser(decode);
  if (temp.role=="student") {
    next();
  } else {
    next(new customError(401, "you have no permission"));
  }
  }
};

export { checkAdminToken,checkTeacherToken ,checkAssistentToken,checkStudentToken, findUser };
