import { customError } from "../../exception/customError.js";
import { DirectionsModel } from "./model.js";
const directions = async (req, res, next) => {
  try {
    const data = await DirectionsModel.findAll();
    data.length > 0
      ? res.status(200).json({
          status:200,
          message: "success",
          data,
        })
      : res.status(404).json({
        status:404,
          message: "not found",
          data,
        });
  } catch (error) {
    next(new customError(500, error.message));
  }
};

const addDirection = async (req, res, next) => {
  try {
    const { dir_name, duration, salary } =
      req.body;
    const newDir = await DirectionsModel.create({
      dir_name,
      duration,
      salary
    },{
      returning:true
    });
    newDir
      ? res.status(201).json({
        status:201,
          message: "success",
          data: newDir,
        })
      : res.status(400).json({
        status:400,
          message: "failed",
          data: {},
        });
  } catch (error) {
    next(new customError(500, error.message));
  }
};
const updateDirection = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {dir_name, duration, salary } =
      req.body;
    const newDir = await DirectionsModel.update(
      { dir_name, duration, salary },
      {
        where: {
          dir_id: id,
        },
        returning: true,
      }
    );
    newDir[0] == 1
      ? res.status(201).json({
        status:201,
          message: "success",
          data: newDir[1][0],
        })
      : res.status(400).json({
        status:400,
          message: "failed",
          data: {},
        });
  } catch (error) {
    next(new customError(500, error.message));
  }
};
const deleteDirection = async (req, res, next) => {
  try {
    const { id } = req.params;
    const newDept = await DirectionsModel.destroy({
      where: {
        dir_id: id,
      },
    });
    newDept == 1
      ? res.status(201).json({
          status:201,
          message: "success",
        })
      : res.status(400).json({
          status:400,
          message: "failed",
        });
  } catch (error) {
    next(new customError(500, error.message));
  }
};

export {
  directions,
  addDirection,
  updateDirection,
  deleteDirection,
};
