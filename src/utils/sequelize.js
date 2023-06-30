import { Sequelize } from "sequelize";
import { sequelizeConfig } from "../config/config.js";
import dotenv from "dotenv"
import fs from "fs"
import path from "path";
dotenv.config()
const sequelize = new Sequelize(sequelizeConfig);

async function startSequelize(models) {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    for (let model of models) {
      await model.sync();
    }
  } catch (error) {
    throw error;
  }
}
export { sequelize, startSequelize };
