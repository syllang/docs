#!/usr/bin/env node

import { readFileSync } from 'node:fs';
import readingTime from 'reading-time';
import { normalizeForReadingTime, resolveMdxInputs } from './mdx-utils.mjs';

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

const minimumMinutes = 6;
const maximumMinutes = 20;
const minimumMillis = minimumMinutes * 60 * 1000;
const maximumMillis = maximumMinutes * 60 * 1000;
let failed = false;

for (const file of files) {
  const content = readFileSync(file, 'utf8');
  const stats = readingTime(normalizeForReadingTime(content));
  const minutes = stats.time / 60_000;

  if (stats.time <= minimumMillis || stats.time > maximumMillis) {
    failed = true;
    console.error(`${file}: ${stats.text} (${minutes.toFixed(2)} min)`);
    console.error(`  expected > ${minimumMinutes} min and <= ${maximumMinutes} min`);
    continue;
  }

  console.log(`${file}: ${stats.text} (${minutes.toFixed(2)} min)`);
}

if (failed) {
  process.exit(1);
}
