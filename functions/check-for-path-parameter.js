module.exports = (input) => {
  var json = input;
  const pathsKeys = Object.keys(json);

  var pathParameters = pathsKeys.map((key) => {
    const matches = key.match(/\{(.*?)\}/g);
    if (matches) {
      return matches.map((match) => match.slice(1, -1));
    }
    return [];
  });

  pathParameters = pathParameters.map((list) =>
    list.map((item) => item.toLowerCase())
  );

  for (var [index, key] of pathsKeys.entries()) {
    const httpVerbs = Object.keys(json[key]);
    if (pathParameters[index].length !== 0) {
      for (const verb of httpVerbs) {
        if (!json[key][verb].parameters) {
          return [
            {
              message:
                "The path does not contains parameters block for path parameters.",
            },
          ];
        } else {
          const parameters = json[key][verb].parameters;

          const hasPathParameter = parameters.some((param) => {
            if (param.in.toLowerCase() === "header") {
              return true;
            }
            return (
              param.in.toLowerCase() === "path" &&
              !param.name.toLowerCase().includes(parameters[index])
            );
          });
          if (!hasPathParameter) {
            return [
              {
                message:
                  "The path does not contains 'path' value in 'in' field of " +
                  key +
                  " - " +
                  verb +
                  " parameters block.",
              },
            ];
          }

          if (
            pathParameters[index].length !== new Set(pathParameters[index]).size
          ) {
            return [
              {
                message: "The path parameters has duplicate values.",
              },
            ];
          }

          for (var word in pathParameters[index]) {
            const hasNameParameter = parameters.some((param) => {
              return (
                param.in.toLowerCase() === "path" &&
                param.name.toLowerCase() === pathParameters[index][word]
              );
            });

            if (!hasNameParameter) {
              return [
                {
                  message:
                    "The  path parameter '" +
                    pathParameters[index][word] +
                    "' was not mentioned in the 'name' field of parameters block for '" +
                    verb +
                    "' request.",
                },
              ];
            }
          }
        }
      }
    } else {
      for (const verb of httpVerbs) {
        if (json[key][verb].parameters) {
          const parameters = json[key][verb].parameters;
          const hasPathParameter = parameters.some((param) => {
            return param.in === "path";
          });
          if (hasPathParameter) {
            return [
              {
                message: "No path parameters mentioned in the path.",
              },
            ];
          }
        }
      }
    }
  }
};
