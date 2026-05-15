module.exports = (info, _opts, context) => {
  if (!info || typeof info !== "object") {
    return [];
  }

  const value = info["x-trimble-api-standard"];
  if (value === undefined) {
    return [];
  }

  const path = context.path || context.target || [];
  const normalizedValue = String(value).trim();
  const formatRegex = /^R\d{4}\.\d+$/;

  if (!formatRegex.test(normalizedValue)) {
    return [
      {
        message:
          "The x-trimble-api-standard value must match the Trimble release format RYYYY.N (for example, R2026.1).",
        path: [...path, "x-trimble-api-standard"],
      },
    ];
  }

  return [];
};
