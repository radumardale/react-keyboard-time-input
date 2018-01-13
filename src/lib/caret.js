export default {
  start: el => el.selectionStart,
  end: el => el.selectionEnd,
  set: (el, start, end) => {
    el.setSelectionRange(start, end || start);
  }
};
