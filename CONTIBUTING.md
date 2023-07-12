# Contributing to the Trimble OpenAPI Style Guide

If you would like to contribute to this project please read the [contributing guidelines](https://trimble-oss.github.io/contribute/guidelines/).

## Issues

- You are welcome to [submit an issue](https://github.com/trimble-oss/openapi-spectral-rules/issues) with a bug report or a feature request.
- If you are reporting a bug, please indicate which version of the package you are using and provide steps to reproduce the problem.
- If you are submitting a feature request, please indicate if you are willing or able to submit a PR for it.

## Building and testing

To build and test the project locally, clone the repo and issue the following commands

```sh
npm install
npm test
```

## Adding new rules

When you add a new rule there are a number of places you should consider including:

- `spectral.yaml` should define the new rule, possibly pointing to a new function used by the rule.
- `functions` directory to hold any new function for the rule.
- `test\<rulename>.test.js` should test at least the error and no-error cases of the rule.
- `openapi-style-guide.md` should be updated with the style guideline that the rule enforces.

### spectral.yaml

When creating new rules we have some conventions that should be followed. For rule properties:

| Field   | Notes                                                                              |
| ------- | ---------------------------------------------------------------------------------- |
| name    | prefixes:                                                                          |
|         | "`tdp-`" Trimble Developer Program                                                 |
|         | "`tas-`" Trimble API Standards                                                     |
| formats | You can add formats, however, tdp has a warning rule on oas formats lower than 3.0 |

Rule name convention, not really strict about this, but it should be something like:

`{prefix}-{target}-{rule}`

Where

- **prefix**, origin of this rule, tdp or tas
- **target**, what part of the spec does the rule apply to, `tag`, `path`, `operation`, etc. or compound like `tag-description` or `operation-params`
- **rule**, extremely concise rule description, like `camel-case`, `no-versions`, `no-refs`, etc.

### openapi-style-guide.md

When adding a new rule, please add a section to the style guide that describes the rule. The section heading should match the rule name in the `spectral.yaml` file. For example, if the rule name is `tdp-tag-pascal-case` then the section should be `### tdp-tag-pascal-case`.
