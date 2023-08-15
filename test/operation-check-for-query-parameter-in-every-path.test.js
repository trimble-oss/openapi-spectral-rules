const { linterForRule } = require("./utils");

let linter;

beforeAll(async () => {
  linter = await linterForRule("tas-check-queryparameter-in-endpoint");
  return linter;
});

test("tas-check-queryparameter-in-endpoint should restrict query param in path", () => {
  const oasDoc = {
    openapi: "3.0.0",
    "paths": {
      "/apis?var=1": {
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
        "post": {
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
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "name": {
                      "type": "string",
                      "description": "Name of the api product"
                    },
                    "description": {
                      "type": "string"
                    },
                    "basePath": {
                      "type": "object",
                      "description": "alternate basepath of the api product"
                    },
                    "tags": {
                      "type": "array",
                      "items": {
                        "type": "string"
                      }
                    },
                    "apiType": {
                      "type": "string",
                      "example": "TEAM | PUBLIC"
                    },
                    "apiInternal": {
                      "type": "boolean"
                    },
                    "approvalType": {
                      "type": "string",
                      "example": "MANUAL | AUTO"
                    }
                  },
                  "required": [
                    "name",
                    "description",
                    "api_type",
                    "api_internal"
                  ]
                },
                "examples": {
                  "create-api": {
                    "value": {
                      "name": "example-api",
                      "description": "Example API description",
                      "base_path": "example",
                      "tags": [
                        "proxy",
                        "api"
                      ],
                      "api_type": "TEAM",
                      "api_internal": true,
                      "approval_type": "MANUAL"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "2!01": {
              "description": "Created",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "uuid": {
                        "type": "string"
                      }
                    }
                  },
                  "examples": {
                    "create-api-response": {
                      "value": {
                        "uuid": "de412c72-f457-4f1b-81b7-73b99e6dbd92"
                      }
                    }
                  }
                }
              }
            },
            "409": {
              "description": "Conflict",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "code": {
                        "type": "string"
                      },
                      "message": {
                        "type": "string"
                      }
                    }
                  },
                  "examples": {
                    "api-name-exists": {
                      "value": {
                        "code": "CT1001",
                        "message": "API name already exists"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
    },
  };
  return linter.run(oasDoc).then((results) => {
    expect(results.length).toBe(1)
    expect(results[0].message).toBe("Query parameters should not be used in the path. Provide the query params under the Parameters block as in : query.")
  });
});




