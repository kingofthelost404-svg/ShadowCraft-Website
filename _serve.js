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
function isFile(p) { try { return fs.statSync(p).isFile(); } catch (_) { return false; } }
function isDir(p)  { try { return fs.statSync(p).isDirectory(); } catch (_) { return false; } }

function inRoot(urlPath) {
  const target = path.join(root, urlPath);
  return target.startsWith(root) ? target : null;
}

// Returns a redirect target, or null. Keeps dev honest about the two cases
// Apache handles outside our rewrite rules.
function redirectFor(urlPath) {
  const target = inRoot(urlPath);
  if (!target) return null;

  // /memories/ -> /memories, because memories.html beats the memories/ folder
  if (urlPath.length > 1 && urlPath.endsWith('/')) {
    const bare = urlPath.slice(0, -1);
    if (isFile(path.join(root, bare) + '.html')) return bare;
    return null;
  }
  // /map -> /map/, the way mod_dir does, so relative links inside resolve.
  // The site root already ends in a slash and must never be rewritten to "//".
  if (urlPath !== '/' && isDir(target) && !isFile(target + '.html') && isFile(path.join(target, 'index.html'))) {
    return urlPath + '/';
  }
  return null;
}

function resolve(urlPath) {
  const target = inRoot(urlPath);
  if (!target) return null; // no escaping the project dir

  // Order matters: a same-named .html always wins over a directory.
  const candidates = urlPath.endsWith('/')
    ? [path.join(target, 'index.html')]
    : [target, target + '.html', path.join(target, 'index.html')];

  for (const c of candidates) if (isFile(c)) return c;
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

  const redirect = redirectFor(urlPath);
  if (redirect) {
    res.writeHead(302, { Location: redirect, 'Cache-Control': 'no-store' });
    return res.end();
  }

  const file = resolve(urlPath);
  const noCache = { 'Cache-Control': 'no-store, must-revalidate', 'Pragma': 'no-cache' };

  // A folder with no index and no matching .html is a 403 in production
  // (Options -Indexes), served as the themed page via ErrorDocument 403.
  if (!file && isDir(path.join(root, urlPath))) {
    console.log(`  403 ${urlPath} - directory with no index.html`);
    const body = fs.existsSync(path.join(root, '404.html'))
      ? fs.readFileSync(path.join(root, '404.html'), 'utf8')
      : '403';
    res.writeHead(403, { 'Content-Type': 'text/html; charset=utf-8', ...noCache });
    return res.end(body + RELOAD_SCRIPT);
  }

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
