import app from "./src/apps/index.js";





/// listening express
let server = app.listen(process.env.PORT,()=>{
    console.log("server is listening on port " + process.env.PORT)
})