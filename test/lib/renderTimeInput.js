import React from 'react';
import ReactDOM from 'react-dom';
import TimeInput from '../../src/TimeInput';

export default (value, el, omitOnChange) => {
  var timeInput = render(value)
  timeInput.input.focus()
  return timeInput
  function render (value) {
    return ReactDOM.render((
      <TimeInput value={value} onChange={!omitOnChange ? render : undefined} defaultValue='00:00:00:000'/>
    ), el || document.body.firstElementChild)
  }
}
