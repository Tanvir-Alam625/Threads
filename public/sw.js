if(!self.define){let e,s={};const c=(c,a)=>(c=new URL(c+".js",a).href,s[c]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=c,e.onload=s,document.head.appendChild(e)}else e=c,importScripts(c),s()})).then((()=>{let e=s[c];if(!e)throw new Error(`Module ${c} didn’t register its module`);return e})));self.define=(a,i)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let n={};const r=e=>c(e,t),u={module:{uri:t},exports:n,require:r};s[t]=Promise.all(a.map((e=>u[e]||r(e)))).then((e=>(i(...e),n)))}}define(["./workbox-9b4d2a02"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"cef986dc76a53678d9ab47e110d09ca9"},{url:"/_next/static/KsuRYccbZYhJXTUQTuSvb/_buildManifest.js",revision:"e7423757b55eb94c89ccbae327ff7e9e"},{url:"/_next/static/KsuRYccbZYhJXTUQTuSvb/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/0e762574-bcc4bdcb51e947e6.js",revision:"KsuRYccbZYhJXTUQTuSvb"},{url:"/_next/static/chunks/1749-6dd0bc418ac4f51c.js",revision:"KsuRYccbZYhJXTUQTuSvb"},{url:"/_next/static/chunks/1983-861e1df445d886f3.js",revision:"KsuRYccbZYhJXTUQTuSvb"},{url:"/_next/static/chunks/237-627a9b5203b2a1c5.js",revision:"KsuRYccbZYhJXTUQTuSvb"},{url:"/_next/static/chunks/3654-77aff9c930369af0.js",revision:"KsuRYccbZYhJXTUQTuSvb"},{url:"/_next/static/chunks/4460-35cf0849adc1f2dd.js",revision:"KsuRYccbZYhJXTUQTuSvb"},{url:"/_next/static/chunks/4718-edff3edc8a0e6680.js",revision:"KsuRYccbZYhJXTUQTuSvb"},{url:"/_next/static/chunks/4938-4f72078bcbf44047.js",revision:"KsuRYccbZYhJXTUQTuSvb"},{url:"/_next/static/chunks/5250-7dcb5c41899158f0.js",revision:"KsuRYccbZYhJXTUQTuSvb"},{url:"/_next/static/chunks/52ab8b6c-75f832234eadbdd7.js",revision:"KsuRYccbZYhJXTUQTuSvb"},{url:"/_next/static/chunks/59650de3-9e57ab738e622fe2.js",revision:"KsuRYccbZYhJXTUQTuSvb"},{url:"/_next/static/chunks/5e22fd23-52859ac2fa730ac8.js",revision:"KsuRYccbZYhJXTUQTuSvb"},{url:"/_next/static/chunks/6088-a3a6cc689cdb76ce.js",revision:"KsuRYccbZYhJXTUQTuSvb"},{url:"/_next/static/chunks/6497-da1e07f40fa320f0.js",revision:"KsuRYccbZYhJXTUQTuSvb"},{url:"/_next/static/chunks/6983-c55d8ad26413bc74.js",revision:"KsuRYccbZYhJXTUQTuSvb"},{url:"/_next/static/chunks/7696-77c34dca4b9024c5.js",revision:"KsuRYccbZYhJXTUQTuSvb"},{url:"/_next/static/chunks/795d4814-de04a6dca498ffc3.js",revision:"KsuRYccbZYhJXTUQTuSvb"},{url:"/_next/static/chunks/8e1d74a4-bd2d801cc126082e.js",revision:"KsuRYccbZYhJXTUQTuSvb"},{url:"/_next/static/chunks/9389-46b46055794b39d4.js",revision:"KsuRYccbZYhJXTUQTuSvb"},{url:"/_next/static/chunks/app/(auth)/layout-64a413710e83807e.js",revision:"KsuRYccbZYhJXTUQTuSvb"},{url:"/_next/static/chunks/app/(auth)/onboarding/page-8bdca4d6997799a9.js",revision:"KsuRYccbZYhJXTUQTuSvb"},{url:"/_next/static/chunks/app/(auth)/sign-in/%5B%5B...sign-in%5D%5D/page-9866917d0908c572.js",revision:"KsuRYccbZYhJXTUQTuSvb"},{url:"/_next/static/chunks/app/(auth)/sign-up/%5B%5B...sign-up%5D%5D/page-29132863b6593a65.js",revision:"KsuRYccbZYhJXTUQTuSvb"},{url:"/_next/static/chunks/app/(root)/%5B...not-found%5D/page-3bc7e8b9f5e766a1.js",revision:"KsuRYccbZYhJXTUQTuSvb"},{url:"/_next/static/chunks/app/(root)/activity/loading-27a4216463c12c49.js",revision:"KsuRYccbZYhJXTUQTuSvb"},{url:"/_next/static/chunks/app/(root)/activity/page-94a77be073a8f50f.js",revision:"KsuRYccbZYhJXTUQTuSvb"},{url:"/_next/static/chunks/app/(root)/communities/%5Bid%5D/loading-1f2dc7d9e5c72476.js",revision:"KsuRYccbZYhJXTUQTuSvb"},{url:"/_next/static/chunks/app/(root)/communities/%5Bid%5D/page-4390fd9c1f100893.js",revision:"KsuRYccbZYhJXTUQTuSvb"},{url:"/_next/static/chunks/app/(root)/communities/loading-6cf398e0621d5268.js",revision:"KsuRYccbZYhJXTUQTuSvb"},{url:"/_next/static/chunks/app/(root)/communities/page-909a2915926eec33.js",revision:"KsuRYccbZYhJXTUQTuSvb"},{url:"/_next/static/chunks/app/(root)/create-thread/loading-d30db13c5b61152a.js",revision:"KsuRYccbZYhJXTUQTuSvb"},{url:"/_next/static/chunks/app/(root)/create-thread/page-b86e993c7a410d78.js",revision:"KsuRYccbZYhJXTUQTuSvb"},{url:"/_next/static/chunks/app/(root)/error-329c9fb45db63f3c.js",revision:"KsuRYccbZYhJXTUQTuSvb"},{url:"/_next/static/chunks/app/(root)/layout-5649f455a300b85f.js",revision:"KsuRYccbZYhJXTUQTuSvb"},{url:"/_next/static/chunks/app/(root)/loading-13c56e1f675bbeef.js",revision:"KsuRYccbZYhJXTUQTuSvb"},{url:"/_next/static/chunks/app/(root)/not-found-74fae784f8729d7e.js",revision:"KsuRYccbZYhJXTUQTuSvb"},{url:"/_next/static/chunks/app/(root)/page-138cfa4c65fa73a6.js",revision:"KsuRYccbZYhJXTUQTuSvb"},{url:"/_next/static/chunks/app/(root)/profile/%5Bid%5D/loading-643457c712d8127c.js",revision:"KsuRYccbZYhJXTUQTuSvb"},{url:"/_next/static/chunks/app/(root)/profile/%5Bid%5D/page-e08fd5e87f7d41ac.js",revision:"KsuRYccbZYhJXTUQTuSvb"},{url:"/_next/static/chunks/app/(root)/profile/edit/page-0bef5e5d104dd5ba.js",revision:"KsuRYccbZYhJXTUQTuSvb"},{url:"/_next/static/chunks/app/(root)/search/loading-d39084e73aa05730.js",revision:"KsuRYccbZYhJXTUQTuSvb"},{url:"/_next/static/chunks/app/(root)/search/page-083e1d89257d8923.js",revision:"KsuRYccbZYhJXTUQTuSvb"},{url:"/_next/static/chunks/app/(root)/thread/%5Bid%5D/loading-c48c6529a5a80291.js",revision:"KsuRYccbZYhJXTUQTuSvb"},{url:"/_next/static/chunks/app/(root)/thread/%5Bid%5D/page-1c77e522c4b6f03f.js",revision:"KsuRYccbZYhJXTUQTuSvb"},{url:"/_next/static/chunks/app/_not-found-3581b80e106742d7.js",revision:"KsuRYccbZYhJXTUQTuSvb"},{url:"/_next/static/chunks/app/error-716557c3806ba75c.js",revision:"KsuRYccbZYhJXTUQTuSvb"},{url:"/_next/static/chunks/b563f954-93922f873b30c8ee.js",revision:"KsuRYccbZYhJXTUQTuSvb"},{url:"/_next/static/chunks/e34aaff9-26bf186f62f77aa6.js",revision:"KsuRYccbZYhJXTUQTuSvb"},{url:"/_next/static/chunks/f97e080b-6c7de97a8bbcb229.js",revision:"KsuRYccbZYhJXTUQTuSvb"},{url:"/_next/static/chunks/fd9d1056-232418508595acf0.js",revision:"KsuRYccbZYhJXTUQTuSvb"},{url:"/_next/static/chunks/framework-964c2d6016b0d731.js",revision:"KsuRYccbZYhJXTUQTuSvb"},{url:"/_next/static/chunks/main-668f354eba610451.js",revision:"KsuRYccbZYhJXTUQTuSvb"},{url:"/_next/static/chunks/main-app-a63e4681da3a6519.js",revision:"KsuRYccbZYhJXTUQTuSvb"},{url:"/_next/static/chunks/pages/_app-11c09b1e93f7270c.js",revision:"KsuRYccbZYhJXTUQTuSvb"},{url:"/_next/static/chunks/pages/_error-7ae0e5d1f9ec0862.js",revision:"KsuRYccbZYhJXTUQTuSvb"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-13bbc8e1f234970e.js",revision:"KsuRYccbZYhJXTUQTuSvb"},{url:"/_next/static/css/b11194980746a2fa.css",revision:"b11194980746a2fa"},{url:"/_next/static/css/d4ef69cc8a8fcb7e.css",revision:"d4ef69cc8a8fcb7e"},{url:"/_next/static/css/e7d3bab42d9af29d.css",revision:"e7d3bab42d9af29d"},{url:"/_next/static/media/05a31a2ca4975f99-s.woff2",revision:"f1b44860c66554b91f3b1c81556f73ca"},{url:"/_next/static/media/122c360d7fe6d395-s.p.woff2",revision:"9b2795fb691d8f8a83312a4436f5a453"},{url:"/_next/static/media/513657b02c5c193f-s.woff2",revision:"c4eb7f37bc4206c901ab08601f21f0f2"},{url:"/_next/static/media/51ed15f9841b9f9d-s.woff2",revision:"bb9d99fb9bbc695be80777ca2c1c2bee"},{url:"/_next/static/media/9bbb7f84f3601865-s.woff2",revision:"d8134b7ae9ca2232a397ef9afa6c8d30"},{url:"/_next/static/media/9f05b6a2725a7318-s.woff2",revision:"afbfd524bdefea1003f0ee71b617e50e"},{url:"/_next/static/media/a8eac78432f0a60b-s.woff2",revision:"be605f007472cc947fe6b6bb493228a5"},{url:"/_next/static/media/bg-img.abe765db.jpg",revision:"5fbe22d915d60085ee5594d5c38bf98b"},{url:"/_next/static/media/c740c1d45290834f-s.woff2",revision:"bff99a4bbc4740c49b75b52f290be90e"},{url:"/_next/static/media/c9a5bc6a7c948fb0-s.p.woff2",revision:"74c3556b9dad12fb76f84af53ba69410"},{url:"/_next/static/media/d0697bdd3fb49a78-s.woff2",revision:"50b29fea20cba8e522c34a1413592253"},{url:"/_next/static/media/d6b16ce4a6175f26-s.woff2",revision:"dd930bafc6297347be3213f22cc53d3e"},{url:"/_next/static/media/ec159349637c90ad-s.woff2",revision:"0e89df9522084290e01e4127495fae99"},{url:"/_next/static/media/fd4db3eb5472fc27-s.woff2",revision:"71f3fcaf22131c3368d9ec28ef839831"},{url:"/_next/static/media/heart.22d2409f.png",revision:"22d2409f"},{url:"/_next/static/media/icon-512x512.7e0159ac.png",revision:"17a3a2466d1a1d222823642db5ea7444"},{url:"/_next/static/media/logo.15c4b491.png",revision:"8016dd3846952f513c8cc5b1ed516e35"},{url:"/assets/bg/bg-img.jpg",revision:"5fbe22d915d60085ee5594d5c38bf98b"},{url:"/assets/community.svg",revision:"3584d6873e6bb9245eb67612d619805f"},{url:"/assets/create.svg",revision:"33bf47e9ceb40e837eab795261cb3dfb"},{url:"/assets/delete.svg",revision:"09d54d5f5db1a19923cd86a35cd9ab32"},{url:"/assets/edit.svg",revision:"a80f62a681d16c4336213e854a190936"},{url:"/assets/facebook-logo.png",revision:"8f5ce27564945d2c9a10ef827549a78c"},{url:"/assets/heart-filled.svg",revision:"b7f6fbc386eb9834d91e41f210776c6e"},{url:"/assets/heart-gray.svg",revision:"5299114ec2ba0f7392cc93520e408fac"},{url:"/assets/heart.png",revision:"45598562077bdc84281b5330ff4d283e"},{url:"/assets/heart.svg",revision:"49073159f6e5b02c054c23ef83d17d7e"},{url:"/assets/home.svg",revision:"1d5ac107f9cdc672b5fac9ded114fb37"},{url:"/assets/linkedin-logo.png",revision:"fd0d5546fdbdc85c76c4372a0d51f1bc"},{url:"/assets/logo.png",revision:"8016dd3846952f513c8cc5b1ed516e35"},{url:"/assets/logo.svg",revision:"d315a6a66c881a23e0d4ad6dce4beb13"},{url:"/assets/logout.svg",revision:"28400a2699509ecfaaff37c095f0c17a"},{url:"/assets/mail-logo.png",revision:"a4ada17f1c07e74b884a941ace57bbac"},{url:"/assets/members.svg",revision:"d1ed86480f14c02ced458d6d7b41515e"},{url:"/assets/more.svg",revision:"ed598fa634df434645f88623cd16488a"},{url:"/assets/pinterest-log.png",revision:"2430c14438f0b8b93b43959d71ac48a4"},{url:"/assets/profile.svg",revision:"2bb333a39d3a5ee6818aaf8e3560e03a"},{url:"/assets/reply.svg",revision:"f3eb0524b7a18c7106c8406d9185ffa5"},{url:"/assets/repost.svg",revision:"fdff53e0c0918687292c23216472d507"},{url:"/assets/request.svg",revision:"5e56f66c04637f963bbdabf96a526159"},{url:"/assets/search-gray.svg",revision:"ddf6e7f9cf842d15120e1e2bd11f19eb"},{url:"/assets/search.svg",revision:"f35d20fffac3b9983115828e5f3b6bcc"},{url:"/assets/share.svg",revision:"9f11a3a1fc3a0e814292cb5ad4fa0c5d"},{url:"/assets/tag.svg",revision:"6a0aea3be0db3cdb44574458437b90a5"},{url:"/assets/telegram-logo.png",revision:"b37d6df3b36a74748a9bda890b3ba550"},{url:"/assets/tumblr-logo.png",revision:"c2f6a0164b285ab66f240b3d340a5914"},{url:"/assets/twitter-logo.png",revision:"6352d995b0c2a0f882503daa1d99a2e7"},{url:"/assets/user.svg",revision:"66a02c9c839ca530012ec72dd9ef6e55"},{url:"/assets/whatsapp-logo.png",revision:"ec69d1fab1d1b2bd76ab53aab8e982e2"},{url:"/icon-192x192.png",revision:"836d684b8c4464ff783b25f26dd74386"},{url:"/icon-256x256.png",revision:"20ba5bda40c41822c470737bd9bf1bc0"},{url:"/icon-384x384.png",revision:"2e2d1d00d18901c66dd5ed9de50b81e8"},{url:"/icon-512x512.png",revision:"17a3a2466d1a1d222823642db5ea7444"},{url:"/manifest.json",revision:"318945417b8a62bbc8b78d516161dd8e"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/vercel.svg",revision:"61c6b19abff40ea7acd577be818f3976"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:c,state:a})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
