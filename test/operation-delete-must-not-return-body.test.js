const { linterForRule } = require("./utils");

let linter;

beforeAll(async () => {
  linter = await linterForRule("tas-delete-must-not-return-body");
  return linter;
});

test("delete-must-not-return-body should return null since the delete response does not have body", () => {
  const oasDoc = {
    paths: {
      "/apis": {
        delete: {
          responses: {
            204: {},
          },
        },
      },
    },
  };

  return linter.run(oasDoc).then((results) => {
    expect(results).toHaveLength(0);
  });
});

test("delete-must-not-return-body should return error message since the delete response does have content body", () => {
  const oasDoc = {
    paths: {
      "/apis": {
        delete: {
          responses: {
            204: {
              description: "DELETED",
              content: {},
            },
          },
        },
      },
    },
  };

  return linter.run(oasDoc).then((results) => {
    expect(results).toHaveLength(1);
    expect(results[0].message).toBe(
      "Delete request must not have response body."
    );
  });
});
