import app from "./apps/index.js";
import  logger from"./configs/logger.js";
import {Server} from "socket.io"
import SocketServer from "./SocketServer.js"



/// listening express
let server = app.listen(process.env.PORT,()=>{
    logger.info("server is listening on port " + process.env.PORT)
})

/// io initialize options
const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: process.env.CLIENT_ENDPOINT,
  },
});
io.on("connection",(socket)=>{
    logger.info("socket connected")
    SocketServer(socket)
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