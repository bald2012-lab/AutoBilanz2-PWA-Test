/* AutoBilanz 1.0 — PWA Installtest 2. No personal project data is uploaded. */
'use strict';
const CACHE_PREFIX = 'autobilanz-pwa-';
const CACHE_NAME = 'autobilanz-pwa-installtest-2-newrepo';
const SCOPE = new URL(self.registration.scope).pathname;
const MAIN = SCOPE + 'index.html';
const ASSETS = [
 MAIN,
 SCOPE + 'manifest.webmanifest',
 SCOPE + 'icon-192.png',
 SCOPE + 'icon-512.png',
 SCOPE + 'icon-maskable-512.png',
 SCOPE + 'apple-touch-icon.png',
 SCOPE + 'pwa-diagnose.html'
];
self.addEventListener('install', (event) => {
 event.waitUntil((async () => {
  const cache = await caches.open(CACHE_NAME);
  // All files needed to launch and inspect the app offline are cached.
  await cache.addAll(ASSETS);
  await self.skipWaiting();
 })());
});
self.addEventListener('activate', (event) => {
 event.waitUntil((async () => {
  const keys = await caches.keys();
  await Promise.all(keys.filter(k => k.startsWith(CACHE_PREFIX) && k !== CACHE_NAME)
    .map(k => caches.delete(k)));
  await self.clients.claim();
 })());
});
self.addEventListener('fetch', (event) => {
 const req = event.request;
 const url = new URL(req.url);
 if (req.method !== 'GET' || url.origin !== self.location.origin || !url.pathname.startsWith(SCOPE)) return;
 if (req.mode === 'navigate') {
  event.respondWith((async () => {
   try {
    const response = await fetch(req);
    if (response.ok) {
     const copy = response.clone();
     event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.put(req,copy)).catch(()=>{}));
    }
    return response;
   } catch (e) {
    const cache=await caches.open(CACHE_NAME);
    return await cache.match(req,{ignoreSearch:true}) || await cache.match(MAIN) || Response.error();
   }
  })());
  return;
 }
 if (ASSETS.some(p => url.pathname === p)) {
  event.respondWith((async () => {
   const cache = await caches.open(CACHE_NAME);
   return await cache.match(req,{ignoreSearch:true}) || (async () => {
    const response = await fetch(req);
    if(response.ok){const copy=response.clone(); event.waitUntil(cache.put(req,copy).catch(()=>{}));}
    return response;
   })();
  })());
 }
});
