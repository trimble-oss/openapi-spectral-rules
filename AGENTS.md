# Agent guide — Trimble OpenAPI Spectral rules

This repository ships **deterministic** [Spectral](https://stoplight.io/open-source/spectral) rules for Trimble OpenAPI specs. It is a companion to the [Trimble API Standard](https://api-standards.trimble-pnp.com/). It is **not** a UI app.

Read this file before adding or changing rules. Human contributor notes live in [CONTRIBUTING.md](CONTRIBUTING.md).

## Commands

Node.js `>=18`. Use **npm** (`package-lock.json` and CI use `npm ci`). Do not introduce pnpm as the package manager.

```bash
npm ci
npm test
npm run lint-petstore-v3
npm run lint-auto -- <openapi-file>
```

Lint a spec against a specific standard release:

```bash
npx --yes @stoplight/spectral-cli lint <openapi-file> --ruleset spectral-r2026.1.yaml
npx --yes @stoplight/spectral-cli lint <openapi-file> --ruleset spectral-r2023.1.yaml
```

## Layout

| Path | Role |
| --- | --- |
| `spectral.yaml` | Canonical ruleset: OAS base, custom functions, all Trimble rules + tags |
| `spectral-base.yaml` | Thin wrapper that extends `spectral.yaml` |
| `spectral-r2026.1.yaml` | r2026.1 entrypoint (extends base; all tagged rules stay on) |
| `spectral-r2023.1.yaml` | r2023.1 entrypoint (extends base; **disables** r2026-only rules) |
| `functions/` | CommonJS custom Spectral functions (`module.exports = fn`) |
| `test/` | Jest tests; isolate one rule via `linterForRule` |
| `scripts/lint-by-standard-version.js` | Picks ruleset from `--version` or `info.x-trimble-api-standard` (default `r2026.1`) |
| `docs/RULES.md` | Rule inventory and semantic-vs-deterministic boundary |
| `docs/VERSION-MATRIX.md` | Which rules apply to r2023.1 vs r2026.1 |
| `openapi-style-guide.md` | Per-rule style notes (heading must match the Spectral rule name) |
| `examples/v3.0/` | Petstore fixtures for smoke lint |

Treat `spectral.yaml` as the source of truth. `spectral-ruleset.json` and `api-spec-ruleset.json` are not referenced by scripts or tests; do not edit them unless a change explicitly requires it.

## Rule naming

`{prefix}-{target}-{rule}`

- **`tas-`** — Trimble API Standard
- **`tdp-`** — Trimble Developer Program
- **target** — spec area (`tag`, `path`, `operation`, or a compound like `operation-params`)
- **rule** — short check (`camel-case`, `no-versions`, `trn-format`)

Every rule must declare `tags` of `R2023.1` and/or `R2026.1`. Shared rules get both. r2026-only rules get `R2026.1` only **and** must be set to `off` in `spectral-r2023.1.yaml`.

## Custom functions

Register the kebab-case filename (no `.js`) under `functions:` in `spectral.yaml`, then reference it from the rule’s `then.function`.

Prefer the current function shape:

```js
module.exports = (input, _opts, context) => {
  if (!input || typeof input !== "object") {
    return [];
  }
  const path = context.path || context.target || [];
  return [{ message: "Clear, spec-facing error.", path: [...path, "field"] }];
};
```

Return `[]` when the document is fine or the input is not applicable. Do not throw for missing/null nodes.

## Tests

Jest + `@stoplight/spectral-core`. Coverage is collected from `functions/*.js`.

```js
const { linterForRule } = require("./utils");

let linter;

beforeAll(async () => {
  linter = await linterForRule("tas-example-rule");
  return linter;
});
```

- File name: `test/operation-<descriptor>.test.js`
- Cover at least one failing document and one passing document
- Assert `results` length and, when useful, `message` / `path`
- Default ruleset is `./spectral.yaml`; pass `{ rulesetFile }` only when testing a versioned entrypoint
- Prefer a minimal inline OpenAPI 3 object over editing `test/valid_spec.yaml`

## Adding a rule (checklist)

1. Decide **deterministic vs semantic**. If the check needs judgment (plural resource names, action-vs-verb alignment, unit wording), do **not** add it here — keep it in the LLM pipeline ([platform-ai-kit](https://github.com/trimble-oss/platform-ai-kit)).
2. Add or reuse a function in `functions/`.
3. Define the rule in `spectral.yaml` (formats, severity, `given`, `then`, tags). If r2026-only, disable it in `spectral-r2023.1.yaml`.
4. Add Jest coverage for pass and fail.
5. Document in `docs/RULES.md`, `docs/VERSION-MATRIX.md`, `README.md` (rule list), and `openapi-style-guide.md` (`### <rule-name>`).
6. Run `npm test`.

## Semantic / LLM boundary

These names are reserved for the semantic pipeline and must stay out of Spectral:

- `tas-semantic-resource-naming-plural-first-segment`
- `tas-semantic-resource-action-alignment`
- `tas-semantic-standard-units-format`

## Do not

- Put HTTP verbs or query strings in example paths when testing unrelated rules
- Change the default standard version (`r2026.1`) without an explicit request
- Add ESM (`import`/`export`) or TypeScript without a project-wide migration
- Recreate zebra-striping, Modus, or app-shell patterns — this repo has no UI
