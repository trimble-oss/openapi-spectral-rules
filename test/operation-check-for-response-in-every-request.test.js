const { linterForRule } = require("./utils");

let linter;

beforeAll(async () => {
  linter = await linterForRule("tdp-check-for-response-in-every-request");
  return linter;
});

test("check-response-body should return null since all the response has body", () => {

    const oasDoc = {
        "paths": {
          "/clients/{clientId}/tariffClasses/{tariffClassId}": {
            "get": {
              "summary": "Retrieve a client tariff class",
              "description": "Retrieves a client tariff class record for the specified client.\n\nClient tariff classes can be viewed in the Customer & Vendor Profiles application > Customer > Rating > Tariff Class tab.",
              "operationId": "ClientsGetTariffClasses",
              "security": [
                {
                  "truckmateApiKeyAuth": []
                }
              ],
              "tags": ["Clients"],
              "parameters": [
                {
                  "name": "string"
                }
              ],
              "responses": {
                "200": {
                  "description": "OK",
                  "content": {
                    "application/json": {
                      "schema": {
                        "name": "string"
                      }
                    }
                  }
                }
              }
            },
            "put": {
              "summary": "Update a client tariff class",
              "description": "Updates one or more properties of a specific client tariff class record for the specified client.\n\nThe effectiveFrom and effectiveTo dates are auto-populated based on the following app config options:\n\n- PROFILE.EXE > Default Customer Rating Effective Date Logic\n\n- PROFILE.EXE > Default Customer Rating Expiry Date Logic\n\nThe effectiveFrom date must be prior to the effectiveTo date.\n\nThe request body may include the multi service level child resource. Keep in mind when a child resource is specified in the body, it will do a complete replace of that resource. In other words, it will DELETE ALL records of the specified resource in the vendor record, and insert the new ones from the request body.\n\nThe customSQL will be added to the WHERE clause of the following SQL statement:\n\n\tSELECT COUNT(*) FROM CMODTY C\n\tINNER JOIN RATE_CL_TARIFF_CLASS T ON C.CLASS = T.TARIFF_CLASS\n\tWHERE T.CLIENT_ID = :clientId AND C.CLASS = :tariffClass\n\tAND\nwhere :clientId is the client Id, :tariffClass is the Tariff Class (tariffClassFrom) in the request.\n\nClient tariff classes can be viewed in the Customer & Vendor Profiles application > Customer > Rating > Tariff Class tab.\n\nApp config options can be viewed in the Application Configurator application.",
              "operationId": "ClientsPutTariffClasses",
              "security": [
                {
                  "truckmateApiKeyAuth": []
                }
              ],
              "tags": ["Clients"],
              "requestBody": {
                "description": "A single JSON object containing the properties to be updated. All fields are optional, but at least one field must be sent.",
                "required": true,
                "content": {
                  "application/json": {
                    "schema": {
                      "name": "string"
                    }
                  }
                }
              },
              "parameters": [
                {
                  "name": "tariffClassId",
                  "in": "path",
                  "description": "Tariff Class identifier",
                  "required": true,
                  "schema": {
                    "type": "integer"
                  }
                }
              ],
              "responses": {
                "202": {
                  "description": "OK",
                  "content": {
                    "application/json": {
                    }
                  }
                }
              }
            },
            "delete": {
              "summary": "Delete a client tariff class",
              "description": "Deletes a client tariff class record from the specified client.\n\nClient tariff classes can be viewed in the Customer & Vendor Profiles application > Customer > Rating > Tariff Class tab.",
              "operationId": "ClientsDeleteTariffClasses",
              "security": [
                {
                  "truckmateApiKeyAuth": []
                }
              ],
              "responses": {
                "202": {
                  "description": "OK",
                  "content": {
                    "application/json": {
                    }
                  }
                }
              },
              "tags": ["Clients"]
            },
            "parameters": [
              {
                "name": "tariffClassId",
                "in": "path",
                "description": "Tariff Class identifier",
                "required": true,
                "schema": {
                  "type": "integer"
                }
              },
              {
                "name": "clientId",
                "in": "path",
                "description": "Client identifier",
                "required": true,
                "schema": {
                  "type": "string"
                }
              }
            ]
          },
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