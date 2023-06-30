import express from "express";
import path from "path"
import cors from "cors"
import fileUpload from "express-fileupload";
import { PORT } from "./config/config.js";
import { errorHandler } from "./middlewares/errorHandler.middleware.js";
import { customError } from "./exception/customError.js";
import { startSequelize } from "./utils/sequelize.js";
import allModels from "./modules/allModels.js";
import allRoutes from "./modules/index.js";
const app = express();
app.use(cors())
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
app.get('/:image',(req,res,next)=>{
    try {
        const{image}=req.params
    const filePath=path.join(process.cwd(),'uploads',image)
    res.sendFile(filePath)
    } catch (error) {
        next(new customError(error.status,error.message))
    }
})
app.use("/*", (_, __, next) => next(new customError(404, "page not found")));
app.use(errorHandler);
app.listen(PORT, console.log(`server on ${PORT}`));
