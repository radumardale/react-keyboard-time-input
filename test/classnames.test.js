/* global describe it */
import React from 'react';
import ReactDOM from 'react-dom';
import TimeInput from '../src/TimeInput';

describe('classnames', function() {
  it('should render any provided classnames additionally', function() {
    document.body.innerHTML = '<div></div>';
    ReactDOM.render(
      <TimeInput className="extra-1 extra-2" />,
      document.body.firstElementChild
    );
    var el = document.body.getElementsByTagName('input')[0];
    expect(el.parentElement.className).toEqual('TimeInput extra-1 extra-2');
  });
});
