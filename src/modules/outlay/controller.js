import { customError } from "../../exception/customError.js";
import { findUser } from "../../middlewares/checkToken.js";
import { verify } from "../../utils/jwt.js";
import { OutlayModel } from "./model.js";
const outlays = async (req, res, next) => {
  try {
    const token = req.headers.token;
    if (token) {
      const decode = await verify(token).catch((err) =>
        next(new customError(400, err.message))
      );
      let temp = await findUser(decode);
      if (temp.accounter) {
        const data = await OutlayModel.findAll();
        data.length > 0
          ? res.status(200).json({
              message: "outlays",
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
      next(new customError(400, "unauthorized"));
    }
  } catch (error) {
    next(new customError(500, error.message));
  }
};
const addOutlay = async (req, res, next) => {
  try {
    const token = req.headers.token;
    if (token) {
      const decode = await verify(token).catch((err) =>
        next(new customError(400, err.message))
      );
      let temp = await findUser(decode);
      if (temp.accounter) {
        const { reason, amount, out_time } = req.body;
        const newOutlay = await OutlayModel.create({
          reason,
          amount,
          out_time,
        });
        newOutlay
          ? res.status(201).json({
              message: "created",
              data: newOutlay,
            })
          : res.status(400).json({
              message: "not created",
              data: {},
            });
      }
    } else {
      next(new customError(400, "you have no permit"));
    }
  } catch (error) {
    next(new customError(500, error.message));
  }
};
const updateOutlay = async (req, res, next) => {
  try {
    const { id } = req.params;
    const token = req.headers.token;
    if (token) {
      const decode = await verify(token).catch((err) =>
        next(new customError(400, err.message))
      );
      let temp = await findUser(decode);
      if (temp.accounter) {
        const { reason, amount, out_time } = req.body;
        const newOutlay = await OutlayModel.update(
          { reason, amount, out_time },
          {
            where: {
              outlay_id: id,
            },
            returning: true,
          }
        );
        newOutlay[0] == 1
          ? res.status(201).json({
              message: "upated",
              data: newOutlay[1],
            })
          : res.status(400).json({
              message: "not upated",
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

export { outlays, addOutlay, updateOutlay };
