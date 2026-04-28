const trnRegex =
  /^trn:(?:[a-z0-9][a-z0-9-]*:[a-z0-9][a-z0-9-]*:[^:\s]+|2:[a-z0-9][a-z0-9-]*:[a-z0-9][a-z0-9-]*:[^:\s]+|2:[a-z0-9][a-z0-9-]*:[a-z0-9][a-z0-9-]*:[a-z0-9][a-z0-9-]*:[^:\s]+)$/i;

const isTrnLikeField = (name, schema) => {
  if (!schema || typeof schema !== "object") {
    return false;
  }
  if (schema["x-trimble-format"] === "trn") {
    return true;
  }
  return /(Trn$|createdBy$|updatedBy$|deletedBy$)/.test(name || "");
};

module.exports = (properties, _opts, context) => {
  if (!properties || typeof properties !== "object") {
    return [];
  }

  const path = context.path || context.target || [];
  const errors = [];

  Object.entries(properties).forEach(([name, schema]) => {
    if (!isTrnLikeField(name, schema)) {
      return;
    }

    if (schema.type !== "string") {
      errors.push({
        message: `TRN field "${name}" should be type "string".`,
        path: [...path, name, "type"],
      });
      return;
    }

    if (schema.example !== undefined && !trnRegex.test(String(schema.example))) {
      errors.push({
        message: `TRN field "${name}" example should match TRN format.`,
        path: [...path, name, "example"],
      });
    }

    if (Array.isArray(schema.enum)) {
      schema.enum.forEach((value, index) => {
        if (!trnRegex.test(String(value))) {
          errors.push({
            message: `TRN field "${name}" enum values should match TRN format.`,
            path: [...path, name, "enum", index],
          });
        }
      });
    }
  });

  return errors;
};
