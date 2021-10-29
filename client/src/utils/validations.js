export const koreaLengCheck = value => /[가-힣ㄱ-ㅎㅏ-ㅣ]/gi.test(value);
export const specialSymbolCheck = value =>
  /[\\{\\}\\[\]\\/?.,;:|\\)*~`!^\-_+<>@\\#$%&\\\\=\\(\\'\\"]/gi.test(value);
export const minLengthCheck = (value, minLength) =>
  String(value).length < minLength;
export const maxLengthCheck = (value, maxLength) =>
  String(value).length > maxLength;
export const whiteSpaceCheck = value => /\s/gi.test(value);
export const englishCheck = value => /[a-zA-Z]/gi.test(value);
export const emailSpecialSymbol = value =>
  /[\\{\\}\\[\]\\/?,;:|\\)*~`!^\-_+<>\\#$%&\\\\=\\(\\'\\"]/gi.test(value);
export const emailCheck = value => {
  const result =
    /^[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*\.(kr|com|net)$/gi.test(
      value
    );
  return !result;
};
export const emptyCheck = value => {
  if (value === undefined) {
    throw new Error('value id undefined');
  }
  if (value instanceof Array) {
    return Array(value).length === 0;
  }
  if (value === null || value === '' || value === 0) {
    return true;
  }
  return false;
};
export const isEmptyObject = param => {
  if (!param) {
    return true;
  }
  if (param.constructor === Object || param.constructor === Array) {
    return Object.keys(param).length === 0;
  }
  return true;
};
