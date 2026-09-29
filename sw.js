// Minha Evolução — Service Worker
// Estratégia: "cache first, atualiza em segundo plano" pro app shell,
// pra funcionar 100% offline depois da primeira visita.
//
// PRA ATUALIZAR O APP NO FUTURO: troque o número da versão abaixo
// (CACHE_NAME) sempre que publicar mudanças no index.html. Sem isso,
// quem já instalou o app vai continuar vendo a versão antiga em cache.
const CACHE_NAME = 'minha-evolucao-v1';

const ARQUIVOS_DO_APP = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ARQUIVOS_DO_APP))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((nomes) =>
      Promise.all(
        nomes
          .filter((nome) => nome !== CACHE_NAME)
          .map((nome) => caches.delete(nome))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Só intercepta pedidos GET do próprio app (não mexe em chamadas externas)
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((respostaCache) => {
      const busca = fetch(event.request)
        .then((respostaRede) => {
          if (respostaRede && respostaRede.ok) {
            const clone = respostaRede.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return respostaRede;
        })
        .catch(() => respostaCache); // offline: cai pro cache

      return respostaCache || busca;
    })
  );
});
