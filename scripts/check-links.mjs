#!/usr/bin/env node

import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { stripFrontmatter, resolveMdxInputs } from './mdx-utils.mjs';

const { default: Slugger } = await import(
  pathToFileURL(resolvePnpmPackageEntry('github-slugger')).href
);

const inputs = process.argv.slice(2);
const { files, error } = resolveMdxInputs(inputs);

if (error) {
  console.error(error);
  process.exit(1);
}

if (files.length === 0) {
  console.log('No .mdx files to check.');
  process.exit(0);
}

const catalog = buildCatalog('docs');
let failed = false;

for (const file of files) {
  const content = readFileSync(file, 'utf8');
  const links = extractLinks(content);
  const page = getPageInfo(file);

  for (const link of links) {
    if (!isInternalLink(link.href)) {
      continue;
    }

    const result = validateLink(link.href, page, catalog);
    if (result.ok) {
      continue;
    }

    failed = true;
    console.error(`${file}:${link.line} invalid internal link ${link.href}`);
    console.error(`  ${result.message}`);
  }
}

if (failed) {
  process.exit(1);
}

function validateLink(href, page, catalog) {
  if (href.startsWith('#')) {
    if (!page.anchors.has(href.slice(1))) {
      return {
        ok: false,
        message: `anchor does not exist on this page`,
      };
    }

    return { ok: true };
  }

  const { path: rawPath, hash } = splitHref(href);
  const normalized = normalizeDocPath(rawPath);

  if (!normalized) {
    return {
      ok: false,
      message: `not a supported docs path`,
    };
  }

  const exact = catalog.pages.get(normalized);
  if (!exact) {
    const suggestion = suggestMissingDocsPrefix(normalized, catalog);
    if (suggestion) {
      return {
        ok: false,
        message: `path does not exist; did you mean ${suggestion}?`,
      };
    }

    return {
      ok: false,
      message: `path does not exist in the docs tree`,
    };
  }

  if (!hash) {
    return { ok: true };
  }

  if (!exact.anchors.has(hash)) {
    return {
      ok: false,
      message: `anchor #${hash} does not exist on ${exact.source}`,
    };
  }

  return { ok: true };
}

function suggestMissingDocsPrefix(normalized, catalog) {
  const localeMatch = normalized.match(/^\/(zh|en)\/(.+)$/);
  if (localeMatch) {
    const candidate = `/${localeMatch[1]}/docs/${localeMatch[2]}`;
    if (catalog.pages.has(candidate)) {
      return candidate;
    }
  }

  const bare = normalized.startsWith('/') ? normalized.slice(1) : normalized;
  const docsCandidate = `/docs/${bare}`;
  if (catalog.pages.has(docsCandidate)) {
    return docsCandidate;
  }

  return null;
}

function normalizeDocPath(rawPath) {
  const pathOnly = rawPath.startsWith('/') ? rawPath : `/${rawPath}`;
  if (/^\/(https?:|mailto:|tel:)/.test(pathOnly)) {
    return null;
  }

  if (/^\/(zh|en)\/docs(?:\/|$)/.test(pathOnly)) {
    return pathOnly;
  }

  if (/^\/docs(?:\/|$)/.test(pathOnly)) {
    return pathOnly;
  }

  if (/^\/(zh|en)\/[^/]/.test(pathOnly)) {
    return pathOnly;
  }

  if (/^\/[^/]/.test(pathOnly)) {
    return pathOnly;
  }

  return null;
}

function splitHref(href) {
  const hashIndex = href.indexOf('#');
  const raw = hashIndex === -1 ? href : href.slice(0, hashIndex);
  const hash = hashIndex === -1 ? '' : href.slice(hashIndex + 1);
  return { path: raw, hash };
}

function isInternalLink(href) {
  return href.startsWith('#') || href.startsWith('/') || href.startsWith('zh/') || href.startsWith('en/');
}

