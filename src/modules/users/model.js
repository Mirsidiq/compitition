import { DataTypes,ENUM } from "sequelize";
import {sequelize} from "../../utils/sequelize.js";
// import { IncomesModel } from "../incomes/model.js";
const UsersModel=sequelize.define("users",{
  user_id:{
  type:DataTypes.BIGINT,
  allowNull:false,
  autoIncrement:true,
  primaryKey:true,
  unique:true
 },
 first_name:{
  type:DataTypes.STRING(20),
  allowNull:false
 },
 last_name:{
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
 image:{
  type:DataTypes.TEXT,
  allowNull:false
 },
 username:{
  type:DataTypes.STRING(64),
  allowNull:false
 },
 group_ref_id:{
  type:DataTypes.BIGINT,
 },
 direction_ref_id:{
  type:DataTypes.BIGINT,
 },
 role:{
  type:DataTypes.ENUM("teacher","admin","student","assistent"),
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
  UsersModel
}