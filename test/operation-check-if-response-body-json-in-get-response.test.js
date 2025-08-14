const { linterForRule } = require("./utils");

let linter;

beforeAll(async () => {
  linter = await linterForRule("tas-structured-data-format-support-json-response-body");
  return linter;
});


test("missing requestBody in get ", () => {
  const oasDoc = {
    openapi: "3.0.0",
    "paths": {
      "/apis": {
        "get": {
          "tags": [
            "API Product Management"
          ],
          "summary": "Create a team api",
          "description": "This is used to create the team apis",
          "operationId":"1",
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
          
        }
      },
    },
  };
  return linter.run(oasDoc).then((results) => {
    
    expect(results.length).toBe(1)
    expect(results[0].message).toBe("Responses block missing in GET method.")
  });
});


test("missing requestBody in GET ", () => {
    const oasDoc = {
      openapi: "3.0.0",
      "paths": {
        "/apis": {
          "GET": {
            "tags": [
              "API Product Management"
            ],
            "summary": "Create a team api",
            "description": "This is used to create the team apis",
            "operationId":"1",
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
            
          }
        },
      },
    };
    return linter.run(oasDoc).then((results) => {
      
      expect(results.length).toBe(1)
      expect(results[0].message).toBe("Responses block missing in GET method.")
    });
  });


test("missing 200 response code in get ", () => {
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
            }
          },
          
        },
      },
    };
    return linter.run(oasDoc).then((results) => {
      
      expect(results.length).toBe(1)
      expect(results[0].message).toBe("GET call must return a 200 response.")
    });
  });


  test("missing content block in reponse body", () => {
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
                "200": {
                    "description": "OK",
                    
                  }
            }
          },
          
        },
      },
    };
    return linter.run(oasDoc).then((results) => {
      
      expect(results.length).toBe(1)
      expect(results[0].message).toBe("Content block missing in 200 response block of GET call.")
    });
  });


  test("missing application/json reponse body", () => {
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
                "200": {
                  "description": "OK",
                  "content": {
                    "json": {
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
      },
    };
    return linter.run(oasDoc).then((results) => {
      
      expect(results.length).toBe(1)
      expect(results[0].message).toBe("All APIs that return structured data should be able to return that data formatted as JSON at a minimum and as the default.")
    });
  });