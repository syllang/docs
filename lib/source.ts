import { loader } from 'fumadocs-core/source';
import { i18n } from '@/lib/i18n';
import { docs } from 'collections/server';
import { findNeighbour } from 'fumadocs-core/page-tree';
import type { Item, Node, Root } from 'fumadocs-core/page-tree';
import { createElement, type ReactNode } from 'react';

const icons: Record<string, string> = {
  docs: 'M4 4h6a3 3 0 0 1 3 3v13a3 3 0 0 0-3-3H4V4Zm9 3a3 3 0 0 1 3-3h4v13h-4a3 3 0 0 0-3 3V7Z',
  intro: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 4h.01M11 11h1v5h1',
  migration: 'M5 7h11l-3-3m3 3-3 3M19 17H8l3 3m-3-3 3-3',
  language: 'M8 4h8l4 4v12H8V4Zm8 0v4h4M4 8v12h4',
  checks: 'M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3Zm-3 9 2 2 4-5',
  patterns: 'M4 7h6v6H4V7Zm10 0h6v6h-6V7ZM4 17h6v3H4v-3Zm10 0h6v3h-6v-3Z',
  tooling: 'M14 4 4 14l6 6L20 10l-6-6Zm-2 4 4 4',
  reference: 'M5 4h14v16H5V4Zm3 4h8M8 12h8M8 16h5',
  internals: 'M12 3v4M12 17v4M4.8 5.8l2.8 2.8M16.4 15.4l2.8 2.8M3 12h4M17 12h4M4.8 18.2l2.8-2.8M16.4 8.6l2.8-2.8',
  project: 'M4 6h16v12H4V6Zm3 3h4v6H7V9Zm7 0h3v3h-3V9Zm0 4h3v2h-3v-2Z',
};

function iconFor(name: string | undefined): ReactNode {
  const path = name ? icons[name] : undefined;
  if (!path) return null;

  return createElement(
    'svg',
    {
      key: name,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: 1.8,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      'aria-hidden': true,
    },
    createElement('path', { key: 'path', d: path }),
  );
}

export const source = loader({
  baseUrl: '/docs',
  source: docs.toFumadocsSource(),
  i18n,
  icon: iconFor,
});

export function getDocsPageTree(lang: string): Root {
  return withDefaultLocaleFallback(source.getPageTree(lang), lang);
}

export function getDocsPageFooterItems(lang: string, pageUrl: string) {
  return findNeighbour(getDocsPageTree(lang), pageUrl);
}

function withDefaultLocaleFallback(tree: Root, lang: string): Root {
  if (lang !== 'en') return tree;

  // The middleware rewrites public /docs requests to /en/docs for routing.
  // Fumadocs still renders public /docs links, so SSR needs /en/* only as a path lookup fallback.
  return {
    ...tree,
    fallback: rewriteTreeUrls(tree, '/en'),
  };
}

function rewriteTreeUrls(tree: Root, prefix: string): Root {
  return {
    ...tree,
    children: tree.children.map((node) => rewriteNodeUrls(node, prefix)),
    fallback: tree.fallback ? rewriteTreeUrls(tree.fallback, prefix) : undefined,
  };
}

function rewriteNodeUrls(node: Node, prefix: string): Node {
  if (node.type === 'page') return rewritePageUrl(node, prefix);
  if (node.type === 'folder') {
    return {
      ...node,
      index: node.index ? rewritePageUrl(node.index, prefix) : undefined,
      children: node.children.map((child) => rewriteNodeUrls(child, prefix)),
    };
  }

  return node;
}

function rewritePageUrl(page: Item, prefix: string): Item {
  if (!page.url.startsWith('/') || page.url.startsWith(`${prefix}/`)) return page;

  return {
    ...page,
    url: `${prefix}${page.url}`,
  };
}
