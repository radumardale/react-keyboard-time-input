/* global describe it */
import ReactTestUtils from 'react-dom/test-utils';
import caret from '../src/lib/caret';
import render from './lib/renderTimeInput';

describe('tabbing', function() {
  var timeInput;

  it('should move carat to the next input group', function() {
    timeInput = tab(0);
    expect(caret.start(timeInput.input)).toEqual(3);
    timeInput = tab(3);
    expect(caret.start(timeInput.input)).toEqual(6);
    timeInput = tab(6);
    expect(caret.start(timeInput.input)).toEqual(9);
    timeInput = tab(10);
    expect(caret.start(timeInput.input)).toEqual(13);
  });

  it('should do nothing if already in last group', function() {
    timeInput = tab(13);
    expect(caret.start(timeInput.input)).toEqual(13);
  });

  it('should forget the carat index on blur', function() {
    timeInput = tab(13);
    ReactTestUtils.Simulate.blur(timeInput.input);
    expect(timeInput.state.caretIndex).toEqual(null);
  });

  it('should blur on escape', function() {
    timeInput = tab(0);
    ReactTestUtils.Simulate.keyDown(timeInput.input, {
      keyCode: 27,
      which: 27
    });
    expect(timeInput.state.caretIndex).toEqual(null);
  });

  describe('with shift', function() {
    it('should move carat to the previous input group', function() {
      timeInput = tab(3, true);
      expect(caret.start(timeInput.input)).toEqual(0);
      timeInput = tab(6, true);
      expect(caret.start(timeInput.input)).toEqual(3);
      timeInput = tab(13, true);
      expect(caret.start(timeInput.input)).toEqual(9);
    });

    it('should do nothing if already in first group', function() {
      timeInput = tab(0, true);
      expect(caret.start(timeInput.input)).toEqual(0);
    });
  });
});

function tab(caretIndex, shift) {
  document.body.innerHTML = '<div></div>';
  var timeInput = render('11:11:11:111 AM');
  caret.set(timeInput.input, caretIndex);
  ReactTestUtils.Simulate.keyDown(timeInput.input, {
    keyCode: 9,
    which: 9,
    shiftKey: shift
  });
  return timeInput;
}
