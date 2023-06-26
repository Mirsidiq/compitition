import { customError } from "../../exception/customError.js";
import { UsersModel } from "../users/model.js";
import { PositionsModel } from "./model.js";
const positions = async (req, res, next) => {
  try {
    const data = await PositionsModel.findAll({ include: UsersModel });
    data.length > 0
      ? res.status(200).json({
          message: "positions",
          data,
        })
      : res.status(404).json({
          message: "not found",
          data,
        });
  } catch (error) {
    next(new customError(500, error.message));
  }
};
const positionById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await PositionsModel.findByPk(id, { include: [UsersModel] });
    if (data) {
      let ans = {};
      ans.pos_name = data.pos_name;
      ans.users = data.users;
      ans
        ? res.status(200).json({
            message: "positions",
            data: ans,
          })
        : res.status(404).json({
            message: "not found",
            data: ans,
          });
    } else {
      next(new customError(404, "not found"));
    }
  } catch (error) {
    next(new customError(500, error.message));
  }
};
const addPosition = async (req, res, next) => {
  try {
    const { dep_ref_id, pos_name, salary } = req.body;
    const newPos = await PositionsModel.create({
      dep_ref_id,
      pos_name,
      salary,
    });
    newPos
      ? res.status(201).json({
          message: "created",
          data: newPos,
        })
      : res.status(400).json({
          message: "not created",
          data: {},
        });
  } catch (error) {
    next(new customError(500, error.message));
  }
};
const updatePosition = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { dep_ref_id, pos_name, salary } = req.body;
    const newPos = await PositionsModel.update(
      { dep_ref_id, pos_name, salary },
      {
        where: {
          pos_id: id,
        },
        returning: true,
      }
    );
    newPos[0] == 1
      ? res.status(201).json({
          message: "updated",
          data: newPos[1],
        })
      : res.status(400).json({
          message: "not updated",
          data: {},
        });
  } catch (error) {
    next(new customError(500, error.message));
  }
};
const deletePosition = async (req, res, next) => {
  try {
    const { id } = req.params;

    const newPos = await PositionsModel.destroy({
      where: {
        pos_id: id,
      },
    });
    newPos == 1
      ? res.status(201).json({
          message: "deleted",
        })
      : res.status(400).json({
          message: "not deleted",
          data: {},
        });
  } catch (error) {
    next(new customError(500, error.message));
  }
};

export { positions, addPosition, positionById, updatePosition, deletePosition };
