import { DataTypes } from "sequelize";
import {sequelize} from "../../utils/sequelize.js";
const OutlayModel=sequelize.define("outlays",{
  outlay_id:{
  type:DataTypes.BIGINT,
  allowNull:false,
  autoIncrement:true,
  primaryKey:true,
  unique:true
 },
 reason:{
  type:DataTypes.STRING,
  allowNull:false,
 },
 amount:{
  type:DataTypes.BIGINT,
  allowNull:false
 },
 out_time:{
  type:DataTypes.DATE,
  allowNull:false,
 },
},
{
  timestamps:false,
  freezeTableName:true,
})
export{
  OutlayModel
}