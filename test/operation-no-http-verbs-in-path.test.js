const { linterForRule } = require("./utils");

let linter;

beforeAll(async () => {
  linter = await linterForRule("tas-no-http-verbs-in-path");
  return linter;
});

test("tas-no-http-verbs-in-path should find http verbs in path", () => {
  const oasDoc = {
    openapi: "3.0.0",
    paths: {
      "/api/post": {
        get: {
          summary: "Get all apis",
          description: "To get all apis from team",
          operationId: "getApi",
        },
      },
    },
  };
  return linter.run(oasDoc).then((results) => {
    expect(results).toHaveLength(1);
    expect(results[0].path.join(".")).toBe("paths./api/post");
    expect(results[0].message).toBe("/api/post has HTTP verb in path: Resource Path should not include HTTP verbs");
  });
});

test("tas-no-http-verbs-in-path should return nothing since no http verbs in path", () => {
  const oasDoc = {
    openapi: "3.0.0",
    paths: {
      "/apis/": {
        get: {
          summary: "Get all apis",
          description: "To get all apis from team",
          operationId: "getApi",
        },
      },
    },
  };
  return linter.run(oasDoc).then((results) => {
    expect(results).toHaveLength(0);
  });
});

