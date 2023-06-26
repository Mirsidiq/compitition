// import { customError } from "../../exception/customError.js";
// import { PositionsModel } from "../positions/model.js";
// import { UsersModel } from "./model.js";
// import { IncomesModel } from "../incomes/model.js";
// import { GroupsModel } from "../groups/model.js";
// import { findUser } from "../../middlewares/checkToken.js";
// import { verify } from "../../utils/jwt.js";
// import { DirectionsModel } from "../directions/model.js";

// const users = async (req, res, next) => {
//   try {
//     const token = req.headers?.token;
//     if (token) {
//       const decode = await verify(token).catch((err) =>
//         next(new customError(400, err.message))
//       );
//       let temp = await findUser(decode);
//       if (temp.admin) {
//         const { group, username, contact, gender } = req.query;
//         if (username) {
//           const data = await UsersModel.findAll({
//             where: {
//               first_name: username,
//               left_date: null,
//             },
//           });
//           data.length > 0
//             ? res.status(200).json({
//                 message: "users",
//                 data,
//               })
//             : res.status(404).json({
//                 message: "not found",
//                 data,
//               });
//         } else if (contact) {
//           const data = await UsersModel.findOne({
//             where: {
//               contact: "+" + contact,
//               left_date: null,
//             },
//           });
//           data > 0
//             ? res.status(200).json({
//                 message: "user",
//                 data,
//               })
//             : res.status(404).json({
//                 message: "not found",
//                 data,
//               });
//         } else if (gender) {
//           const data = await UsersModel.findAll({
//             where: {
//               gender: gender == "male" ? "1" : "2",
//               left_date: null,
//             },
//           });
//           data.length > 0
//             ? res.status(200).json({
//                 message: "users",
//                 data,
//               })
//             : res.status(404).json({
//                 message: "not found",
//                 data,
//               });
//         } else if (group) {
//           const data = await GroupsModel.findOne({
//             where: {
//               gr_number: group,
//             },
//             include: [UsersModel],
//           });
//           let users = data.users.filter((user) => user.left_date == null);
//           users > 0
//             ? res.status(200).json({
//                 message: "users",
//                 data: users,
//               })
//             : res.status(404).json({
//                 message: "not found",
//                 data: users,
//               });
//         } else {
//           const data = await UsersModel.findAll();
//           data.length > 0
//             ? res.status(200).json({
//                 message: "users",
//                 data,
//               })
//             : res.status(404).json({
//                 message: "not found",
//                 data,
//               });
//         }
//       } else if (temp.teacher) {
//         const data = await UsersModel.findAll({
//           where: {
//             pos_ref_id: temp.pos_id,
//           },
//           include: [GroupsModel, PositionsModel],
//           attributes: ["user_id", "first_name", "last_name", "contact"],
//         });
//         res.status(200).json({
//           message: "users",
//           data,
//         });
//       } else if (temp.student) {
//         const data = await UsersModel.findOne({
//           where: {
//             pos_ref_id: temp.pos_id,
//             user_id: temp.user_id,
//           },
//           include: [GroupsModel, IncomesModel],
//           attributes: ["user_id", "first_name", "last_name", "contact"],
//         });
//         if (data) {
//           const directionId = data.group?.gr_id || 0;
//           const direction = await DirectionsModel.findByPk(directionId, {
//             attributes: ["dir_name"],
//           });
//           let assignedObj = {};
//           assignedObj.direction = direction?.dir_name;
//           Object.assign(assignedObj, data.dataValues);
//           res.status(200).json({
//             message: "users",
//             data: assignedObj,
//           });
//         } else {
//           next(new customError(404, "not found"));
//         }
//       }
//     } else {
//       next(new customError(401, "unauthorized"));
//     }
//   } catch (error) {
//     next(new customError(500, error.message));
//   }
// };

// const addUser = async (req, res, next) => {
//   try {
//     const {
//       group_ref_id,
//       left_date,
//       come_date,
//       email,
//       contact,
//       gender,
//       last_name,
//       first_name,
//       pos_ref_id,
//       role,
//     } = req.body;
//     const newUser = await UsersModel.create({
//       group_ref_id,
//       left_date,
//       come_date,
//       email,
//       contact,
//       gender,
//       last_name,
//       first_name,
//       pos_ref_id,
//       role,
//     });
//     newUser
//       ? res.status(201).json({
//           message: "created",
//           data: newUser,
//         })
//       : res.status(400).json({
//           message: "not created",
//           data: {},
//         });
//   } catch (error) {
//     next(new customError(500, error.message));
//   }
// };
// const updateUser = async (req, res, next) => {
//   const { id } = req.params;
//   try {
//     const {
//       group_ref_id,
//       left_date,
//       come_date,
//       email,
//       contact,
//       gender,
//       last_name,
//       first_name,
//       pos_ref_id,
//       role,
//     } = req.body;
//     const newUser = await UsersModel.update(
//       {
//         group_ref_id,
//         left_date,
//         come_date,
//         email,
//         contact,
//         gender,
//         last_name,
//         first_name,
//         pos_ref_id,
//         role,
//       },
//       {
//         where: {
//           user_id: id,
//         },
//         returning: true,
//       }
//     );
//     newUser[0] == 1
//       ? res.status(201).json({
//           message: "updated",
//           data: newUser[1],
//         })
//       : res.status(400).json({
//           message: "not updated",
//           data: {},
//         });
//   } catch (error) {
//     next(new customError(500, error.message));
//   }
// };
// const deleteUser = async (req, res, next) => {
//   const { id } = req.params;
//   try {
//     const newUser = await UsersModel.destroy({
//       where: {
//         user_id: id,
//       },
//     });
//     newUser == 1
//       ? res.status(201).json({
//           message: "deleted",
//         })
//       : res.status(400).json({
//           message: "not deleted",
//           data: {},
//         });
//   } catch (error) {
//     next(new customError(500, error.message));
//   }
// };

export { users, addUser, updateUser, deleteUser };
