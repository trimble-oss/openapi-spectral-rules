# Ruleset version matrix

Canonical definitions live in `spectral.yaml`. Version entrypoints extend `spectral-base.yaml` → `spectral.yaml`. `spectral-r2023.1.yaml` turns r2026-only rules **off**.

| Rule | Function / built-in | r2023.1 | r2026.1 |
| --- | --- | --- | --- |
| `tas-api-server-url-invalid` | `valid-url-checker` | on | on |
| `tas-api-server-url-version-invalid` | `valid-version-checker` | on | on |
| `tas-openapi-v3-schema-properties-names-camel-case` | `pattern` | on | on |
| `tas-no-http-verbs-in-path` | `no-http-verbs-in-path` | on | on |
| `tas-structured-data-format` | `check-if-application-or-json-in-put-and-post-response` | on | on |
| `tas-structured-data-format-support-json-response-body` | `check-if-response-body-json-in-get-response` | on | on |
| `tdp-http-response-code` | `valid-http-response` | on | on |
| `tas-check-queryparameter-in-endpoint` | `check-for-query-parameter-in-every-path` | on | on |
| `tdp-does-spec-contains-valid-http-verbs` | `does-spec-contains-valid-http-verbs` | on | on |
| `tdp-spec-should-not-be-empty` | `is-valid-spec` | on | on |
| `tdp-tag-pascal-case` | `pattern` | on | on |
| `tdp-tag-camel-case` | `pattern` | on | on |
| `tdp-tag-no-versions` | `pattern` | on | on |
| `tdp-minimum-spec-version` | `truthy` (oas2) | on | on |
| `tdp-operation-summary-description` | `operation-summary-description` | on | on |
| `tas-operation-delete-204-status-code` | `truthy` | on | on |
| `tdp-operation-post-201-202-status-code` | `operation-post-201-202-status-code` | on | on |
| `tas-operation-400-response-body` | `truthy` | on | on |
| `tas-check-content-type-for-206-get-response-code` | `check-content-type-for-206-get-response-code` | on | on |
| `tas-standard-error-payload` | `check-standard-for-error-payload` | on | on |
| `tas-check-description-for-all-error-responses` | `check-description-for-all-error-responses` | on | on |
| `tas-check-description-for-all-success-responses` | `check-description-for-all-success-responses` | on | on |
| `tas-check-for-content-type-in-put-and-post-responses` | `check-for-content-type-in-put-and-post-responses` | on | on |
| `tdp-check-for-path-parameters-in-parameter-block` | `check-for-path-parameter` | on | on |
| `tdp-check-for-response-in-every-request` | `check-for-response-in-every-request` | on | on |
| `tas-delete-must-not-return-body` | `delete-must-not-return-body` | on | on |
| `tdp-invalid-symbol-in-path` | `invalid-symbol-in-path` | on | on |
| `tas-info-x-trimble-api-standard-format` | `check-x-trimble-api-standard-format` | off | on |
| `tas-response-redirect-location` | `check-redirect-location-header` | off | on |
| `tas-response-redirect-prefer-307-308` | `check-redirect-status-preference` | off | on |
| `tas-standard-metadata-fields-r2026` | `check-standard-metadata-r2026` | off | on |
| `tas-trn-format` | `check-trn-format` | off | on |
| `tas-pagination-links-structure` | `check-pagination-links-structure` | off | on |

## Not in Spectral

These stay in the LLM semantic pipeline (see `docs/RULES.md`):

- `tas-semantic-resource-naming-plural-first-segment`
- `tas-semantic-resource-action-alignment`
- `tas-semantic-standard-units-format`
