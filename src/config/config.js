import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 8080;
// https://center.onrender.com --------------------- server
const HOST="http://localhost:8080";
const sequelizeConfig = {
  database: process.env.PG_DATABASE,
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  dialect: "postgres",
};
export { PORT, sequelizeConfig,HOST };
