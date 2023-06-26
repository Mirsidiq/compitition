import { DataTypes,ENUM } from "sequelize";
import {sequelize} from "../../utils/sequelize.js";
const IncomesModel=sequelize.define("incomes",{
  incom_id:{
  type:DataTypes.BIGINT,
  allowNull:false,
  autoIncrement:true,
  primaryKey:true,
  unique:true
 },
 user_ref_id:{
  type:DataTypes.BIGINT,
  allowNull:false,
 },
 reason:{
  type:DataTypes.STRING,
  allowNull:false
 },
 amount:{
  type:DataTypes.BIGINT,
  allowNull:false
 },
 inc_time:{
  type:DataTypes.DATE,
  allowNull:false,
 }
},
{
  timestamps:false,
  freezeTableName:true,
})

export{
  IncomesModel
}