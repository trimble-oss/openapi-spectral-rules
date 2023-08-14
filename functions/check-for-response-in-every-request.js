module.exports = (input) => {
  if (!input["responses"]) {
    return [
      {
        message: "Response body missing for the given request.",
      },
    ];
  }
};
