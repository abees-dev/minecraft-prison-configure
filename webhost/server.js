const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 8080;
const ZIP_PATH = path.resolve(__dirname, '../plugins/ItemsAdder/output/generated.zip');

const server = http.createServer((req, res) => {
    console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url} - IP: ${req.socket.remoteAddress}`);

    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', '*');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    if (!fs.existsSync(ZIP_PATH)) {
        console.error(`[ERROR] File not found at path: ${ZIP_PATH}`);
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('File generated.zip not found.');
        return;
    }

    const stat = fs.statSync(ZIP_PATH);
    const fileSize = stat.size;

    const headers = {
        'Content-Type': 'application/zip',
        'Content-Length': fileSize,
        'Content-Disposition': 'attachment; filename="generated.zip"',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
    };

    if (req.method === 'HEAD') {
        res.writeHead(200, headers);
        res.end();
        return;
    }

    if (req.method === 'GET') {
        res.writeHead(200, headers);
        const readStream = fs.createReadStream(ZIP_PATH);
        readStream.pipe(res);
        readStream.on('error', (err) => {
            console.error('[ERROR] Stream error:', err);
            if (!res.headersSent) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
            }
        });
        return;
    }

    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.end('Method Not Allowed');
});

server.listen(PORT, () => {
    console.log('==================================================');
    console.log(`[ItemsAdder ResourcePack WebHost]`);
    console.log(`Server is running on port ${PORT}`);
    console.log(`Direct Download URL: http://localhost:${PORT}/generated.zip`);
    console.log(`Target File: ${ZIP_PATH}`);
    console.log('==================================================');
});
