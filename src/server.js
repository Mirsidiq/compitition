import express from "express";
import fileUpload from "express-fileupload";
import { PORT } from "./config/config.js";
import { errorHandler } from "./middlewares/errorHandler.middleware.js";
import { customError } from "./exception/customError.js";
import { startSequelize } from "./utils/sequelize.js";
import allModels from "./modules/allModels.js";
import allRoutes from "./modules/index.js";
const app = express();
app.use(fileUpload({
    limits: {
        fileSize: 1024 * 1024 // 1 MB
    },
    abortOnLimit: true,
    responseOnLimit:JSON.stringify({
        status:413,
        message:"rasm hajmi 1 MB dan oshmasligi zarur"
    })
}))
app.use(express.json());
startSequelize(allModels);
app.use(allRoutes);
app.use("/*", (_, __, next) => next(new customError(404, "page not found")));
app.use(errorHandler);
app.listen(PORT, console.log(`server on ${PORT}`));
