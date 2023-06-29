import { DataTypes,ENUM } from "sequelize";
import {sequelize} from "../../utils/sequelize.js";
import { DirectionsModel } from "../directions/model.js";
import { GroupsModel } from "../groups/model.js";
// import { IncomesModel } from "../incomes/model.js";
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
// StudentsModel.hasMany(GroupsModel,{
//   foreignKey:'assistent_ref_id'
// })
// GroupsModel.belongsTo(StudentsModel,{
//   foreignKey:"assistent_ref_id"
// })
// UsersModel.hasMany(IncomesModel,{
//   foreignKey:"user_ref_id"
// })
// IncomesModel.belongsTo(UsersModel,{
//   foreignKey:"user_ref_id"
// })

export{
  StudentsModel
}