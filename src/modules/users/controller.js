import path from "path";
import fs from "fs";
import url from "url";
import sha256 from "sha256";
import { customError } from "../../exception/customError.js";
import { UsersModel } from "./model.js";
import { HOST } from "../../config/config.js";
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
        contact,
        gender,
        lastname,
        firstname,
        age,
        username,
        role,
      } = req.body;
      const newUser = await UsersModel.create({
        password:sha256(contact),
        contact,
        gender,
        lastname,
        firstname,
        age,
        username,
        role,
        image: `${HOST}/${salt}`,
      },{
        returning:true
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
  const userById = await UsersModel.findOne( {
    where:{
        role:"admin"
    },
     attributes: ["image"] });
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
      password,
      contact,
      gender,
      lastname,
      firstname,
      age,
      username,
      role,
    } = req.body;
    const newUser = await UsersModel.update(
      {
        password,
        contact,
        gender,
        lastname,
        firstname,
        age,
        username,
        role,
      image:`${HOST}/${salt}`
      },
      {
        where: {
          user_id: userById.user_id,
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


export { addUser, updateUser };
