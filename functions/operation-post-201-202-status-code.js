// POST create operations should return 201/202.
// Search-style POST endpoints ending in /searches should return 200.
module.exports = (responses, _opts, context) => {
  if (responses === null || typeof responses !== "object") {
    return [];
  }

  const path = context.path || context.target || [];
  const endpointPath = typeof path[1] === "string" ? path[1] : "";
  const statusCodes = Object.keys(responses);

  const isSearchEndpoint =
    endpointPath.endsWith("/searches") || endpointPath.includes("/searches/");

  if (isSearchEndpoint) {
    if (!statusCodes.includes("200")) {
      return [
        {
          message:
            "POST search endpoints should return a 200 response (for example, /searches).",
          path,
        },
      ];
    }
    return [];
  }

  if (!statusCodes.includes("201") && !statusCodes.includes("202")) {
    return [
      {
        message:
          "POST create endpoints should return a 201 or 202 response.",
        path,
      },
    ];
  }

  return [];
};
