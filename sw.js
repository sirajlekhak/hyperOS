if(!self.define){let e,i={};const s=(s,n)=>(s=new URL(s+".js",n).href,i[s]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=i,document.head.appendChild(e)}else e=s,importScripts(s),i()})).then((()=>{let e=i[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(n,r)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(i[o])return;let t={};const l=e=>s(e,o),c={module:{uri:o},exports:t,require:l};i[o]=Promise.all(n.map((e=>c[e]||l(e)))).then((e=>(r(...e),t)))}}define(["./workbox-3e911b1d"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-3KeN7aSl.css",revision:null},{url:"assets/index-C6BgVzCT.js",revision:null},{url:"index.html",revision:"0d6264161b17b4838669001e5644b797"},{url:"registerSW.js",revision:"ca609550da81f1f6ac09b23f85a47a14"},{url:"favicon-192x192.ico",revision:"0d7be1ee5b43d819373cd3f007391014"},{url:"favicon-512x512.ico",revision:"0d7be1ee5b43d819373cd3f007391014"},{url:"manifest.webmanifest",revision:"633778c4dc425a4512858a408f004a1f"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
