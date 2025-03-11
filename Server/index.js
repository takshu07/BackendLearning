// using http built in module of nodejs

const express=require("express");
const app=express();

app.get('/',(req,res)=>{
   return  res.end("Home Page" + req.query.age);
})


app.get('/about',(req,res)=>{
    return res.end(`About page ${req.query.name}`);
})

//running the server at post 8000
app.listen(8000,()=>{
    console.log("Server Working Fine");
    
})