import { DataTypes,ENUM } from "sequelize";
import {sequelize} from "../../utils/sequelize.js";
import { DirectionsModel } from "../directions/model.js";
// import { IncomesModel } from "../incomes/model.js";
const AssistentsModel=sequelize.define("assistents",{
  assistent_id:{
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
 active:{
  type:DataTypes.BOOLEAN,
  defaultValue:true
 }
},
{
  timestamps:false,
  freezeTableName:true,
})

// UsersModel.hasMany(IncomesModel,{
//   foreignKey:"user_ref_id"
// })
// IncomesModel.belongsTo(UsersModel,{
//   foreignKey:"user_ref_id"
// })

export{
  AssistentsModel
}