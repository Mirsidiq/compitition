import { DataTypes } from "sequelize";
import {sequelize} from "../../utils/sequelize.js";
const HomeworksModel=sequelize.define("homeworks",{
 homework_id:{
  type:DataTypes.BIGINT,
  allowNull:false,
  autoIncrement:true,
  primaryKey:true
 },
 name:{
  type:DataTypes.STRING(64),
  allowNull:false,
 },
 desc:{
  type:DataTypes.TEXT,
  allowNull:false,
 },
 mark:{
  type:DataTypes.INTEGER,
  allowNull:false,
 },
 date:{
  type:DataTypes.DATE,
  allowNull:false,
  defaultValue:DataTypes.NOW,
 },
 student_ref_id:{
  type:DataTypes.BIGINT,
  allowNull:false
 }
},
{
  timestamps:false,
  freezeTableName:true,
})
export{
  HomeworksModel
}