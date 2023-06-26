import { DataTypes } from "sequelize";
import {sequelize} from "../../utils/sequelize.js";
import { UsersModel } from "../users/model.js";
import { DirectionsModel } from "../directions/model.js";
const GroupsModel=sequelize.define("groups",{
  gr_id:{
  type:DataTypes.BIGINT,
  allowNull:false,
  autoIncrement:true,
  primaryKey:true
 },
 dir_ref_id:{
  type:DataTypes.BIGINT,
  allowNull:false,
 },
 gr_number:{
  type:DataTypes.BIGINT,
  allowNull:false,
 },
 begin_date:{
  type:DataTypes.DATE
 },
 end_date:{
  type:DataTypes.DATE
 },
},
{
  timestamps:false,
  freezeTableName:true,
})
GroupsModel.hasMany(UsersModel,{
  foreignKey:"group_ref_id"
})
UsersModel.belongsTo(GroupsModel,{
  foreignKey:"group_ref_id"
})
export{
  GroupsModel
}