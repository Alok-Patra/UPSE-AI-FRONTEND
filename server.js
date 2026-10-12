// Optional secure AI backend for UPSC ZONE AI. Requires Node.js 18+.
// Keep OPENAI_API_KEY on the server; never put it in browser JavaScript.
const http = require('http');
const fs = require('fs');
const path = require('path');
const root = __dirname;
const port = Number(process.env.PORT || 3000);
const mime = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml','.ico':'image/x-icon'};
const server = http.createServer(async (req, res) => {
  const headers = {'X-Content-Type-Options':'nosniff','Referrer-Policy':'strict-origin-when-cross-origin'};
  if (req.method === 'POST' && req.url === '/api/chat') {
    let raw = '';
    req.on('data', chunk => { raw += chunk; if (raw.length > 12000) req.destroy(); });
    req.on('end', async () => {
      try {
        const body = JSON.parse(raw || '{}');
        const message = String(body.message || '').trim();
        if (!message || message.length > 2000) { res.writeHead(400, {...headers,'Content-Type':'application/json'}); return res.end(JSON.stringify({error:'Enter a message under 2000 characters.'})); }
        if (!process.env.OPENAI_API_KEY) { res.writeHead(503, {...headers,'Content-Type':'application/json'}); return res.end(JSON.stringify({error:'AI backend is not configured.'})); }
        const upstream = await fetch('https://api.openai.com/v1/responses', {
          method:'POST', headers:{'Authorization':`Bearer ${process.env.OPENAI_API_KEY}`,'Content-Type':'application/json'},
          body:JSON.stringify({model:process.env.OPENAI_MODEL || 'gpt-4.1-mini', instructions:'You are UPSC ZONE AI Study Mentor for Indian civil-services aspirants. Teach in clear, encouraging simple English. Support UPSC Prelims and Mains preparation, explain concepts with examples, create realistic study plans, quiz the learner, give answer-writing feedback, and encourage active recall. Do not fabricate official facts, dates, data, citations or current affairs. Clearly say when information should be verified against official UPSC/government sources. Ask one concise follow-up when needed. Never claim to be an official UPSC source.', input:message, max_output_tokens:700})
        });
        const data = await upstream.json();
        if (!upstream.ok) { res.writeHead(502, {...headers,'Content-Type':'application/json'}); return res.end(JSON.stringify({error:'AI provider request failed.'})); }
        let reply = data.output_text || '';
        if (!reply && Array.isArray(data.output)) reply = data.output.flatMap(x=>x.content||[]).filter(x=>x.type==='output_text').map(x=>x.text).join('\n');
        res.writeHead(200, {...headers,'Content-Type':'application/json; charset=utf-8'}); res.end(JSON.stringify({reply:reply || 'I could not form a response. Please try again.'}));
      } catch (_) { if (!res.headersSent) {res.writeHead(500, {...headers,'Content-Type':'application/json'}); res.end(JSON.stringify({error:'Unable to process the request.'}));} }
    });
    return;
  }
  if (req.method !== 'GET' && req.method !== 'HEAD') { res.writeHead(405, headers); return res.end('Method not allowed'); }
  let pathname;
  try { pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname); } catch { res.writeHead(400,headers); return res.end('Bad request'); }
  if (pathname === '/') pathname = '/index.html';
  const target = path.resolve(root, '.' + pathname);
  if (!target.startsWith(root + path.sep) && target !== root) { res.writeHead(403,headers); return res.end('Forbidden'); }
  fs.stat(target, (err, stat) => {
    if (err || !stat.isFile()) { res.writeHead(404,headers); return res.end('Not found'); }
    res.writeHead(200, {...headers,'Content-Type':mime[path.extname(target).toLowerCase()] || 'application/octet-stream'});
    if (req.method === 'HEAD') return res.end();
    fs.createReadStream(target).pipe(res);
  });
});
server.listen(port, () => console.log(`UPSC ZONE AI running at http://localhost:${port}`));
