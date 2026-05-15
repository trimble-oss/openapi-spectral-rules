module.exports = (operation, _opts, context) => {
  if (!operation || typeof operation !== "object" || !operation.responses) {
    return [];
  }

  const path = context.path || context.target || [];
  const errors = [];

  ["301", "302"].forEach((code) => {
    if (operation.responses[code]) {
      errors.push({
        message: `Response ${code} is defined. Prefer 307/308 redirects to preserve method and body semantics.`,
        path: [...path, "responses", code],
      });
    }
  });

  return errors;
};
