import { DataTypes,ENUM } from "sequelize";
import {sequelize} from "../../utils/sequelize.js";
const StudentsModel=sequelize.define("students",{
  student_id:{
  type:DataTypes.BIGINT,
  allowNull:false,
  autoIncrement:true,
  primaryKey:true,
  unique:true
 },
 user_ref_id:{
  type:DataTypes.BIGINT,
  allowNull:false
 },
 dir_ref_id:{
  type:DataTypes.BIGINT,
  allowNull:false
 },
 gr_ref_id:{
  type:DataTypes.BIGINT,
  allowNull:false
 },
 active:{
  type:DataTypes.BOOLEAN,
  defaultValue:true
 }
},
{
  timestamps:false,
  freezeTableName:true,
})

export{
  StudentsModel
}