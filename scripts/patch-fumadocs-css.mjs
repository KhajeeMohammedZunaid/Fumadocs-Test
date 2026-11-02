import fs from 'node:fs';
import path from 'node:path';

// 1. Remove unsupported pseudo-element highlight selectors from fumadocs shared.css
const targetFile = path.resolve('node_modules/fumadocs-ui/css/generated/shared.css');

if (fs.existsSync(targetFile)) {
  let content = fs.readFileSync(targetFile, 'utf-8');
  const initial = content;

  content = content
    .replace(/\[\&_\:\:highlight\(fd-search\)\]\:text-fd-primary\s*/g, '')
    .replace(/\[\&_\:\:highlight\(fd-search\)\]\:underline\s*/g, '');

  if (content !== initial) {
    fs.writeFileSync(targetFile, content, 'utf-8');
    console.log('[patch-fumadocs-css] Removed unsupported pseudo-element highlight selectors from fumadocs shared.css');
  }
}

// 2. Ensure local monaco-editor min/vs assets are present in public/monaco/vs
const monacoSrc = path.resolve('node_modules/monaco-editor/min/vs');
const monacoDest = path.resolve('public/monaco/vs');

if (fs.existsSync(monacoSrc) && !fs.existsSync(monacoDest)) {
  fs.cpSync(monacoSrc, monacoDest, { recursive: true });
  console.log('[patch-fumadocs-css] Synced local monaco-editor assets to public/monaco/vs');
}
