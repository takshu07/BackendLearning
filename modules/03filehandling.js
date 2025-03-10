const { log } = require("console");
const filemodule=require("fs");
//sync
// filemodule.writeFileSync("./03filetest.txt","First Message");

//async
// filemodule.writeFile("./03filetest.txt","second Message",(err)=>{})

//sync
// const readresult=filemodule.readFileSync("./03contact.txt","utf-8");
// console.log(readresult);
  
//async
//dosent return anything , has void as return , cannot be stored in a variable due to void return type
// filemodule.readFile("./03contact.txt","utf-8",(err,result)=>{
// if(err){
//     console.log("There is some error");
// }else{
//     console.log(result);
    
// }
// })

// add things on the file
// filemodule.appendFileSync("./03contact.txt","This is my contact")

//delete a file
// filemodule.unlink("./filetest.txt")

const osmodule=require("os")
// const NoOfCoresInMyCpu=osmodule.cpus.length;
console.log(osmodule.cpus().length);
