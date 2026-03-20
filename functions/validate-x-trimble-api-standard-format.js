/**
 * Validates that x-trimble-api-standard uses format RYYYY.N when present.
 * Per Trimble API Standard: "MAY include a custom OAD property, x-trimble-api-standard,
 * within the OAD info object, indicating which Trimble API Standard Release the OAD document conforms to."
 * Format: RYYYY.N (e.g., R2023.1)
 * @see https://developer.trimble.com/docs/api-standard/
 */
const FORMAT_REGEX = /^R[0-9]{4}\.[0-9]+$/;

module.exports = (input) => {
  if (!input || typeof input !== 'object') {
    return null;
  }

  const value = input['x-trimble-api-standard'];
  if (value === undefined || value === null) {
    return undefined; // Property is optional
  }

  const strValue = String(value);
  if (!FORMAT_REGEX.test(strValue)) {
    return [{
      message: `x-trimble-api-standard MUST use format RYYYY.N (e.g., R2023.1). Got: ${strValue}`,
    }];
  }

  return undefined;
};
