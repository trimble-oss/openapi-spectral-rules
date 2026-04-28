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
    expect(results[0].message).toBe(
      "POST create endpoints should return a 201 or 202 response."
    );
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
    expect(results.length).toBe(0);
  });
});

test("tdp-operation-post-201-202-status-code allows POST searches with 200", () => {
  const oasDoc = {
    openapi: "3.0.0",
    paths: {
      "/api/geofences/searches": {
        post: {
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
    expect(results.length).toBe(0);
  });
});

test("tdp-operation-post-201-202-status-code flags POST searches without 200", () => {
  const oasDoc = {
    openapi: "3.0.0",
    paths: {
      "/api/geofences/searches": {
        post: {
          responses: {
            201: {
              description: "Created",
            },
          },
        },
      },
    },
  };
  return linter.run(oasDoc).then((results) => {
    expect(results.length).toBe(1);
    expect(results[0].message).toBe(
      "POST search endpoints should return a 200 response (for example, /searches)."
    );
  });
});

test("tdp-operation-post-201-202-status-code allows non-search POST with 201", () => {
  const oasDoc = {
    openapi: "3.0.0",
    paths: {
      "/api/resources": {
        post: {
          responses: {
            201: {
              description: "Created",
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

test("tdp-operation-post-201-202-status-code handles null responses safely", () => {
  const oasDoc = {
    openapi: "3.0.0",
    paths: {
      "/api/resources": {
        post: {
          responses: null,
        },
      },
    },
  };
  return linter.run(oasDoc).then((results) => {
    expect(results).toHaveLength(0);
  });
});
