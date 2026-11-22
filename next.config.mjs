import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {Array<[string, string]>} */
const redirectPairs = [
  // introduction
  ['/docs/introduction', '/docs/explanation'],
  ['/docs/introduction/faq', '/docs/reference/faq'],
  ['/docs/introduction/project-status', '/docs/reference/project-status'],
  ['/docs/introduction/support', '/docs/reference/support'],
  ['/docs/introduction/users', '/docs/explanation/users'],
  ['/docs/introduction/what-is-syl', '/docs/explanation/what-is-syl'],
  ['/docs/introduction/why-static-analyzability', '/docs/explanation/why-static-analyzability'],

  // language
  ['/docs/language', '/docs/reference'],
  ['/docs/language/basic-types', '/docs/reference/basic-types'],
  ['/docs/language/compile-time-constructs', '/docs/reference/compile-time-constructs'],
  ['/docs/language/composite-types', '/docs/reference/composite-types'],
  ['/docs/language/hardware-semantics', '/docs/reference/hardware-semantics'],
  ['/docs/language/interfaces-and-views', '/docs/reference/interfaces-and-views'],
  ['/docs/language/numeric-word-types', '/docs/reference/numeric-word-types'],
  ['/docs/language/packages-and-imports', '/docs/reference/packages-and-imports'],
  ['/docs/language/sequential-logic', '/docs/reference/sequential-logic'],
  ['/docs/language/structural-constructs', '/docs/reference/structural-constructs'],

  // migration
  ['/docs/migration', '/docs/how-to'],
  ['/docs/migration/bool-vs-bit', '/docs/how-to/bool-vs-bit'],
  ['/docs/migration/elaboration-vs-hardware', '/docs/how-to/elaboration-vs-hardware'],
  ['/docs/migration/from-chisel', '/docs/how-to/from-chisel'],
  ['/docs/migration/from-spinalhdl', '/docs/how-to/from-spinalhdl'],
  ['/docs/migration/from-verilog', '/docs/how-to/from-verilog'],
  ['/docs/migration/from-vhdl', '/docs/how-to/from-vhdl'],
  ['/docs/migration/structural-design', '/docs/how-to/structural-design'],

  // patterns
  ['/docs/patterns', '/docs/how-to'],
  ['/docs/patterns/examples', '/docs/how-to/examples'],
  ['/docs/patterns/interfaces', '/docs/how-to/interfaces'],
  ['/docs/patterns/parameterization', '/docs/how-to/parameterization'],
  ['/docs/patterns/pipeline', '/docs/how-to/pipeline'],
  ['/docs/patterns/standard-library', '/docs/how-to/standard-library'],
  ['/docs/patterns/stream', '/docs/how-to/stream'],

  // static-checks
  ['/docs/static-checks', '/docs/explanation'],
  ['/docs/static-checks/aggregate-completeness', '/docs/explanation/aggregate-completeness'],
  ['/docs/static-checks/bounds-and-indexing', '/docs/explanation/bounds-and-indexing'],
  ['/docs/static-checks/capability-violations', '/docs/explanation/capability-violations'],
  ['/docs/static-checks/diagnostic-index', '/docs/explanation/diagnostic-index'],
  ['/docs/static-checks/driver-overlap', '/docs/explanation/driver-overlap'],
  ['/docs/static-checks/missing-drivers', '/docs/explanation/missing-drivers'],
  ['/docs/static-checks/width-and-type-mismatches', '/docs/explanation/width-and-type-mismatches'],

  // tooling
  ['/docs/tooling', '/docs/how-to'],
  ['/docs/tooling/ai-prompt', '/docs/how-to/ai-prompt'],
  ['/docs/tooling/extern-and-ip', '/docs/how-to/extern-and-ip'],
  ['/docs/tooling/lsp-and-editors', '/docs/how-to/lsp-and-editors'],
  ['/docs/tooling/rust-embedding', '/docs/how-to/rust-embedding'],
  ['/docs/tooling/session-and-query', '/docs/explanation/salsa-incremental-architecture'],
  ['/docs/tooling/sylc', '/docs/how-to/sylc'],
  ['/docs/tooling/systemverilog-emission', '/docs/how-to/systemverilog-emission'],

  // internals
  ['/docs/internals', '/docs/explanation'],
  ['/docs/internals/const-mir-and-map-ir', '/docs/explanation/const-mir-and-map-ir'],
  ['/docs/internals/elab-and-eir', '/docs/explanation/elab-and-eir'],
  ['/docs/internals/hir-and-tir', '/docs/explanation/hir-and-tir'],
  ['/docs/internals/hw-and-sv-ir', '/docs/explanation/hw-and-sv-ir'],
  ['/docs/internals/pipeline', '/docs/explanation/pipeline'],
  ['/docs/internals/repository-map', '/docs/explanation/repository-map'],
  ['/docs/internals/syntax-ast', '/docs/explanation/syntax-ast'],
  ['/docs/internals/testing-and-contributing', '/docs/explanation/testing-and-contributing'],

  // project
  ['/docs/project', '/docs/reference'],
  ['/docs/project/changelog', '/docs/reference/changelog'],
  ['/docs/project/release-policy', '/docs/reference/release-policy'],
  ['/docs/project/roadmap', '/docs/reference/roadmap'],
  ['/docs/project/versioning-and-compatibility', '/docs/reference/versioning-and-compatibility'],
];

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  allowedDevOrigins: ['192.168.0.108'],
  async redirects() {
    return redirectPairs.flatMap(([source, destination]) => [
      { source, destination, permanent: true },
      { source: `/zh${source}`, destination: `/zh${destination}`, permanent: true },
    ]);
  },
};

export default withMDX(config);
