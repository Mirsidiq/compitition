import { DataTypes } from "sequelize";
import {sequelize} from "../../utils/sequelize.js";
import { DepartsModel } from "../departments/model.js";
const CenterModel=sequelize.define("centers",{
 cent_id:{
  type:DataTypes.BIGINT,
  allowNull:false,
  autoIncrement:true,
  primaryKey:true
 },
 name:{
  type:DataTypes.STRING(50),
  allowNull:false,
 },
 address:{
  type:DataTypes.STRING(128),
  allowNull:false,
 },
 open_date:{
  type:DataTypes.DATE,
  allowNull:false,
  defaultValue:DataTypes.NOW,
 },
 close_date:{
  type:DataTypes.DATEONLY
 },
},
{
  timestamps:false,
  freezeTableName:true,
})
// CenterModel.hasMany(DepartsModel,{
//   foreignKey:"center_ref_id"
// })
export{
  CenterModel
}