function extractLinks(content) {
  const text = stripFrontmatter(content);
  const lines = text.split(/\r?\n/);
  const links = [];
  let fence = null;

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];

    if (fence === null) {
      const open = line.match(/^(\s*)([`~]{3,})(.*)$/);
      if (open) {
        fence = {
          marker: open[2][0],
          length: open[2].length,
        };
        continue;
      }
    } else {
      const closingMarker = fence.marker.repeat(fence.length);
      if (new RegExp(`^${escapeRegex(closingMarker)}\\s*$`).test(line.trim())) {
        fence = null;
      }
      continue;
    }

    for (const match of line.matchAll(/(?<!\!)\[([^\]]+)\]\(([^)]+)\)/g)) {
      const rawHref = match[2].trim();
      const href = rawHref.replace(/\s+"[^"]*"\s*$/, '').replace(/^<|>$/g, '');
      links.push({
        line: index + 1,
        href,
      });
    }
  }

  return links;
}

function buildCatalog(rootDir) {
  const pages = new Map();
  for (const file of collectMdxFiles(rootDir)) {
    const source = path.posix.relative(rootDir, file).replace(/\\/g, '/');
    const page = getPageInfo(file);
    pages.set(page.url, {
      source,
      url: page.url,
      anchors: page.anchors,
    });

    if (page.url === '/docs' || page.url.startsWith('/docs/')) {
      const alias = page.url === '/docs' ? '/en/docs' : page.url.replace(/^\/docs/, '/en/docs');
      pages.set(alias, {
        source,
        url: alias,
        anchors: page.anchors,
      });
    }
  }

  return { pages };
}

function collectMdxFiles(dir) {
  const files = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectMdxFiles(fullPath));
      continue;
    }

    if (entry.isFile() && fullPath.endsWith('.mdx')) {
      files.push(fullPath);
    }
  }

  return files;
}

function getPageInfo(file) {
  const relative = path.posix.relative('docs', file).replace(/\\/g, '/');
  const isZh = relative.endsWith('.zh.mdx');
  const withoutExt = relative.replace(/\.mdx$/, '').replace(/\.zh$/, '');
  const base = withoutExt.replace(/\/index$/, '');
  const localePrefix = isZh ? '/zh/docs' : '/docs';
  const url = base ? `${localePrefix}/${base}` : localePrefix;
  const anchors = collectAnchors(readFileSync(file, 'utf8'));
  return { url, anchors };
}

function collectAnchors(content) {
  const text = stripFrontmatter(content);
  const lines = text.split(/\r?\n/);
  const anchors = new Set();
  const slugger = new Slugger();
  let fence = null;

  for (const line of lines) {
    if (fence === null) {
      const open = line.match(/^(\s*)([`~]{3,})(.*)$/);
      if (open) {
        fence = {
          marker: open[2][0],
          length: open[2].length,
        };
        continue;
      }

      const heading = line.match(/^\s{0,3}(#{1,6})\s+(.+?)\s*$/);
      if (!heading) {
        continue;
      }

      const text = normalizeHeadingText(heading[2]);
      if (!text) {
        continue;
      }

      anchors.add(slugger.slug(text));
      continue;
    }

    const closingMarker = fence.marker.repeat(fence.length);
    if (new RegExp(`^${escapeRegex(closingMarker)}\\s*$`).test(line.trim())) {
      fence = null;
    }
  }

  return anchors;
}

function normalizeHeadingText(text) {
  return text
    .replace(/\[(.*?)\]\((.*?)\)/g, '$1')
    .replace(/`([^`]*)`/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/__([^_]+)__+/g, '$1')
    .replace(/_([^_]+)_/g, '$1')
    .trim();
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function resolvePnpmPackageEntry(packageName) {
  const pnpmDir = path.resolve('node_modules/.pnpm');
  for (const entry of readdirSync(pnpmDir, { withFileTypes: true })) {
    if (!entry.isDirectory() || !entry.name.startsWith(`${packageName}@`)) {
      continue;
    }

    const candidate = path.join(pnpmDir, entry.name, 'node_modules', packageName, 'index.js');
    if (readFileExists(candidate)) {
      return candidate;
    }
  }

  throw new Error(`cannot resolve package: ${packageName}`);
}

function readFileExists(file) {
  try {
    return readFileSync(file, 'utf8') !== undefined;
  } catch {
    return false;
  }
}
