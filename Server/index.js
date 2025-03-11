// using http built in module of nodejs
const httpModule=require("http");
const fs=require("fs");
const url=require("url");

//creating a server using http module
const myServer=httpModule.createServer((req,res)=>{
    // creating a log to store the time of the request recieved also tells where is the request headed
    
    const log=`${Date.now()} ${req.url}: New request recieved\n`;
    // using url module we installed using nom i url , to parse our url and know better detail of url
   
    const myurl=url.parse(req.url,true);
    console.log(myurl);
    
    fs.appendFile("log.txt",log,(err,data)=>{
      
        //giving response based on where the request is sent for
        //multi route
        switch(myurl.pathname){
            case '/':res.end("This is home page");
            case '/about':
                const username=myurl.query.myname;    
            res.end(`hi, ${username}`);
            case '/contact-us':res.end("834142331");
            default:res.end("Not found");
        }
        res.end("Request is processed")
    })
})

//running the server at post 8000
myServer.listen(8000,()=>{
    console.log("Server Working Fine");
    
})