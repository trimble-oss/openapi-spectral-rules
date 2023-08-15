const { linterForRule } = require("./utils");

let linter;

beforeAll(async () => {
  linter = await linterForRule("tas-standard-error-payload");
  return linter;
});

test("standard-error-payload should return error message since the responses does not have structured data", () => {
  const oasDoc = {
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
      "All api should return structured data format"
    );
  });
});

test("standard-error-payload should return error message since the content block is missing", () => {
  const oasDoc = {
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
      "Schema section is missing in the response body"
    );
  });
});

test("standard-error-payload should return error message since the properties block is missing", () => {
  const oasDoc = {
    paths: {
      "/apis": {
        get: {
          responses: {
            401: {
              description: "Unauthorized",
              content: {
                "application/json": {
                  schema: {},
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
      "Properties section is missing in the response body"
    );
  });
});

test("standard-error-payload should return error message since the title is missing in error payload", () => {
  const oasDoc = {
    paths: {
      "/apis": {
        get: {
          responses: {
            401: {
              description: "Unauthorized",
              content: {
                "application/json": {
                  schema: {
                    properties: {},
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
      "The error payload must contain title property"
    );
  });
});

test("standard-error-payload should return error message since the message is missing in error payload", () => {
  const oasDoc = {
    paths: {
      "/apis": {
        get: {
          responses: {
            401: {
              description: "Unauthorized",
              content: {
                "application/json": {
                  schema: {
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
      "The error payload must contain message property"
    );
  });
});

test("standard-error-payload should return error message since the title is links in error payload", () => {
  const oasDoc = {
    paths: {
      "/apis": {
        get: {
          responses: {
            401: {
              description: "Unauthorized",
              content: {
                "application/json": {
                  schema: {
                    properties: {
                      title: {
                        type: "string",
                      },
                      message: {
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
      "The error payload must contain links property"
    );
  });
});

test("standard-error-payload should return error message since the title is requestId in error payload", () => {
  const oasDoc = {
    paths: {
      "/apis": {
        get: {
          responses: {
            401: {
              description: "Unauthorized",
              content: {
                "application/json": {
                  schema: {
                    properties: {
                      title: {
                        type: "string",
                      },
                      message: {
                        type: "string",
                      },
                      links: {
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
      "The error payload must contain requestId property"
    );
  });
});

test("standard-error-payload should return error message since the title is missing in lang payload", () => {
  const oasDoc = {
    paths: {
      "/apis": {
        get: {
          responses: {
            401: {
              description: "Unauthorized",
              content: {
                "application/json": {
                  schema: {
                    properties: {
                      title: {
                        type: "string",
                      },
                      message: {
                        type: "string",
                      },
                      links: {
                        type: "string",
                      },
                      requestId: {
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
      "The error payload must contain lang property"
    );
  });
});

test("standard-error-payload should return null since the standard error payload is provided", () => {
  const oasDoc = {
    paths: {
      "/apis": {
        get: {
          responses: {
            401: {
              description: "Unauthorized",
              content: {
                "application/json": {
                  schema: {
                    properties: {
                      title: {
                        type: "string",
                      },
                      message: {
                        type: "string",
                      },
                      links: {
                        type: "string",
                      },
                      requestId: {
                        type: "string",
                      },
                      lang: {
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
