const { linterForRule } = require("./utils");

let linter;

beforeAll(async () => {
  linter = await linterForRule("tas-pagination-links-structure");
  return linter;
});

test("tas-pagination-links-structure allows valid paginated response shape", () => {
  const oasDoc = {
    openapi: "3.0.0",
    paths: {
      "/assets": {
        get: {
          parameters: [
            { in: "query", name: "pageIndex", schema: { type: "integer" } },
            { in: "query", name: "pageSize", schema: { type: "integer" } },
          ],
          responses: {
            200: {
              description: "OK",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      pageIndex: { type: "integer" },
                      totalItems: { type: "integer" },
                      items: { type: "array", items: { type: "object" } },
                      links: {
                        type: "object",
                        properties: {
                          self: { type: "string" },
                          first: { type: "string" },
                        },
                      },
                    },
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

test("tas-pagination-links-structure flags missing links metadata", () => {
  const oasDoc = {
    openapi: "3.0.0",
    paths: {
      "/assets": {
        get: {
          parameters: [
            { in: "query", name: "pageIndex", schema: { type: "integer" } },
          ],
          responses: {
            200: {
              description: "OK",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      items: { type: "array", items: { type: "object" } },
                    },
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
    expect(results.length).toBeGreaterThan(0);
  });
});

test("tas-pagination-links-structure skips non-paginated operations", () => {
  const oasDoc = {
    openapi: "3.0.0",
    paths: {
      "/assets": {
        get: {
          responses: {
            200: {
              description: "OK",
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

test("tas-pagination-links-structure handles operations without responses", () => {
  const oasDoc = {
    openapi: "3.0.0",
    paths: {
      "/assets": {
        get: {
          "x-trimble-pagination": true,
        },
      },
    },
  };
  return linter.run(oasDoc).then((results) => {
    expect(results).toHaveLength(0);
  });
});

test("tas-pagination-links-structure flags missing object schema for paginated operation", () => {
  const oasDoc = {
    openapi: "3.0.0",
    paths: {
      "/assets": {
        get: {
          "x-trimble-pagination": true,
          responses: {
            200: {
              description: "OK",
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

test("tas-pagination-links-structure flags non-object links field", () => {
  const oasDoc = {
    openapi: "3.0.0",
    paths: {
      "/assets": {
        get: {
          parameters: [{ in: "query", name: "pageSize", schema: { type: "integer" } }],
          responses: {
            200: {
              description: "OK",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      items: { type: "array", items: { type: "object" } },
                      links: { type: "array" },
                    },
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
    expect(results.some((result) => result.message.includes('"links" field should be an object'))).toBe(true);
  });
});

test("tas-pagination-links-structure flags links missing self and first", () => {
  const oasDoc = {
    openapi: "3.0.0",
    paths: {
      "/assets": {
        get: {
          parameters: [{ in: "query", name: "pageSize", schema: { type: "integer" } }],
          responses: {
            200: {
              description: "OK",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      items: { type: "array", items: { type: "object" } },
                      links: { type: "object", properties: {} },
                    },
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
    const linkKeyErrors = results.filter((result) =>
      result.message.includes('The "links" object should include')
    );
    expect(linkKeyErrors).toHaveLength(2);
  });
});

test("tas-pagination-links-structure flags missing items field", () => {
  const oasDoc = {
    openapi: "3.0.0",
    paths: {
      "/assets": {
        get: {
          parameters: [{ in: "query", name: "pageSize", schema: { type: "integer" } }],
          responses: {
            200: {
              description: "OK",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      links: {
                        type: "object",
                        properties: {
                          self: { type: "string" },
                          first: { type: "string" },
                        },
                      },
                    },
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
    expect(results.some((result) => result.message.includes('"items" field'))).toBe(true);
  });
});
