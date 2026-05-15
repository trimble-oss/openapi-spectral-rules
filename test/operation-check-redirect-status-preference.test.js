const { linterForRule } = require("./utils");

let linter;

beforeAll(async () => {
  linter = await linterForRule("tas-response-redirect-prefer-307-308");
  return linter;
});

test("tas-response-redirect-prefer-307-308 allows 307/308", () => {
  const oasDoc = {
    openapi: "3.0.0",
    paths: {
      "/assets": {
        get: {
          responses: {
            307: { description: "Temporary Redirect" },
            308: { description: "Permanent Redirect" },
          },
        },
      },
    },
  };
  return linter.run(oasDoc).then((results) => {
    expect(results).toHaveLength(0);
  });
});

test("tas-response-redirect-prefer-307-308 flags 301/302", () => {
  const oasDoc = {
    openapi: "3.0.0",
    paths: {
      "/assets": {
        get: {
          responses: {
            301: { description: "Moved Permanently" },
            302: { description: "Found" },
          },
        },
      },
    },
  };
  return linter.run(oasDoc).then((results) => {
    expect(results).toHaveLength(2);
  });
});
