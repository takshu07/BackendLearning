const express=require("express");
const app=express();
const fs = require("fs");
const mongoose=require('mongoose');
const { type } = require("os");
const { timeStamp } = require("console");
const PORT=8000;
let users=[];

//connection
mongoose
    .connect('mongodb+srv://URLShortner:URLShortner@urlshortner.qu9vqyo.mongodb.net/Learning')
    .then(()=>{console.log("MongoDB connected")})
    .catch((err)=> console.log("Mongo error",err));

//schema
const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required: true,
    },
    lastName:{
        type:String,
        required: false,
        unique:true,
    },
    email:{
        type:String,
        required: true,
        
    },
    jobTitle:{
        type:String,
    } ,
    gender:{
        type:String,
        required: true,
    },
  
    
} ,
 {timeStamp:true}

)
const User=mongoose.model('user',userSchema);

// middlewares

// whatever changes we make in middleware , it will remain in all routes , ex->req.myusername
app.use(express.urlencoded({extended:false}));


app.use((req,res,next)=>{
    console.log("middleware 1");
    req.myusername="tanishk";   
    next();
})

app.use((req,res,next)=>{
    console.log("middleware r",req.myusername); 
   next();
})


app.use((req,res,next)=>{
    fs.appendFile('log.txt',`\n${req.ip}: ${Date.now()}: ${req.method}: ${req.path}`,(err,data)=>{
        next();
    })
})



//Routes
//GET at /api/users ->list all users

// to render the page as json for people using mobiles,application.other softwares for rendering 

app.route("/api/users")
.get(async(req,res)=>{
    const allDbUsers= await User.find({})
   
    res.setHeader("X-myname","Tanishk Budhlakoti"); // this is a custom header
    // it is a good practice to add X-name to name of custom headers 
     return res.json(allDbUsers);
     
})
.post(async(req,res)=>{
    const body=req.body;
    if(!body|| !body.first_name|| !body.email||!body.gender){
     return res.status(400).json({msg:"all fields are required"})  
    }
 const result = await User.create({
    firstName:body.first_name,
    lastName:body.last_name,
    email:body.email,
    gender:body.gender,
    jobTitle:body.job_title,
  })
  console.log("result",result);
  return res.status(201).json({msg:"Suces"})
  
  
})

// to render the page as html for people using browsers (Server side rendering)
app.get("/users",async(req,res)=>{
    const allDbUsers= await User.find({})// it will find all components from Users 
    const html=
    `
    <ul>
    ${allDbUsers.map((user)=>
        `
        <li>
        ${user.firstName}-${user.email}
        </li>
        `
    ).join("")
}
    </ul>
    `
    return res.send(html)
    
})


//Dynamic Path Parameters
//GET at /api/users/1->get user with id 1 (for json rendering)
app.route("/api/users/:id")
.get(async(req,res)=>{

    const user= await User.findById(req.params.id)
   
    if(!user) return res.status(404).json({msg:"user not found"})
    return res.json(user);
})
.patch(async(req,res)=>{
    //to update a user with id 1
    await User.findByIdAndUpdate(req.params.id,{lastName:'Changed'})
    return res.status(200).json({msg:"Sucess"})
})
.delete(async(req,res)=>{
    //to delete user with id 900
    await User.findByIdAndDelete(req.params.id)
    return res.status(200).json({msg:"Sucess"})
})





app.listen(PORT,()=>{
    console.log(`Server is running at port ${PORT}`);
    
})