// getBase
export default (groupId, twelveHourTime, secondsOnly) => {
  if (secondsOnly) return 1000;
  if (!groupId) return twelveHourTime ? 12 : 24;
  if (groupId < 3) return 60;
  return 1000;
};
