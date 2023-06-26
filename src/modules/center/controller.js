import { customError } from "../../exception/customError.js";
import { CenterModel } from "./model.js";
const centers = async (req, res, next) => {
  try {
    const data = await CenterModel.findAll();
    data.length > 0
      ? res.status(200).json({
          message: "centers",
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
const addCenter = async (req, res, next) => {
  try {
    const { name, address, open_date, close_date } = req.body;
    const newCenter = await CenterModel.create({
      name,
      address,
      open_date,
      close_date,
    });
    newCenter
      ? res.status(201).json({
          message: "created",
          data: newCenter,
        })
      : res.status(400).json({
          message: "not created",
          data: {},
        });
  } catch (error) {
    next(new customError(500, error.message));
  }
};
export { centers, addCenter };
