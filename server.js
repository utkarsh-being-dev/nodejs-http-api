const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const sendFile = require('./handelFile');

const port = 8000;

const server = http.createServer((req, res) => {

    if (req.url === '/' && req.method === 'GET') {
        sendFile(res, path.join(__dirname, 'public', 'index.html'));
    } else if (req.url === '/users' && req.method === 'GET') {
        sendFile(res, path.join(__dirname, 'public', 'users.json'));
    } else if (req.url === '/products' && req.method === 'GET') {
        sendFile(res, path.join(__dirname, 'public', 'products.json'));
    } else if (req.url === '/jokes' && req.method === 'GET') {
        sendFile(res, path.join(__dirname, 'public', 'jokes.json'));
    } else if (req.url === '/fetch' && req.method === 'GET') {
        sendFile(res, path.join(__dirname, 'public', 'fetch.html'));
    }


    else if (req.method === 'POST') {
        let body = '';


        req.on('data', chunk => {
            body += chunk.toString();
        });


        req.on('end', () => {
            console.log(body);
            try {
                const data = JSON.parse(body);

                let filePath;
                if (req.url === '/productspost') {
                    filePath = path.join(__dirname, 'public', 'products.json');
                } else if (req.url === '/jokespost') {
                    filePath = path.join(__dirname, 'public', 'jokes.json');
                } else if (req.url === '/userspost') {
                    filePath = path.join(__dirname, 'public', 'users.json');
                } else {
                    res.writeHead(404, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ message: 'POST route not found' }));
                }


                fs.readFile(filePath, 'utf-8', (err, fileData) => {
                    if (err) {
                        res.writeHead(500, { 'Content-Type': 'application/json' });
                        return res.end(JSON.stringify({ error: 'Error reading file' }));
                    }

                    let jsonArray;
                    try {
                        jsonArray = JSON.parse(fileData);
                        if (!Array.isArray(jsonArray)) throw new Error();
                    } catch (e) {
                        jsonArray = [];
                    }

                    jsonArray.push(data);

                    fs.writeFile(filePath, JSON.stringify(jsonArray, null, 2), err => {
                        if (err) {
                            res.writeHead(500, { 'Content-Type': 'application/json' });
                            return res.end(JSON.stringify({ error: 'Error writing file' }));
                        }

                        res.writeHead(201, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ message: 'Data added successfully', data }));
                    });
                });
            } catch (err) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Invalid JSON' }));
            }
        });
    }

    else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<p>This endpoint does not exist!</p>');
    }
});

server.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});
