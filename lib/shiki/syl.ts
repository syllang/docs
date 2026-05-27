function w(parts: TemplateStringsArray, ...values: string[]) {
  let result = '';
  for (let i = 0; i < parts.length; i++) {
    result += parts[i];
    if (i < values.length) result += values[i];
  }
  return result;
}

const declKeywords = ['cell', 'map', 'fn'] as const;
const typeDeclKeywords = ['enum', 'bundle', 'interface', 'view'] as const;
const controlKeywords = ['select', 'match', 'if', 'else', 'for', 'while', 'return', 'next', 'place'] as const;
const storageKeywords = ['reg', 'signal'] as const;
const modifierKeywords = ['in', 'out', 'inout', 'priority', 'unique'] as const;
const otherKeywords = ['use', 'const', 'let', 'extern', 'module', 'var', 'this'] as const;
const typeNames = ['UInt', 'Int', 'Bit', 'Bool', 'Clock', 'Reset', 'Domain', 'Nat', 'Array'] as const;
const wordOperators = ['and', 'or', 'not', 'xor', 'eq'] as const;

function alt(words: readonly string[]) {
  return words.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
}

export const sylLanguage: any = {
  name: 'Syl',
  scopeName: 'source.syl',
  aliases: ['syl', 'loom'],
  patterns: [
    { include: '#comments' },
    { include: '#strings' },
    { include: '#numbers' },
    { include: '#booleans' },

    // Compound: declaration keyword + name (must come before standalone keywords)
    {
      match: w`\\b(${alt(declKeywords)})\\s+(\\w+)`,
      captures: {
        1: { name: 'keyword.control.declaration.syl' },
        2: { name: 'entity.name.function.syl' },
      },
    },
    {
      match: w`\\b(${alt(typeDeclKeywords)})\\s+(\\w+)`,
      captures: {
        1: { name: 'keyword.control.declaration.syl' },
        2: { name: 'entity.name.type.syl' },
      },
    },
    {
      match: w`\\b(${alt(storageKeywords)})\\s+(\\w+)`,
      captures: {
        1: { name: 'storage.type.syl' },
        2: { name: 'variable.other.syl' },
      },
    },

    // Generic parameter: <Param: Type>
    {
      match: '<(\\w+)\\s*:\\s*(\\w+)',
      captures: {
        1: { name: 'variable.parameter.syl' },
        2: { name: 'support.type.syl' },
      },
    },

    // Enum variants: .Foo, .Bar
    { match: '\\.\\w+', name: 'constant.other.enum.syl' },

    // Standalone keywords (these run after compound patterns above have consumed
    // their leading keyword, so only 'orphan' keywords hit these)
    {
      match: w`\\b(${alt(declKeywords)})\\b`,
      name: 'keyword.control.declaration.syl',
    },
    {
      match: w`\\b(${alt(typeDeclKeywords)})\\b`,
      name: 'keyword.control.declaration.syl',
    },
    {
      match: w`\\b(${alt(storageKeywords)})\\b`,
      name: 'storage.type.syl',
    },
    {
      match: w`\\b(${alt(controlKeywords)})\\b`,
      name: 'keyword.control.syl',
    },
    {
      match: w`\\b(${alt(modifierKeywords)})\\b`,
      name: 'storage.modifier.syl',
    },
    {
      match: w`\\b(${alt(otherKeywords)})\\b`,
      name: 'keyword.other.syl',
    },
    {
      match: w`\\b(${alt(typeNames)})\\b`,
      name: 'support.type.syl',
    },

    // Word operators
    {
      match: w`\\b(${alt(wordOperators)})\\b`,
      name: 'keyword.operator.word.syl',
    },

    // Symbol operators
    {
      match: ':=|=>|->|==|!=|<=|>=|<<|[+\\-*/%=&!<>.@,:;()\\[\\]{}|]',
      name: 'keyword.operator.syl',
    },

    // Identifiers (catch-all, last)
    {
      match: '[A-Za-z_]\\w*',
      name: 'variable.other.syl',
    },
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
    booleans: {
      patterns: [
        {
          name: 'constant.language.syl',
          match: '\\b(?:true|false)\\b',
        },
      ],
    },
  },
};
