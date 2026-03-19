# OpenAPI Style Guidelines

## Table of Contents

<!-- toc -->

- [OAS Rules](#oas-rules)
  * [no-$ref-siblings](#no-ref-siblings)
- [Trimble HTTP API Standard](#trimble-http-api-standard)
  * [tas-api-server-url-invalid](#tas-api-server-url-invalid)
  * [tas-api-server-url-version-invalid](#tas-api-server-url-version-invalid)
  * [tas-openapi-v3-schema-properties-names-camel-case](#tas-openapi-v3-schema-properties-names-camel-case)
  * [tas-resource-naming-plural-first-segment](#tas-resource-naming-plural-first-segment)
  * [tas-no-http-verbs-in-path](#tas-no-http-verbs-in-path)
  * [tas-structured-data-format](#tas-structured-data-format)
  * [tas-structured-data-format-support-json-response-body](#tas-structured-data-format-support-json-response-body)
  * [tas-check-queryparameter-in-endpoint](#tas-check-queryparameter-in-endpoint)
  * [tas-operation-delete-204-status-code](#tas-operation-delete-204-status-code)
  * [tas-operation-400-response-body](#tas-operation-400-response-body)
  * [tas-operation-404-response-body](#tas-operation-404-response-body)
  * [tas-operation-405-response-body](#tas-operation-405-response-body)
  * [tas-check-content-type-for-206-get-response-code](#tas-check-content-type-for-206-get-response-code)
  * [tas-standard-error-payload](#tas-standard-error-payload)
  * [tas-check-description-for-all-error-responses](#tas-check-description-for-all-error-responses)
  * [tas-check-description-for-all-success-responses](#tas-check-description-for-all-success-responses)
  * [tas-check-for-content-type-in-put-and-post-responses](#tas-check-for-content-type-in-put-and-post-responses)
  * [tas-check-for-content-type-in-all-responses](#tas-check-for-content-type-in-all-responses)
  * [tas-x-trimble-api-standard-format](#tas-x-trimble-api-standard-format)
  * [tas-delete-must-not-return-body](#tas-delete-must-not-return-body)
- [Trimble Developer Program](#trimble-developer-program)
  * [tdp-minimum-spec-version](#tdp-minimum-spec-version)
  * [tdp-tag-pascal-case](#tdp-tag-pascal-case)
  * [tdp-tag-camel-case](#tdp-tag-camel-case)
  * [tdp-tag-no-versions](#tdp-tag-no-versions)
  * [tdp-operation-summary-description](#tdp-operation-summary-description)
  * [tdp-operation-post-201-202-status-code](#tdp-operation-post-201-202-status-code)
  * [tdp-operation-400-response-body](#tdp-operation-400-response-body)
  * [tdp-http-response-code](#tdp-http-response-code)
  * [tdp-does-spec-contains-valid-http-verbs](#tdp-does-spec-contains-valid-http-verbs)
  * [tdp-spec-should-not-be-empty](#tdp-spec-should-not-be-empty)
  * [tdp-check-for-path-parameters-in-parameter-block](#tdp-check-for-path-parameters-in-parameter-block)
  * [tdp-check-for-response-in-every-request](#tdp-check-for-response-in-every-request)
  * [tdp-invalid-symbol-in-path](#tdp-invalid-symbol-in-path)

<!-- tocstop -->

## OAS Rules

### no-$ref-siblings

Disable the OAS no ref rule

## Trimble HTTP API Standard

[Trimble API Standard Documentation](https://developer.trimble.com/docs/api-standard/)

### tas-api-server-url-invalid

Server URLs should follow Trimble API Standards presented in Cloud URL Structure Summary

https://developer.trimble.com/docs/api-standard/

### tas-api-server-url-version-invalid

API Version must include the major version and MUST NOT include the minor version

https://developer.trimble.com/docs/api-standard/

### tas-openapi-v3-schema-properties-names-camel-case

All schema property names MUST be camel case.

https://developer.trimble.com/docs/api-standard/

### tas-resource-naming-plural-first-segment

The first path segment of a resource URL MUST be a noun and MUST be plural (e.g., /shippers not /shipper).

https://developer.trimble.com/docs/api-standard/

### tas-no-http-verbs-in-path

Resource path should not contain HTTP verbs

https://developer.trimble.com/docs/api-standard/

### tas-structured-data-format

All APIs returning structured data should support JSON as the default format

https://developer.trimble.com/docs/api-standard/

### tas-structured-data-format-support-json-response-body

All APIs returning structured data should support JSON as the default format.

https://developer.trimble.com/docs/api-standard/

### tas-check-queryparameter-in-endpoint

Resource path should not contain query parameter

https://developer.trimble.com/docs/api-standard/

### tas-operation-delete-204-status-code

All DELETE methods MUST have a 204 response

https://developer.trimble.com/docs/api-standard/

### tas-operation-400-response-body

All 400 responses must include a response body

https://developer.trimble.com/docs/api-standard/

### tas-operation-404-response-body

All 404 responses must include a response body with clear, unambiguous error description.

https://developer.trimble.com/docs/api-standard/

### tas-operation-405-response-body

All 405 responses must include a response body with clear, unambiguous error description.

https://developer.trimble.com/docs/api-standard/

### tas-check-content-type-for-206-get-response-code

Check if the GET response code 206 has content-type and content-range

https://developer.trimble.com/docs/api-standard/

### tas-standard-error-payload

Standardize the error payload (RFC 9457 extension with type, title, status)

https://developer.trimble.com/docs/api-standard/

### tas-check-description-for-all-error-responses

Check for description for all error responses

https://developer.trimble.com/docs/api-standard/

### tas-check-description-for-all-success-responses

Check for description for all success responses

https://developer.trimble.com/docs/api-standard/

### tas-check-for-content-type-in-put-and-post-responses

Check for content type in put and post response

https://developer.trimble.com/docs/api-standard/

### tas-check-for-content-type-in-all-responses

All API responses MUST include the Content-Type header. This rule checks GET and PATCH responses.

https://developer.trimble.com/docs/api-standard/

### tas-x-trimble-api-standard-format

When present, the optional x-trimble-api-standard property in the info object MUST use format RYYYY.N (e.g., R2023.1).

https://developer.trimble.com/docs/api-standard/

### tas-delete-must-not-return-body

Delete response must not return body

https://developer.trimble.com/docs/api-standard/

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

https://developer.trimble.com/docs/api-standard/

### tdp-operation-400-response-body

All 400 responses must include a response body.

### tdp-http-response-code

All APIs should return a valid http response code (Additional ruleset)

### tdp-does-spec-contains-valid-http-verbs

Spec MUST contain only valid http verbs (Additional ruleset)

### tdp-spec-should-not-be-empty

Restrict empty spec(Additional ruleset)

### tdp-check-for-path-parameters-in-parameter-block

Check for appropriate path in parameters block as provided in the url (Additional case)

### tdp-check-for-response-in-every-request

Check if every request has their respective responses (Additional cases)

https://developer.trimble.com/docs/api-standard/

### tdp-invalid-symbol-in-path

Check for invalid symbols in the path (Additional Case)
