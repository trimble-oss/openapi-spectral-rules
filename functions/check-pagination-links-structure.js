const isQueryParameter = (parameter, name) =>
  parameter &&
  parameter.in === "query" &&
  typeof parameter.name === "string" &&
  parameter.name === name;

const isObjectSchema = (schema) =>
  schema && typeof schema === "object" && schema.type === "object";

module.exports = (operation, _opts, context) => {
  if (!operation || typeof operation !== "object" || !operation.responses) {
    return [];
  }

  const path = context.path || context.target || [];
  const parameters = Array.isArray(operation.parameters) ? operation.parameters : [];
  const hasPageIndex = parameters.some((parameter) =>
    isQueryParameter(parameter, "pageIndex")
  );
  const hasPageSize = parameters.some((parameter) =>
    isQueryParameter(parameter, "pageSize")
  );

  const isPaginatedOperation =
    Boolean(operation["x-trimble-pagination"]) || hasPageIndex || hasPageSize;

  if (!isPaginatedOperation) {
    return [];
  }

  const response200 = operation.responses["200"];
  const schema =
    response200 &&
    response200.content &&
    response200.content["application/json"] &&
    response200.content["application/json"].schema;

  if (!isObjectSchema(schema) || !schema.properties) {
    return [
      {
        message:
          "Paginated operations should define an application/json object schema with pagination fields.",
        path: [...path, "responses", "200"],
      },
    ];
  }

  const errors = [];
  const properties = schema.properties;

  if (!properties.items) {
    errors.push({
      message: 'Paginated responses should define an "items" field.',
      path: [...path, "responses", "200", "content", "application/json", "schema", "properties"],
    });
  }

  if (!properties.links) {
    errors.push({
      message: 'Paginated responses should define a "links" field.',
      path: [...path, "responses", "200", "content", "application/json", "schema", "properties"],
    });
  } else if (!isObjectSchema(properties.links) || !properties.links.properties) {
    errors.push({
      message: 'The "links" field should be an object with link properties.',
      path: [...path, "responses", "200", "content", "application/json", "schema", "properties", "links"],
    });
  } else {
    const linkProperties = properties.links.properties;
    ["self", "first"].forEach((requiredKey) => {
      if (!linkProperties[requiredKey]) {
        errors.push({
          message: `The "links" object should include "${requiredKey}".`,
          path: [
            ...path,
            "responses",
            "200",
            "content",
            "application/json",
            "schema",
            "properties",
            "links",
            "properties",
          ],
        });
      }
    });
  }

  if (hasPageIndex) {
    if (!properties.pageIndex) {
      errors.push({
        message: 'Offset pagination should include "pageIndex" in the response schema.',
        path: [...path, "responses", "200", "content", "application/json", "schema", "properties"],
      });
    }
    if (!properties.totalItems) {
      errors.push({
        message: 'Offset pagination should include "totalItems" in the response schema.',
        path: [...path, "responses", "200", "content", "application/json", "schema", "properties"],
      });
    }
  }

  return errors;
};
