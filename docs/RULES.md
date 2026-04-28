# Rules Overview

This repository now supports versioned rulesets for Trimble API Standard releases.

## Ruleset Entry Points

- `spectral-r2023.1.yaml`
- `spectral-r2026.1.yaml`
- `spectral-base.yaml` (compatibility wrapper)
- `spectral.yaml` (base/common Trimble deterministic rules)

## Common Deterministic Rules (Shared)

These are primarily defined in `spectral.yaml`:

- URL and version checks (`tas-api-server-url-invalid`, `tas-api-server-url-version-invalid`)
- naming/path hygiene (`tas-no-http-verbs-in-path`, `tdp-invalid-symbol-in-path`)
- response/status checks (`tas-operation-delete-204-status-code`, `tas-operation-400-response-body`, `tas-check-content-type-for-206-get-response-code`)
- error payload checks (`tas-standard-error-payload`)
- content/media checks (`tas-structured-data-format`, `tas-check-for-content-type-in-put-and-post-responses`)
- OpenAPI hygiene (`tdp-spec-should-not-be-empty`, `tdp-does-spec-contains-valid-http-verbs`, etc.)
- POST behavior (`tdp-operation-post-201-202-status-code`) now supports:
  - create-style POST -> `201` or `202`
  - search-style POST (`/searches`) -> `200`

## r2026.1-Specific Deterministic Rules

Defined in `spectral.yaml` and tagged with `R2026.1` (disabled by `spectral-r2023.1.yaml`):

- `tas-info-x-trimble-api-standard-format`
  - validates `info.x-trimble-api-standard` format as `RYYYY.N` when present
- `tas-response-redirect-location`
  - requires `Location` header for `307`/`308` responses
- `tas-response-redirect-prefer-307-308`
  - warns on `301`/`302` definitions
- `tas-standard-metadata-fields-r2026`
  - validates r2026 metadata naming/type expectations
- `tas-trn-format`
  - validates TRN-like field values and enums
- `tas-pagination-links-structure`
  - validates deterministic pagination response shape for paginated operations

## Semantic Validation Boundary

These checks are intentionally out of deterministic Spectral scope and should run in an LLM semantic pipeline:

- `tas-semantic-resource-naming-plural-first-segment`
- `tas-semantic-resource-action-alignment`
- `tas-semantic-standard-units-format`

Checkout the platform-ai-kit repo for incorporating the trimble api standards and llm rules early in the development using cursor/copilot skills.
- https://github.com/trimble-oss/platform-ai-kit
