/**
 * Validates that the first path segment of resource URLs is a plural noun.
 * Per Trimble API Standard: "The first path segment of a resource URL MUST be a noun and MUST be plural."
 * Example: /shippers/{shipperId} is valid, /shipper/{shipperId} is invalid.
 * @see https://developer.trimble.com/docs/api-standard/
 */
function isPlural(segment) {
  const commonPlurals = [
    'people', 'children', 'data', 'equipment', 'information',
    'series', 'species', 'status', 'media', 'criteria'
  ];

  return (
    commonPlurals.includes(segment.toLowerCase()) ||
    /s$/.test(segment) ||           // ends with s (e.g., shippers, users)
    /es$/.test(segment) ||          // ends with es (e.g., addresses, boxes)
    /ies$/.test(segment) ||         // ends with ies (e.g., categories, companies)
    /ses$/.test(segment) ||         // ends with ses (e.g., statuses)
    /xes$/.test(segment) ||         // ends with xes (e.g., boxes)
    /zes$/.test(segment) ||        // ends with zes (e.g., quizzes)
    /ches$/.test(segment) ||       // ends with ches (e.g., searches)
    /shes$/.test(segment)          // ends with shes (e.g., wishes)
  );
}

module.exports = (input) => {
  // Input can be a single path string (when used with field: @key) or paths object
  const paths = typeof input === 'string' ? [input] : (input && typeof input === 'object' ? Object.keys(input) : []);

  for (const path of paths) {
    if (!path || path === '/') continue;

    const segments = path.replace(/^\//, '').split('/');
    const firstSegment = segments[0];

    if (!firstSegment || (firstSegment.startsWith('{') && firstSegment.endsWith('}'))) {
      continue;
    }

    if (!isPlural(firstSegment)) {
      return [{
        message: `First path segment "${firstSegment}" MUST be plural. Use plural nouns for collection resources (e.g., /shippers not /shipper).`,
      }];
    }
  }

  return undefined;
};
