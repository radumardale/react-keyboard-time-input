export default {
  start(el) {
    return el.selectionStart;
  },
  end(el) {
    return el.selectionEnd;
  },
  set(el, start, end) {
    el.setSelectionRange(start, end || start);
  }
};
