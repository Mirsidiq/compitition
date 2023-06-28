import sha256 from "sha256";
import { sign } from "../../utils/jwt.js";
import { UsersModel } from "../users/model.js";
import { checkAdmin,checkAssistent, checkStudent, checkTeacher } from "../../utils/checkAdmin.js";
import { customError } from "../../exception/customError.js";
const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
  const findUser = await UsersModel.findOne({
    where: {
      username,
      password:sha256(password),
    },
  });
  if (findUser) {
      res.status(201).json({
        status:201,
        message: "success",
        token:sign(findUser.user_id)
      });
  } else {
    next(new customError(403, "unauthorized"));
  }
  } catch (error) {
    next(new customError(500,error.message))
  }
};
export {login };
