importScripts('uv.bundle.js');
importScripts('uv.config.js');
importScripts(__uv$config.sw || 'uv.sw.js');

const uv = new UVServiceWorker();
let config = {
    blocklist: new Set(),
}

async function handleRequest(event) {
    if (uv.route(event)) {
        if (config.blocklist.size !== 0) {
            let decodedUrl;

try {
    const requestUrl = new URL(event.request.url);
    const decoded = __uv$config.decodeUrl(
        requestUrl.pathname.slice(__uv$config.prefix.length)
    );
    decodedUrl = new URL(decoded, requestUrl.origin);
} catch (err) {
    return new Response("", { status: 400 });
}
        }
        return await uv.fetch(event);
    }
    
    return await fetch(event.request);
}

self.addEventListener('fetch', (event) => {
    event.respondWith(handleRequest(event));
});

self.addEventListener("message", (event) => {
    config = event.data;
});

self.addEventListener("activate", () => {
    const bc = new BroadcastChannel("UvServiceWorker");
    bc.postMessage("Active");
});
