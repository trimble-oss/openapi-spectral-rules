const { linterForRule } = require("./utils");

let linter;

beforeAll(async () => {
  linter = await linterForRule("tdp-operation-summary-description");
  return linter;
});

test("tdp-operation-summary-description should find summary and description not match", () => {
  const oasDoc = {
    openapi: "3.0.0",
    paths: {
      "/api/test1": {
        get: {
          summary: "Duplicate summary and description",
          description: "Duplicate summary and description",
          operationId: "getTest1",
        },
      },
      "/api/test2": {
        get: {
          summary: "Testing Case Insensitivity",
          description: "testing case insensitivity",
          operationId: "getTest2",
        },
      },
    },
  };
  return linter.run(oasDoc).then((results) => {
    expect(results).toHaveLength(2);
    expect(results[0].path.join(".")).toBe("paths./api/test1.get");
    expect(results[0].message).toBe("Summary and description should not match");
    expect(results[1].path.join(".")).toBe("paths./api/test2.get");
    expect(results[1].message).toBe("Summary and description should not match");
  });
});

test("tdp-summary-description should find description longer than summary", () => {
  const oasDoc = {
    openapi: "3.0.0",
    paths: {
      "/api/test3": {
        get: {
          summary: "Summary longer than description",
          description: "description",
          operationId: "getTest3",
        },
      },
      "/api/test4": {
        get: {
          summary: "Summary same length",
          description: "Description padding",
          operationId: "getTest4",
        },
      },
    },
  };
  return linter.run(oasDoc).then((results) => {
    expect(results).toHaveLength(2);
    expect(results[0].path.join(".")).toBe("paths./api/test3.get");
    expect(results[0].message).toBe(
      "Description should be longer than summary"
    );
    expect(results[1].path.join(".")).toBe("paths./api/test4.get");
    expect(results[1].message).toBe(
      "Description should be longer than summary"
    );
  });
});

test("tdp-summary-description should find no errors", () => {
  const oasDoc = {
    openapi: "3.0.0",
    paths: {
      "/api/test5": {
        get: {
          summary: "Summary",
          description: "Description",
          operationId: "getTest5",
        },
      },
    },
  };
  return linter.run(oasDoc).then((results) => {
    expect(results).toHaveLength(0);
  });
});
