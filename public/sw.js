const CACHE_NAME = 'pm-internship-v1.0.0';
const STATIC_CACHE_NAME = `${CACHE_NAME}-static`;
const DYNAMIC_CACHE_NAME = `${CACHE_NAME}-dynamic`;
const OFFLINE_PAGE = '/offline.html';

// Assets to cache
const STATIC_ASSETS = [
  '/',
  '/dashboard',
  '/login',
  '/profile',
  '/settings',
  '/offline.html',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
];

// API endpoints to cache
const CACHEABLE_APIS = [
  '/api/user/profile',
  '/api/matches',
  '/api/skills',
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('SW: Install event');
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then((cache) => {
        console.log('SW: Pre-caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        // Skip waiting to activate immediately
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('SW: Error during install:', error);
      })
  );
});

// Activate event - cleanup old caches
self.addEventListener('activate', (event) => {
  console.log('SW: Activate event');
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE_NAME && cacheName !== DYNAMIC_CACHE_NAME) {
              console.log('SW: Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        // Take control of all pages
        return self.clients.claim();
      })
  );
});

// Fetch event - serve cached content and implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip chrome-extension and other non-http requests
  if (!url.protocol.startsWith('http')) {
    return;
  }

  event.respondWith(handleFetch(request));
});

async function handleFetch(request) {
  const url = new URL(request.url);
  
  try {
    // Strategy 1: Cache first for static assets
    if (STATIC_ASSETS.some(asset => url.pathname === asset) || 
        url.pathname.startsWith('/_next/static/') || 
        url.pathname.startsWith('/icons/')) {
      return await cacheFirst(request);
    }

    // Strategy 2: Network first for API calls
    if (url.pathname.startsWith('/api/') || 
        CACHEABLE_APIS.some(api => url.pathname.startsWith(api))) {
      return await networkFirst(request);
    }

    // Strategy 3: Stale while revalidate for pages
    if (url.pathname.startsWith('/') && 
        (request.headers.get('accept') || '').includes('text/html')) {
      return await staleWhileRevalidate(request);
    }

    // Default: Network first
    return await networkFirst(request);

  } catch (error) {
    console.error('SW: Fetch error:', error);
    
    // Return offline page for navigation requests
    if (request.mode === 'navigate') {
      return caches.match(OFFLINE_PAGE);
    }
    
    // Return cached version if available
    return caches.match(request);
  }
}

// Cache first strategy - for static assets
async function cacheFirst(request) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    const networkResponse = await fetch(request);
    if (networkResponse.status === 200) {
      const cache = await caches.open(STATIC_CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.error('SW: Network error in cacheFirst:', error);
    throw error;
  }
}

// Network first strategy - for API calls
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    
    // Cache successful responses
    if (networkResponse.status === 200) {
      const cache = await caches.open(DYNAMIC_CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('SW: Network failed, trying cache');
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    throw error;
  }
}

// Stale while revalidate strategy - for pages
async function staleWhileRevalidate(request) {
  const cachedResponse = await caches.match(request);
  
  // Update cache in background
  const networkPromise = fetch(request).then((networkResponse) => {
    if (networkResponse.status === 200) {
      const cache = caches.open(DYNAMIC_CACHE_NAME);
      cache.then(c => c.put(request, networkResponse.clone()));
    }
    return networkResponse;
  }).catch(() => {
    // Network failed, but we might have cache
    return cachedResponse;
  });

  // Return cached response immediately if available
  return cachedResponse || networkPromise;
}

// Background sync for offline form submissions
self.addEventListener('sync', (event) => {
  console.log('SW: Background sync:', event.tag);
  
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  // Handle queued requests when back online
  console.log('SW: Performing background sync');
  // Implementation would go here for offline form submissions
}

// Push notification handling
self.addEventListener('push', (event) => {
  console.log('SW: Push received');
  
  const options = {
    body: event.data ? event.data.text() : 'New update available',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge-72x72.png',
    vibrate: [200, 100, 200],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'View Details',
        icon: '/icons/checkmark.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/icons/xmark.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('PM Internship Platform', options)
  );
});

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  console.log('SW: Notification click received');
  
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/dashboard')
    );
  }
});

// Message handling for cache updates
self.addEventListener('message', (event) => {
  console.log('SW: Message received:', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: CACHE_NAME });
  }
});