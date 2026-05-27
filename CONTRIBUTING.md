# Contributing

Contributions to the Syl documentation repository are welcome! This project
hosts the official docs for the [Syl](https://github.com/syllang/syl) hardware
description language.

---

## Getting Started

### Prerequisites

- **Node.js** 22 or later
- **PNPM** 10.22.0 — enable via Corepack:
  ```bash
  corepack enable && corepack prepare pnpm@10.22.0 --activate
  ```

### Setup

```bash
git clone https://github.com/syllang/docs.git
cd docs
pnpm install
pnpm dev        # starts the dev server at http://localhost:3000
```

`pnpm dev` uses webpack in development. The default Turbopack path currently
has a tendency to hit OOM on this repository's full documentation corpus. Use
`pnpm dev:turbo` only if you specifically want to test that path.

### Directory overview

| Directory | Purpose |
|---|---|
| `docs/` | MDX documentation source (bilingual: English `*.mdx` and Chinese `*.zh.mdx`) |
| `app/` | Next.js App Router pages, layouts, and API routes |
| `components/` | Shared React components (navigation, MDX, theme) |
| `lib/` | Utility code (i18n, Shiki syntax highlighters) |
| `scripts/` | Validation and CI tooling |

---

## Documentation Contributions

### Authoring content

Documentation lives under `docs/` as MDX files. The structure mirrors the
navigation: `docs/language/`, `docs/patterns/`, `docs/tooling/`, etc.

### Bilingual content

Each page should have two files:

- `docs/some-page.mdx` — English version
- `docs/some-page.zh.mdx` — Chinese (简体中文) version

Keep both in sync. If you can only contribute in one language, open an issue
with the `i18n` label so a translator can pick it up.

### Validation

Before submitting, run:

```bash
pnpm check         # type check + build
pnpm check:links   # validate internal cross-references
pnpm check:mermaid # validate Mermaid diagram syntax
pnpm check:readtime # validate reading-time estimates
```

---

## Pull Request Process

1. **Fork** the repository and create a feature branch from `main`.
2. **Make your changes** — keep commits focused and scoped (see policy below).
3. **Run checks** locally: `pnpm check` and `pnpm check:links`.
4. **Open a pull request** using the [PR template](.github/PULL_REQUEST_TEMPLATE.md).
5. **Ensure CI passes** — the CI pipeline runs type checking, build, and
   commit message validation automatically.
6. **Request review** — at least one maintainer review is required before
   merging.

### Branch naming

Use descriptive names:

- `feat/add-lsp-config-page`
- `fix/broken-link-patterns`
- `docs/clarify-bool-vs-bit`

### Squash merge

PRs are squash-merged into `main`. The squashed commit message must follow
the same scope policy as individual commits.

---

## Commit Scope Policy

Commit headers must follow [Conventional Commits](https://www.conventionalcommits.org/)
with an explicit scope:

```
type(scope): subject
type(scope)!: subject
```

This repository enforces scope coverage with `.commit-scope.json`.
The scope must be the narrowest valid responsibility boundary that covers the
changed paths.

### Allowed scope forms

- A single atomic scope such as `docs/language`, `app`, or `site-config`
- A scope expression with `+`, such as `app+components`
- A configured composite scope such as `site`, `tooling`, or `content`

### Forbidden broad scopes

`.` / `workspace` / `repo` / `all` / `misc` / `multi` / `cross`

### Additional rules

- Use the narrowest covering scope; if `docs/language` covers the change,
  do not use `content`.
- Use at most three scope members in a `+` expression.
- If no valid scope cleanly covers the change, split the commit instead of
  widening the scope.
- Breaking-change commits written as `type(scope)!: subject` may include
  supporting edits outside the declared scope, but the scope must still cover
  at least one changed path and remain the narrowest valid description of the
  primary breaking area.

For squash merges, the pull request title is still linted as a Conventional
Commit header with a valid scope, but it is not checked against the aggregate
diff. Commit-level scope validation remains the authoritative rule because
large refactors and multi-step PRs often span several otherwise-valid commit
scopes once squashed.

### Examples

```
docs(docs/reference): clarify grammar wording
feat(app+components): improve mobile navigation
chore(tooling): enforce commit scope policy in CI
docs(content): reorganize content sections in one coherent docs-only change
feat(app)!: rename public API and update migration guides
```

---

## CI Pipeline

The CI workflow (`.github/workflows/ci.yml`) runs two jobs:

| Job | Checks |
|---|---|
| `quality` | `pnpm install --frozen-lockfile` → `pnpm check` (typecheck + build) |
| `commits` | Validates PR title format and all commit messages against the scope policy |

Both must pass before merging.

---

## Questions?

If you're unsure about anything, open a [GitHub Discussion](https://github.com/syllang/docs/discussions)
or file an issue. We're happy to help.
