const CACHE_NAME = 'calcpro-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js'
];

// O Service Worker intercepta o arquivo e o guarda na primeira carga
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Cache aberto: Instalando arquivos mestre.');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Responde a pedidos de arquivos. Se "cair a internet", ele manda a cópia salva no cache
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Retorna do cache se achar, ou faz fetch online
      return response || fetch(event.request);
    }).catch(() => {
      // Se offline e pedir página inicial, retorna pro index
      if(event.request.mode === 'navigate') {
        return caches.match('/index.html');
      }
    })
  );
});

// Quando o PWA for atualizado no futuro, ele limpa caches mortos (v1 vira v2)
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});
