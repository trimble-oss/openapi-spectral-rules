const { linterForRule } = require("./utils");

let linter;

beforeAll(async () => {
  linter = await linterForRule("tas-api-server-url-invalid");
  return linter;
});

test("tas-api-server-url-invalid should return nothing since the all the provided urls are valid", () => {

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

test("tas-api-server-url-invalid should return errors since the provided url are invalid", () => {
  
  const oasDoc = {
    openapi: "3.0.0",
    "servers": [
      {
       "url": "https://eu-az.api.trimble/product/profile/v1-dev"
     },
     {
       "url": "https://eu-apigee.api.trimble.com/product/profiles/v1"
     },
     {
       "url": "http://eu-az.api.trimble.com/product/profiles/v1.0"
     }
   ]
  };

  return linter.run(oasDoc).then((results) => {
      expect(results).toHaveLength(1);
      expect(results[0].message).toBe("All API URLs should follow Cloud URl Structure summary");
    });

});