import { customError } from "../../exception/customError.js";
import { DirectionsModel } from "../directions/model.js";
// import { PositionsModel } from "../positions/model.js";
// import { DepartsModel } from "./model.js";
import {HomeworksModel} from "./model.js"
const homeworksByStudentId = async (req, res, next) => {
  try {
    let{page,limit}=req.query
    const {id}=req.params
    page=page ||1,
    limit=limit || 12
    let data = await HomeworksModel.findAll({
      order:[
        ["homework_id","DESC"]
      ],
      where:{
        student_ref_id:id
      },
      attributes:{exclude:['student_ref_id']},
      limit,
      offset:(page-1)*limit,
      raw:true,
      nest:true
    });
    data.length > 0
      ? res.status(200).json({
          message: "success",
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
const homeworkById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await HomeworksModel.findByPk(id,{
      attributes:{exclude:['student_ref_id']},
    });
    if (data) {
      res.status(200).json({
        message: "success",
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
const addHomework = async (req, res, next) => {
  try {
    const { name,desc,mark,date,student_ref_id } = req.body;
    const newMark = await HomeworksModel.create({
      name,desc,mark,date,student_ref_id 
    },{
      returning:true
    });
    newMark
      ? res.status(201).json({
          message: "success",
          data: newMark,
        })
      : res.status(400).json({
          message: "failed",
          data: {},
        });
  } catch (error) {
    next(new customError(500, error.message));
  }
};
const updateHomework = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name,desc,mark,date } = req.body;
    const newMark = await HomeworksModel.update(
      { name,desc,mark,date },
      {
        where: {
          homework_id: id,
        },
        returning: true,
      }
    );
    newMark[0] == 1
      ? res.status(201).json({
          message: "success",
          data: newMark[1],
        })
      : res.status(400).json({
          message: "failed",
          data: {},
        });
  } catch (error) {
    next(new customError(500, error.message));
  }
};
const deleteHomework = async (req, res, next) => {
  try {
    const { id } = req.params;
    const newDept = await HomeworksModel.destroy({
      where: {
        homework_id: id,
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
  addHomework,
  homeworksByStudentId,
  homeworkById,
  updateHomework,
  deleteHomework,
};
