# Trimble OpenAPI Spectral rules

This repository contains Spectral rules for linting Trimble OpenAPI specification documents. These rules are a companion to the Trimble API Standard.

## How to use the Spectral ruleset

### Dependencies

Using the Spectral CLI requires Node.js (`>=18` for this repository).

### Installation

Install repository dependencies:

```bash
npm ci
```

Install Spectral CLI (if not already available in your environment):

```bash
npm install -g @stoplight/spectral-cli
```

### Usage

#### Versioned local rulesets

This repository now supports versioned entrypoints:

- `spectral-r2023.1.yaml`
- `spectral-r2026.1.yaml`
- `spectral.yaml` (canonical rules file with rule tags)

Explicit version selection:

```bash
spectral lint <api-definition-file> --ruleset spectral-r2023.1.yaml
spectral lint <api-definition-file> --ruleset spectral-r2026.1.yaml
```

Auto selection (reads `info.x-trimble-api-standard`; defaults to `r2026.1`):

```bash
node scripts/lint-by-standard-version.js <api-definition-file>
node scripts/lint-by-standard-version.js --version r2023.1 <api-definition-file>
node scripts/lint-by-standard-version.js --version r2026.1 <api-definition-file>
```

NPM script equivalents:

```bash
npm run lint-auto -- <api-definition-file>
npm run lint-r2023.1 -- <api-definition-file>
npm run lint-r2026.1 -- <api-definition-file>
```

#### Remote release pinning

Use a tagged release:

```bash
spectral lint -r https://raw.githubusercontent.com/trimble-oss/openapi-spectral-rules/refs/tags/<tag>/spectral-r2026.1.yaml <api-definition-file>
```

Use latest main branch:

```bash
spectral lint -r https://raw.githubusercontent.com/trimble-oss/openapi-spectral-rules/refs/heads/main/spectral-r2026.1.yaml <api-definition-file>
```

## Extend custom rules on top of Trimble rules

You can create your own Spectral configuration file (`.spectral.yaml`) and extend Trimble rules, then add overrides/custom rules:

```yaml
extends:
  - ./spectral-r2026.1.yaml

rules:
  # Example override
  tdp-tag-camel-case: off

  # Example custom project rule
  project-operation-id-required:
    description: Require operationId for all operations
    severity: warn
    given: "$.paths[*][*]"
    then:
      field: operationId
      function: truthy
```

You can also extend remote URLs the same way:

```yaml
extends:
  - https://raw.githubusercontent.com/trimble-oss/openapi-spectral-rules/refs/tags/<tag>/spectral-r2026.1.yaml
```

## Trimble Rules

General/shared rules include tags `R2023.1` and `R2026.1`.  
r2026-only rules include tag `R2026.1`.

#### ✅ tas-api-server-url-invalid

Server URLs should follow Trimble API URL standards.

#### ✅ tas-api-server-url-version-invalid

API URL version should include major version only.

#### ✅ tas-openapi-v3-schema-properties-names-camel-case

Schema property names should be camelCase.

#### ✅ tas-no-http-verbs-in-path

Resource paths should not include HTTP verbs.

#### ✅ tas-structured-data-format

APIs accepting request bodies should support JSON.

#### ✅ tas-structured-data-format-support-json-response-body

GET structured responses should support JSON format.

#### ✅ tas-check-queryparameter-in-endpoint

Paths must not contain query parameters.

#### ✅ tas-operation-delete-204-status-code

DELETE operations should define a `204` response.

#### ✅ tas-operation-400-response-body

`400` responses should include a response body.

#### ✅ tas-check-content-type-for-206-get-response-code

`206` GET responses should include `Content-Type` and `Content-Range`.

#### ✅ tas-standard-error-payload

4xx/5xx responses should follow Trimble standard error payload shape.

#### ✅ tas-check-description-for-all-error-responses

Error responses should include appropriate descriptions.

#### ✅ tas-check-description-for-all-success-responses

Success responses should include appropriate descriptions.

#### ✅ tas-check-for-content-type-in-put-and-post-responses

POST/PUT responses should declare valid response media types.

#### ✅ tas-delete-must-not-return-body

DELETE operations returning `204` should not return content.

#### ✅ tdp-minimum-spec-version

Warn if spec version is not 3.0 or higher.

#### ✅ tdp-tag-pascal-case

Tag names cannot use PascalCase.

#### ✅ tdp-tag-camel-case

Tag names cannot use camelCase.

#### ✅ tdp-tag-no-versions

Tag names cannot include version text.

#### ✅ tdp-operation-summary-description

Operation summary and description should not be identical.

#### ✅ tdp-operation-post-201-202-status-code

POST create endpoints should return `201`/`202`; search endpoints (`/searches`) should return `200`.

#### ✅ tdp-http-response-code

Response code values should be valid HTTP status codes.

#### ✅ tdp-does-spec-contains-valid-http-verbs

Path items should only contain valid HTTP operation keys.

#### ✅ tdp-spec-should-not-be-empty

Specification document should not be empty.

#### ✅ tdp-check-for-path-parameters-in-parameter-block

Path parameters used in URLs should be declared in parameter blocks.

#### ✅ tdp-check-for-response-in-every-request

Every operation should define responses.

#### ✅ tdp-invalid-symbol-in-path

Path segments should not contain invalid symbols.

#### ✅ tas-info-x-trimble-api-standard-format (R2026.1)

If present, `info.x-trimble-api-standard` should use `RYYYY.N`.

#### ✅ tas-response-redirect-location (R2026.1)

`307`/`308` responses should include `Location` header.

#### ✅ tas-response-redirect-prefer-307-308 (R2026.1)

Warn when `301`/`302` redirects are used instead of `307`/`308`.

#### ✅ tas-standard-metadata-fields-r2026 (R2026.1)

Validate r2026 metadata naming and basic type expectations.

#### ✅ tas-trn-format (R2026.1)

TRN-like fields should match Trimble Resource Name format.

#### ✅ tas-pagination-links-structure (R2026.1)

Paginated operations should include expected pagination links/metadata shape.

For full rule/function mapping and coverage classification, see:

- `docs/VERSION-MATRIX.md`
- `docs/RULES.md`

## Semantic / LLM boundary

Deterministic Spectral and semantic LLM checks are intentionally separate.

Semantic checks such as:

- `tas-semantic-resource-naming-plural-first-segment`
- `tas-semantic-resource-action-alignment`
- `tas-semantic-standard-units-format`

should stay in the LLM validation pipeline.
