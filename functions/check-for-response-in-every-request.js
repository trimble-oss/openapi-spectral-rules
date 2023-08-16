module.exports = (input) => {
  let keys = Object.keys(input)
  let http_verbs = keys.filter((verb) => !(['parameters'].includes(verb)));
  for(let index = 0; index < http_verbs.length; index++)
  {
    if (!input[http_verbs[index]]["responses"]) {
    return [
      {
        message: "Response body missing for the given request.",
      },
    ];
  }
  }
};
