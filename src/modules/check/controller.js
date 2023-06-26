import { customError } from "../../exception/customError.js";
import { ChecksModel } from "./model.js";
const checks = async (req, res, next) => {
  try {
    const data = await ChecksModel.findAll();
    data.length > 0
      ? res.status(200).json({
          message: "checks",
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

const addCheck = async (req, res, next) => {
  try {
    const { gr_ref_id, user_ref_id, not_in_class, add_date } = req.body;
    const newCheck = await ChecksModel.create({
      gr_ref_id,
      user_ref_id,
      not_in_class,
      add_date,
    });
    newCheck
      ? res.status(201).json({
          message: "created",
          data: newCheck,
        })
      : res.status(400).json({
          message: "not created",
          data: {},
        });
  } catch (error) {
    next(new customError(500, error.message));
  }
};
export { checks, addCheck };
