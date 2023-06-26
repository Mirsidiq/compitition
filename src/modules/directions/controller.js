import { customError } from "../../exception/customError.js";
// import { GroupsModel } from "../groups/model.js";
// import { PositionsModel } from "../positions/model.js";
// import { UsersModel } from "../users/model.js";
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
// const getById = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const data = await DirectionsModel.findByPk(id, {
//       include: [GroupsModel],
//       attributes: ["dir_name"],
//     });
//     data
//       ? res.status(200).json({
//           message: "direction",
//           data,
//         })
//       : res.status(404).json({
//           message: "not found",
//           data,
//         });
//   } catch (error) {
//     next(new customError(500, error.message));
//   }
// };
// const getByDirName = async (req, res, next) => {
//   try {
//     const { directions, position } = req.query;
//     if (directions) {
//       let data = await DirectionsModel.findAll({
//         include: [GroupsModel],
//         attributes: ["dir_name"],
//       });
//       console.log(JSON.stringify(data, null, 2));
//       data = data.filter((dir) =>
//         dir.dir_name.toLowerCase().includes(directions.toLowerCase())
//       );
//       data.length > 0
//         ? res.status(200).json({
//             message: "direction",
//             data,
//           })
//         : res.status(404).json({
//             message: "not found",
//             data,
//           });
//     } else if (position) {
//       let positions = await PositionsModel.findOne({
//         where: {
//           pos_name: position,
//         },
//         include: [UsersModel],
//       });
//       if (positions) {
//         let ans = {};
//         ans.users = positions.users;
//         res.status(200).json({
//           data: ans,
//         });
//       } else {
//         next(new customError(404, "not found"));
//       }
//     } else {
//       next(new customError(404, "not found"));
//     }
//   } catch (error) {
//     next(new customError(500, error.message));
//   }
// };

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
  // getById,
  // getByDirName,
  updateDirection,
  deleteDirection,
};
