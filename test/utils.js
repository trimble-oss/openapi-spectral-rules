const { Spectral } = require("@stoplight/spectral-core");
const { migrateRuleset } = require("@stoplight/spectral-ruleset-migrator");
const fs = require("fs");
const path = require("path");

const AsyncFunction = (async () => {}).constructor;

async function linterForRule(rule, options = {}) {
  const rulesetFile = options.rulesetFile || "./spectral.yaml";
  const linter = new Spectral();

  const m = {};
  const paths = [path.dirname(rulesetFile), __dirname, ".."];
  await AsyncFunction(
    "module, require",
    await migrateRuleset(rulesetFile, {
      format: "commonjs",
      fs,
    })
    // eslint-disable-next-line import/no-dynamic-require,global-require
  )(m, (text) => require(require.resolve(text, { paths })));
  const ruleset = m.exports;
  delete ruleset.extends;
  Object.keys(ruleset.rules).forEach((key) => {
    if (key !== rule) {
      delete ruleset.rules[key];
    }
  });
  linter.setRuleset(ruleset);
  return linter;
}

module.exports.linterForRule = linterForRule;
