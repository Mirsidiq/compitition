import path from "path";
import fs from "fs";
import url from "url";
import { customError } from "../../exception/customError.js";
// import { PositionsModel } from "../positions/model.js";
import { UsersModel } from "./model.js";
// import { IncomesModel } from "../incomes/model.js";
// import { GroupsModel } from "../groups/model.js";
import { findUser } from "../../middlewares/checkToken.js";
import { verify } from "../../utils/jwt.js";
import { HOST } from "../../config/config.js";
// import { DirectionsModel } from "../directions/model.js";

const assistents = async (req, res, next) => {
  try {
    const { username, lastname, contact } = req.query;
    if (username && username != "") {
      const user = await UsersModel.findOne({
        where: {
          username,
        },
      });
      user
        ? res.status(200).json({
            status: 200,
            message: "success",
            data: user,
          })
        : res.status(404).json({
            status: 404,
            message: "not found",
            data: {},
          });
    } else if (lastname && lastname != "" && contact && contact != "") {
      const user = UsersModel.findOne({
        where: {
          lastname,
          contact,
        },
      });
      user
        ? res.status(200).json({
            status: 200,
            message: "success",
            data: user,
          })
        : res.status(404).json({
            status: 404,
            message: "not found",
            data: {},
          });
    } else if (lastname && lastname != "") {
      const user = await UsersModel.findAll({
        where: {
          lastname,
          role: "assistent",
        },
      });
      user.length
        ? res.status(200).json({
            status: 200,
            message: "success",
            data: user,
          })
        : res.status(404).json({
            status: 404,
            message: "not found",
            data: [],
          });
    } else if (contact && contact != "") {
      const user = await UsersModel.findOne({
        where: {
          contact,
        },
      });
      user
        ? res.status(200).json({
            status: 200,
            message: "success",
            data: user,
          })
        : res.status(404).json({
            status: 404,
            message: "not found",
            data: {},
          });
    } else {
      const user = await UsersModel.findAll({
        where: {
          role: "assistent",
        },
      });
      user.length > 0
        ? res.status(200).json({
            status: 200,
            message: "success",
            data: user,
          })
        : res.status(404).json({
            status: 404,
            message: "not found",
            data: [],
          });
    }
  } catch (error) {
    next(new customError(500, error.message));
  }
};

const addUser = async (req, res, next) => {
  try {
    if (!req.files) {
      next(new customError(400, "no files were uploaded"));
      return;
    }
    const temp = req.files.image;
    const salt = Date.now() + temp.name;
    const uploadPath = path.join(process.cwd(), "uploads", salt);
    const extensionName = path.extname(temp.name);
    const allowedExtension = [".png", ".jpg", ".jpeg", ".svg"];
    if (!allowedExtension.includes(extensionName)) {
      next(new customError(422, "Invalid image"));
      return;
    }
    temp.mv(uploadPath, async (err) => {
      if (err) return next(new customError(500, err.message));
      const {
        group_ref_id,
        password,
        contact,
        gender,
        last_name,
        first_name,
        direction_ref_id,
        age,
        username,
        role,
      } = req.body;
      const newUser = await UsersModel.create({
        group_ref_id,
        password,
        contact,
        gender,
        last_name,
        first_name,
        direction_ref_id,
        age,
        username,
        role,
        image: `${HOST}/${salt}`,
      });

      newUser
        ? res.status(201).json({
            message: "success",
            data: newUser,
          })
        : res.status(400).json({
            message: "failed",
            data: {},
          });
    });
  } catch (error) {
    next(new customError(500, error.message));
  }
};
const updateUser = async (req, res, next) => {
  const { id } = req.params;
  const userById = await UsersModel.findByPk(id, { attributes: ["image"] });
  const deletedFilePath = path.join(
    process.cwd(),
    "uploads",
    url.pathToFileURL(userById.image).pathname.split("/").at(-1)
  );
  if (!req.files) {
    next(new customError(400, "no files were uploaded"));
    return;
  }
  const temp = req.files.image;
  const salt = Date.now() + temp.name;
  const uploadPath = path.join(process.cwd(), "uploads", salt);
  const extensionName = path.extname(temp.name);
  const allowedExtension = [".png", ".jpg", ".jpeg", ".svg"];
  if (!allowedExtension.includes(extensionName)) {
    next(new customError(422, "Invalid image"));
    return;
  }
  temp.mv(uploadPath, async (err) => {
    if (err) return next(new customError(500, err.message));
    const {
      group_ref_id,
      password,
      contact,
      gender,
      last_name,
      first_name,
      direction_ref_id,
      age,
      username,
      role,
    } = req.body;
    const newUser = await UsersModel.update(
      {
        group_ref_id,
        contact,
        gender,
        last_name,
        first_name,
        role,
        password,
        direction_ref_id,
      age,
      username,
      image:`${HOST}/${salt}`
      },
      {
        where: {
          user_id: id,
        },
        returning: true,
      }
    );
    newUser[0] == 1
      ? res.status(201).json({
          message: "updated",
          data: newUser[1],
        })
      : res.status(400).json({
          message: "not updated",
          data: {},
        });
        fs.unlink(deletedFilePath, async (err) => {
            if (err) return next(new customError(500, err.message));
            console.log("ok");
        });
  });
};
const userById=async(req,res,next)=>{
  try {
    const {id}=req.params
    const user=await UsersModel.findByPk(id)
    user ?
    res.status(200).json({
      status:200,
      message:'success',
      data:user
    })
    :
    res.status(404).json({
      status:404,
      message:'not found',
      data:{}
    })
  } catch (error) {
    next(new customError(500, error.message))
  }
}
const deleteUser = async (req, res, next) => {
 try {
    const { id } = req.params;
    const userById = await UsersModel.findByPk(id, { attributes: ["image"] });
      if(userById){
          const deletedFilePath = path.join(
              process.cwd(),
              "uploads",
              url.pathToFileURL(userById.image).pathname.split("/").at(-1)
            );
          fs.unlink(deletedFilePath, async (err) => {
              if (err) return next(new customError(500, err.message));
              const newUser = await UsersModel.destroy({
                  where: {
                    user_id: id,
                  },
                });
                newUser == 1
                  ? res.status(201).json({
                      message: "success",
                    })
                  : res.status(400).json({
                      message: "failed",
                    });
          });
      }
      else{
          res.status(400).json({
              message: "failed",
          });
      }
 } catch (error) {
    next(new customError(500, error.message));
 }
};

export { assistents, addUser, updateUser, deleteUser,userById };
