import path from "path"
import url from "url"
import fs from "fs"
import { customError } from "../../exception/customError.js";
import { UsersModel } from "../users/model.js";
import { GroupsModel } from "./model.js";
import { findUser } from "../../middlewares/checkToken.js";
import { verify } from "../../utils/jwt.js";
import { HOST } from "../../config/config.js";
import { DirectionsModel } from "../directions/model.js";
import { AssistentsModel } from "../assistents/model.js";
const groups = async (req, res, next) => {
  try {
    let {page,limit}=req.query
    page=page || 1
        limit=limit || 10
    const token = req.headers?.token;
    if (token) {
      const decode = await verify(token).catch((err) =>
        next(new customError(400, err.message))
      );
      if(decode){
        let temp = await findUser(decode);
      if (temp.role=="admin") {
        let data = await GroupsModel.findAll({include:[DirectionsModel],raw:true,nest:true,
          attributes:{exclude:["dir_ref_id","assistent_ref_id"]},
          limit:limit,
          offset:(page-1)*limit
        });
        if(data.length > 0){
          res.status(200).json({
            status:200,
              message: "groups",
              data
            })
          }
          else{
            res.status(404).json({
            status:404,
              message: "not found",
              data:[]
            });
          }
      } else if (temp.role=="assistent") {
        const users = await UsersModel.findOne({
          where: {
            user_id: temp.user_id,
          },
          attributes: ["user_id", "firstname", "lastname",'image'],
        });
        const assistent=await AssistentsModel.findOne({
          where:{
            user_ref_id:users.user_id
          },
          attributes:["assistent_id"]
        })
        const groups=await GroupsModel.findAll({
          where:{
            assistent_ref_id:assistent.assistent_id
          },
          attributes:{exclude:["assistent_ref_id","dir_ref_id"]},
          limit:limit,
          offset:(page-1)*limit
        })
        users
          ? res.status(200).json({
            status:200,
              message: "success",
              data: groups,
            })
          : next(new customError(404, "not found"));
      }
      else{
        res.status(403).json({
          status:403,
          message: "you have no permission",
        })
      }
      }
    }
    else{
      next(new customError(401,'unauthorized'))
    }
  } catch (error) {
    next(new customError(500, error.message));
  }
};
const getById = async (req, res, next) => {
  try {
    const token = req.headers?.token;
    if(token){
      const { id } = req.params;
      const decode = await verify(token).catch((err) =>
      next(new customError(400, err.message))
    );
    if(decode){
      let temp = await findUser(decode);
      if(temp.role=="admin" || temp.role=="assistent"){
        let data = await GroupsModel.findByPk(id, {
          include: [DirectionsModel,AssistentsModel],
          attributes:{exclude:["dir_ref_id","assistent_ref_id"]}
        });
      if(data){
        data=data.get(({plain:true}))
        const findUser=await UsersModel.findByPk(data.assistent.user_ref_id,{
          attributes:["firstname",'lastname'],
          raw:true
        })
        delete data.assistent
        data.assistent=findUser
         res.status(200).json({
              message: "groups",
              data,
            })
      }
      else{
        res.status(404).json({
          message: "not found",
          data:[]
        });
      }
      }
      else{
        next(new customError(403,'you have no permission'))
      }
    }
    }
    else{
      next(new customError(401,'unauthorized'))
    }
  } catch (error) {
    next(new customError(500, error.message));
  }
};
const addGroup = async (req, res, next) => {
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
   temp.mv(uploadPath,async err=>{
    if(err)return next(new customError(500,err.message))
    try {
      const { dir_ref_id, gr_number, teacher, assistent,days,start_time,end_time,created_at,room } = req.body;
      let daysArr=typeof days=="string" ? days.slice(1,days.length-1).split(','):days
    const newGroup = await GroupsModel.create({
      dir_ref_id, gr_number, teacher, assistent_ref_id:assistent,days:daysArr,start_time,end_time,created_at,room ,image:`${HOST}/${salt}`
    },{
      returning:true
    });
    newGroup
      ? res.status(201).json({
        status:201,
          message: "success",
          data: newGroup,
        })
      : res.status(400).json({
        status:400,
          message: "failed",
          data: {},
        });
    } catch (error) {
      next(new customError(500,error.message))
    }
   })
  } catch (error) {
    next(new customError(500, error.message));
  }
};
const updateGroup = async (req, res, next) => {
  try {
    const {id}=req.params
    const groupById=await GroupsModel.findByPk(id,{attributes:['image']})
    if(groupById){
      if (!req.files) {
        next(new customError(400, "no files were uploaded"));
        return;
      }
      const deletedFilePath = path.join(
        process.cwd(),
        "uploads",
        url.pathToFileURL(groupById.image).pathname.split("/").at(-1)
      );
      const temp = req.files.image;
      const salt = Date.now() + temp.name;
      const uploadPath = path.join(process.cwd(), "uploads", salt);
      const extensionName = path.extname(temp.name);
      const allowedExtension = [".png", ".jpg", ".jpeg", ".svg"];
      
      if (!allowedExtension.includes(extensionName)) {
        next(new customError(422, "Invalid image"));
        return;
      }
     temp.mv(uploadPath,async err=>{
      if(err)return next(new customError(500,err.message))
      try {
        const { dir_ref_id, gr_number, teacher, assistent,days,start_time,created_at,room } = req.body;
      let daysArr=typeof days==="string" ? days.slice(1,days.length-1).split(','):days
      const newGroup = await GroupsModel.update({
        dir_ref_id, gr_number, teacher, assistent,days:daysArr,start_time,created_at,room ,image:`${HOST}/${salt}`
      },{
        where:{
          gr_id:id
        },
        returning:true
      });
      newGroup[0]==1
        ? res.status(201).json({
          status:201,
            message: "success",
            data: newGroup[1],
          })
        : res.status(400).json({
          status:400,
            message: "failed",
            data: {},
          });
          fs.unlink(deletedFilePath, async (err) => {
            if (err) return next(new customError(500, err.message));
        });
      } catch (error) {
        next(new customError(500,error.message))
      }
     })
    }
    else{
      next(new customError(400,"failed"))
    }
  } catch (error) {
    next(new customError(500, error.message));
  }
};
const deleteGroup = async (req, res, next) => {
  try {
    const { id } = req.params;
    const groupById=await GroupsModel.findByPk(id,{attributes:['image']})
    if(groupById){
        const deleteGroup = await GroupsModel.destroy({
          where: {
            gr_id: id,
          },
        });
        deleteGroup == 1
          ? res.status(201).json({
            status:201,
              message: "success",
            })
          : res.status(400).json({
            status:400,
              message: "failed",
            });
    }
    else{
      next(new customError(400,"failed"))
    }
    
  } catch (error) {
    next(new customError(500, error.message));
  }
};
export { groups, addGroup, getById, updateGroup, deleteGroup };
