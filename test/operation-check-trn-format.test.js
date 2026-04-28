const { linterForRule } = require("./utils");

let linter;

beforeAll(async () => {
  linter = await linterForRule("tas-trn-format");
  return linter;
});

test("tas-trn-format allows valid TRN examples", () => {
  const oasDoc = {
    openapi: "3.0.0",
    components: {
      schemas: {
        Asset: {
          type: "object",
          properties: {
            ownerTrn: {
              type: "string",
              example: "trn:2:iam:users:4455ecd5-38fd-4ede-810d-8494b7d7e5ad",
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

test("tas-trn-format flags invalid TRN examples", () => {
  const oasDoc = {
    openapi: "3.0.0",
    components: {
      schemas: {
        Asset: {
          type: "object",
          properties: {
            ownerTrn: {
              type: "string",
              example: "urn:example:abc",
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

test("tas-trn-format validates TRN field type when x-trimble-format is used", () => {
  const oasDoc = {
    openapi: "3.0.0",
    components: {
      schemas: {
        Asset: {
          type: "object",
          properties: {
            owner: {
              type: "integer",
              "x-trimble-format": "trn",
            },
          },
        },
      },
    },
  };
  return linter.run(oasDoc).then((results) => {
    expect(results).toHaveLength(1);
    expect(results[0].message).toContain('should be type "string"');
  });
});

test("tas-trn-format validates enum values for TRN fields", () => {
  const oasDoc = {
    openapi: "3.0.0",
    components: {
      schemas: {
        Asset: {
          type: "object",
          properties: {
            ownerTrn: {
              type: "string",
              enum: ["trn:2:iam:users:4455ecd5-38fd-4ede-810d-8494b7d7e5ad", "invalid-trn"],
            },
          },
        },
      },
    },
  };
  return linter.run(oasDoc).then((results) => {
    expect(results).toHaveLength(1);
    expect(results[0].message).toContain("enum values should match TRN format");
  });
});

test("tas-trn-format ignores non-object schema values safely", () => {
  const oasDoc = {
    openapi: "3.0.0",
    components: {
      schemas: {
        Asset: {
          type: "object",
          properties: {
            ownerTrn: null,
          },
        },
      },
    },
  };
  return linter.run(oasDoc).then((results) => {
    expect(results).toHaveLength(0);
  });
});

test("tas-trn-format handles null properties safely", () => {
  const oasDoc = {
    openapi: "3.0.0",
    components: {
      schemas: {
        Asset: {
          type: "object",
          properties: null,
        },
      },
    },
  };
  return linter.run(oasDoc).then((results) => {
    expect(results).toHaveLength(0);
  });
});
