import { DataTypes } from "sequelize";
import {sequelize} from "../../utils/sequelize.js";
import { GroupsModel } from "../groups/model.js";
const DirectionsModel=sequelize.define("directions",{
 dir_id:{
  type:DataTypes.BIGINT,
  allowNull:false,
  autoIncrement:true,
  primaryKey:true
 },
 dir_name:{
  type:DataTypes.STRING(30),
  allowNull:false,
 },
 salary:{
  type:DataTypes.BIGINT,
  allowNull:false,
 },
 start_date:{
  type:DataTypes.DATE,
  allowNull:false,
  defaultValue:DataTypes.NOW,
 },
 end_date:{
  type:DataTypes.DATE,
  allowNull:false,
 },
},
{
  timestamps:false,
  freezeTableName:true,
})
DirectionsModel.hasMany(GroupsModel,{
  foreignKey:"dir_ref_id"
})
GroupsModel.belongsTo(DirectionsModel,{
  foreignKey:"dir_ref_id"
})
export{
  DirectionsModel
}