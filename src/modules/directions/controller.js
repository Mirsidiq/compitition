import { customError } from "../../exception/customError.js";
// import { GroupsModel } from "../groups/model.js";
// import { PositionsModel } from "../positions/model.js";
// import { UsersModel } from "../users/model.js";
import { DirectionsModel } from "./model.js";
const directions = async (req, res, next) => {
  try {
    const data = await DirectionsModel.findAll({ include: [GroupsModel] });
    data.length > 0
      ? res.status(200).json({
          message: "directions",
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
const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await DirectionsModel.findByPk(id, {
      include: [GroupsModel],
      attributes: ["dir_name"],
    });
    data
      ? res.status(200).json({
          message: "direction",
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
const getByDirName = async (req, res, next) => {
  try {
    const { directions, position } = req.query;
    if (directions) {
      let data = await DirectionsModel.findAll({
        include: [GroupsModel],
        attributes: ["dir_name"],
      });
      console.log(JSON.stringify(data, null, 2));
      data = data.filter((dir) =>
        dir.dir_name.toLowerCase().includes(directions.toLowerCase())
      );
      data.length > 0
        ? res.status(200).json({
            message: "direction",
            data,
          })
        : res.status(404).json({
            message: "not found",
            data,
          });
    } else if (position) {
      let positions = await PositionsModel.findOne({
        where: {
          pos_name: position,
        },
        include: [UsersModel],
      });
      if (positions) {
        let ans = {};
        ans.users = positions.users;
        res.status(200).json({
          data: ans,
        });
      } else {
        next(new customError(404, "not found"));
      }
    } else {
      next(new customError(404, "not found"));
    }
  } catch (error) {
    next(new customError(500, error.message));
  }
};

const addDirection = async (req, res, next) => {
  try {
    const { dep_ref_id, dir_name, duration, salary, start_date, end_date } =
      req.body;
    const newDept = await DirectionsModel.create({
      dep_ref_id,
      dir_name,
      duration,
      salary,
      start_date,
      end_date,
    });
    newDept
      ? res.status(201).json({
          message: "created",
          data: newDept,
        })
      : res.status(400).json({
          message: "not created",
          data: {},
        });
  } catch (error) {
    next(new customError(500, error.message));
  }
};
const updateDirection = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id);
    const { dep_ref_id, dir_name, duration, salary, start_date, end_date } =
      req.body;
    const newDept = await DirectionsModel.update(
      { dep_ref_id, dir_name, duration, salary, start_date, end_date },
      {
        where: {
          dir_id: id,
        },
        returning: true,
      }
    );
    newDept[0] == 1
      ? res.status(201).json({
          message: "updated",
          data: newDept[1],
        })
      : res.status(400).json({
          message: "not updated",
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

export {
  directions,
  addDirection,
  getById,
  getByDirName,
  updateDirection,
  deleteDirection,
};
