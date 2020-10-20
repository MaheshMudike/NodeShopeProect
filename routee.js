
const fs = require('fs')

const requestHandler = (req, res) => {
    const url = req.url;
    /// this function will excute for every request  but a this a Arow function 
    // console.log(req.url,req.headers,req.method)
    if (url === '/') {
        res.write('<html>')
        res.write('<head><title>Enter Message </title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"/><button type="submit">Submit</button></form></body>');
        res.write('</html>')
        return res.end()
    }
    if (url === '/message' && req.method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        });
        req.on('end', () => {
            const parsedData = Buffer.concat(body).toString();
            const message = parsedData.split('=')[0];
            // due to asyc nature of node js we use writeFileSync because 
            //it excutes asybcronusly  
            fs.writeFileSync('message.txt', message);
        })
        res.statusCode = 302;
        res.setHeader('Location', '/')
        return res.end()
    }
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>')
    res.write('<head><title>My First Page </title></head>');
    res.write('<body><h1>Hello from Node.js Server</h1></body>');
    res.write('</html>')
    res.end()
}

// module.exports.handler = requestHandler;
// module.exports.someText = "someText  hardcoded is Written";

exports.handler = requestHandler;
exports.someText = "someText  hardcoded is Written";
    // module.exports ={
    //     handler : requestHandler,
    //     someText : "someText  hardcoded is Written"

    // }


