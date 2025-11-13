const { linterForRule } = require("./utils");

let linter;

beforeAll(async () => {
  linter = await linterForRule("tas-standard-error-payload");
  return linter;
});

test("standard-error-payload should return error message since the responses does not have structured data", () => {
  const oasDoc = {
    openapi: "3.0.0",
    paths: {
      "/apis": {
        get: {
          responses: {
            401: {
              description: "Unauthorized",
              content: {},
            },
            403: {
              description: "Forbidden",
              content: {},
            },
          },
        },
      },
    },
  };

  return linter.run(oasDoc).then((results) => {
    expect(results).toHaveLength(1);
    expect(results[0].message).toBe(
      "All API error responses should return structured data in application/json format"
    );
  });
});

test("standard-error-payload should return error message since the content block is missing", () => {
  const oasDoc = {
    openapi: "3.0.0",
    paths: {
      "/apis": {
        get: {
          responses: {
            401: {
              description: "Unauthorized",
            },
          },
        },
      },
    },
  };

  return linter.run(oasDoc).then((results) => {
    expect(results).toHaveLength(1);
    expect(results[0].message).toBe(
      "Content block is missing in the error response body"
    );
  });
});

test("standard-error-payload should return error message since the schema block is missing", () => {
  const oasDoc = {
    openapi: "3.0.0",
    paths: {
      "/apis": {
        get: {
          responses: {
            401: {
              description: "Unauthorized",
              content: {
                "application/json": {},
              },
            },
          },
        },
      },
    },
  };

  return linter.run(oasDoc).then((results) => {
    expect(results).toHaveLength(1);
    expect(results[0].message).toBe(
      "Schema section is missing in the error response body"
    );
  });
});

