# Trimble OpenAPI Spectral rules

This repository contains Spectral rules for linting Trimble OpenAPI specification documents. These rules are a companion to the Trimble Web API Standard.

## How to use the Spectral ruleset

### Dependencies

Using the Spectral CLI requires NodeJS. This ruleset is tested with NodeJS 16.x.

### Installation

See the [Spectral installation instructions](https://meta.stoplight.io/docs/spectral/docs/getting-started/installation.md) for complete details.

```bash
npm install -g @stoplight/spectral-cli
```

### Usage

You can specify the ruleset directly on the command line:

```bash
spectral lint -r https://raw.githubusercontent.com/trimble-oss/openapi-spectral-rules/main/spectral.yaml <api definition file>
```

Or you can create a Spectral configuration file (`.spectral.yaml`) that references the ruleset:

```yaml
extends:
  - https://raw.githubusercontent.com/trimble-oss/openapi-spectral-rules/main/spectral.yaml
```

### Example

Lint and output the results to an html file:

```bash
spectral lint ./openapi.yaml \
    --ruleset https://raw.githubusercontent.com/trimble-oss/openapi-spectral-rules/main/spectral.yaml \
    --format html > ./results.html

```

Lint the test spec locally

```bash
spectral lint ./examples/v3.0/petstore.yaml \
    --ruleset ./spectral.yaml \
    --format html > ./results.html

spectral lint ./examples/v3.0/petstore.yaml --ruleset ./spectral.yaml



spectral lint ./examples/v3.0/petstore.yaml \
    --ruleset ./spectral-owasp.yaml


```

## Trimble Rules

#### ✅ tdp-minimum-spec-version

Warn if spec version is not 3.0 or higher

#### ✅ tdp-tag-pascal-case

Tag names cannot use Pascal Case

#### ✅ tdp-tag-camel-case

Tag names cannot use Camel Case

#### ✅ tdp-tag-no-versions

Tag names cannot have version information

#### ✅ tdp-operation-summary-description

Operation summaries and descriptions should not match.
Descriptions should be longer than summaries.

#### ✅ tdp-operation-post-201-202-status-code

All POST methods should have a 201 or 202 response. [POST (create) - Successful Responses](https://api-standards.trimble-pnp.com/api-standard/http#successful-responses-2xx)

#### ✅ tdp-operation-delete-204-status-code

All DELETE methods should have a 204 response.

#### ✅ tdp-operation-400-response-body

All 400 responses must include a response body.

## References

Learn about writing rules here:
https://docs.stoplight.io/docs/spectral/d3482ff0ccae9-rules

Learn about custom function here:
https://docs.stoplight.io/docs/spectral/a781e290eb9f9-custom-functions

JSONPath documentation:
https://goessner.net/articles/JsonPath/index.html

Useful web based tool for testing youe JSONPath values:
http://jsonpath.com/

Petstore examples are from [OpenAPI Initiative](https://github.com/OAI/OpenAPI-Specification/tree/main/examples)
