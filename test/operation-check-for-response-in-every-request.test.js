const { linterForRule } = require("./utils");

let linter;

beforeAll(async () => {
  linter = await linterForRule("tdp-check-for-response-in-every-request");
  return linter;
});

test("check-response-body should return null since all the response has body", () => {

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

test("check-response-body should return error message since the response block is missing", () => {

    const oasDoc = {
        "paths": {
          "/apis": {
            "get": {
            }
          }
        }
      };
    return linter.run(oasDoc).then((results) => {
        expect(results).toHaveLength(1);
        expect(results[0].message).toBe("Response body missing for the given request.");
      });

});