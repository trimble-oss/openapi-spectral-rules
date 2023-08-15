const { linterForRule } = require("./utils");

let linter;

beforeAll(async () => {
  linter = await linterForRule("tdp-spec-should-not-be-empty");
  return linter;
});
test("tdp-spec-should-not-be-empty should restrict empty json", ()=>{
    const oas ={}
    return linter.run(oas).then((results) => {
      expect(results).toHaveLength(1);
    });
})
test("spec-should-not-be-empty should restrict empty spec", ()=>{
      return linter.run(null).then((results) => {
        expect(results).toHaveLength(1);
      });
})