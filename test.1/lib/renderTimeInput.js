var React = require('react')
var ReactDOM = require('react-dom')
var TimeInput = require('../../src/TimeInput')

module.exports = function renderTimeInput (value, el, omitOnChange) {
  var timeInput = render(value)
  timeInput.input.focus()
  return timeInput
  function render (value) {
    return ReactDOM.render((
      <TimeInput value={value} onChange={!omitOnChange ? render : undefined} defaultValue='00:00:00:000'/>
    ), el || document.body.firstElementChild)
  }
}
