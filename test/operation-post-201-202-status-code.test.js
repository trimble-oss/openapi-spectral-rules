const { linterForRule } = require("./utils");

let linter;

beforeAll(async () => {
  linter = await linterForRule("tdp-operation-post-201-202-status-code");
  return linter;
});

test("tdp-operation-post-201-202-status-code ", () => {
  const oasDoc = {
    openapi: "3.0.0",
    paths: {
      "/api/test1": {
        post: {
          response: {
            201: {
              description: "Created",
            },
          },
        },
      },
      "/api/test2": {
        post: {
          response: {
            202: {
              description: "Accepted",
            },
          },
        },
      },
    },
  };
  return linter.run(oasDoc).then((results) => {
    console.log(results);
    // expect(results.length).toBe(2);
    // expect(results[0].path.join(".")).toBe("paths./api/test1.post");
    // expect(results[0].message).toBe("Summary and description should not match");
    // expect(results[1].path.join(".")).toBe("paths./api/test2.post");
    // expect(results[1].message).toBe("Summary and description should not match");
  });
});
