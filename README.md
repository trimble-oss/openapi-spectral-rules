# Trimble OpenAPI Spectral rules

This repository contains Spectral rules for linting Trimble OpenAPI specification documents. These rules are a companion to the Trimble Web API Standards.

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
spectral lint ./tests/TrimbleSpectralTestSpec.json \
    --ruleset ./spectral.yaml \
    --format html > ./results.html
```

## Trimble Rules

### Test TDP minimum version

**tdp-minimum-spec-version**

Warn if spec version is not 3.0 or higher

```bash
spectral lint ./examples/v2/petstore.yaml --ruleset ./spectral.yaml
spectral lint ./examples/v3.0/petstore.yaml --ruleset ./spectral.yaml
```

Petstore examples are from [OpenAPI Initiative](https://github.com/OAI/OpenAPI-Specification/tree/main/examples)
