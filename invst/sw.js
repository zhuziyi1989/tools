/*
 * @Author: zhuziyi
 * @Date: 2026-06-16 02:30:55
 * @LastEditors: zhuziyi/Venus
 * @LastEditTime: 2026-06-16 10:40:17
 * @ModuleName:
 * @Description:
 */
const CACHE_NAME = 'asset-tracker-cache-v1';
const urlsToCache = ['./', './index.html', './manifest.json', './apple-icon-192.png'];

// 安装并缓存资源
self.addEventListener('install', (event) => {
	event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache)));
});

// 拦截网络请求，优先使用本地缓存
self.addEventListener('fetch', (event) => {
	event.respondWith(
		caches.match(event.request).then((response) => {
			return response || fetch(event.request);
		})
	);
});
