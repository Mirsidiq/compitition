import { DATE, DataTypes } from "sequelize";
import {sequelize} from "../../utils/sequelize.js";
import { UsersModel } from "../users/model.js";
import { DirectionsModel } from "../directions/model.js";
import { StudentsModel } from "../students/model.js";
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
  type:DataTypes.STRING(64),
  allowNull:false,
 },
 teacher:{
  type:DataTypes.STRING(64),
  allowNull:false
 },
 assistent_ref_id:{
  type:DataTypes.BIGINT,
  allowNull:false
 },
 image:{
  type:DataTypes.TEXT,
  allowNull:false
 },
 room:{
  type:DataTypes.STRING(64),
  allowNull:false
 },
 days:{
  type:DataTypes.ARRAY(DataTypes.ENUM('dushanba','seshanba','chorshanba','payshanba','juma','shanba')),
  allowNull:false,
 },
 start_time:{
  type:DataTypes.TIME,
  allowNull:false
 },
 end_time:{
  type:DataTypes.TIME,
  allowNull:false
 },
 created_at:{
  type:DataTypes.DATE,
  allowNull:false,
  defaultValue:DataTypes.NOW
 }
},
{
  timestamps:false,
  freezeTableName:true,
})
// GroupsModel.hasMany(StudentsModel,{
//   foreignKey:"gr_ref_id"
// })
// StudentsModel.belongsTo(GroupsModel,{
//   foreignKey:"gr_ref_id"
// })

export{
  GroupsModel
}