import { DataTypes } from "sequelize";
import {sequelize} from "../../utils/sequelize.js";
import { UsersModel } from "../users/model.js";
import { AssistentsModel } from "../assistents/model.js";
import { GroupsModel } from "../groups/model.js";
import { StudentsModel } from "../students/model.js";
// import { GroupsModel } from "../groups/model.js";
const DirectionsModel=sequelize.define("directions",{
 dir_id:{
  type:DataTypes.BIGINT,
  allowNull:false,
  autoIncrement:true,
  primaryKey:true
 },
 dir_name:{
  type:DataTypes.STRING(64),
  allowNull:false,
 },
 salary:{
  type:DataTypes.INTEGER,
  allowNull:false,
 },
 duration:{
  type:DataTypes.INTEGER,
  allowNull:false,
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
DirectionsModel.hasOne(AssistentsModel,{
  foreignKey:"dir_ref_id"
})
AssistentsModel.belongsTo(DirectionsModel,{
  foreignKey:"dir_ref_id"
})
DirectionsModel.hasMany(GroupsModel,{
  foreignKey:"dir_ref_id"
})
GroupsModel.belongsTo(DirectionsModel,{
  foreignKey:"dir_ref_id"
})
DirectionsModel.hasMany(StudentsModel,{
  foreignKey:"dir_ref_id"
})
StudentsModel.belongsTo(DirectionsModel,{
  foreignKey:"dir_ref_id"
})
// DirectionsModel.hasMany(GroupsModel,{
//   foreignKey:"dir_ref_id"
// })
// GroupsModel.belongsTo(DirectionsModel,{
//   foreignKey:"dir_ref_id"
// })
export{
  DirectionsModel
}