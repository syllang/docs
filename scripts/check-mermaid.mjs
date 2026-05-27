#!/usr/bin/env node

import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
import { findMermaidBlocks, resolveMdxInputs } from './mdx-utils.mjs';

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

const requireFromHere = createRequire(import.meta.url);
const cliEntry = requireFromHere.resolve('@mermaid-js/mermaid-cli');
const cliRequire = createRequire(cliEntry);
const dompurifyPath = cliRequire.resolve('dompurify').replace('/purify.cjs.js', '/purify.es.mjs');
const mermaidPath = cliRequire.resolve('mermaid');

function createFakeDocument() {
  const document = {
    nodeType: 9,
    currentScript: null,
    body: new FakeElement(),
    documentElement: new FakeElement(),
    implementation: {
      createHTMLDocument: () => document,
    },
    createElement: () => new FakeElement(),
    createElementNS: () => new FakeElement(),
    createTextNode: () => new FakeNode(),
    createNodeIterator: () => ({ nextNode: () => null }),
    importNode: (node) => node,
    getElementById: () => null,
    getElementsByTagName: () => [document.body],
    querySelector: () => null,
    querySelectorAll: () => [],
    addEventListener: () => {},
    removeEventListener: () => {},
  };

  return document;
}

class FakeNode {
  constructor() {
    this.nodeType = 1;
  }
}

Object.defineProperties(FakeNode.prototype, {
  parentNode: {
    get() {
      return null;
    },
  },
  nextSibling: {
    get() {
      return null;
    },
  },
  childNodes: {
    get() {
      return [];
    },
  },
  ownerDocument: {
    get() {
      return globalThis.document ?? null;
    },
  },
  firstChild: {
    get() {
      return this.childNodes[0] ?? null;
    },
  },
});

FakeNode.prototype.cloneNode = function cloneNode() {
  return new FakeNode();
};

FakeNode.prototype.remove = function remove() {};
FakeNode.prototype.insertBefore = function insertBefore(node) {
  return node;
};
FakeNode.prototype.appendChild = function appendChild(node) {
  return node;
};
FakeNode.prototype.removeChild = function removeChild(node) {
  return node;
};

class FakeElement extends FakeNode {}

class FakeDocumentFragment extends FakeNode {}

class FakeHTMLTemplateElement extends FakeElement {}

class FakeNamedNodeMap {}

class FakeHTMLFormElement extends FakeElement {}

class FakeDOMParser {
  parseFromString() {
    return createFakeDocument();
  }
}

const FakeNodeFilter = {
  SHOW_ELEMENT: 1,
  SHOW_COMMENT: 128,
  SHOW_TEXT: 4,
  SHOW_PROCESSING_INSTRUCTION: 32,
  SHOW_CDATA_SECTION: 8,
};

if (typeof globalThis.window === 'undefined') {
  const fakeDocument = createFakeDocument();
  const fakeWindow = {
    document: fakeDocument,
    Element: FakeElement,
    Node: FakeNode,
    DocumentFragment: FakeDocumentFragment,
    HTMLTemplateElement: FakeHTMLTemplateElement,
    NamedNodeMap: FakeNamedNodeMap,
    HTMLFormElement: FakeHTMLFormElement,
    DOMParser: FakeDOMParser,
    NodeFilter: FakeNodeFilter,
    trustedTypes: undefined,
    addEventListener: () => {},
    removeEventListener: () => {},
  };

  Object.assign(globalThis, {
    window: fakeWindow,
    document: fakeDocument,
    Element: FakeElement,
    Node: FakeNode,
    DocumentFragment: FakeDocumentFragment,
    HTMLTemplateElement: FakeHTMLTemplateElement,
    NamedNodeMap: FakeNamedNodeMap,
    HTMLFormElement: FakeHTMLFormElement,
    DOMParser: FakeDOMParser,
    NodeFilter: FakeNodeFilter,
  });
}

const { default: DOMPurify } = await import(pathToFileURL(dompurifyPath).href);
DOMPurify.sanitize = (value) => (typeof value === 'string' ? value : String(value ?? ''));
DOMPurify.addHook = () => {};
DOMPurify.removeHook = () => {};
DOMPurify.removeHooks = () => {};
DOMPurify.removeAllHooks = () => {};
DOMPurify.setConfig = () => {};
DOMPurify.clearConfig = () => {};
DOMPurify.isValidAttribute = () => true;

const { default: mermaid } = await import(pathToFileURL(mermaidPath).href);
mermaid.initialize({ startOnLoad: false });

let failed = false;

for (const file of files) {
  const content = readFileSync(file, 'utf8');
  let blocks;

  try {
    blocks = findMermaidBlocks(content);
  } catch (error) {
    failed = true;
    console.error(`${file}: ${error.message}`);
    continue;
  }

  if (blocks.length === 0) {
    continue;
  }

  for (let index = 0; index < blocks.length; index += 1) {
    const block = blocks[index];

    try {
      await mermaid.parse(block.content, { suppressErrors: false });
    } catch (error) {
      failed = true;
      console.error(`${file}:${block.line} mermaid block ${index + 1} failed`);
      console.error(error instanceof Error ? error.stack ?? error.message : String(error));
    }
  }
}

if (failed) {
  process.exit(1);
}
