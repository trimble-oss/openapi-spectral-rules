const { linterForRule } = require("./utils");

let linter;

beforeAll(async () => {
  linter = await linterForRule("tdp-invalid-symbol-in-path");
  return linter;
});

test("invalid-symbols-in-path should return null since the given path is valid", () => {

    const oasDoc = {
        "paths": {
          "/apis/{api_id}/versions/{version_id}": {
          }
        }
      }

    return linter.run(oasDoc).then((results) => {
        expect(results).toHaveLength(0);
      });
});

test("invalid-symbols-in-path should return null since the given path only /", () => {

    const oasDoc = {
        "paths": {
          "/": {
          }
        }
      }

    return linter.run(oasDoc).then((results) => {
        expect(results).toHaveLength(0);
      });
});

test("invalid-symbols-in-path should return error message since the given path contains //", () => {

    const oasDoc = {
        "paths": {
          "//": {
          }
        }
      }

    return linter.run(oasDoc).then((results) => {
        expect(results).toHaveLength(1);
        expect(results[0].message).toBe("The given path contains invalid symbols in it.")
      });
});


test("invalid-symbols-in-path should return error message since the given path contains symbols", () => {

    const oasDoc = {
        "paths": {
          "/apis/version/@123": {
          }
        }
      }

    return linter.run(oasDoc).then((results) => {
        expect(results).toHaveLength(1);
        expect(results[0].message).toBe("The given path contains invalid symbols in it.")
      });
});