const V="waiter-v6";
const FILES=["./","index.html","manifest.webmanifest","icon.svg","icon-192.png","icon-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>Promise.all(FILES.map(f=>c.add(f).catch(()=>{})))));self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))));self.clients.claim()});
// cache-first: works fully offline; refreshes the cache in the background when online
self.addEventListener("fetch",e=>{
  if(e.request.method!=="GET")return;
  e.respondWith(caches.match(e.request).then(hit=>{
    const net=fetch(e.request).then(r=>{if(r.ok){const c=r.clone();caches.open(V).then(ch=>ch.put(e.request,c))}return r}).catch(()=>hit||caches.match("index.html"));
    return hit||net}))});
