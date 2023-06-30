import { DataTypes,ENUM } from "sequelize";
import {sequelize} from "../../utils/sequelize.js";
import { AssistentsModel } from "../assistents/model.js";
import { StudentsModel } from "../students/model.js";
const UsersModel=sequelize.define("users",{
  user_id:{
  type:DataTypes.BIGINT,
  allowNull:false,
  autoIncrement:true,
  primaryKey:true,
  unique:true
 },
 firstname:{
  type:DataTypes.STRING(20),
  allowNull:false
 },
 lastname:{
  type:DataTypes.STRING(20),
  allowNull:false
 },
 age:{
  type:DataTypes.INTEGER,
  allowNull:false,
 },
 gender:{
  type: ENUM("1","2"),
  allowNull:false,
  get() {
    let rawValue = this.getDataValue('gender');
    return rawValue==1 ? rawValue="male" : rawValue="female";
  },
  set(value) {
    this.setDataValue('gender',value);
  }
 },
 contact:{
  type:DataTypes.STRING(15),
  allowNull:false,
  unique:true,
  validate:{
    is:/^\+?[1-9][0-9]{7,11}$/
  }
 },
 password:{
  type:DataTypes.TEXT,
  allowNull:false
 },
 image:{
  type:DataTypes.TEXT,
  allowNull:false
 },
 username:{
  type:DataTypes.STRING(64),
  allowNull:false,
  unique:true
 },
 role:{
  type:DataTypes.ENUM("teacher","admin","student","assistent"),
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
// UsersModel.hasOne(AssistentsModel,{
//   foreignKey:'user_ref_id'
// })
// AssistentsModel.belongsTo(UsersModel,{
//   foreignKey:"user_ref_id"
// })
// UsersModel.hasOne(StudentsModel,{
//   foreignKey:'user_ref_id'
// })
// StudentsModel.belongsTo(UsersModel,{
//   foreignKey:"user_ref_id"
// })

export{
  UsersModel
}