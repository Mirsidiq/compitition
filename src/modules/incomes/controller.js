import { customError } from "../../exception/customError.js";
import { findUser } from "../../middlewares/checkToken.js";
import { verify } from "../../utils/jwt.js";
import { UsersModel } from "../users/model.js";
import { IncomesModel } from "./model.js";
const incomes = async (req, res, next) => {
  try {
    const token = req.headers?.token;
    if (token) {
      const decode = await verify(token).catch((err) =>
        next(new customError(400, err.message))
      );
      let temp = await findUser(decode);
      if (temp.accounter) {
        const data = await IncomesModel.findAll({ include: UsersModel });
        data.length > 0
          ? res.status(200).json({
              message: "incomes",
              data,
            })
          : res.status(404).json({
              message: "not found",
              data,
            });
      } else {
        next(new customError(400, "you have no permit"));
      }
    } else {
      next(new customError(401, "unauthorized"));
    }
  } catch (error) {
    next(new customError(500, error.message));
  }
};
const addIncome = async (req, res, next) => {
  try {
    const token = req.headers.token;
    if (token) {
      const decode = await verify(token).catch((err) =>
        next(new customError(400, err.message))
      );
      let temp = await findUser(decode);
      if (temp.accounter) {
        const { user_ref_id, reason, amount, inc_time } = req.body;
        const newUser = await IncomesModel.create({
          user_ref_id,
          reason,
          amount,
          inc_time,
        });
        newUser
          ? res.status(201).json({
              message: "created",
              data: newUser,
            })
          : res.status(400).json({
              message: "not created",
              data: {},
            });
      }
      else{
        next(new customError(400,'you have no permit'))
      }
    } 
    else {
      next(new customError(400, "you have no permit"));
    }
  } catch (error) {
    next(new customError(500, error.message));
  }
};
const updateIncome = async (req, res, next) => {
  try {
    const { id } = req.params;
    const token = req.headers.token;
    if (token) {
      const decode = await verify(token).catch((err) =>
        next(new customError(400, err.message))
      );
      let temp = await findUser(decode);
      if (temp.accounter) {
        const { user_ref_id, reason, amount, inc_time } = req.body;
        const newUser = await IncomesModel.update(
          {
            user_ref_id,
            reason,
            amount,
            inc_time,
          },
          {
            where: {
              incom_id: id,
            },
            returning: true,
          }
        );
        newUser[0] == 1
          ? res.status(201).json({
              message: "updated",
              data: newUser[1],
            })
          : res.status(400).json({
              message: "not updated",
              data: {},
            });
      } else {
        next(new customError(400, "you have no permit"));
      }
    } else {
      next(new customError(400, "you have no permit"));
    }
  } catch (error) {
    next(new customError(500, error.message));
  }
};
export { incomes, addIncome, updateIncome };
