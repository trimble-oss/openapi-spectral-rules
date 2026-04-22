#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const RULESET_BY_VERSION = {
  "r2023.1": "spectral-r2023.1.yaml",
  "r2026.1": "spectral-r2026.1.yaml",
};

const DEFAULT_VERSION = "r2026.1";

function printUsageAndExit(message) {
  if (message) {
    // eslint-disable-next-line no-console
    console.error(message);
  }
  // eslint-disable-next-line no-console
  console.error(
    "Usage: node scripts/lint-by-standard-version.js [--version r2023.1|r2026.1] <openapi-file> [more files...] [spectral flags]"
  );
  process.exit(1);
}

function normalizeVersion(input) {
  if (!input) {
    return null;
  }
  const raw = String(input).trim().toLowerCase();
  const normalized = raw.startsWith("r") ? raw : `r${raw}`;

  if (normalized === "r2023.1") {
    return "r2023.1";
  }
  if (normalized === "r2026.1") {
    return "r2026.1";
  }
  return null;
}

function extractVersionFromSpec(filePath) {
  const content = fs.readFileSync(filePath, "utf8");

  if (filePath.toLowerCase().endsWith(".json")) {
    try {
      const doc = JSON.parse(content);
      const value = doc && doc.info && doc.info["x-trimble-api-standard"];
      return normalizeVersion(value);
    } catch (error) {
      return null;
    }
  }

  const yamlMatch = content.match(
    /^\s*x-trimble-api-standard\s*:\s*["']?(R\d{4}\.\d+)["']?\s*$/im
  );
  return normalizeVersion(yamlMatch && yamlMatch[1]);
}

function parseArgs(argv) {
  const files = [];
  const passthrough = [];
  let explicitVersion = null;

  for (let i = 0; i < argv.length; i += 1) {
    const value = argv[i];

    if (value === "--version") {
      const nextValue = argv[i + 1];
      if (!nextValue) {
        printUsageAndExit("Missing value for --version.");
      }
      explicitVersion = normalizeVersion(nextValue);
      if (!explicitVersion) {
        printUsageAndExit(`Unsupported version value: ${nextValue}`);
      }
      i += 1;
      continue;
    }

    if (value.startsWith("--version=")) {
      const [, rawVersion] = value.split("=");
      explicitVersion = normalizeVersion(rawVersion);
      if (!explicitVersion) {
        printUsageAndExit(`Unsupported version value: ${rawVersion}`);
      }
      continue;
    }

    if (value.startsWith("-")) {
      passthrough.push(value);
      continue;
    }

    files.push(value);
  }

  if (files.length === 0) {
    printUsageAndExit("At least one OpenAPI document path is required.");
  }

  return { files, passthrough, explicitVersion };
}

function run() {
  const { files, passthrough, explicitVersion } = parseArgs(process.argv.slice(2));
  let hadFailure = false;

  files.forEach((filePath) => {
    const resolvedFile = path.resolve(process.cwd(), filePath);
    if (!fs.existsSync(resolvedFile)) {
      // eslint-disable-next-line no-console
      console.error(`File does not exist: ${filePath}`);
      hadFailure = true;
      return;
    }

    const detectedVersion = explicitVersion || extractVersionFromSpec(resolvedFile) || DEFAULT_VERSION;
    const rulesetFile = RULESET_BY_VERSION[detectedVersion] || RULESET_BY_VERSION[DEFAULT_VERSION];
    const resolvedRuleset = path.resolve(__dirname, "..", rulesetFile);

    // eslint-disable-next-line no-console
    console.log(`Linting ${filePath} with ${rulesetFile} (${detectedVersion})`);

    let result = spawnSync(
      "spectral",
      ["lint", resolvedFile, "--ruleset", resolvedRuleset, ...passthrough],
      {
        stdio: "inherit",
      }
    );

    if (result.error && result.error.code === "ENOENT") {
      // eslint-disable-next-line no-console
      console.warn(
        "The `spectral` binary was not found in PATH. Falling back to `npx @stoplight/spectral-cli`."
      );
      result = spawnSync(
        "npx",
        [
          "--yes",
          "@stoplight/spectral-cli",
          "lint",
          resolvedFile,
          "--ruleset",
          resolvedRuleset,
          ...passthrough,
        ],
        {
          stdio: "inherit",
        }
      );
    }

    if (result.error && result.error.code === "ENOENT") {
      // eslint-disable-next-line no-console
      console.error("Unable to execute Spectral via `spectral` or `npx`.");
      process.exit(1);
    }

    if (result.status !== 0) {
      hadFailure = true;
    }
  });

  process.exit(hadFailure ? 1 : 0);
}

run();
