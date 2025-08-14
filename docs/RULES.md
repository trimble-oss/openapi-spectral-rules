# OpenAPI Style Guidelines

## Table of Contents

<!-- toc -->

- [OpenAPI Style Guidelines](#openapi-style-guidelines)
  - [Table of Contents](#table-of-contents)
  - [OAS Rules](#oas-rules)
    - [no-$ref-siblings](#no-ref-siblings)
  - [Trimble HTTP API Standard](#trimble-http-api-standard)
    - [tas-api-server-url-invalid](#tas-api-server-url-invalid)
    - [tas-api-server-url-version-invalid](#tas-api-server-url-version-invalid)
    - [tas-openapi-v3-schema-properties-names-camel-case](#tas-openapi-v3-schema-properties-names-camel-case)
    - [tas-no-http-verbs-in-path](#tas-no-http-verbs-in-path)
    - [tas-structured-data-format](#tas-structured-data-format)
    - [tas-structured-data-format-support-json-response-body](#tas-structured-data-format-support-json-response-body)
    - [tas-check-queryparameter-in-endpoint](#tas-check-queryparameter-in-endpoint)
    - [tas-operation-delete-204-status-code](#tas-operation-delete-204-status-code)
    - [tas-operation-400-response-body](#tas-operation-400-response-body)
    - [tas-check-content-type-for-206-get-response-code](#tas-check-content-type-for-206-get-response-code)
    - [tas-standard-error-payload](#tas-standard-error-payload)
    - [tas-check-description-for-all-error-responses](#tas-check-description-for-all-error-responses)
    - [tas-check-description-for-all-success-responses](#tas-check-description-for-all-success-responses)
    - [tas-check-for-content-type-in-put-and-post-responses](#tas-check-for-content-type-in-put-and-post-responses)
    - [tas-delete-must-not-return-body](#tas-delete-must-not-return-body)
  - [Trimble Developer Program](#trimble-developer-program)
    - [tdp-minimum-spec-version](#tdp-minimum-spec-version)
    - [tdp-tag-pascal-case](#tdp-tag-pascal-case)
    - [tdp-tag-camel-case](#tdp-tag-camel-case)
    - [tdp-tag-no-versions](#tdp-tag-no-versions)
    - [tdp-operation-summary-description](#tdp-operation-summary-description)
    - [tdp-operation-post-201-202-status-code](#tdp-operation-post-201-202-status-code)
    - [tdp-operation-400-response-body](#tdp-operation-400-response-body)
    - [tdp-http-response-code](#tdp-http-response-code)
    - [tdp-does-spec-contains-valid-http-verbs:](#tdp-does-spec-contains-valid-http-verbs)
    - [tdp-spec-should-not-be-empty](#tdp-spec-should-not-be-empty)
    - [tdp-check-for-path-parameters-in-parameter-block](#tdp-check-for-path-parameters-in-parameter-block)
    - [tdp-check-for-response-in-every-request](#tdp-check-for-response-in-every-request)
    - [tdp-invalid-symbol-in-path](#tdp-invalid-symbol-in-path)

<!-- tocstop -->

## OAS Rules

### no-$ref-siblings

Disable the OAS no ref rule

## Trimble HTTP API Standard

[Trimble HTTP API Standards on Github](https://github.com/trimble-oss/api-standards)

[Trimble HTTP API Standards](https://api-standards.trimble-pnp.com/)

### tas-api-server-url-invalid

Server URLs should follow Trimble API Standards presented in Cloud URL Structure Summary

https://api-standards.trimble-pnp.com/api-standard/http#url-structure

### tas-api-server-url-version-invalid

API Version must include the major version and MUST NOT include the minor version

https://api-standards.trimble-pnp.com/api-standard/http#url-versioning

### tas-openapi-v3-schema-properties-names-camel-case

All schema property names MUST be camel case.

https://api-standards.trimble-pnp.com/api-standard/http#field-names

### tas-no-http-verbs-in-path

Resource path should not contain HTTP verbs

https://api-standards.trimble-pnp.com/api-standard/http#avoiding-actions-in-resource-names

### tas-structured-data-format

All APIs returning structured data should support JSON as the default format

https://api-standards.trimble-pnp.com/api-standard/http#data-from-apis-bodies-returned-from-gets-posts-puts

### tas-structured-data-format-support-json-response-body

All APIs returning structured data should support JSON as the default format.

https://api-standards.trimble-pnp.com/api-standard/http#data-from-apis-bodies-returned-from-gets-posts-puts

### tas-check-queryparameter-in-endpoint

Resource path should not contain query parameter

https://api-standards.trimble-pnp.com/api-standard/http#url-parameters

### tas-operation-delete-204-status-code

All DELETE methods should have a 204 response

https://api-standards.trimble-pnp.com/api-standard/http#successful-responses-2xx

### tas-operation-400-response-body

All 400 responses must include a response body

https://api-standards.trimble-pnp.com/api-standard/http#client-error-responses-4xx

### tas-check-content-type-for-206-get-response-code

Check if the GET response code 206 has content-type and content-range

https://api-standards.trimble-pnp.com/api-standard/http#successful-responses-2xx

### tas-standard-error-payload

Standardize the error payload

https://api-standards.trimble-pnp.com/api-standard/http#standard-error-payload

### tas-check-description-for-all-error-responses

Check for description for all error responses

https://api-standards.trimble-pnp.com/api-standard/http#client-error-responses-4xx

### tas-check-description-for-all-success-responses

Check for description for all success responses

https://api-standards.trimble-pnp.com/api-standard/http#successful-responses-2xx

### tas-check-for-content-type-in-put-and-post-responses

Check for content type in put and post response

https://api-standards.trimble-pnp.com/api-standard/http#data-from-apis-bodies-returned-from-gets-posts-puts

### tas-delete-must-not-return-body

Delete response must not return body

https://api-standards.trimble-pnp.com/api-standard/http#http-verbs

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

All POST methods MUST have a 201 or 202 response.

https://api-standards.trimble-pnp.com/api-standard/http#successful-responses-2xx

### tdp-operation-400-response-body

All 400 responses must include a response body.

### tdp-http-response-code

All APIs should return a valid http response code (Additional ruleset)

### tdp-does-spec-contains-valid-http-verbs:

Spec MUST contain only valid http verbs (Additional ruleset)

### tdp-spec-should-not-be-empty

Restrict empty spec(Additional ruleset)

### tdp-check-for-path-parameters-in-parameter-block

Check for appropriate path in parameters block as provided in the url (Additional case)

### tdp-check-for-response-in-every-request

Check if every request has their respective responses (Additional cases)

https://api-standards.trimble-pnp.com/api-standard/http#service-responses

### tdp-invalid-symbol-in-path

Check for invalid symbols in the path (Additional Case)
