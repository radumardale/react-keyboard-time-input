import zeroPad from './zero-pad';
import getGroups from './get-groups';
import getBase from './get-base';
import stringify from './stringify';
import toggle24Hr from './toggle-24-hour';
import isTwelveHourTime from './is-twelve-hour-time';
import isSecondsOnly from './is-seconds-only';

const add = (groups, groupId, amount, twelveHourTime, secondsOnly) => {
  var base = getBase(groupId, twelveHourTime, secondsOnly);
  if (!secondsOnly && !groupId && groups[groupId] === '12' && twelveHourTime)
    groups[groupId] = '00';
  var val = Number(groups[groupId]) + amount;
  groups = replace(groups, groupId, (val + base) % base);
  if (groupId && val >= base)
    return add(groups, groupId - 1, 1, twelveHourTime);
  if (groupId && val < 0) return add(groups, groupId - 1, -1, twelveHourTime);
  if (!groupId && twelveHourTime) {
    if (val >= base || val < 0) toggle24Hr(groups);
    if (groups[0] === '00') groups[0] = '12';
  }
  return groups;
};

const replace = (groups, groupId, amount) => {
  var digits = groups[groupId].length;
  groups[groupId] = zeroPad(String(amount), digits);
  return groups;
};

// export default function adder(str, groupId, amount) {
export default (str, groupId, amount, silhouette) => {
  var groups = getGroups(str);
  var secondsOnly = isSecondsOnly(groups, silhouette);
  var twelveHourTime = isTwelveHourTime(groups);
  if (twelveHourTime && groupId === groups.length - 1)
    return stringify(toggle24Hr(groups), silhouette);
  return stringify(add(groups, groupId, amount, twelveHourTime, secondsOnly), silhouette);
};
