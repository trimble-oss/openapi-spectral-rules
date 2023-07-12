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
          responses: {
            400: {
              description: "Created",
            },
          },
        },
      },
    },
  };
  return linter.run(oasDoc).then((results) => {
    expect(results.length).toBe(1);
    expect(results[0].path.join(".")).toBe("paths./api/test1.post.responses");
    expect(results[0].message).toBe("All POST methods should have a 201 or 202 response.");
  });
});


test("tdp-operation-post-201-202-status-code ", () => {
  const oasDoc = {
    openapi: "3.0.0",
    paths: {
      "/api/test1": {
      },
    },
  };
  return linter.run(oasDoc).then((results) => {
    console.log(results);
    expect(results.length).toBe(0);
  });
});
