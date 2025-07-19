const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const sendFile = require('./handelFile')

const port = 8000;


const server = http.createServer((req, res) => {


    if(req.url == '/' && req.method == 'GET'){
        sendFile(res, path.join(__dirname, 'public', 'index.html'));
    }

    else if(req.url == '/users' && req.method == 'GET'){
        sendFile(res, path.join(__dirname, 'public', 'users.json'));
    }

    else if(req.url == '/products' && req.method == 'GET'){
        sendFile(res, path.join(__dirname, 'public', 'products.json'));
    }

    else if(req.url == '/jokes' && req.method == 'GET'){
        sendFile(res, path.join(__dirname, 'public', 'jokes.json'));
    }

    else if(req.url == '/fetch' && req.method == 'GET'){
        sendFile(res, path.join(__dirname, 'public', 'fetch.html'));
    }

    else{
        res.writeHead(500,{"content-type" : "text/html"});
        res.end('<p> This endpoint does not exists ! </p>');
    }
})


server.listen(8000, ()=>{
    console.log(`Server started at http://localhost:${port}`);
})