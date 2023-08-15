function hasHttpVerb(url) {
  const httpVerbs = ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'TRACE', 'TRACK'];

  // Convert the URL to uppercase for case-insensitive matching
  const uppercaseUrl = url.toUpperCase();

  // Check if any of the HTTP verbs are present in the URL
  for (const verb of httpVerbs) {
    if (uppercaseUrl.includes(verb)) {
      return true;
    }
  }

  return false;
}
module.exports = (input) => {
	
	var hasVerbs = hasHttpVerb(input);

	if(hasVerbs)
		return [{
			message: "Resource Path should not include HTTP verbs"
		}]
}