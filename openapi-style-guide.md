# OpenAPI Style Guidelines

## Table of Contents

<!-- toc -->

- [OpenAPI Style Guidelines](#openapi-style-guidelines)
  - [Table of Contents](#table-of-contents)
  - [OAS Rules](#oas-rules)
    - [no-$ref-siblings](#no-ref-siblings)
  - [Trimble HTTP API Standard](#trimble-http-api-standard)
  - [Trimble Developer Program](#trimble-developer-program)
    - [tdp-minimum-spec-version](#tdp-minimum-spec-version)
    - [tdp-tag-pascal-case](#tdp-tag-pascal-case)
    - [tdp-tag-camel-case](#tdp-tag-camel-case)
    - [tdp-tag-no-versions](#tdp-tag-no-versions)
    - [tdp-operation-summary-description](#tdp-operation-summary-description)
    - [tdp-operation-post-201-202-status-code](#tdp-operation-post-201-202-status-code)
    - [tdp-operation-delete-204-status-code](#tdp-operation-delete-204-status-code)
    - [tdp-operation-400-response-body](#tdp-operation-400-response-body)

<!-- tocstop -->

## OAS Rules

### no-$ref-siblings

Disable the OAS no ref rule

## Trimble HTTP API Standard

[Trimble HTTP API Standards on Github](https://github.com/trimble-oss/api-standards)

[Trimble HTTP API Standards](https://api-standards.trimble-pnp.com/)

## Trimble Developer Program

### tdp-minimum-spec-version

Warn if spec version is not 3.0 or higher

### tdp-tag-pascal-case

Tag names cannot use Pascal Case

### tdp-tag-camel-case

Tag names cannot use Camel Case

### tdp-tag-no-versions

Tag names cannot have version information

### tdp-operation-summary-description

Operation summaries and descriptions should not match.
Descriptions should be longer than summaries.

### tdp-operation-post-201-202-status-code

All POST methods should have a 201 or 202 response. [POST (create) - Successful Responses](https://api-standards.trimble-pnp.com/api-standard/http#successful-responses-2xx)

### tdp-operation-delete-204-status-code

All DELETE methods should have a 204 response.

### tdp-operation-400-response-body

All 400 responses must include a response body.
