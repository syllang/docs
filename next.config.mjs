import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  allowedDevOrigins: ['192.168.0.108'],
  async redirects() {
    return [
      { source: '/docs/introduction/:path*', destination: '/docs/explanation/why-static-analyzability', permanent: true },
      { source: '/zh/docs/introduction/:path*', destination: '/zh/docs/explanation/why-static-analyzability', permanent: true },

      { source: '/docs/language/:path*', destination: '/docs/reference/language-syntax-types', permanent: true },
      { source: '/zh/docs/language/:path*', destination: '/zh/docs/reference/language-syntax-types', permanent: true },

      { source: '/docs/static-checks/:path*', destination: '/docs/reference/diagnostic-codes', permanent: true },
      { source: '/zh/docs/static-checks/:path*', destination: '/zh/docs/reference/diagnostic-codes', permanent: true },

      { source: '/docs/patterns/:path*', destination: '/docs/reference/standard-library', permanent: true },
      { source: '/zh/docs/patterns/:path*', destination: '/zh/docs/reference/standard-library', permanent: true },

      { source: '/docs/reference/attributes', destination: '/docs/reference/language-syntax-types', permanent: true },
      { source: '/zh/docs/reference/attributes', destination: '/zh/docs/reference/language-syntax-types', permanent: true },
      { source: '/docs/reference/builtins', destination: '/docs/reference/language-syntax-types', permanent: true },
      { source: '/zh/docs/reference/builtins', destination: '/zh/docs/reference/language-syntax-types', permanent: true },
      { source: '/docs/reference/grammar', destination: '/docs/reference/language-syntax-types', permanent: true },
      { source: '/zh/docs/reference/grammar', destination: '/zh/docs/reference/language-syntax-types', permanent: true },
      { source: '/docs/reference/lexical-syntax', destination: '/docs/reference/language-syntax-types', permanent: true },
      { source: '/zh/docs/reference/lexical-syntax', destination: '/zh/docs/reference/language-syntax-types', permanent: true },
      { source: '/docs/reference/cli', destination: '/docs/reference/cli-and-json-diagnostics', permanent: true },
      { source: '/zh/docs/reference/cli', destination: '/zh/docs/reference/cli-and-json-diagnostics', permanent: true },
      { source: '/docs/reference/diagnostics', destination: '/docs/reference/diagnostic-codes', permanent: true },
      { source: '/zh/docs/reference/diagnostics', destination: '/zh/docs/reference/diagnostic-codes', permanent: true },
      { source: '/docs/reference/lsp', destination: '/docs/reference/lsp-protocol', permanent: true },
      { source: '/zh/docs/reference/lsp', destination: '/zh/docs/reference/lsp-protocol', permanent: true },

      { source: '/docs/tooling/sylc', destination: '/docs/reference/cli-and-json-diagnostics', permanent: true },
      { source: '/zh/docs/tooling/sylc', destination: '/zh/docs/reference/cli-and-json-diagnostics', permanent: true },
      { source: '/docs/tooling/lsp-and-editors', destination: '/docs/how-to/editor-lsp-setup', permanent: true },
      { source: '/zh/docs/tooling/lsp-and-editors', destination: '/zh/docs/how-to/editor-lsp-setup', permanent: true },
      { source: '/docs/tooling/extern-and-ip', destination: '/docs/how-to/opaque-summary-ip', permanent: true },
      { source: '/zh/docs/tooling/extern-and-ip', destination: '/zh/docs/how-to/opaque-summary-ip', permanent: true },
      { source: '/docs/tooling/systemverilog-emission', destination: '/docs/how-to/multi-file-sv-emit', permanent: true },
      { source: '/zh/docs/tooling/systemverilog-emission', destination: '/zh/docs/how-to/multi-file-sv-emit', permanent: true },
      { source: '/docs/tooling/:path*', destination: '/docs/how-to', permanent: true },
      { source: '/zh/docs/tooling/:path*', destination: '/zh/docs/how-to', permanent: true },

      { source: '/docs/internals/pipeline', destination: '/docs/explanation/compiler-pipeline', permanent: true },
      { source: '/zh/docs/internals/pipeline', destination: '/zh/docs/explanation/compiler-pipeline', permanent: true },
      { source: '/docs/internals/:path*', destination: '/docs/explanation/salsa-incremental-architecture', permanent: true },
      { source: '/zh/docs/internals/:path*', destination: '/zh/docs/explanation/salsa-incremental-architecture', permanent: true },

      { source: '/docs/migration/:path*', destination: '/docs/tutorials/first-cell', permanent: true },
      { source: '/zh/docs/migration/:path*', destination: '/zh/docs/tutorials/first-cell', permanent: true },

      { source: '/docs/project/:path*', destination: '/docs/explanation/repository-and-contributing', permanent: true },
      { source: '/zh/docs/project/:path*', destination: '/zh/docs/explanation/repository-and-contributing', permanent: true },
    ];
  },
};

export default withMDX(config);
