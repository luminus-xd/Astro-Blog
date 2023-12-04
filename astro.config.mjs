import { defineConfig } from 'astro/config';
import robotsTxt from 'astro-robots-txt';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import purgecss from 'astro-purgecss';
import AstroPWA from '@vite-pwa/astro';
import { SITE_URL } from './src/consts';

// https://astro.build/config
export default defineConfig({
    site: SITE_URL,
    integrations: [
        robotsTxt(),
        mdx(),
        AstroPWA({
            registerType: 'autoUpdate',
            manifest: {
                name: 'Luminus',
                short_name: 'Luminus',
                description: 'ゲームや音楽、プログラミングなどについて書き散らかすLuminusのブログ',
                theme_color: '#282c34',
                background_color: '#f3f3f3',
                scope: '/',
                start_url: '/',
                icons: [
                    {
                        src: '/images/icons/icon-72x72.png',
                        sizes: '72x72',
                        type: 'image/png',
                    },
                    {
                        src: '/images/icons/icon-96x96.png',
                        sizes: '96x96',
                        type: 'image/png',
                    },
                    {
                        src: '/images/icons/icon-128x128.png',
                        sizes: '128x128',
                        type: 'image/png',
                    },
                    {
                        src: '/images/icons/icon-144x144.png',
                        sizes: '144x144',
                        type: 'image/png',
                    },
                    {
                        src: '/images/icons/icon-152x152.png',
                        sizes: '152x152',
                        type: 'image/png',
                    },
                    {
                        src: '/images/icons/icon-192x192.png',
                        sizes: '192x192',
                        type: 'image/png',
                    },
                    {
                        src: '/images/icons/icon-384x384.png',
                        sizes: '384x384',
                        type: 'image/png',
                        purpose: 'any maskable',
                    },
                    {
                        src: '/images/icons/icon-512x512.png',
                        sizes: '512x512',
                        type: 'image/png',
                    },
                ],
            },
            workbox: {
                cleanupOutdatedCaches: true,
                skipWaiting: true,
                clientsClaim: true,
            },
            ServiceWorker: {
                runtimeCaching: [
                    {
                        urlPattern: /\.(?:png|gif|jpg|jpeg|svg|ico|webp|avif)$/,
                        handler: 'CacheFirst',
                        options: {
                            cacheName: 'images',
                            expiration: {
                                maxEntries: 20,
                                maxAgeSeconds: 60 * 60 * 24 * 7,
                            },
                        },
                    },
                    {
                        urlPattern: /\.(?:js|css)$/,
                        handler: 'StaleWhileRevalidate',
                        options: {
                            cacheName: 'static-resources',
                        },
                    },
                    {
                        urlPattern: /\.(?:woff|woff2|ttf|otf|eot)$/,
                        handler: 'StaleWhileRevalidate',
                        options: {
                            cacheName: 'fonts',
                        },
                    },
                    {
                        urlPattern: /\.(?:json)$/,
                        handler: 'StaleWhileRevalidate',
                        options: {
                            cacheName: 'data',
                        },
                    },
                ],
            },
        }),
        purgecss(),
        sitemap(),
    ],
});
