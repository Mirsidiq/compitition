import { customError } from "../../exception/customError.js";
import { DirectionsModel } from "../directions/model.js";
import { PositionsModel } from "../positions/model.js";
import { DepartsModel } from "./model.js";
const departments = async (req, res, next) => {
  try {
    const data = await DepartsModel.findAll({
      include: [DirectionsModel, PositionsModel],
    });
    data.length > 0
      ? res.status(200).json({
          message: "departments",
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
const departmentById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await DepartsModel.findByPk(id, {
      include: [DirectionsModel, PositionsModel],
    });
    if (data) {
      delete data.dataValues?.center_ref_id;
      data.directions = data.directions.filter(
        (item) => delete item.dataValues?.dep_ref_id
      );
      data.positions = data.positions.filter(
        (item) => delete item.dataValues?.dep_ref_id
      );
      res.status(200).json({
        message: "departments",
        data,
      });
    } else {
      res.status(404).json({
        message: "not found",
        data,
      });
    }
  } catch (error) {
    next(new customError(500, error.message));
  }
};
const addDepartment = async (req, res, next) => {
  try {
    const { center_ref_id, dep_name, create_at, delete_at } = req.body;
    const newDept = await DepartsModel.create({
      center_ref_id,
      dep_name,
      create_at,
      delete_at,
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
const updateDepartment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { center_ref_id, dep_name, create_at, delete_at } = req.body;
    const newDept = await DepartsModel.update(
      { center_ref_id, dep_name, create_at, delete_at },
      {
        where: {
          dep_id: id,
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
const deleteDepartment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const newDept = await DepartsModel.destroy({
      where: {
        dep_id: id,
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
  departments,
  addDepartment,
  departmentById,
  updateDepartment,
  deleteDepartment,
};
