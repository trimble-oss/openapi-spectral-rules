const { linterForRule } = require("./utils");

let linter;

beforeAll(async () => {
  linter = await linterForRule("tas-check-content-type-for-206-get-response-code");
  return linter;
});

test("valid-get-response-code should return null since the GET response 206 has both the content-type and the content-range", () => {

    const oasDoc = {
        openapi: "3.0.0",
        paths: {
            "/apis": {
              "get": {
                "responses": {
                    "206": {
                      "description": "Partial Content",
                      "headers":{
                        "content-type":{
                          "schema":{
                            "type": "string"
                          },
                          "description": "image/gif"
                        },
                        "content-range":{
                          "schema":{
                            "type": "string"
                          },
                          "description": "bytes 21010-47021/47022"
                        }
                      }
                    }
                  }
              }
            },
        },
      };

    return linter.run(oasDoc).then((results) => {
        expect(results).toHaveLength(0);
      });
});

test("valid-get-response-code should return error message since the GET response 206 is missing both the content-type and the content-range", () => {

    const oasDoc = {
        openapi: "3.0.0",
        paths: {
            "/apis": {
              "get": {
                "responses": {
                    "206": {
                      "description": "Partial Content",
                      "headers":{
                        "content":{
                          "schema":{
                            "type": "string"
                          },
                          "description": "image/gif"
                        },
                        "content":{
                          "schema":{
                            "type": "string"
                          },
                          "description": "bytes 21010-47021/47022"
                        }
                      }
                    }
                  }
              }
            },
        },
      };

    return linter.run(oasDoc).then((results) => {
        expect(results).toHaveLength(1);
        expect(results[0].message).toBe("GET response code 206 should have Content-Type and Content-Range in the header.");
        expect(results[0].path.join(".")).toBe("paths./apis");
      });
});


test("valid-get-response-code should return error message since header block is missing in the 206 GET response", () => {

    const oasDoc = {
        openapi: "3.0.0",
        paths: {
            "/apis": {
              "GET": {
                "responses": {
                    "206": {}
                  }
              }
            },
        },
      };

    return linter.run(oasDoc).then((results) => {
        expect(results).toHaveLength(1);
        expect(results[0].message).toBe("Header block missing in the GET method 206 response code.");
        expect(results[0].path.join(".")).toBe("paths./apis");
      });
});

