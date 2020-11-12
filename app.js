const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    console.log("server created");

    const url = req.url;
    const method = req.method;

    if(url === "/"){
        res.write("<html>");
        res.write("<head><title>Enter Message</head></title>")
        res.write("<body>");
        res.write('<form action="/message" method="POST"><input type="text" name="message"><button type="Submit">Submit</button></form>');
        res.write("<body>");
        res.write("<html>");
        return res.end();
    }
    if(url==="/message" && method === "POST"){
        const body = [];
        req.on('data',chunk => {
            console.log(chunk);
            body.push(chunk);                
        });
        return req.on('end',()=>{
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            fs.writeFile('message.txt', message, err =>{
                res.statusCode = 302;
                res.setHeader('Location','/');
                return res.end();       
            });
        });
    }
    res.setHeader('Content-Type','text/html');
    res.write('<html>');
    res.write('<head><title>First request</title></head>');
    res.write('<body><h1>Hello From Node !!!!</h1></body>');
    res.write('</html>');
    res.end();
});

server.listen(3000);
