import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('./dist/', import.meta.url));
const mime = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp','.md':'text/plain; charset=utf-8','.txt':'text/plain; charset=utf-8','.mp3':'audio/mpeg','.json':'application/json'};
http.createServer((req,res)=>{
  let pathname;
  try { pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname); } catch {res.writeHead(400).end();return;}
  const target=path.resolve(root,'.'+(pathname==='/'?'/index.html':pathname));
  if(!target.startsWith(path.resolve(root)+path.sep)){res.writeHead(403).end();return;}
  fs.stat(target,(error,stat)=>{
    if(error||!stat.isFile()){res.writeHead(404).end('Not found');return;}
    const headers={'Content-Type':mime[path.extname(target)]||'application/octet-stream','Cache-Control':'no-store','X-Content-Type-Options':'nosniff','Accept-Ranges':'bytes'};
    if(req.headers.range){
      const match=/^bytes=(\d*)-(\d*)$/.exec(req.headers.range);
      let start=match?.[1]?Number(match[1]):0;
      let end=match?.[2]?Number(match[2]):stat.size-1;
      if(match&&!match[1]&&match[2]){start=Math.max(0,stat.size-Number(match[2]));end=stat.size-1;}
      end=Math.min(end,stat.size-1);
      if(!match||start>end||start>=stat.size){res.writeHead(416,{'Content-Range':`bytes */${stat.size}`}).end();return;}
      res.writeHead(206,{...headers,'Content-Range':`bytes ${start}-${end}/${stat.size}`,'Content-Length':end-start+1});
      if(req.method==='HEAD'){res.end();return;}
      fs.createReadStream(target,{start,end}).pipe(res);return;
    }
    res.writeHead(200,{...headers,'Content-Length':stat.size});
    if(req.method==='HEAD'){res.end();return;}
    fs.createReadStream(target).pipe(res);
  });
}).listen(8766,'127.0.0.1',()=>process.stdout.write('Local preview: http://127.0.0.1:8766\n'));
