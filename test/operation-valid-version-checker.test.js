const { linterForRule } = require("./utils");

let linter;

beforeAll(async () => {
  linter = await linterForRule("tas-api-server-url-version-invalid");
  return linter;
});

test("tas-api-server-url-version-invalid should return nothing since all API versions are valid", () => {

    const oasDoc = {
      openapi: "3.0.0",
      "servers": [
        {
         "url": "https://eu-az.api.trimble.com/product/profile/v1-dev"
       },
       {
         "url": "https://eu-aws.api.trimble.com/product/profiles/v1"
       },
       {
         "url": "https://us-aws.api.trimble.com/product/profiles/v3-qa"
       },
       {
         "url": "https://us-az.api.trimble.com/product/profiles/v22"
       },
       {
         "url": "https://eu-az.api.trimble.com/product/profiles/v399999"
       },
       {
         "url": "https://eu-az.api.trimble.com/product/profile/v10-dev"
       },
       {
         "url": "https://eu-aws.api.trimble.com/product/profiles/v1-stage/users-dev"
       },
       {
         "url": "https://us-aws.api.trimble.com/product/profiles/v3/user-info"
       },
       {
         "url": "https://us-az.api.trimble.com/product/profiles/v12345678901234"
       },
       {
         "url": "https://eu-az.api.trimble.com/product/profiles/v399999/image/picture/error"
       },
       {
         "url": "https://eu-az.api.trimble.com/product/profiles/v1"
       },
       {
         "url": "https://eu-az.api.trimble.com/product/profiles/v10000-dev/user_info"
       }
     ]
    };

    return linter.run(oasDoc).then((results) => {
        expect(results).toHaveLength(0);
      });

});

test("tas-api-server-url-version-invalid should throw errors since it has invalid versions", () => {

    const oasDoc = {
      openapi: "3.0.0",
      "servers": [
        {
         "url": "https://eu-az.api.trimble.com/product/profile/v0"
       },
       {
         "url": "https://eu-aws.api.trimble.com/product/profiles/v1.0.0"
       },
       {
         "url": "https://us-aws.api.trimble.com/product/profiles/v3-qa"
       },
       {
         "url": "https://us-az.api.trimble.com/product/profiles/v22"
       },
       {
         "url": "https://eu-az.api.trimble.com/product/profiles/v399999"
       },
       {
         "url": "https://eu-az.api.trimble.com/product/profile/v10-dev"
       },
       {
         "url": "https://eu-aws.api.trimble.com/product/profiles/v1-stage/users-dev"
       },
       {
         "url": "https://us-aws.api.trimble.com/product/profiles/v3/user-info"
       },
       {
         "url": "https://us-az.api.trimble.com/product/profiles/v12345678901234"
       },
       {
         "url": "https://eu-az.api.trimble.com/product/profiles/v399999/image/picture/error"
       },
       {
         "url": "https://eu-az.api.trimble.com/product/profiles/v1"
       },
       {
         "url": "https://eu-az.api.trimble.com/product/profiles/v10000-dev/user_info"
       }
     ]
    };

    return linter.run(oasDoc).then((results) => {
        expect(results).toHaveLength(1);
        expect(results[0].message).toBe('All API URLs MUST include the major version and MUST NOT include the minor version.');
      });

});