const { linterForRule } = require("./utils");

let linter;

beforeAll(async () => {
  linter = await linterForRule("tdp-check-for-path-parameters-in-parameter-block");
  return linter;
});

test("check-for-path-parameters-in-parameter-block should return null since the path parameters are mentioned in the parameter block", () => {

    const oasDoc = {
        "paths": {
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
              ]
            }
          }
        }
      };

    return linter.run(oasDoc).then((results) => {
        expect(results).toHaveLength(0);
      });

});

test("check-for-path-parameters-in-parameter-block should return error message since the path parameters are not mentioned in the parameter block", () => {

    const oasDoc = {
        "paths": {
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
                  "name": "id",
                  "in": "header",
                  "required": true,
                  "description": "The id of the version to retrieve",
                  "schema": {
                    "type": "string"
                  }
                }
              ]
            }
          }
        }
      };

    return linter.run(oasDoc).then((results) => {
        expect(results).toHaveLength(1);
        expect(results[0].message).toBe("The  path parameter 'version_id' was not mentioned in the 'name' field of parameters block for 'get' request.")
      });

});

test("check-for-path-parameters-in-parameter-block should return error message since the parameter block is missing", () => {

    const oasDoc = {
        "paths": {
          "/apis/{api_id}/versions/{version_id}": {
            "get": {
              "operationId":"123",
              "description":"Get version details",
              "tags": [
                "API Product Management"
              ]
            }
          }
        }
      };

    return linter.run(oasDoc).then((results) => {
        expect(results).toHaveLength(1);
        expect(results[0].message).toBe("The path does not contains parameters block for path parameters.");
      });

});

test("check-for-path-parameters-in-parameter-block should return error message since there are duplicate path parameter values in path", () => {

    const oasDoc = {
        "paths": {
          "/apis/{api_id}/versions/{version_id}/{api_id}": {
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
              ]
            }
          },
          "/apis/{deploy}": {
            "get": {
              "operationId":"123",
              "description":"Get version details",
              "tags": [
                "API Product Management"
              ],
              "parameters": [
                {
                    "name": "deploy",
                    "in": "path",
                    "required": true,
                    "description": "The id of the api to retrieve",
                    "schema": {
                      "type": "string"
                    }
                  }
              ]
            }
          }
        }
      };

    return linter.run(oasDoc).then((results) => {
        expect(results).toHaveLength(1);
        expect(results[0].message).toBe("The path parameters has duplicate values.");
      });

});

test("check-for-path-parameters-in-parameter-block should return null since there are no path parameters in the path", () => {

    const oasDoc = {
        "paths": {
          "/apis/versions/": {
            "get": {
              "operationId":"123",
              "description":"Get version details",
              "tags": [
                "API Product Management"
              ]
            }
          }
        }
      };

    return linter.run(oasDoc).then((results) => {
        expect(results).toHaveLength(0);
      });

});

test("check-for-path-parameters-in-parameter-block should return null since there are no path parameters in the path", () => {

  const oasDoc = {
      "paths": {
        "/apis/": {
          "get": {
            "operationId":"123",
            "description":"Get version details",
            "tags": [
              "API Product Management"
            ],
            "parameters": [
              {
                  "name": "deploy",
                  "in": "path",
                  "required": true,
                  "description": "The id of the api to retrieve",
                  "schema": {
                    "type": "string"
                  }
                }
            ]
          }
        }
      }
    };

  return linter.run(oasDoc).then((results) => {
      expect(results).toHaveLength(1);
      expect(results[0].message).toBe("No path parameters mentioned in the path.");
    });

});

test("check-for-path-parameters-in-parameter-block should return null since there are no path parameters in the path", () => {

  const oasDoc = {
      "paths": {
        "/apis/": {
          "get": {
            "operationId":"123",
            "description":"Get version details",
            "tags": [
              "API Product Management"
            ],
            "parameters": [
              {
                  "name": "deploy",
                  "in": "path",
                  "required": true,
                  "description": "The id of the api to retrieve",
                  "schema": {
                    "type": "string"
                  }
                }
            ]
          }
        }
      }
    };

  return linter.run(oasDoc).then((results) => {
      expect(results).toHaveLength(1);
      expect(results[0].message).toBe("No path parameters mentioned in the path.");
    });

});

test("check-for-path-parameters-in-parameter-block should return error message since there are no path values in the parameter", () => {

  const oasDoc = {
      "paths": {
        "/apis/{deploy}": {
          "get": {
            "operationId":"123",
            "description":"Get version details",
            "tags": [
              "API Product Management"
            ],
            "parameters": [
              {
                  "name": "deploy",
                  "in": "header",
                  "required": true,
                  "description": "The id of the api to retrieve",
                  "schema": {
                    "type": "string"
                  }
                }
            ]
          }
        }
      }
    };

  return linter.run(oasDoc).then((results) => {
      expect(results).toHaveLength(1);
      expect(results[0].message).toBe("The  path parameter 'deploy' was not mentioned in the 'name' field of parameters block for 'get' request.");
    });

});


test("check-for-path-parameters-in-parameter-block should return error message since there are no path values in the parameter", () => {

  const oasDoc = {
      "paths": {
        "/apis/{deploy}": {
          "get": {
            "operationId":"123",
            "description":"Get version details",
            "tags": [
              "API Product Management"
            ],
            "parameters": [
              {
                  "name": "deploy",
                  "in": "Bath",
                  "required": true,
                  "description": "The id of the api to retrieve",
                  "schema": {
                    "type": "string"
                  }
                }
            ]
          }
        }
      }
    };

  return linter.run(oasDoc).then((results) => {
      expect(results).toHaveLength(1);
      expect(results[0].message).toBe("The path does not contains 'path' value in 'in' field of /apis/{deploy} - get parameters block.");
    });

});