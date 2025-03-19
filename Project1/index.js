const express=require("express");
const app=express();
const Data=require("./MOCK_DATA.json");
const PORT=8000;
//Routes
//GET at /api/users ->list all users

// to render the page as json for people using mobiles,application.other softwares for rendering 
app.get("/api/users",(req,res)=>{
    
    return res.json(Data);
    
})

// to render the page as html for people using browsers (Server side rendering)
app.get("/users",(req,res)=>{
    const html=
    `
    <ul>
    ${Data.map((user)=>
        `
        <li>
        ${user.first_name}
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
.get((req,res)=>{
    const id=Number(req.params.id); // id was taken as string from the params
    const findid=Data.find((finding)=>{
       return finding.id===id
    }) 
    return res.json(findid);
})
.patch((req,res)=>{
    //to update a user with id 1
    })
.delete((req,res)=>{
    //to delete user with id 900
})

//POST /user->create user
app.post("/api/users",()=>{
    //To create new user
    return res.json({status:"pending"})
})



app.listen(PORT,()=>{
    console.log(`Server is running at port ${PORT}`);
    
})