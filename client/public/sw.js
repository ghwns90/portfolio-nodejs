
//캐시 이름 (버전 관리용 - 코드를 수정하면 이 이름을 바꿔줘야 새 버전으로 인식함)
const CACHE_NAME = 'hojun-portfolio-v1';

//캐싱할 파일 목록 (오프라인 때 보여줄 핵심 파일들)
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/pwa-192x192.png',
  '/pwa-512x512.png'
  // 오프라인에서도 꼭 보여야하는 이미지나 폰트가있으면 추가
];

// [설치 단계] 서비스 워커가 처음 설치될 때 실행
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Install');
  // 설치가 끝나기전에 캐시를 열고 파일들을 저장
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache)=> {
        console.log('[Service Worker] Caching all: app shell');
        return cache.addAll(urlsToCache);
      })
  );
});

// [활성화 단계] 새로운 서비스 워커가 활성화 될 때 실행
self.addEventListener('active', (event)=> {
  console.log('[Service Worker] Active');
  //옛날 캐시 삭제 (버전관리)
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames)=> {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if(cacheWhitelist.indexOf(cacheName)=== -1){
            //현재 버전이 아닌것들은 다 지운다
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// [요청 가로채기] 프론트엔드에서 날리는 모든 요청(fetch) 를 감시함
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        //캐시에 있으면 그거 줌
        if(response){
          return response;
        }
        //없으면 네트워크 요청
        return fetch(event.request);
      })
  )
})
