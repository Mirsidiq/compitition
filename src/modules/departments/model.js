import { DataTypes } from "sequelize";
import {sequelize} from "../../utils/sequelize.js";
import { DirectionsModel } from "../directions/model.js";
import { PositionsModel } from "../positions/model.js";
const DepartsModel=sequelize.define("departments",{
 dep_id:{
  type:DataTypes.BIGINT,
  allowNull:false,
  autoIncrement:true,
  primaryKey:true
 },
 center_ref_id:{
  type:DataTypes.BIGINT,
  allowNull:false,
 },
 dep_name:{
  type:DataTypes.STRING(50),
  allowNull:false,
 },
 create_at:{
  type:DataTypes.DATE,
  allowNull:false,
  defaultValue:DataTypes.NOW,
 },
 delete_at:{
  type:DataTypes.DATEONLY
 },
},
{
  timestamps:false,
  freezeTableName:true,
})
DepartsModel.hasMany(DirectionsModel,{
  foreignKey:"dep_ref_id"
})
DepartsModel.hasMany(PositionsModel,{
  foreignKey:"dep_ref_id"
})
// PositionsModel.belongsTo(DepartsModel,{
//   foreignKey:"dep_ref_id"
// })
// DirectionsModel.belongsTo(DepartsModel,{
//   foreignKey:"dep_ref_id"
// })
export{
  DepartsModel
}