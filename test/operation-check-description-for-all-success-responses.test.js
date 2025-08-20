const { linterForRule } = require("./utils");

let linter;

beforeAll(async () => {
  linter = await linterForRule("tas-check-description-for-all-success-responses");
  return linter;
});

test("check-description-for-all-success-responses should return null since all the successful response has the right description", () => {

    const oasDoc = {
        "paths": {
          "/apis": {
            "get": {
              "responses": {
                "200": {
                  "description": "OK"
                }
              }
            },
            "post": {
              "responses": {
                "201": {
                  "description": "Created",
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

test("check-description-for-all-success-responses should return error message since the get response 200 has wrong description", () => {

    const oasDoc = {
        "paths": {
          "/apis": {
            "get": {
              "responses": {
                "200": {
                  "description": "OKAY"
                }
              }
            }
          }
        }
      };

    return linter.run(oasDoc).then((results) => {
        expect(results).toHaveLength(1);
        expect(results[0].message).toBe("Description for 200 get response must be 'OK'.");
      });
});

test("check-description-for-all-success-responses should return error message since the get response 206 has wrong description", () => {

    const oasDoc = {
        "paths": {
          "/apis": {
            "get": {
              "responses": {
                "206": {
                  "description": "WRONG"
                }
              }
            }
          }
        }
      };

    return linter.run(oasDoc).then((results) => {
        expect(results).toHaveLength(1);
        expect(results[0].message).toBe("Description for 206 get response must be 'Partial Content'.");
      });
});

test("check-description-for-all-success-responses should return error message since the post response 200 has wrong description", () => {

    const oasDoc = {
        "paths": {
          "/apis": {
            "post": {
              "responses": {
                "200": {
                  "description": "OKAY"
                }
              }
            }
          }
        }
      };

    return linter.run(oasDoc).then((results) => {
        expect(results).toHaveLength(1);
        expect(results[0].message).toBe("Description for 200 post response must be 'OK'.");
      });
});

test("check-description-for-all-success-responses should return error message since the post response 202 has wrong description", () => {

    const oasDoc = {
        "paths": {
          "/apis": {
            "post": {
              "responses": {
                "202": {
                  "description": "OKAY"
                }
              }
            }
          }
        }
      };

    return linter.run(oasDoc).then((results) => {
        expect(results).toHaveLength(1);
        expect(results[0].message).toBe("Description for 202 post response must be 'Accepted'.");
      });
});

test("check-description-for-all-success-responses should return error message since the post response 201 has wrong description", () => {

    const oasDoc = {
        "paths": {
          "/apis": {
            "post": {
              "responses": {
                "201": {
                  "description": "OKAY"
                }
              }
            }
          }
        }
      };

    return linter.run(oasDoc).then((results) => {
        expect(results).toHaveLength(1);
        expect(results[0].message).toBe("Description for 201 post response must be 'Created'.");
      });
});

test("check-description-for-all-success-responses should return error message since the delete response 204 has wrong description", () => {

    const oasDoc = {
        "paths": {
          "/apis": {
            "delete": {
              "responses": {
                "204": {
                  "description": "OKAY"
                }
              }
            }
          }
        }
      };

    return linter.run(oasDoc).then((results) => {
        expect(results).toHaveLength(1);
        expect(results[0].message).toBe("Description for 204 delete response must be 'No Content'.");
      });
});


test("check-description-for-all-success-responses should return error message since the patch response 200 has wrong description", () => {

    const oasDoc = {
        "paths": {
          "/apis": {
            "patch": {
              "responses": {
                "200": {
                  "description": "OKAY"
                }
              }
            }
          }
        }
      };

    return linter.run(oasDoc).then((results) => {
        expect(results).toHaveLength(1);
        expect(results[0].message).toBe("Description for 200 patch response must be 'OK'.");
      });
});