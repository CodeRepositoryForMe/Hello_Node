const fs = require('fs');
const { runInContext } = require('vm');

const requestHandler = (req, res) => {
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
};

module.exports = requestHandler;

// module.exports.handler =  requestHandler;
// module.exports.sometext  = "Test Data"

//exports.handler =  requestHandler;
///exports.sometext  = "Test Data"

// module.exports = {
//     handler = requestHandler,
//     someText = "Some Text"
// }

