const http = require("http");
const fs = require("fs");
const path = require("path");

const filepath = path.join(process.cwd(), ' data.txt');
 const server = http.createServer((req , res )=>{
   
   if(req.url === "/"){
    res.setHeader("Content-Type", "text/html")
      res.write("<h1>  home</h1> <a href ='/Signup'> signup </a>"
      );
      res.end();
   }else if( req.url === "/Signup"){
    res.setHeader("Content-Type", "text/html")
    
    res.write(" <h1> signup  </h1> <form action ='/profile' method ='POST'>    <input type='text' name='data' placeholder='user-name'> <br> <input type='password' name='data1' placeholder='user-passord' > <br> <button> submit</button>   </form>");
    res.end();
   }else if(req.url === "/profile"){
    res.setHeader("Content-Type", "text/html")
    let data ="";   
    req.on("data", chunk =>{ data += chunk} );
    req.on("end", () =>{
        fs.readFile(filepath ,"utf-8" ,(_ ,filedata ) =>{
        const newData = filedata + "\n" + data;
        fs.writeFile(filepath, newData, () =>{
            console.log(data);
            res.write(`<h1> your  profile </h1>
            <a href ='/'> home</a>
            
            `);
        })
        })
       
    
    })
   }
   else {
    
    res.write("404 - page is not found");
    res.end();
   }
});
server.listen(3000)