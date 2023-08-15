const { linterForRule } = require("./utils");

let linter;

beforeAll(async () => {
  linter = await linterForRule("tdp-http-response-code");
  return linter;
});

test("tdp-http-response-code should return errors since the spec contains invalid http response code", () => {
  const oasDoc = {
    openapi: "3.0.0",
    "paths": {
      "/apis": {
        "get": {
          "description": "Get all apis",
          "operationId":"12",
          "tags": [
            "API Product Management"
          ],
          "parameters": [
            {
              "schema": {
                "type": "string"
              },
              "in": "header",
              "name": "team_uuid",
              "required": true,
              "description": "team uuid from the profiles"
            }
          ],
          "responses": {
            "2000": {
              "description": "OK",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "data": {
                      }
                    }
                  }
                }
              }
            }
          }
        },
       
      },
      "/apis/{api_id}/versions/{version_id}": {
        "get": {
          "operationId":"123",
          "description":"Get version details",
          "tags": [
            "API Product Management"
          ],
          "parameters": [
            {
              "name": "api_id",
              "in": "path",
              "required": true,
              "description": "The id of the api to retrieve",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "version_id",
              "in": "path",
              "required": true,
              "description": "The id of the version to retrieve",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "2!00": {
              "description": "OK",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "data": {
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "delete": {
          "operationId":"1234",
          "description":"Delete version",
          "tags": [
            "API Product Management"
          ],
          "parameters": [
            {
              "name": "api_id",
              "in": "path",
              "required": true,
              "description": "The id of the api to retrieve",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "version_id",
              "in": "path",
              "required": true,
              "description": "The id of the version to retrieve",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "204": {
              "description": "OK"
            }
          }
        }
      }
    },
  };
  return linter.run(oasDoc).then((results) => {
    
    expect(results.length).toBe(2);
    expect(results[0].message).toBe("All APIs should return a valid http response code.2000 is not a valid HTTP response code");
    expect(results[1].message).toBe("All APIs should return a valid http response code.2!00 is not a valid HTTP response code");
    
  });
});


