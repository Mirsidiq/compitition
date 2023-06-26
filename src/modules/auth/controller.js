import { sign } from "../../utils/jwt.js";
import { UsersModel } from "../users/model.js";
import { checkAdmin,checkAssistent, checkStudent, checkTeacher } from "../../utils/checkAdmin.js";
import { customError } from "../../exception/customError.js";
const login = async (req, res, next) => {
  const { username, password } = req.body;
  const findUser = await UsersModel.findOne({
    where: {
      username,
      password,
    },
  });
  if (findUser) {
    if (checkAdmin(findUser)) {
      res.status(201).json({
        status:201,
        message: "success",
        token:sign(findUser.user_id)
      });
    }
    else if(checkAssistent(findUser)){
      res.status(201).json({
        status:201,
        message: "success",
        token:sign(findUser.user_id)
      });
    }
    else if(checkTeacher(findUser)){
      res.status(201).json({
        status:201,
        message: "success",
        token:sign(findUser.user_id)
      });
    }
    else if(checkStudent(findUser)){
      res.status(201).json({
        status:201,
        message: "success",
        token:sign(findUser.user_id)
      });
    }
  } else {
    next(new customError(401, "unauthorized"));
  }
};
export {login };
