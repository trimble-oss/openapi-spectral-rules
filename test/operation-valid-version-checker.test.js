const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");
const { linterForRule } = require("./utils");
const validVersionChecker = require("../functions/valid-version-checker");

let linter;

beforeAll(async () => {
  linter = await linterForRule("tas-api-server-url-version-invalid");
  return linter;
});

function loadFixtureYaml(name) {
  const filePath = path.join(__dirname, `${name}.yaml`);
  const text = fs.readFileSync(filePath, "utf8");
  return yaml.load(text);
}

test("all server URLs in valid_spec.yaml satisfy the version rule", () => {
  const doc = loadFixtureYaml("valid_spec");
  const oasDoc = {
    openapi: doc.openapi ?? "3.0.0",
    servers: doc.servers,
  };

  return linter.run(oasDoc).then((results) => {
    expect(results).toHaveLength(0);
  });
});

test("all server URLs in valid_spec.json satisfy the version rule", () => {
  const doc = require("./valid_spec.json");
  const oasDoc = {
    openapi: doc.openapi ?? "3.0.0",
    servers: doc.servers,
  };

  return linter.run(oasDoc).then((results) => {
    expect(results).toHaveLength(0);
  });
});

test("invalid_spec.yaml: every server that fails the version check is reported", () => {
  const doc = loadFixtureYaml("invalid_spec");
  const expectedCount = doc.servers.filter(
    (s) => !validVersionChecker.isValidServerVersionUrl(s.url)
  ).length;

  const oasDoc = {
    openapi: doc.openapi ?? "3.0.0",
    servers: doc.servers,
  };

  return linter.run(oasDoc).then((results) => {
    expect(expectedCount).toBeGreaterThan(0);
    expect(results).toHaveLength(expectedCount);
  });
});

test("invalid_spec.json: every server that fails the version check is reported", () => {
  const doc = require("./invalid_spec.json");
  const expectedCount = doc.servers.filter(
    (s) => !validVersionChecker.isValidServerVersionUrl(s.url)
  ).length;

  const oasDoc = {
    openapi: doc.openapi ?? "3.0.0",
    servers: doc.servers,
  };

  return linter.run(oasDoc).then((results) => {
    expect(expectedCount).toBeGreaterThan(0);
    expect(results).toHaveLength(expectedCount);
  });
});