test("standard-error-payload should return error message since schema is not an object", () => {
  const oasDoc = {
    openapi: "3.0.0",
    paths: {
      "/apis": {
        get: {
          responses: {
            401: {
              description: "Unauthorized",
              content: {
                "application/json": {
                  schema: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
      },
    },
  };

  return linter.run(oasDoc).then((results) => {
    expect(results).toHaveLength(1);
    expect(results[0].message).toBe(
      "Error response schema must be of type 'object'"
    );
  });
});

test("standard-error-payload should return error message since the properties block is missing", () => {
  const oasDoc = {
    openapi: "3.0.0",
    paths: {
      "/apis": {
        get: {
          responses: {
            401: {
              description: "Unauthorized",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                  },
                },
              },
            },
          },
        },
      },
    },
  };

  return linter.run(oasDoc).then((results) => {
    expect(results).toHaveLength(1);
    expect(results[0].message).toBe(
      "Properties section is missing in the error response schema"
    );
  });
});

test("standard-error-payload should return error message since the title is missing in error payload", () => {
  const oasDoc = {
    openapi: "3.0.0",
    paths: {
      "/apis": {
        get: {
          responses: {
            401: {
              description: "Unauthorized",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      type: {
                        type: "string",
                        format: "uri",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  };

  return linter.run(oasDoc).then((results) => {
    expect(results).toHaveLength(1);
    expect(results[0].message).toBe(
      "The error payload must contain 'title' property"
    );
  });
});

test("standard-error-payload should return error message since the type is missing in error payload", () => {
  const oasDoc = {
    openapi: "3.0.0",
    paths: {
      "/apis": {
        get: {
          responses: {
            401: {
              description: "Unauthorized",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      title: {
                        type: "string",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  };

  return linter.run(oasDoc).then((results) => {
    expect(results).toHaveLength(1);
    expect(results[0].message).toBe(
      "The error payload must contain 'type' property"
    );
  });
});

test("standard-error-payload should return error message since type property is not a string", () => {
  const oasDoc = {
    openapi: "3.0.0",
    paths: {
      "/apis": {
        get: {
          responses: {
            401: {
              description: "Unauthorized",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      type: {
                        type: "number",
                      },
                      title: {
                        type: "string",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  };

  return linter.run(oasDoc).then((results) => {
    expect(results).toHaveLength(1);
    expect(results[0].message).toBe(
      "The 'type' property must be of type 'string'"
    );
  });
});

test("standard-error-payload should return error message since title property is not a string", () => {
  const oasDoc = {
    openapi: "3.0.0",
    paths: {
      "/apis": {
        get: {
          responses: {
            401: {
              description: "Unauthorized",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      type: {
                        type: "string",
                        format: "uri",
                      },
                      title: {
                        type: "number",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  };

  return linter.run(oasDoc).then((results) => {
    expect(results).toHaveLength(1);
    expect(results[0].message).toBe(
      "The 'title' property must be of type 'string'"
    );
  });
});

test("standard-error-payload should return error message since type property format is not uri", () => {
  const oasDoc = {
    openapi: "3.0.0",
    paths: {
      "/apis": {
        get: {
          responses: {
            401: {
              description: "Unauthorized",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      type: {
                        type: "string",
                        format: "email",
                      },
                      title: {
                        type: "string",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  };

  return linter.run(oasDoc).then((results) => {
    expect(results).toHaveLength(1);
    expect(results[0].message).toBe(
      "The 'type' property format must be 'uri'"
    );
  });
});

test("standard-error-payload should return error message since status property is not a number", () => {
  const oasDoc = {
    openapi: "3.0.0",
    paths: {
      "/apis": {
        get: {
          responses: {
            401: {
              description: "Unauthorized",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      type: {
                        type: "string",
                        format: "uri",
                      },
                      title: {
                        type: "string",
                      },
                      status: {
                        type: "string",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  };

  return linter.run(oasDoc).then((results) => {
    expect(results).toHaveLength(1);
    expect(results[0].message).toBe(
      "The 'status' property must be of type 'integer'"
    );
  });
});

test("standard-error-payload should return error message since instance property is not a string", () => {
  const oasDoc = {
    openapi: "3.0.0",
    paths: {
      "/apis": {
        get: {
          responses: {
            401: {
              description: "Unauthorized",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      type: {
                        type: "string",
                        format: "uri",
                      },
                      title: {
                        type: "string",
                      },
                      instance: {
                        type: "number",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  };

  return linter.run(oasDoc).then((results) => {
    expect(results).toHaveLength(1);
    expect(results[0].message).toBe(
      "The 'instance' property must be of type 'string'"
    );
  });
});

test("standard-error-payload should return error message since instance property format is not uri", () => {
  const oasDoc = {
    openapi: "3.0.0",
    paths: {
      "/apis": {
        get: {
          responses: {
            401: {
              description: "Unauthorized",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      type: {
                        type: "string",
                        format: "uri",
                      },
                      title: {
                        type: "string",
                      },
                      instance: {
                        type: "string",
                        format: "email",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  };

  return linter.run(oasDoc).then((results) => {
    expect(results).toHaveLength(1);
    expect(results[0].message).toBe(
      "The 'instance' property format must be 'uri'"
    );
  });
});

test("standard-error-payload should return error message since detail property is not a string", () => {
  const oasDoc = {
    openapi: "3.0.0",
    paths: {
      "/apis": {
        get: {
          responses: {
            401: {
              description: "Unauthorized",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      type: {
                        type: "string",
                        format: "uri",
                      },
                      title: {
                        type: "string",
                      },
                      detail: {
                        type: "number",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  };

  return linter.run(oasDoc).then((results) => {
    expect(results).toHaveLength(1);
    expect(results[0].message).toBe(
      "The 'detail' property must be of type 'string'"
    );
  });
});

test("standard-error-payload should return error message since errors property is not an array", () => {
  const oasDoc = {
    openapi: "3.0.0",
    paths: {
      "/apis": {
        get: {
          responses: {
            401: {
              description: "Unauthorized",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      type: {
                        type: "string",
                        format: "uri",
                      },
                      title: {
                        type: "string",
                      },
                      errors: {
                        type: "string",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  };

  return linter.run(oasDoc).then((results) => {
    expect(results).toHaveLength(1);
    expect(results[0].message).toBe(
      "The 'errors' property must be of type 'array'"
    );
  });
});

test("standard-error-payload should return null since the RFC7807-compliant error payload is provided", () => {
  const oasDoc = {
    openapi: "3.0.0",
    paths: {
      "/apis": {
        get: {
          responses: {
            401: {
              description: "Unauthorized",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      type: {
                        type: "string",
                        format: "uri",
                      },
                      title: {
                        type: "string",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  };

  return linter.run(oasDoc).then((results) => {
    expect(results).toHaveLength(0);
  });
});

test("standard-error-payload should return null for non-error status codes", () => {
  const oasDoc = {
    openapi: "3.0.0",
    paths: {
      "/apis": {
        get: {
          responses: {
            200: {
              description: "Success",
              content: {
                "application/json": {
                  schema: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
      },
    },
  };

  return linter.run(oasDoc).then((results) => {
    expect(results).toHaveLength(0);
  });
});
