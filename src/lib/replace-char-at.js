// replaceCharAt
export default (str, index, replacement) => {
  str = str.split('');
  str[index] = replacement;
  return str.join('');
};
