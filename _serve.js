const http = require('http');
const fs = require('fs');
const path = require('path');
const port = 8934;
const types = { '.html':'text/html', '.css':'text/css', '.js':'text/javascript', '.png':'image/png', '.webp':'image/webp', '.jpg':'image/jpeg', '.ico':'image/x-icon' };
http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p === '/') p = '/index.html';
  const filePath = path.join(__dirname, p);
  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404); fs.readFile(path.join(__dirname, '404.html'), (e2, d2) => res.end(d2 || '404')); return; }
    res.writeHead(200, { 'Content-Type': types[path.extname(filePath)] || 'application/octet-stream' });
    res.end(data);
  });
}).listen(port, () => console.log('ShadowCraft website serving at http://localhost:' + port));
