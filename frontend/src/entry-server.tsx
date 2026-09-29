import { renderToString } from 'react-dom/server';
import { App } from './App';
import { defaultSeoImage, getStructuredData, indexableRoutes, routeSeo, siteUrl, type RoutePath } from './seo';

export { defaultSeoImage, indexableRoutes, routeSeo, siteUrl };

export function render(path: RoutePath | '/404') {
  return {
    appHtml: renderToString(<App initialPath={path} />),
    structuredData: path === '/404' ? null : getStructuredData(path),
  };
}
