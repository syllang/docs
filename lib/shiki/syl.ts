const controlKeywords = [
  'const',
  'use',
  'fn',
  'let',
  'return',
  'this',
  'var',
  'for',
  'while',
  'if',
  'else',
  'match',
  'select',
  'priority',
  'unique',
  'enum',
  'bundle',
  'interface',
  'view',
  'map',
  'cell',
  'module',
  'extern',
  'signal',
  'reg',
  'place',
  'next',
  'in',
  'inout',
  'out',
] as const;

const wordOperators = ['and', 'or', 'not', 'xor', 'eq'] as const;

function alternation(words: readonly string[]) {
  return words.map((word) => word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
}

export const sylLanguage: any = {
  name: 'Syl',
  scopeName: 'source.syl',
  aliases: ['syl', 'loom'],
  patterns: [
    { include: '#comments' },
    { include: '#strings' },
    { include: '#numbers' },
    { include: '#constants' },
    { include: '#keywords' },
    { include: '#word-operators' },
    { include: '#operators' },
    { include: '#identifiers' },
  ],
  repository: {
    comments: {
      patterns: [
        {
          name: 'comment.line.double-slash.syl',
          match: '//.*$',
        },
      ],
    },
    strings: {
      patterns: [
        {
          name: 'string.quoted.double.syl',
          begin: '"',
          end: '"',
          patterns: [
            {
              name: 'constant.character.escape.syl',
              match: '\\\\.',
            },
          ],
        },
      ],
    },
    numbers: {
      patterns: [
        {
          name: 'constant.numeric.syl',
          match: '\\b\\d[\\d_]*\\b',
        },
      ],
    },
    constants: {
      patterns: [
        {
          name: 'constant.language.boolean.syl',
          match: '\\b(?:true|false)\\b',
        },
      ],
    },
    keywords: {
      patterns: [
        {
          name: 'keyword.control.syl',
          match: `\\b(?:${alternation(controlKeywords)})\\b`,
        },
      ],
    },
    'word-operators': {
      patterns: [
        {
          name: 'keyword.operator.word.syl',
          match: `\\b(?:${alternation(wordOperators)})\\b`,
        },
      ],
    },
    operators: {
      patterns: [
        {
          name: 'keyword.operator.syl',
          match: '=>|->|==|!=|<=|>=|<<|&&|\\|\\||:=|\\.\\.|[+\\-*/%=&!<>@.,:;(){}\\[\\]]',
        },
      ],
    },
    identifiers: {
      patterns: [
        {
          name: 'variable.other.syl',
          match: '\\b[a-zA-Z_][a-zA-Z0-9_]*\\b',
        },
      ],
    },
  },
};
