const { linterForRule } = require("./utils");

let linter;

beforeAll(async () => {
  linter = await linterForRule("tas-check-for-content-type-in-put-and-post-responses");
  return linter;
});

test("content-type-in-put-post-response should return null since all the put post response has the content-type block", () => {

    const oasDoc = {
        "paths": {
          "/apis": {
            "post": {
              "responses": {
                "201": {
                  "description": "Created",
                  "content": {
                    "application/json": {
                    }
                  }
                }
              }
            },
            "put": {
                "responses": {
                  "201": {
                    "description": "Created",
                    "content": {
                      "application/json": {
                      }
                    }
                  }
                }
              }
          }
        }
      };

    return linter.run(oasDoc).then((results) => {
        expect(results).toHaveLength(0);
      });
});

test("content-type-in-put-post-response should return error message since all the put post response has no the content-type block", () => {

    const oasDoc = {
        "paths": {
          "/apis": {
            "post": {
              "responses": {
                "201": {
                  "description": "Created"
                }
              }
            }
          }
        }
      };

    return linter.run(oasDoc).then((results) => {
        expect(results).toHaveLength(1);
        expect(results[0].message).toBe('Content block in the responses section should not be empty.');
      });
});

test("content-type-in-put-post-response should return error message since all the put post response has invalid the content-type block", () => {

    const oasDoc = {
        "paths": {
          "/apis": {
            "post": {
              "responses": {
                "201": {
                  "description": "Created",
                  "content": {
                  }
                }
              }
            }
          }
        }
      };

    return linter.run(oasDoc).then((results) => {
        expect(results).toHaveLength(1);
        expect(results[0].message).toBe('Invalid Content-Type provided.');
      });
});
