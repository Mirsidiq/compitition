import { DataTypes } from "sequelize";
import {sequelize} from "../../utils/sequelize.js";
import { UsersModel } from "../users/model.js";
const PositionsModel=sequelize.define("positions",{
  pos_id:{
  type:DataTypes.BIGINT,
  allowNull:false,
  autoIncrement:true,
  primaryKey:true
 },
 dep_ref_id:{
  type:DataTypes.BIGINT,
  allowNull:false,
 },
 pos_name:{
  type:DataTypes.STRING(25),
  allowNull:false,
 },
 salary:{
  type:DataTypes.BIGINT,
 }
},
{
  timestamps:false,
  freezeTableName:true,
})
PositionsModel.hasMany(UsersModel,{
  foreignKey:"pos_ref_id"
})
UsersModel.belongsTo(PositionsModel,{
  foreignKey:"pos_ref_id"
})
export{
  PositionsModel
}