const { linterForRule } = require("./utils");

let linter;

beforeAll(async () => {
  linter = await linterForRule("tas-structured-data-format");
  return linter;
});


test("missing requestBody in post ", () => {
  const oasDoc = {
    openapi: "3.0.0",
    "paths": {
      "/apis": {
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
          "responses": {
            "201": {
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
          }
        }
      },
    },
  };
  return linter.run(oasDoc).then((results) => {
    expect(results.length).toBe(0)
    
  });
});

test("missing requestBody in POST ", () => {
  const oasDoc = {
    openapi: "3.0.0",
    "paths": {
      "/apis": {
        "POST": {
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
          "responses": {
            "201": {
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
          }
        }
      },
    },
  };
  return linter.run(oasDoc).then((results) => {
    expect(results.length).toBe(0)
    
  });
});

test("invalid request body in post", () => {
  const oasDoc = {
    openapi: "3.0.0",
    "paths": {
      "/apis": {
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
              "appli!cation": {
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
            "201": {
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
          }
        }
      },
    },
  };
  return linter.run(oasDoc).then((results) => {
    expect(results.length).toBe(1)
    expect(results[0].message).toBe("All APIs that accept a body MUST accept that body formatted as JSON. APIs MAY accept bodies in other formats.")
  });
});


test("missing content block in post", () => {
  const oasDoc = {
    openapi: "3.0.0",
    "paths": {
      "/apis": {
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
            
          },
          "responses": {
            "201": {
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
          }
        }
      },
    },
  };
  return linter.run(oasDoc).then((results) => {
    expect(results.length).toBe(1)
    expect(results[0].message).toBe("Content block missing in request body of POST call.")
  });
});


test("missing content block in put", () => {
  const oasDoc = {
    openapi: "3.0.0",
    "paths": {
      "/apis": {
        "put": {
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
            
          },
          "responses": {
            "201": {
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
          }
        }
      },
    },
  };
  return linter.run(oasDoc).then((results) => {
    expect(results.length).toBe(1)
    expect(results[0].message).toBe("Content block missing in request body of PUT call.")
  });
});


test("missing content block in PUT", () => {
  const oasDoc = {
    openapi: "3.0.0",
    "paths": {
      "/apis": {
        "PUT": {
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
            
          },
          "responses": {
            "201": {
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
          }
        }
      },
    },
  };
  return linter.run(oasDoc).then((results) => {
    expect(results.length).toBe(1)
    expect(results[0].message).toBe("Content block missing in request body of PUT call.")
  });
});

test("invalid request body for put call", () => {
  const oasDoc = {
    openapi: "3.0.0",
    "paths": {
      "/apis": {
        "put": {
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
              "appli!cation": {
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
            "201": {
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
          }
        }
      },
    },
  };
  return linter.run(oasDoc).then((results) => {
    expect(results.length).toBe(1)
    expect(results[0].message).toBe("All APIs that accept a body MUST accept that body formatted as JSON. APIs MAY accept bodies in other formats.")
  });
});


