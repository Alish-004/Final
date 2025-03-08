import app from "./routes/route.js";

app.get('/',function(req,res){
    res.send("hi there")
})
app.listen(4000,function(){
    console.log("Server is running on: http://localhost:4000")
});