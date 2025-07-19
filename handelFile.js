const fs = require('node:fs');
const path = require('node:path');

function sendFile (res, filepath) {

    const ext = path.extname(filepath).toLowerCase();

    const mimeType = {
        '.txt': 'text/plain',
        '.css': 'text/css',
        '.html': 'text/html',
        '.htm': 'text/html',
        '.js': 'application/javascript',
        '.json': 'application/json',
        '.pdf': 'application.pdf',
        '.jpeg': 'image/jpeg',
        '.jpg': 'image/jpg',
        '.png': 'image/png',
        '.gif': 'image/gif',
        '.svg': 'image/svg-xml',
        '.ico': 'image/x-icon'
    }

    const contentType = mimeType[ext];

    fs.stat(filepath, (err, stats) => {
        if(err || !stats.isFile){
            res.writeHead(404, {'content-type' : 'text:plain'});
            res.end('File not found');
            console.log(err);
            return;
        }
        else{
            res.writeHead(200, {'content-type' : contentType});
            const readFileStream = fs.createReadStream(filepath);
            readFileStream.pipe(res);

            readFileStream.on('err', () => {
                res.writeHead(500, {'content-type' : 'text/plain'});
                res.end('Internal Server Error');
            })
        }
    })
    console.log(contentType);
}

module.exports = sendFile;