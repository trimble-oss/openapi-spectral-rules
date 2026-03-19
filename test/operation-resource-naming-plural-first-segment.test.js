const { linterForRule } = require("./utils");

let linter;

beforeAll(async () => {
  linter = await linterForRule("tas-resource-naming-plural-first-segment");
  return linter;
});

test("tas-resource-naming-plural-first-segment should flag singular first segment", () => {
  const oasDoc = {
    openapi: "3.0.0",
    paths: {
      "/shipper/123": {
        get: {
          summary: "Get shipper",
          operationId: "getShipper",
        },
      },
    },
  };
  return linter.run(oasDoc).then((results) => {
    expect(results).toHaveLength(1);
    expect(results[0].message).toContain("MUST be plural");
    expect(results[0].message).toContain("shipper");
  });
});

test("tas-resource-naming-plural-first-segment should accept plural first segment", () => {
  const oasDoc = {
    openapi: "3.0.0",
    paths: {
      "/shippers/123": {
        get: {
          summary: "Get shipper",
          operationId: "getShipper",
        },
      },
    },
  };
  return linter.run(oasDoc).then((results) => {
    expect(results).toHaveLength(0);
  });
});

test("tas-resource-naming-plural-first-segment should accept common irregular plurals", () => {
  const oasDoc = {
    openapi: "3.0.0",
    paths: {
      "/people/123": {
        get: {
          summary: "Get person",
          operationId: "getPerson",
        },
      },
    },
  };
  return linter.run(oasDoc).then((results) => {
    expect(results).toHaveLength(0);
  });
});
