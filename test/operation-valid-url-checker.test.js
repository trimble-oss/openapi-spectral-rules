const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");
const { linterForRule } = require("./utils");

let linter;

beforeAll(async () => {
  linter = await linterForRule("tas-api-server-url-invalid");
  return linter;
});

function loadFixtureYaml(name) {
  const filePath = path.join(__dirname, `${name}.yaml`);
  const text = fs.readFileSync(filePath, "utf8");
  return yaml.load(text);
}

test("all server URLs in valid_spec.yaml are valid", () => {
  const doc = loadFixtureYaml("valid_spec");
  const oasDoc = {
    openapi: doc.openapi ?? "3.0.0",
    servers: doc.servers,
  };

  return linter.run(oasDoc).then((results) => {
    expect(results).toHaveLength(0);
  });
});

test("all server URLs in valid_spec.json are valid", () => {
  // Keep in sync with valid_spec.yaml
  const doc = require("./valid_spec.json");
  const oasDoc = {
    openapi: doc.openapi ?? "3.0.0",
    servers: doc.servers,
  };

  return linter.run(oasDoc).then((results) => {
    expect(results).toHaveLength(0);
  });
});

test("all server URLs in invalid_spec.yaml are invalid", () => {
  const doc = loadFixtureYaml("invalid_spec");
  const oasDoc = {
    openapi: doc.openapi ?? "3.0.0",
    servers: doc.servers,
  };

  return linter.run(oasDoc).then((results) => {
    expect(results).toHaveLength(doc.servers.length);
  });
});

test("all server URLs in invalid_spec.json are invalid", () => {
  const doc = require("./invalid_spec.json");
  const oasDoc = {
    openapi: doc.openapi ?? "3.0.0",
    servers: doc.servers,
  };

  return linter.run(oasDoc).then((results) => {
    expect(results).toHaveLength(doc.servers.length);
  });
});
