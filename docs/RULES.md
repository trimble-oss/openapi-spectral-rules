# OpenAPI Style Guidelines

## Table of Contents

<!-- toc -->

- [OpenAPI Style Guidelines](#openapi-style-guidelines)
  - [Table of Contents](#table-of-contents)
  - [OAS Rules](#oas-rules)
    - [no-$ref-siblings](#no-ref-siblings)
  - [Trimble HTTP API Standard](#trimble-http-api-standard)
    - [tas-api-server-url-version-invalid](#tas-api-server-url-version-invalid)
    - [tas-openapi-v3-schema-properties-names-camel-case](#tas-openapi-v3-schema-properties-names-camel-case)
    - [tas-resource-naming-plural-first-segment](#tas-resource-naming-plural-first-segment)
    - [tas-structured-data-format](#tas-structured-data-format)
    - [tas-structured-data-format-support-json-response-body](#tas-structured-data-format-support-json-response-body)
    - [tas-check-queryparameter-in-endpoint](#tas-check-queryparameter-in-endpoint)
    - [tas-operation-delete-204-status-code](#tas-operation-delete-204-status-code)
    - [tas-operation-400-response-body](#tas-operation-400-response-body)
    - [tas-operation-404-response-body](#tas-operation-404-response-body)
    - [tas-operation-405-response-body](#tas-operation-405-response-body)
    - [tas-check-content-type-for-206-get-response-code](#tas-check-content-type-for-206-get-response-code)
    - [tas-standard-error-payload](#tas-standard-error-payload)
    - [tas-check-description-for-all-error-responses](#tas-check-description-for-all-error-responses)
    - [tas-check-description-for-all-success-responses](#tas-check-description-for-all-success-responses)
    - [tas-check-for-content-type-in-put-and-post-responses](#tas-check-for-content-type-in-put-and-post-responses)
    - [tas-check-for-content-type-in-all-responses](#tas-check-for-content-type-in-all-responses)
    - [tas-x-trimble-api-standard-format](#tas-x-trimble-api-standard-format)
    - [tas-delete-must-not-return-body](#tas-delete-must-not-return-body)
  - [Trimble Developer Program](#trimble-developer-program)
    - [tdp-http-response-code](#tdp-http-response-code)
    - [tdp-does-spec-contains-valid-http-verbs](#tdp-does-spec-contains-valid-http-verbs)
    - [tdp-spec-should-not-be-empty](#tdp-spec-should-not-be-empty)
    - [tdp-tag-pascal-case](#tdp-tag-pascal-case)
    - [tdp-tag-camel-case](#tdp-tag-camel-case)
    - [tdp-tag-no-versions](#tdp-tag-no-versions)
    - [tdp-minimum-spec-version](#tdp-minimum-spec-version)
    - [tdp-operation-summary-description](#tdp-operation-summary-description)
    - [tdp-operation-post-201-202-status-code](#tdp-operation-post-201-202-status-code)
    - [tdp-check-for-path-parameters-in-parameter-block](#tdp-check-for-path-parameters-in-parameter-block)
    - [tdp-check-for-response-in-every-request](#tdp-check-for-response-in-every-request)
    - [tdp-invalid-symbol-in-path](#tdp-invalid-symbol-in-path)

<!-- tocstop -->

## OAS Rules

### no-$ref-siblings

Disable the OAS no ref rule

## Trimble HTTP API Standard

Rules in this section map to the [Trimble API Standard](https://developer.trimble.com/docs/api-standard/). Each rule lists the specification page that best describes the requirement.

### tas-api-server-url-version-invalid

API URLs must include the major version in the path and must not use a minor version segment in the URL.

**Specification:** [API Versioning](https://developer.trimble.com/docs/api-standard/specification/latest/api-versioning)

### tas-openapi-v3-schema-properties-names-camel-case

All schema property names MUST be camel case.

**Specification:** [Field names](https://developer.trimble.com/docs/api-standard/specification/latest/data-interchange-formats#field-names)

### tas-resource-naming-plural-first-segment

The first path segment of a resource URL MUST be a noun and MUST be plural (e.g., `/shippers` not `/shipper`).

**Specification:** [Resource naming](https://developer.trimble.com/docs/api-standard/specification/latest/resource-naming)

### tas-structured-data-format

APIs returning structured data SHOULD support JSON as the default format (request bodies on POST/PUT where applicable).

**Specification:** [Data interchange formats](https://developer.trimble.com/docs/api-standard/specification/latest/data-interchange-formats)

### tas-structured-data-format-support-json-response-body

APIs returning structured data SHOULD support JSON as the default format (GET response bodies).

**Specification:** [Data from APIs (bodies returned from GET’s, POST’s, PUT’s)](https://developer.trimble.com/docs/api-standard/specification/latest/data-interchange-formats#data-from-apis-bodies-returned-from-gets-posts-puts)

### tas-check-queryparameter-in-endpoint

Path keys in the OpenAPI document MUST NOT embed query strings; use path parameters and document query parameters per the standard.

**Specification:** [URL parameters](https://developer.trimble.com/docs/api-standard/specification/latest/url-parameters)

### tas-operation-delete-204-status-code

DELETE operations MUST declare a `204` response where appropriate.

**Specification:** [Successful responses (2xx)](https://developer.trimble.com/docs/api-standard/specification/r2023-1/service-responses/#successful-responses-2xx) (R2023.1 — Service responses)

### tas-operation-400-response-body

`400` responses MUST include a response body (e.g. standard error payload).

**Specification:** [Client error responses (4xx)](https://developer.trimble.com/docs/api-standard/specification/r2023-1/service-responses/#client-error-responses-4xx) (R2023.1 — Service responses)

### tas-operation-404-response-body

`404` responses MUST include a response body with a clear, unambiguous error description.

**Specification:** [Client error responses (4xx)](https://developer.trimble.com/docs/api-standard/specification/r2023-1/service-responses/#client-error-responses-4xx) (R2023.1 — Service responses)

### tas-operation-405-response-body

`405` responses MUST include a response body with a clear, unambiguous error description.

**Specification:** [Client error responses (4xx)](https://developer.trimble.com/docs/api-standard/specification/r2023-1/service-responses/#client-error-responses-4xx) (R2023.1 — Service responses)

### tas-check-content-type-for-206-get-response-code

GET operations that declare `206 Partial Content` MUST include appropriate `Content-Type` and `Content-Range` usage per the standard.

**Specification:** [Successful responses (2xx)](https://developer.trimble.com/docs/api-standard/specification/r2023-1/service-responses/#successful-responses-2xx) (R2023.1 — Service responses)

### tas-standard-error-payload

4xx and 5xx responses should conform to the Trimble standard error payload (RFC 9457–aligned).

**Specification:** [Standard error payload](https://developer.trimble.com/docs/api-standard/specification/latest/standard-error-payload)

### tas-check-description-for-all-error-responses

Error responses should have meaningful descriptions (clarity for integrators).

**Specification:** [Standard error payload](https://developer.trimble.com/docs/api-standard/specification/latest/standard-error-payload)

### tas-check-description-for-all-success-responses

Success responses should have meaningful descriptions.

**Specification:** [Successful responses (2xx)](https://developer.trimble.com/docs/api-standard/specification/latest/service-responses#successful-responses-2xx)

### tas-check-for-content-type-in-put-and-post-responses

Responses for POST and PUT MUST document `Content-Type` where the standard requires it.

**Specification:** [Successful responses (2xx)](https://developer.trimble.com/docs/api-standard/specification/latest/service-responses#successful-responses-2xx)

### tas-check-for-content-type-in-all-responses

Responses for GET and PATCH MUST document `Content-Type` where the standard requires it.

**Specification:** [Successful responses (2xx)](https://developer.trimble.com/docs/api-standard/specification/latest/service-responses#successful-responses-2xx)

### tas-x-trimble-api-standard-format

When present, `info.x-trimble-api-standard` MUST use the release ID form `RYYYY.N`.

**Specification:** [API documentation](https://developer.trimble.com/docs/api-standard/specification/latest/api-documentation)

### tas-delete-must-not-return-body

DELETE success responses MUST NOT return a body (e.g. `204 No Content`).

**Specification:** [HTTP verbs](https://developer.trimble.com/docs/api-standard/specification/latest/http-verbs)

## Trimble Developer Program

The following rules are **Trimble Developer Program** conventions for OpenAPI quality and consistency. They are **not** mapped to a specific section of the API Standard; no canonical doc URL is assigned here.

### tdp-http-response-code

Response status codes in the document should be valid HTTP codes.

### tdp-does-spec-contains-valid-http-verbs

Operations MUST use only standard HTTP verbs allowed by the ruleset.

### tdp-spec-should-not-be-empty

The OpenAPI document MUST not be empty.

### tdp-tag-pascal-case

Tag names MUST NOT use PascalCase (e.g. split compound names or use another convention).

### tdp-tag-camel-case

Tag names MUST NOT use camelCase.

### tdp-tag-no-versions

Tag names MUST NOT embed version strings (e.g. `v1`); version the API via paths or metadata instead.

### tdp-minimum-spec-version

For OpenAPI 2.x documents, warns that OpenAPI 3.x is expected for new APIs (see Standard for SHOULD use 3.0+).

### tdp-operation-summary-description

Operation `summary` and `description` MUST NOT be identical; descriptions should expand on summaries.

### tdp-operation-post-201-202-status-code

POST operations that create or accept async work MUST declare `201` and/or `202` as appropriate.

### tdp-check-for-path-parameters-in-parameter-block

Path parameters declared in the path MUST appear in the operation `parameters` list.

### tdp-check-for-response-in-every-request

Every operation MUST declare at least one response.

### tdp-invalid-symbol-in-path

Path strings MUST NOT contain characters/symbols disallowed by the rule (e.g. certain punctuation).
