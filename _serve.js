// ShadowCraft dev server
//   - clean URLs, same as the production .htaccess (/wiki, not /wiki.html)
//   - nothing is cached, so a plain refresh always shows your latest save
//   - live reload: saving any file reloads every open tab automatically
//
//   node _serve.js   ->   http://localhost:8934

const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 8934;
const root = __dirname;

const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf'
};

// ---------------------------------------------------------------- live reload
const clients = new Set();
const IGNORED = /^[.](git|idea|claude)|^node_modules/;
let pending = null;

fs.watch(root, { recursive: true }, (event, file) => {
  if (!file || IGNORED.test(file)) return;
  clearTimeout(pending);
  pending = setTimeout(() => {
    console.log(`  changed ${file.split(path.sep).join('/')} -> reloading ${clients.size} tab(s)`);
    for (const res of clients) res.write('data: reload\n\n');
  }, 60);
});

const RELOAD_SCRIPT = `
<script>
(function () {
  var es = new EventSource('/__livereload');
  es.onmessage = function () { location.reload(); };
})();
</script>
`;

// ------------------------------------------------------------------ resolving
// Mirrors the .htaccess rules so dev and production behave identically.
function resolve(urlPath) {
  const target = path.join(root, urlPath);
  if (!target.startsWith(root)) return null; // no escaping the project dir

  const candidates = urlPath.endsWith('/')
    ? [path.join(target, 'index.html')]
    : [target, target + '.html', path.join(target, 'index.html')];

  for (const c of candidates) {
    try {
      if (fs.statSync(c).isFile()) return c;
    } catch (_) { /* next candidate */ }
  }
  return null;
}

// -------------------------------------------------------------------- serving
http.createServer((req, res) => {
  const urlPath = decodeURIComponent(req.url.split('?')[0].split('#')[0]);

  if (urlPath === '/__livereload') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-store',
      'Connection': 'keep-alive'
    });
    res.write('retry: 500\n\n');
    clients.add(res);
    req.on('close', () => clients.delete(res));
    return;
  }

  // /wiki.html -> /wiki, matching the production redirect (302 in dev so the
  // browser never caches it while you are moving files around).
  const clean = urlPath.replace(/\/index\.html$/, '/').replace(/\.html$/, '');
  if (clean !== urlPath) {
    res.writeHead(302, { Location: clean || '/', 'Cache-Control': 'no-store' });
    return res.end();
  }

  const file = resolve(urlPath);
  const noCache = { 'Cache-Control': 'no-store, must-revalidate', 'Pragma': 'no-cache' };

  if (!file) {
    const notFound = path.join(root, '404.html');
    const body = fs.existsSync(notFound) ? fs.readFileSync(notFound, 'utf8') : '404';
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8', ...noCache });
    return res.end(body + RELOAD_SCRIPT);
  }

  const ext = path.extname(file);
  const headers = { 'Content-Type': types[ext] || 'application/octet-stream', ...noCache };

  if (ext === '.html') {
    let html = fs.readFileSync(file, 'utf8');
    html = html.includes('</body>')
      ? html.replace('</body>', RELOAD_SCRIPT + '</body>')
      : html + RELOAD_SCRIPT;
    res.writeHead(200, headers);
    return res.end(html);
  }

  res.writeHead(200, headers);
  fs.createReadStream(file).pipe(res);
}).listen(port, () => {
  console.log(`ShadowCraft serving at http://localhost:${port}`);
  console.log('live reload on — save a file and every open tab refreshes itself');
});
