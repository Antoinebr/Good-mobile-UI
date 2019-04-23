importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.0.1/workbox-sw.js");

workbox.skipWaiting();
workbox.clientsClaim();

workbox.core.setLogLevel(workbox.core.LOG_LEVELS.debug);

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
workbox.precaching.precacheAndRoute(self.__precacheManifest);


/*
| --------------------------------------------------------------------------
|  Caching of the images
| -------------------------------------------------------------------------- 
*/
workbox.routing.registerRoute(/^https:\/\/ui.antoinebrossault.com\/wp-content\/uploads\//,
    workbox.strategies.networkFirst({
        cacheName: 'image-cache',
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 10,
            }),
            new workbox.cacheableResponse.Plugin({
                statuses: [200]
            }),
        ]
    }),
    'GET'
);


/*
| --------------------------------------------------------------------------
|  Caching for the tags / and categories
| -------------------------------------------------------------------------- 
*/
workbox.routing.registerRoute(/^https:\/\/ui.antoinebrossault.com\/wp-json\/wp\/v2\/(categories|tags)/,
    workbox.strategies.cacheFirst({
        cacheName: 'cat-tag-cache'
    }),
    'GET'
);
