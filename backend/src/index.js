import app from "./routes/route.js";
import  "../src/routes/vehicleRoutes.js"
import router from "../src/routes/vehicleRoutes.js";
import express from "express"
import path  from "path"
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.get('/',function(req,res){
    res.send("hi there")
})

app.use("/vehicle",router)
app.listen(4000,function(){
    console.log("Server is running on: http://localhost:4000")
});