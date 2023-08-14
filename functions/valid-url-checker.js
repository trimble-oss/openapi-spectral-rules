module.exports = (input) => {
  for (let index in input) {
    let url = input[index]["url"];
    var re =
      /(^(https:\/\/)(eu|us)(-aws|-az)(.api.trimble.com\/)(product\/{1})([-a-z0-9]{0,}\/{1})(v[1-9]{1}[0-9]{0,14}(-dev|-qa|-stage)?)(\/){0,1}((?<=\/)([a-z]{0,})(((?<=[a-z])([-_0-9]{0,}))*((?<=[-_])([a-z0-9]{1,})))*(?<!\/)(\/){0,1})*)$/g;

    var valid = re.test(url);

    if (!valid)
      return [
        {
          message: "All API URLs should follow Cloud URl Structure summary",
        },
      ];
  }
};
