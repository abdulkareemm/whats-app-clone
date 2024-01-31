import app from "./src/apps/index.js";
import  logger from"./src/configs/logger.js";





/// listening express
let server = app.listen(process.env.PORT,()=>{
    logger.info("server is listening on port " + process.env.PORT)
})

///  handle server errors
const exitHandler = ()=>{
    if(server){
        logger.info("Server Closed")
        process.exit(1);

    }else{
        process.exit(1)
    }
}
const unexpectedErrorHandler  = (error)=>{
    logger.error(error)
    exitHandler()
}

process.on("uncaughtException",unexpectedErrorHandler)
process.on("unhandledRejection",unexpectedErrorHandler)