---
name: add-spectral-rule
description: Add or update a deterministic Spectral rule, custom function, Jest coverage, and docs in this ruleset. Use when creating a tas-/tdp- rule, editing functions/, spectral.yaml, versioned rulesets, or rule tests.
---

# Add a Spectral rule

## 1. Confirm it belongs here

Implement only **deterministic** checks (status codes, header presence, regex/format, required fields, JSON media types).

If the check needs judgment (plural resource names, action-vs-HTTP-verb alignment, unit wording), stop. Those stay in the LLM pipeline as `tas-semantic-*` ([platform-ai-kit](https://github.com/trimble-oss/platform-ai-kit)).

## 2. Name and version

- Id: `{tas|tdp}-{target}-{rule}` (`tas-` = API Standard, `tdp-` = Developer Program)
- Shared: tags `R2023.1` and `R2026.1`
- r2026-only: tag `R2026.1` only, then disable in `spectral-r2023.1.yaml`

## 3. Function (if built-in Spectral functions are not enough)

Create `functions/<kebab-name>.js` and register `<kebab-name>` under `functions:` in `spectral.yaml`.

```js
module.exports = (input, _opts, context) => {
  if (!input || typeof input !== "object") {
    return [];
  }
  const path = context.path || context.target || [];
  return [{ message: "Spec-facing error text.", path: [...path, "field"] }];
};
```

Match the style of recent functions (`check-trn-format.js`, `check-x-trimble-api-standard-format.js`): guard nulls, return an array, include `path` when possible.

## 4. Rule in `spectral.yaml`

```yaml
tas-example-rule:
  description: One sentence of the requirement.
  message: "{{error}}"
  severity: warn
  recommended: true
  tags:
    - R2026.1
  given: "$.components.schemas.*.properties"
  then:
    function: check-example-rule
```

Link the Trimble standard section in a comment above the rule when one exists.

If r2026-only, add to `spectral-r2023.1.yaml`:

```yaml
tas-example-rule: off
```

Do not change `spectral-r2026.1.yaml` or `spectral-base.yaml` unless the entrypoint graph itself changes.

## 5. Tests

Add `test/operation-<descriptor>.test.js`:

```js
const { linterForRule } = require("./utils");

let linter;

beforeAll(async () => {
  linter = await linterForRule("tas-example-rule");
  return linter;
});

test("tas-example-rule flags invalid documents", () => {
  return linter.run(invalidDoc).then((results) => {
    expect(results.length).toBeGreaterThan(0);
  });
});

test("tas-example-rule allows valid documents", () => {
  return linter.run(validDoc).then((results) => {
    expect(results).toHaveLength(0);
  });
});
```

Use a minimal OpenAPI 3 object. Cover edge cases the function guards (null/non-object input).

## 6. Docs

- `docs/RULES.md` — inventory + which release
- `docs/VERSION-MATRIX.md` — matrix row
- `README.md` — short rule bullet
- `openapi-style-guide.md` — `### tas-example-rule`

## 7. Verify

```bash
npm test
```

If the user asked to lint a fixture, also run `npm run lint-petstore-v3` or `npm run lint-auto -- <file>`.
