module.exports = (input) => {
  var re =
    /(400|401|402|403|404|405|406|407|408|409|410|411|412|413|414|415|416|417|418|421|422|423|424|425|426|428|429|431|451|500|501|502|503|504|505|506|507|508|510|511)$/;
  for (let response in input) {
    var valid = re.test(response);
    if (valid) {
      if (!input[response]["content"]) {
        return [
          {
            message: "Content block is missing in the error response body",
          },
        ];
      } else if (!input[response]["content"]["application/json"]) {
        return [
          {
            message: "All api should return structured data format",
          },
        ];
      } else if (!input[response]["content"]["application/json"]["schema"]) {
        return [
          {
            message: "Schema section is missing in the response body",
          },
        ];
      } else if (
        !input[response]["content"]["application/json"]["schema"]["properties"]
      ) {
        return [
          {
            message: "Properties section is missing in the response body",
          },
        ];
      }
      var error =
        input[response]["content"]["application/json"]["schema"]["properties"];
      if (error) {
        if (!error["title"]) {
          return [
            {
              message: "The error payload must contain title property",
            },
          ];
        } else if (!error["message"]) {
          return [
            {
              message: "The error payload must contain message property",
            },
          ];
        } else if (!error["links"]) {
          return [
            {
              message: "The error payload must contain links property",
            },
          ];
        } else if (!error["requestId"]) {
          return [
            {
              message: "The error payload must contain requestId property",
            },
          ];
        } else if (!error["lang"]) {
          return [
            {
              message: "The error payload must contain lang property",
            },
          ];
        }
      }
    }
  }
};
