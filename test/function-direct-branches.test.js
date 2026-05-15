const checkRedirectLocationHeader = require("../functions/check-redirect-location-header");
const checkRedirectStatusPreference = require("../functions/check-redirect-status-preference");
const checkStandardForErrorPayload = require("../functions/check-standard-for-error-payload");
const checkXTrimbleApiStandardFormat = require("../functions/check-x-trimble-api-standard-format");
const operationSummaryDescription = require("../functions/operation-summary-description");
const operationPostStatus = require("../functions/operation-post-201-202-status-code");
const checkStandardMetadata = require("../functions/check-standard-metadata-r2026");
const checkTrnFormat = require("../functions/check-trn-format");
const checkPaginationLinksStructure = require("../functions/check-pagination-links-structure");

test("check-redirect-location-header returns empty for invalid operation", () => {
  expect(checkRedirectLocationHeader(null, {}, {})).toEqual([]);
});

test("check-redirect-status-preference returns empty for invalid operation", () => {
  expect(checkRedirectStatusPreference(null, {}, {})).toEqual([]);
});

test("check-standard-for-error-payload returns null for invalid input", () => {
  expect(checkStandardForErrorPayload(null)).toBeNull();
});

test("check-x-trimble-api-standard-format uses context.target path fallback", () => {
  const results = checkXTrimbleApiStandardFormat(
    { "x-trimble-api-standard": "invalid" },
    {},
    { target: ["info"] }
  );
  expect(results).toHaveLength(1);
  expect(results[0].path).toEqual(["info", "x-trimble-api-standard"]);
});

test("check-x-trimble-api-standard-format falls back to empty path when context is missing", () => {
  const results = checkXTrimbleApiStandardFormat(
    { "x-trimble-api-standard": "invalid" },
    {},
    {}
  );
  expect(results).toHaveLength(1);
  expect(results[0].path).toEqual(["x-trimble-api-standard"]);
});

test("operation-summary-description returns empty for null operation", () => {
  expect(operationSummaryDescription(null, {}, {})).toEqual([]);
});

test("operation-summary-description returns empty when summary/description are missing", () => {
  expect(operationSummaryDescription({ operationId: "x" }, {}, { target: ["paths"] })).toEqual([]);
});

test("operation-summary-description uses empty path fallback", () => {
  const results = operationSummaryDescription(
    { summary: "same", description: "same" },
    {},
    {}
  );
  expect(results).toHaveLength(1);
  expect(results[0].path).toEqual(["operation"]);
});

test("operation-post-status uses context.target when context.path is missing", () => {
  const results = operationPostStatus(
    { 400: { description: "Bad Request" } },
    {},
    { target: ["paths", "/resources", "post", "responses"] }
  );
  expect(results).toHaveLength(1);
  expect(results[0].path).toEqual(["paths", "/resources", "post", "responses"]);
});

test("operation-post-status handles missing path context", () => {
  const results = operationPostStatus({ 201: { description: "Created" } }, {}, {});
  expect(results).toEqual([]);
});

test("check-standard-metadata-r2026 uses context.target when path missing", () => {
  const results = checkStandardMetadata(
    { createdByUserTrn: { type: "string" } },
    {},
    { target: ["components", "schemas", "Asset", "properties"] }
  );
  expect(results).toHaveLength(1);
  expect(results[0].path).toEqual([
    "components",
    "schemas",
    "Asset",
    "properties",
    "createdByUserTrn",
  ]);
});

test("check-standard-metadata-r2026 falls back to empty path", () => {
  const results = checkStandardMetadata(
    { createdByUserTrn: { type: "string" } },
    {},
    {}
  );
  expect(results).toHaveLength(1);
  expect(results[0].path).toEqual(["createdByUserTrn"]);
});

test("check-trn-format uses context.target when path missing", () => {
  const results = checkTrnFormat(
    { ownerTrn: { type: "string", example: "invalid-trn" } },
    {},
    { target: ["components", "schemas", "Asset", "properties"] }
  );
  expect(results).toHaveLength(1);
  expect(results[0].path).toEqual([
    "components",
    "schemas",
    "Asset",
    "properties",
    "ownerTrn",
    "example",
  ]);
});

test("check-trn-format ignores non-TRN field names", () => {
  const results = checkTrnFormat(
    { owner: { type: "string", example: "not-validated" } },
    {},
    { path: ["components", "schemas"] }
  );
  expect(results).toEqual([]);
});

test("check-trn-format handles falsy field names safely", () => {
  const results = checkTrnFormat(
    { "": { type: "string", example: "trn:2:iam:users:4455ecd5-38fd-4ede-810d-8494b7d7e5ad" } },
    {},
    { path: ["components", "schemas"] }
  );
  expect(results).toEqual([]);
});

test("check-trn-format falls back to empty path", () => {
  const results = checkTrnFormat(
    { ownerTrn: { type: "string", example: "invalid-trn" } },
    {},
    {}
  );
  expect(results).toHaveLength(1);
  expect(results[0].path).toEqual(["ownerTrn", "example"]);
});

test("check-redirect-location-header falls back to empty path", () => {
  const results = checkRedirectLocationHeader(
    { responses: { 307: { description: "Temporary Redirect" } } },
    {},
    {}
  );
  expect(results).toHaveLength(1);
  expect(results[0].path).toEqual(["responses", "307", "headers"]);
});

test("check-redirect-status-preference falls back to empty path", () => {
  const results = checkRedirectStatusPreference(
    { responses: { 301: { description: "Moved" } } },
    {},
    {}
  );
  expect(results).toHaveLength(1);
  expect(results[0].path).toEqual(["responses", "301"]);
});

test("check-pagination-links-structure falls back to empty path", () => {
  const results = checkPaginationLinksStructure(
    {
      "x-trimble-pagination": true,
      responses: {},
    },
    {},
    {}
  );
  expect(results).toHaveLength(1);
  expect(results[0].path).toEqual(["responses", "200"]);
});
