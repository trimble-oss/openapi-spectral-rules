const { linterForRule } = require("./utils");

let linter;

beforeAll(async () => {
  linter = await linterForRule("tas-check-description-for-all-error-responses");
  return linter;
});

test("check-description-for-all-error-responses should return null since all the response has the description", () => {

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
                },
                "400": {
                  "description": "Bad Request"
                },
                "403": {
                  "description": "Forbidden"
                },
                "409": {
                  "description": "Conflict"
                },
                "504": {
                  "description": "Gateway Timeout"
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

test("check-description-for-all-error-responses should return error message since the post 504 response has wrong description", () => {

    const oasDoc = {
        "paths": {
          "/apis": {
            "post": {
              "responses": {
                "201": {
                  "description": "Created",
                },
                "504": {
                  "description": "Bad Gateway"
                }
              }
            }
          }
        }
      };

    return linter.run(oasDoc).then((results) => {
        expect(results).toHaveLength(1);
        expect(results[0].message).toBe("Description for 504 response must be 'Gateway Timeout'.");
      });
});

test("check-description-for-all-error-responses should return error message since the post 500 response has Bad Gateway description", () => {

    const oasDoc = {
        "paths": {
          "/apis": {
            "post": {
              "responses": {
                "201": {
                  "description": "Created",
                },
                "500": {
                  "description": "Bad Request"
                }
              }
            }
          }
        }
      };

    return linter.run(oasDoc).then((results) => {
        expect(results).toHaveLength(1);
        expect(results[0].message).toBe("Description for 500 response must be 'Internal Server Error'.");
      });
});

test("check-description-for-all-error-responses should return error message since the post 409 response has Bad Gateway description", () => {

    const oasDoc = {
        "paths": {
          "/apis": {
            "post": {
              "responses": {
                "201": {
                  "description": "Created",
                },
                "409": {
                  "description": "Bad Request"
                }
              }
            }
          }
        }
      };

    return linter.run(oasDoc).then((results) => {
        expect(results).toHaveLength(1);
        expect(results[0].message).toBe("Description for 409 response must be 'Conflict'.");
      });
});

test("check-description-for-all-error-responses should return error message since the post 406 response has Bad Gateway description", () => {

    const oasDoc = {
        "paths": {
          "/apis": {
            "post": {
              "responses": {
                "406": {
                  "description": "Bad Error"
                }
              }
            }
          }
        }
      };

    return linter.run(oasDoc).then((results) => {
        expect(results).toHaveLength(1);
        expect(results[0].message).toBe("Description for 406 response must be 'Not Acceptable'.");
      });
});

test("check-description-for-all-error-responses should return error message since the post 405 response has Bad Gateway description", () => {

    const oasDoc = {
        "paths": {
          "/apis": {
            "post": {
              "responses": {
                "405": {
                  "description": "Bad Request"
                }
              }
            }
          }
        }
      };

    return linter.run(oasDoc).then((results) => {
        expect(results).toHaveLength(1);
        expect(results[0].message).toBe("Description for 405 response must be 'Method Not Allowed'.");
      });
});

test("check-description-for-all-error-responses should return error message since the post 404 response has Bad Gateway description", () => {

    const oasDoc = {
        "paths": {
          "/apis": {
            "post": {
              "responses": {
                "404": {
                  "description": "Bad Request"
                }
              }
            }
          }
        }
      };

    return linter.run(oasDoc).then((results) => {
        expect(results).toHaveLength(1);
        expect(results[0].message).toBe("Description for 404 response must be 'Not Found'.");
      });
});

test("check-description-for-all-error-responses should return error message since the post 403 response has Bad Gateway description", () => {

    const oasDoc = {
        "paths": {
          "/apis": {
            "post": {
              "responses": {
                "403": {
                  "description": "Bad Request"
                }
              }
            }
          }
        }
      };

    return linter.run(oasDoc).then((results) => {
        expect(results).toHaveLength(1);
        expect(results[0].message).toBe("Description for 403 response must be 'Forbidden'.");
      });
});

test("check-description-for-all-error-responses should return error message since the post 401 response has Bad Gateway description", () => {

    const oasDoc = {
        "paths": {
          "/apis": {
            "post": {
              "responses": {
                "401": {
                  "description": "Bad Request"
                }
              }
            }
          }
        }
      };

    return linter.run(oasDoc).then((results) => {
        expect(results).toHaveLength(1);
        expect(results[0].message).toBe("Description for 401 response must be 'Unauthorized'.");
      });
});

test("check-description-for-all-error-responses should return error message since the post 400 response has Bad Gateway description", () => {

    const oasDoc = {
        "paths": {
          "/apis": {
            "post": {
              "responses": {
                "400": {
                  "description": "Bad Error"
                }
              }
            }
          }
        }
      };

    return linter.run(oasDoc).then((results) => {
        expect(results).toHaveLength(1);
        expect(results[0].message).toBe("Description for 400 response must be 'Bad Request'.");
      });
});