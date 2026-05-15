const trnRegex =
  /^trn:(?:[a-z0-9][a-z0-9-]*:[a-z0-9][a-z0-9-]*:[^:\s]+|2:[a-z0-9][a-z0-9-]*:[a-z0-9][a-z0-9-]*:[^:\s]+|2:[a-z0-9][a-z0-9-]*:[a-z0-9][a-z0-9-]*:[a-z0-9][a-z0-9-]*:[^:\s]+)$/i;

const legacyFieldMap = {
  createdAtDateTime: "createdAt",
  createdByUserTrn: "createdBy",
  createdByApplicationTrn: "createdBy",
  createdByDeviceTrn: "createdBy",
  updatedAtDateTime: "updatedAt",
  updatedByUserTrn: "updatedBy",
  updatedByApplicationTrn: "updatedBy",
  updatedByDeviceTrn: "updatedBy",
  deletedAtDateTime: "deletedAt",
  deletedByUserTrn: "deletedBy",
  deletedByApplicationTrn: "deletedBy",
  deletedByDeviceTrn: "deletedBy",
};

const timestampFields = ["createdAt", "updatedAt", "deletedAt"];
const identityFields = ["createdBy", "updatedBy", "deletedBy"];

module.exports = (properties, _opts, context) => {
  if (!properties || typeof properties !== "object") {
    return [];
  }

  const path = context.path || context.target || [];
  const errors = [];
  const keys = Object.keys(properties);

  const hasRelevantMetadataField =
    keys.some((key) => timestampFields.includes(key) || identityFields.includes(key)) ||
    keys.some((key) => legacyFieldMap[key]);

  if (!hasRelevantMetadataField) {
    return [];
  }

  keys.forEach((key) => {
    if (legacyFieldMap[key]) {
      errors.push({
        message: `Legacy metadata field "${key}" should be renamed to "${legacyFieldMap[key]}" in r2026.1.`,
        path: [...path, key],
      });
    }
  });

  timestampFields.forEach((field) => {
    const schema = properties[field];
    if (!schema) {
      return;
    }
    if (schema.type !== "string" || schema.format !== "date-time") {
      errors.push({
        message: `Metadata field "${field}" should be type "string" with format "date-time".`,
        path: [...path, field],
      });
    }
  });

  identityFields.forEach((field) => {
    const schema = properties[field];
    if (!schema) {
      return;
    }
    if (schema.type !== "string") {
      errors.push({
        message: `Metadata field "${field}" should be type "string" and contain a TRN value.`,
        path: [...path, field],
      });
      return;
    }
    if (schema.example !== undefined && !trnRegex.test(String(schema.example))) {
      errors.push({
        message: `Metadata field "${field}" example should match a TRN value.`,
        path: [...path, field, "example"],
      });
    }
  });

  [
    ["createdAt", "createdBy"],
    ["updatedAt", "updatedBy"],
    ["deletedAt", "deletedBy"],
  ].forEach(([timeField, identityField]) => {
    const hasTime = Boolean(properties[timeField]);
    const hasIdentity = Boolean(properties[identityField]);
    if (hasTime !== hasIdentity) {
      errors.push({
        message: `Metadata fields "${timeField}" and "${identityField}" should be used together.`,
        path,
      });
    }
  });

  return errors;
};
