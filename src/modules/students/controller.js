import path from "path";
import fs from "fs";
import url from "url";
import sha256 from "sha256";
import { customError } from "../../exception/customError.js";
// import { PositionsModel } from "../positions/model.js";
// import { GroupsModel } from "../groups/model.js";
import { findUser } from "../../middlewares/checkToken.js";
import { verify } from "../../utils/jwt.js";
import { HOST } from "../../config/config.js";
import { UsersModel } from "../users/model.js";
import { DirectionsModel } from "../directions/model.js";
import { StudentsModel } from "./model.js";
// import { DirectionsModel } from "../directions/model.js";

const assistents = async (req, res, next) => {
  try {
    let {page,limit}=req.query
    page=page || 1,
    limit=limit ||10
    const { username, lastname, contact } = req.query;
    if (username && username != "") {
      const user = await UsersModel.findOne({
        where: {
          username,
          active:true
        },
        attributes: ["user_id"],
      });
      if (user) {
        const assistent = await AssistentsModel.findOne({
          where: {
            user_ref_id: user.user_id,
          },
          attributes: ["assistent_id"],
          include: [UsersModel,DirectionsModel],
          raw:true,
          nest:true
        });
        delete assistent.user.password
        res.status(200).json({
          status: 200,
          message: "success",
          data: assistent,
        });
      } else {
        res.status(404).json({
          status: 404,
          message: "not found",
          data: {},
        });
      }
    } else if (lastname && lastname != "" && contact && contact != "") {
      const user = await UsersModel.findOne({
        where: {
          lastname,
          contact:`+${contact.trim()}`,
          active:true
        },
        attributes: ["user_id"],
      });
      if (user) {
        const assistent = await AssistentsModel.findOne({
          where: {
            user_ref_id: user.user_id,
          },
          attributes: ["assistent_id"],
          include: [UsersModel,DirectionsModel],
          nest:true,
          raw:true
        });
        delete assistent.user.password
        res.status(200).json({
          status: 200,
          message: "success",
          data: assistent,
        });
      } else {
        res.status(404).json({
          status: 404,
          message: "not found",
          data: {},
        });
      }
    } else if (lastname && lastname != "") {
      let user = await UsersModel.findAll({
        where: {
          lastname,
          role: "assistent",
          active:true
        },
        attributes: ["user_id"],
        nest:true,
        raw:true
      });
      if (user.length>0) {
        let assistent = await AssistentsModel.findAll({
          where: {
            user_ref_id:user.map(e=>e.user_id),
          },
          attributes: ["assistent_id"],
          include: [UsersModel,DirectionsModel],
          limit,
          offset:(page-1)*limit,
          nest:true,
          raw:true
        });
        assistent=assistent.filter(e=>delete e.user.password)
        res.status(200).json({
          status: 200,
          message: "success",
          data: assistent,
        });
      } else {
        res.status(404).json({
          status: 404,
          message: "not found",
          data: [],
        });
      }
    } else if (contact && contact != "") {
      const user = await UsersModel.findOne({
        where: {
          contact:`+${contact.trim()}`,
          active:true
        },
        attributes: ["user_id"],
      });
      if (user) {
        let assistent = await AssistentsModel.findOne({
          where: {
            user_ref_id: user.user_id,
          },
          attributes: ["assistent_id"],
          include: [UsersModel,DirectionsModel],
          raw:true,
          nest:true
        });
        delete assistent.user.password
        res.status(200).json({
          status: 200,
          message: "success",
          data: assistent,
        });
      } else {
        res.status(404).json({
          status: 404,
          message: "not found",
          data: {},
        });
      }
    } else {
      let assistent = await AssistentsModel.findAll({
        include: [UsersModel,DirectionsModel],
        attributes:["assistent_id"],
        where:{
          active:true
        },
        raw:true,
        nest:true
      });
      if(assistent.length > 0)
      {
        assistent=assistent.filter(e=>delete e.user.password)
          res.status(200).json({
            status: 200,
            message: "success",
            data: assistent,
          })
      }
       else{
        res.status(404).json({
          status: 404,
          message: "not found",
          data: [],
        });
       }
    }
  } catch (error) {
    next(new customError(500, error.message));
  }
};

const addStudent = async (req, res, next) => {
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
        dir_ref_id,
        gr_ref_id
      } = req.body;
      const newUser = await UsersModel.create({
        password: sha256(contact),
        contact,
        gender,
        lastname,
        firstname,
        age,
        username,
        role:'student',
        image: `${HOST}/${salt}`,
      },{
        returning: true,
      });

      if(newUser){
        const newStudent=await StudentsModel.create({
          user_ref_id:newUser.user_id,
          dir_ref_id,
          gr_ref_id
        },{
          returning:true
        })
        res.status(201).json({
          status:201,
              message: "success",
              data: newStudent,
            })
      }
      else{
        res.status(400).json({
          status:400,
              message: "failed",
              data: {},
            });
      }
    });
  } catch (error) {
    next(new customError(500, error.message));
  }
};
const updateStudent = async (req, res, next) => {
 try {
  const { id } = req.params;
  const assistentById = await StudentsModel.findByPk(id, { attributes: ["user_ref_id"] });
  if(assistentById){
    const foundUser= await UsersModel.findOne({
      where:{
        user_id:assistentById.user_ref_id
      }
    })
    const deletedFilePath = path.join(
      process.cwd(),
      "uploads",
      url.pathToFileURL(foundUser.image).pathname.split("/").at(-1)
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
        contact,
        gender,
        lastname,
        firstname,
        age,
        username,
        dir_ref_id,
        gr_ref_id
      } = req.body;
      const updateAssis=await StudentsModel.update({
        dir_ref_id,
        gr_ref_id
      },
      {
        where:{
          student_id:id
        },
        returning:true
      })
      const newUser = await UsersModel.update(
        {
          password:contact ? sha256(contact):undefined,
          contact,
          gender,
          lastname,
          firstname,
          age,
          username,
          image: `${HOST}/${salt}`,
        },
        {
          where: {
            user_id: foundUser.user_id,
          },
          returning:true
        }
      );
      updateAssis[0] == 1 || newUser[0]==1
        ? res.status(201).json({
            message: "updated",
            data: updateAssis[1] || newUser[1],
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
  }
  else{
    res.status(404).json({
      status:404,
      message:'not found',
      data:{}
    })
  }
 } catch (error) {
  next(new customError(500,error.message))
 }
};
const assistentById = async (req, res, next) => {
  try {
    const { id } = req.params;
const assistent=await AssistentsModel.findByPk(id,{
  attributes:["assistent_id","active"],
  include:[UsersModel,DirectionsModel],
})
    assistent
      ? res.status(200).json({
          status: 200,
          message: "success",
          data: assistent,
        })
      : res.status(404).json({
          status: 404,
          message: "not found",
          data: {},
        });
  } catch (error) {
    next(new customError(500, error.message));
  }
};
const deleteStudent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const assistentById = await StudentsModel.findByPk(id, { attributes: ["user_ref_id"] });
    if (assistentById) {
      const assistent=await StudentsModel.update({active:false},{where:{student_id:id}})
      const user=await UsersModel.update({active:false},{where:{user_id:assistentById.user_ref_id}})
        assistent == 1
          ? res.status(201).json({
              message: "success",
            })
          : res.status(400).json({
              message: "failed",
            });
    } else {
      res.status(400).json({
        message: "failed",
      });
    }
  } catch (error) {
    next(new customError(500, error.message));
  }
};

export { assistents,addStudent, updateStudent, deleteStudent, assistentById };
