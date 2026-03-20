const VERSION_SEGMENT_RE =
  /(.*)(\/v[1-9]{1}[0-9]{0,14}(-dev|-qa|-stage)?(\/)?)/;

function isValidServerVersionUrl(url) {
  return VERSION_SEGMENT_RE.test(url);
}

function validVersionChecker(input) {
  if (!Array.isArray(input)) {
    return [];
  }

  const issues = [];
  for (let i = 0; i < input.length; i++) {
    const url = input[i]["url"];
    if (!isValidServerVersionUrl(url)) {
      issues.push({
        message:
          "All API URLs MUST include the major version and MUST NOT include the minor version.",
        path: ["servers", i, "url"],
      });
    }
  }
  return issues;
}

validVersionChecker.isValidServerVersionUrl = isValidServerVersionUrl;

module.exports = validVersionChecker;
