import React from 'react';
import ReactDOM from 'react-dom';
import TimeInput from '../../src/TimeInput';

export default (value, el, omitOnChange, step) => {
  var timeInput = render(value, step);
  timeInput.input.focus();
  return timeInput;
  function render(value, step) {
    return ReactDOM.render(
      <TimeInput
        step={step}
        value={value}
        onChange={!omitOnChange ? render : undefined}
        defaultValue="00:00:00:000"
      />,
      el || document.body.firstElementChild
    );
  }
};
