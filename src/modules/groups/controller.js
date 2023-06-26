import { customError } from "../../exception/customError.js";
import { UsersModel } from "../users/model.js";
import { GroupsModel } from "./model.js";
import { findUser } from "../../middlewares/checkToken.js";
import { verify } from "../../utils/jwt.js";
const groups = async (req, res, next) => {
  try {
    const token = req.headers?.token;
    if (token) {
      const decode = await verify(token).catch((err) =>
        next(new customError(400, err.message))
      );
      let temp = await findUser(decode);
      if (temp.admin) {
        const data = await GroupsModel.findAll();
        data.length > 0
          ? res.status(200).json({
              message: "groups",
              data,
            })
          : res.status(404).json({
              message: "not found",
              data,
            });
      } else if (temp.teacher) {
        const users = await UsersModel.findOne({
          where: {
            user_id: temp.user_id,
          },
          include: [GroupsModel],
          attributes: ["user_id", "first_name", "last_name"],
        });
        users
          ? res.status(200).json({
              message: "teacher group",
              data: users,
            })
          : next(new customError(404, "not found"));
      }
    }
  } catch (error) {
    next(new customError(500, error.message));
  }
};
const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    let data = await GroupsModel.findByPk(id, {
      include: [UsersModel],
      attributes: ["gr_id", "gr_number"],
    });
    const users = data.users.filter((user) => user.left_date == null);
    users.length > 0
      ? res.status(200).json({
          message: "groups",
          data: users,
        })
      : res.status(404).json({
          message: "not found",
          data: users,
        });
  } catch (error) {
    next(new customError(500, error.message));
  }
};
const addGroup = async (req, res, next) => {
  try {
    const { dir_ref_id, gr_number, begin_date, end_date } = req.body;
    const newGroup = await GroupsModel.create({
      dir_ref_id,
      gr_number,
      begin_date,
      end_date,
    });
    newGroup
      ? res.status(201).json({
          message: "created",
          data: newGroup,
        })
      : res.status(400).json({
          message: "not created",
          data: {},
        });
  } catch (error) {
    next(new customError(500, error.message));
  }
};
const updateGroup = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { dir_ref_id, gr_number, begin_date, end_date } = req.body;
    const newGroup = await GroupsModel.update(
      { dir_ref_id, gr_number, begin_date, end_date },
      {
        where: {
          gr_id: id,
        },
        returning: true,
      }
    );
    newGroup[0] == 1
      ? res.status(201).json({
          message: "created",
          data: newGroup[1],
        })
      : res.status(400).json({
          message: "not created",
          data: {},
        });
  } catch (error) {
    next(new customError(500, error.message));
  }
};
const deleteGroup = async (req, res, next) => {
  try {
    const { id } = req.params;
    const newGroup = await GroupsModel.destroy({
      where: {
        gr_id: id,
      },
    });
    newGroup == 1
      ? res.status(201).json({
          message: "deleted",
          data: newGroup[1],
        })
      : res.status(400).json({
          message: "not deleted",
          data: {},
        });
  } catch (error) {
    next(new customError(500, error.message));
  }
};
export { groups, addGroup, getById, updateGroup, deleteGroup };
