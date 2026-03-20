module.exports = (input) => {
  // Cloud: optional /cloud/ prefix; one or more path segments before the version segment (always last in the base URL).
  var re =
    /(^(https:\/\/)(((eu|us)(-aws|-az)(\.api\.trimble\.com\/)(product\/{1}))|(cloud((\.dev|\.qa\.|\.stage){0,}\.api\.(trimblecloud|trimble))\.com\/(?:cloud\/)?))(?:[-a-z0-9]+\/)+(v[1-9]{1}[0-9]{0,14}(-dev|-qa|-stage)?)(\/[a-z0-9]{0,}){0,}((?<=\/)([a-z]{0,})(((?<=[a-z])([-_0-9]{0,}))((?<=[-_])([a-z0-9]{1,})))(?<!\/)(\/){0,1})*)$/;

  if (!Array.isArray(input)) {
    return [];
  }

  const issues = [];
  for (let i = 0; i < input.length; i++) {
    const url = input[i]["url"];
    if (!re.test(url)) {
      issues.push({
        message: "All API URLs should follow Cloud URl Structure summary",
        path: ["servers", i, "url"],
      });
    }
  }
  return issues;
};
