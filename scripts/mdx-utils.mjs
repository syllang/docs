import { readdirSync, statSync } from 'node:fs';
import path from 'node:path';

export function resolveMdxInputs(inputs) {
  if (inputs.length === 0) {
    return {
      files: [],
      error: 'usage: <script> <mdx-path...>',
    };
  }

  const files = new Set();

  for (const input of inputs) {
    const resolved = path.resolve(input);

    if (!pathExists(resolved)) {
      return {
        files: [],
        error: `path does not exist: ${input}`,
      };
    }

    const stats = statSync(resolved);

    if (stats.isDirectory()) {
      for (const file of collectMdxFiles(resolved)) {
        files.add(file);
      }
      continue;
    }

    if (stats.isFile()) {
      if (!resolved.endsWith('.mdx')) {
        return {
          files: [],
          error: `expected an .mdx file or directory: ${input}`,
        };
      }

      files.add(resolved);
      continue;
    }

    return {
      files: [],
      error: `unsupported path type: ${input}`,
    };
  }

  return {
    files: [...files].sort(),
    error: null,
  };
}

export function stripFrontmatter(content) {
  const lines = content.split(/\r?\n/);

  if (lines[0]?.trim() !== '---') {
    return content;
  }

  for (let index = 1; index < lines.length; index += 1) {
    if (lines[index].trim() === '---') {
      return lines.slice(index + 1).join('\n');
    }
  }

  return content;
}

export function findMermaidBlocks(content) {
  const lines = content.split(/\r?\n/);
  const blocks = [];
  let fence = null;

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];

    if (fence === null) {
      const open = line.match(/^(\s*)([`~]{3,})(.*)$/);
      if (!open) {
        continue;
      }

      const marker = open[2][0];
      const info = open[3].trim();
      const language = info.split(/\s+/)[0];

      if (language !== 'mermaid') {
        continue;
      }

      fence = {
        marker,
        length: open[2].length,
        line: index + 1,
        content: [],
      };
      continue;
    }

    const trimmed = line.trim();
    const closingMarker = fence.marker.repeat(fence.length);

    if (trimmed.startsWith(closingMarker) && new RegExp(`^${escapeRegex(closingMarker)}\\s*$`).test(trimmed)) {
      blocks.push({
        line: fence.line,
        content: fence.content.join('\n'),
      });
      fence = null;
      continue;
    }

    fence.content.push(line);
  }

  if (fence !== null) {
    throw new Error(`unclosed mermaid fence starting at line ${fence.line}`);
  }

  return blocks;
}

export function normalizeForReadingTime(content) {
  return stripFrontmatter(content)
    .replace(/^(\s*)([`~]{3,}).*$/gm, '')
    .trim();
}

function collectMdxFiles(dir) {
  const entries = readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
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

function pathExists(filePath) {
  try {
    statSync(filePath);
    return true;
  } catch {
    return false;
  }
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
