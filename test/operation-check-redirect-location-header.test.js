const { linterForRule } = require("./utils");

let linter;

beforeAll(async () => {
  linter = await linterForRule("tas-response-redirect-location");
  return linter;
});

test("tas-response-redirect-location allows 307 with Location", () => {
  const oasDoc = {
    openapi: "3.0.0",
    paths: {
      "/assets": {
        get: {
          responses: {
            307: {
              description: "Temporary Redirect",
              headers: {
                Location: {
                  schema: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
      },
    },
  };
  return linter.run(oasDoc).then((results) => {
    expect(results).toHaveLength(0);
  });
});

test("tas-response-redirect-location flags 308 without Location", () => {
  const oasDoc = {
    openapi: "3.0.0",
    paths: {
      "/assets": {
        get: {
          responses: {
            308: {
              description: "Permanent Redirect",
            },
          },
        },
      },
    },
  };
  return linter.run(oasDoc).then((results) => {
    expect(results).toHaveLength(1);
  });
});
