export const toStringByFormatting = (source, delimiter = '-') => {
  return source.split('.').reduce((acc, cur, idx) => {
    return idx === source.split('.').length - 1
      ? acc
      : `${acc}${delimiter}${cur.trim()}`;
  });
};
