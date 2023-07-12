const { linterForRule } = require("./utils");

let linter;

beforeAll(async () => {
  linter = await linterForRule("tas-api-paths-should-start-with-a-noun");
  return linter;
});

test("tas-api-paths-should-start-with-a-noun should return nothing since the all the provided resource paths are valid", () => {

    const oasDoc = {
        openapi: "3.0.0",
        paths: {
          "/apis/{api_id}/": {
          },
          "/apis/{api_id}/versions/{version_id}": {
          },
        },
      };

    return linter.run(oasDoc).then((results) => {
        expect(results).toHaveLength(0);
      });
});

test("tas-api-paths-should-start-with-a-noun should return error since the first resource path is not a Plural noun", () => {

    const oasDoc = {
        openapi: "3.0.0",
        paths: {
          "/list/": {
          }
        },
      };

    return linter.run(oasDoc).then((results) => {
        expect(results).toHaveLength(1);
        expect(results[0].message).toBe("The first root resource name in the URL MUST be a noun and MUST be in the plural form.");
        expect(results[0].path.join(".")).toBe("paths./list/");

      });
});

test("tas-api-paths-should-start-with-a-noun should return error since the third resource path is not a plural/singular noun", () => {

  const oasDoc = {
      openapi: "3.0.0",
      paths: {
        "/apis/{api_id}/get": {
        }
      },
    };

  return linter.run(oasDoc).then((results) => {
      expect(results).toHaveLength(1);
      expect(results[0].message).toBe("The first root resource name in the URL MUST be a noun and MUST be in the plural form. The rest of root resource names in the URL should be a noun in plural or singular form.");
      expect(results[0].path.join(".")).toBe("paths./apis/{api_id}/get");

    });
});