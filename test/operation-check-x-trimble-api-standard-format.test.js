const { linterForRule } = require("./utils");

let linter;

beforeAll(async () => {
  linter = await linterForRule("tas-info-x-trimble-api-standard-format");
  return linter;
});

test("tas-info-x-trimble-api-standard-format allows valid release format", () => {
  const oasDoc = {
    openapi: "3.0.0",
    info: {
      title: "Test API",
      version: "1.0.0",
      "x-trimble-api-standard": "R2026.1",
    },
  };
  return linter.run(oasDoc).then((results) => {
    expect(results).toHaveLength(0);
  });
});

test("tas-info-x-trimble-api-standard-format flags invalid release format", () => {
  const oasDoc = {
    openapi: "3.0.0",
    info: {
      title: "Test API",
      version: "1.0.0",
      "x-trimble-api-standard": "2026.1",
    },
  };
  return linter.run(oasDoc).then((results) => {
    expect(results).toHaveLength(1);
  });
});

test("tas-info-x-trimble-api-standard-format allows missing extension", () => {
  const oasDoc = {
    openapi: "3.0.0",
    info: {
      title: "Test API",
      version: "1.0.0",
    },
  };
  return linter.run(oasDoc).then((results) => {
    expect(results).toHaveLength(0);
  });
});

test("tas-info-x-trimble-api-standard-format handles null info", () => {
  const oasDoc = {
    openapi: "3.0.0",
    info: null,
  };
  return linter.run(oasDoc).then((results) => {
    expect(results).toHaveLength(0);
  });
});
