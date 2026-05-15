const { linterForRule } = require("./utils");

let linter;

beforeAll(async () => {
  linter = await linterForRule("tas-standard-metadata-fields-r2026");
  return linter;
});

test("tas-standard-metadata-fields-r2026 allows canonical metadata fields", () => {
  const oasDoc = {
    openapi: "3.0.0",
    components: {
      schemas: {
        Asset: {
          type: "object",
          properties: {
            createdAt: { type: "string", format: "date-time" },
            createdBy: {
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

test("tas-standard-metadata-fields-r2026 flags legacy metadata field names", () => {
  const oasDoc = {
    openapi: "3.0.0",
    components: {
      schemas: {
        Asset: {
          type: "object",
          properties: {
            createdAtDateTime: { type: "string", format: "date-time" },
            createdByUserTrn: { type: "string" },
          },
        },
      },
    },
  };
  return linter.run(oasDoc).then((results) => {
    expect(results.length).toBeGreaterThan(0);
  });
});

test("tas-standard-metadata-fields-r2026 ignores schemas without metadata fields", () => {
  const oasDoc = {
    openapi: "3.0.0",
    components: {
      schemas: {
        Asset: {
          type: "object",
          properties: {
            id: { type: "string" },
            name: { type: "string" },
          },
        },
      },
    },
  };
  return linter.run(oasDoc).then((results) => {
    expect(results).toHaveLength(0);
  });
});

test("tas-standard-metadata-fields-r2026 handles null properties safely", () => {
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

test("tas-standard-metadata-fields-r2026 validates timestamp and identity typing", () => {
  const oasDoc = {
    openapi: "3.0.0",
    components: {
      schemas: {
        Asset: {
          type: "object",
          properties: {
            createdAt: { type: "integer" },
            createdBy: { type: "integer" },
          },
        },
      },
    },
  };
  return linter.run(oasDoc).then((results) => {
    expect(
      results.some((result) =>
        result.message.includes('Metadata field "createdAt" should be type "string" with format "date-time".')
      )
    ).toBe(true);
    expect(
      results.some((result) =>
        result.message.includes('Metadata field "createdBy" should be type "string" and contain a TRN value.')
      )
    ).toBe(true);
  });
});

test("tas-standard-metadata-fields-r2026 validates TRN example and pairing", () => {
  const oasDoc = {
    openapi: "3.0.0",
    components: {
      schemas: {
        Asset: {
          type: "object",
          properties: {
            updatedBy: { type: "string", example: "not-a-trn" },
            deletedAt: { type: "string", format: "date-time" },
          },
        },
      },
    },
  };
  return linter.run(oasDoc).then((results) => {
    expect(
      results.some((result) =>
        result.message.includes('Metadata field "updatedBy" example should match a TRN value.')
      )
    ).toBe(true);
    expect(
      results.some((result) =>
        result.message.includes('Metadata fields "deletedAt" and "deletedBy" should be used together.')
      )
    ).toBe(true);
  });
});
