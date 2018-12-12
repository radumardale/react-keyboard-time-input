import isTwelveHourTime from './is-twelve-hour-time';
// stringify
export default (groups, silhouette) => {
  const msDotSeparator = silhouette.indexOf('.') > -1;
  let res;
  if (isTwelveHourTime(groups)) {
    res = groups.slice(0, -1).join(':') + ' ' + groups[groups.length - 1];
  } else {
    res = groups.slice(0).join(':');
  }
  if (msDotSeparator)
    res = replaceLast(':', '.', res);
  return res;
};

const replaceLast = (find, replace, string) => {
  var lastIndex = string.lastIndexOf(find);
  
  if (lastIndex === -1) {
    return string;
  }
  
  var beginString = string.substring(0, lastIndex);
  var endString = string.substring(lastIndex + find.length);
  
  return beginString + replace + endString;
};
