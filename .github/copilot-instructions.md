# Copilot instructions

This repository is a **deterministic Spectral ruleset** for Trimble OpenAPI specs (Node.js, CommonJS, Jest). It is not a UI application.

Follow **[AGENTS.md](../AGENTS.md)** for layout, rule naming, custom functions, tests, and the semantic/LLM boundary. Human contributor steps are in [CONTRIBUTING.md](../CONTRIBUTING.md).

When adding a rule: update `spectral.yaml` (and disable r2026-only rules in `spectral-r2023.1.yaml`), add `functions/` + `test/operation-*.test.js` as needed, then document in `docs/RULES.md`, `docs/VERSION-MATRIX.md`, `README.md`, and `openapi-style-guide.md`. Run `npm test`.
