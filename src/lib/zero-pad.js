// zeroPad
export default (val, digits) => {
  while (val.length < digits) val = '0' + val;
  return val;
};
