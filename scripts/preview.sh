#!/usr/bin/env bash
# Renders README.md through GitHub's Markdown API into preview.html (local only, gitignored).
set -euo pipefail
cd "$(dirname "$0")/.."
node scripts/build.mjs
body=$(gh api markdown -f mode=gfm -f context=zxzinn/zxzinn -f text="$(cat README.md)")
cat > preview.html <<HTML
<!doctype html><html data-mode="dark"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Profile preview</title>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.8.1/github-markdown-dark.min.css" id="md">
<style>
  body{margin:0;background:#0d1117;font-family:-apple-system,sans-serif}
  html[data-mode=light] body{background:#fff}
  .bar{position:sticky;top:0;z-index:1;display:flex;gap:8px;justify-content:center;padding:10px;background:inherit;border-bottom:1px solid #30363d}
  .bar button{padding:6px 14px;border-radius:6px;border:1px solid #30363d;background:transparent;color:#8b949e;cursor:pointer}
  .bar button.on{color:#4f8ff7;border-color:#4f8ff7}
  .box{max-width:1012px;margin:24px auto;padding:24px 32px;border:1px solid #30363d;border-radius:6px}
  html[data-mode=light] .box{border-color:#d0d7de}
  .markdown-body{background:transparent}
</style></head><body>
<div class="bar"><button data-m="dark" class="on">Dark</button><button data-m="light">Light</button></div>
<div class="box"><article class="markdown-body">$body</article></div>
<script>
  const css={dark:"https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.8.1/github-markdown-dark.min.css",light:"https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.8.1/github-markdown-light.min.css"};
  const pics=[...document.querySelectorAll("picture")].filter(p=>p.querySelector("source")&&p.querySelector("img")).map(p=>({img:p.querySelector("img"),dark:p.querySelector("source").getAttribute("srcset"),light:p.querySelector("img").getAttribute("src")}));
  pics.forEach(p=>p.img.closest("picture").querySelectorAll("source").forEach(s=>s.remove()));
  function set(m){document.documentElement.dataset.mode=m;document.getElementById("md").href=css[m];pics.forEach(p=>p.img.src=p[m]);document.querySelectorAll(".bar button").forEach(b=>b.classList.toggle("on",b.dataset.m===m));}
  document.querySelectorAll(".bar button").forEach(b=>b.onclick=()=>set(b.dataset.m));set("dark");
</script></body></html>
HTML
echo "wrote preview.html"
