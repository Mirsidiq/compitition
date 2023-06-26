import { DataTypes } from "sequelize";
import {sequelize} from "../../utils/sequelize.js";
const ChecksModel=sequelize.define("checks",{
  check_id:{
  type:DataTypes.BIGINT,
  allowNull:false,
  autoIncrement:true,
  primaryKey:true,
  unique:true
 },
 gr_ref_id:{
  type:DataTypes.BIGINT,
  allowNull:false,
 },
 user_ref_id:{
  type:DataTypes.BIGINT,
  allowNull:false
 },
 not_in_class:{
  type:DataTypes.ARRAY(DataTypes.INTEGER)
 },
 add_date:{
  type:DataTypes.DATE,
  defaultValue:DataTypes.NOW
 }
},
{
  timestamps:false,
  freezeTableName:true,
})
export{
  ChecksModel
}