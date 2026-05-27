# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in the Syl documentation site or any
related project, please **do not** file a public GitHub issue. Instead, send a
private report to:

**https://github.com/syllang/docs/security/advisories**

We will acknowledge receipt within **48 hours** and provide an initial assessment
within **5 business days**. We ask that you give us **90 days** to address the
issue before disclosing it publicly.

### What to include

- A clear description of the vulnerability
- Steps to reproduce (PoC, screenshots, or example payloads)
- Impact assessment
- Your suggested fix, if any

### Scope

This policy covers:
- The Syl documentation website (`syllang.com`)
- The `sylc` compiler and its source code
- The LSP server and editor integrations
- Build and CI infrastructure

It does **not** cover third-party dependencies — report those to their respective
maintainers.

## Supported Versions

| Version | Supported          |
|---------|--------------------|
| latest  | ✅ Fully supported |
| < 0.x   | ❌ Not supported   |

## Recognition

We believe in acknowledging security researchers who help us improve. With your
permission, we will add you to our acknowledgments list in the release notes
for the version that fixes the issue.
