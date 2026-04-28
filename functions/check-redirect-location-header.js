module.exports = (operation, _opts, context) => {
  if (!operation || typeof operation !== "object" || !operation.responses) {
    return [];
  }

  const path = context.path || context.target || [];
  const errors = [];

  ["307", "308"].forEach((code) => {
    if (!operation.responses[code]) {
      return;
    }

    const hasLocationHeader =
      operation.responses[code].headers &&
      operation.responses[code].headers.Location;

    if (!hasLocationHeader) {
      errors.push({
        message: `Response ${code} should define a Location header.`,
        path: [...path, "responses", code, "headers"],
      });
    }
  });

  return errors;
};
