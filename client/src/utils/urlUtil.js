import queryString from 'query-string';

export function makeUrl(path, currentQuery, addQuery) {
  const url = queryString.stringifyUrl({
    url: `${path}`,
    query: {
      ...currentQuery,
      ...addQuery,
    },
  });
  return url;
}
