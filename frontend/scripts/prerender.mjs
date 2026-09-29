import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const frontendRoot = resolve(import.meta.dirname, '..');
const distRoot = resolve(frontendRoot, 'dist');
const template = await readFile(resolve(distRoot, 'index.html'), 'utf8');
const serverEntry = await import(pathToFileURL(resolve(frontendRoot, '.prerender/entry-server.js')).href);

const escapeHtml = (value) => value
  .replaceAll('&', '&amp;')
  .replaceAll('"', '&quot;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;');

const replaceMeta = (html, key, value, property = false) => {
  const attribute = property ? 'property' : 'name';
  const pattern = new RegExp(`<meta ${attribute}="${key}"[^>]*>`);
  return html.replace(pattern, `<meta ${attribute}="${key}" content="${escapeHtml(value)}" />`);
};

function buildDocument(path, appHtml, structuredData) {
  const isNotFound = path === '/404';
  const metadata = isNotFound
    ? {
        title: 'Page Not Found | TrustCore Labs',
        description: 'The page you requested could not be found. Explore TrustCore Labs services, projects, or contact information.',
      }
    : serverEntry.routeSeo[path];
  const canonicalUrl = isNotFound ? null : `${serverEntry.siteUrl}${path === '/' ? '/' : path}`;
  let html = template
    .replace(/<title>.*?<\/title>/s, `<title>${escapeHtml(metadata.title)}</title>`)
    .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
    .replace(
      /<script id="structured-data" type="application\/ld\+json">.*?<\/script>/s,
      structuredData
        ? `<script id="structured-data" type="application/ld+json">${JSON.stringify(structuredData).replaceAll('<', '\\u003c')}</script>`
        : '',
    );

  html = replaceMeta(html, 'description', metadata.description);
  html = replaceMeta(html, 'robots', isNotFound ? 'noindex, nofollow' : 'index, follow, max-image-preview:large');
  html = replaceMeta(html, 'og:title', metadata.title, true);
  html = replaceMeta(html, 'og:description', metadata.description, true);
  html = replaceMeta(html, 'og:url', canonicalUrl ?? serverEntry.siteUrl, true);
  html = replaceMeta(html, 'og:image', metadata.image ?? serverEntry.defaultSeoImage, true);
  html = replaceMeta(html, 'og:image:alt', metadata.imageAlt ?? 'TrustCore Labs logo', true);
  html = replaceMeta(html, 'og:image:width', String(metadata.imageWidth ?? 4200), true);
  html = replaceMeta(html, 'og:image:height', String(metadata.imageHeight ?? 2000), true);
  html = replaceMeta(html, 'twitter:title', metadata.title);
  html = replaceMeta(html, 'twitter:description', metadata.description);
  html = replaceMeta(html, 'twitter:image', metadata.image ?? serverEntry.defaultSeoImage);

  if (canonicalUrl) {
    html = html.replace(/<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${canonicalUrl}" />`);
  } else {
    html = html.replace(/\s*<link rel="canonical"[^>]*>/, '');
  }

  return html;
}

await mkdir(distRoot, { recursive: true });

for (const path of serverEntry.indexableRoutes) {
  const { appHtml, structuredData } = serverEntry.render(path);
  const fileName = path === '/' ? 'index.html' : `${path.slice(1)}.html`;
  await writeFile(resolve(distRoot, fileName), buildDocument(path, appHtml, structuredData));
}

const notFound = serverEntry.render('/404');
await writeFile(resolve(distRoot, '404.html'), buildDocument('/404', notFound.appHtml, null));
