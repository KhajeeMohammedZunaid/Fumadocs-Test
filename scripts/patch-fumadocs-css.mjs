import fs from 'node:fs';
import path from 'node:path';

// Remove unsupported pseudo-element highlight selectors from fumadocs shared.css
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
