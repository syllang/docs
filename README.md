# Syl Docs

[![CI](https://github.com/syllang/docs/actions/workflows/ci.yml/badge.svg)](https://github.com/syllang/docs/actions/workflows/ci.yml)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
[![Node](https://img.shields.io/badge/node-22-blue)](https://nodejs.org/)
[![PNPM](https://img.shields.io/badge/pnpm-10.22-orange)](https://pnpm.io/)

The official documentation website for [Syl](https://github.com/syllang/syl) — an experimental hardware description language focused on **static analyzability**. Built with [Next.js](https://nextjs.org/) and [Fumadocs](https://fumadocs.vercel.app/).

**🌐 Live site:** https://syllang.com

---

## Project Overview

Syl Docs is the central knowledge base for the Syl ecosystem. It covers:

- **Language Reference** — types, constructs, semantics, and the hardware model
- **Guides & Patterns** — interfaces, pipelines, streaming, parameterization
- **Tooling** — the `sylc` compiler CLI, LSP integration, SystemVerilog emission
- **Migration** — from Chisel, SpinalHDL, Verilog, and VHDL
- **Internals** — compiler pipeline (HIR, TIR, MIR, EIR, SV-IR), static checks
- **Reference** — grammar, builtins, diagnostics, attributes

Content is available in both **English** and **中文 (Chinese)**.

---

## Getting Started

### Prerequisites

- **Node.js** 22 or later
- **PNPM** 10.22.0 (recommended) — `corepack enable && corepack prepare pnpm@10.22.0 --activate`

### Install

```bash
git clone https://github.com/syllang/docs.git
cd docs
pnpm install
```

### Run locally

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The dev server supports hot reload for edits under `app/`, `components/`, `lib/`, and `docs/`.

`pnpm dev` uses webpack in development because the default Turbopack path can
run out of memory on this repository's initial content set. If you want to try
Turbopack anyway, use `pnpm dev:turbo`.

### Build

```bash
pnpm build
```

Produces a static export in `out/`.

### Check

```bash
pnpm check
```

Runs type checking (`tsc --noEmit`) followed by a production build — the same check executed in CI.

---

## Project Structure

```
├── app/               Next.js App Router — pages, layouts, API routes
├── components/        Shared React components (MDX, navigation, theme)
├── docs/              MDX documentation source (bilingual en/zh)
│   ├── introduction/  Project overview, FAQ, status
│   ├── language/      Language reference
│   ├── patterns/      Usage patterns & examples
│   ├── tooling/       Compiler, LSP, editor integration
│   ├── reference/     Grammar, builtins, diagnostics
│   ├── internals/     Compiler IRs, pipeline, architecture
│   ├── static-checks/ Diagnostic index & explanations
│   ├── migration/     Migration guides from other HDLs
│   └── project/       Changelog, roadmap, versioning
├── lib/               Shared library code
│   └── shiki/         Custom Syl language grammar for syntax highlighting
├── scripts/           Build and CI tooling
│   ├── check-mermaid.mjs         Mermaid diagram validation
│   ├── check-readtime.mjs        Reading-time estimate validation
│   ├── check-links.mjs           Internal link validation
│   ├── validate-commit-scope.py  Commit scope policy checker
│   └── check-commit-messages.sh  Commit message compliance script
└── .github/workflows/ CI configuration
```

---

## Contributing

We welcome contributions! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for our commit scope policy and workflow guidelines.

Before submitting a pull request:

1. Run `pnpm check` to ensure typecheck + build passes.
2. Run `pnpm check:links` to validate internal documentation links.
3. Ensure commit messages follow the [Conventional Commits](https://www.conventionalcommits.org/) format with a valid scope.

---

## Security

If you discover a security vulnerability, please follow the instructions in [SECURITY.md](SECURITY.md) — do **not** file a public issue.

---

## License

This project is licensed under the **Apache License, Version 2.0**. See [LICENSE](LICENSE) for details.
