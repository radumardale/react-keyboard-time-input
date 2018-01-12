/* global describe it */
var ReactTestUtils = require('react-dom/test-utils')
var expect = require('chai').expect
var caret = require('../src/lib/caret')
var render = require('./lib/renderTimeInput')

describe('change', function () {
  var timeInput

  it('should replace char to right of caret with typed character and move caret right', function () {
    timeInput = typeSomething('00:00', '100:00', 1)
    expect(timeInput.input.value).to.eql('10:00')
    expect(caret.start(timeInput.input)).to.eql(1)
  })

  it('should skip carat over preceeding ":"', function () {
    timeInput = typeSomething('00:00', '010:00', 2)
    expect(timeInput.input.value).to.eql('01:00')
    expect(caret.start(timeInput.input)).to.eql(3)
  })

  it('should skip over a subsequent ":"', function () {
    timeInput = typeSomething('00:00', '001:00', 3)
    expect(timeInput.input.value).to.eql('00:10')
    expect(caret.start(timeInput.input)).to.eql(4)
  })

  it('should not be affeced by a preceeding ":"', function () {
    timeInput = typeSomething('00:00', '00:100', 4)
    expect(timeInput.input.value).to.eql('00:10')
    expect(caret.start(timeInput.input)).to.eql(4)
  })

  it('should convert 00 to 12 if in 12hr mode', function () {
    timeInput = typeSomething('00:00 PM', '00:100 PM', 4)
    expect(timeInput.input.value).to.eql('12:10 PM')
    expect(caret.start(timeInput.input)).to.eql(4)
  })

  it('should allow user to change AM/PM', function () {
    timeInput = typeSomething('00:00 PM', '12:00 APM', 7)
    expect(timeInput.input.value).to.eql('12:00 AM')
    expect(caret.start(timeInput.input)).to.eql(7)
  })

  it('should not error if onchange prop is not passed in', function () {
    timeInput = typeSomething('00:00', '00:00', 1, true)
    expect(timeInput.input.value).to.eql('00:00')
    expect(caret.start(timeInput.input)).to.eql(1)
  })

  it('should accept input when entire text is selected', function () {
    timeInput = typeSomething('00:00', '11', 2)
    expect(timeInput.input.value).to.eql('11:00')
    expect(caret.start(timeInput.input)).to.eql(3)
  })

  it('should accept input when entire groups are selected', function () {
    timeInput = typeSomething('00:00', '1:00', 1)
    expect(timeInput.input.value).to.eql('10:00')
    expect(caret.start(timeInput.input)).to.eql(1)
    timeInput = typeSomething('00:00', '00:1', 4)
    expect(timeInput.input.value).to.eql('00:10')
    expect(caret.start(timeInput.input)).to.eql(4)
    timeInput = typeSomething('00:00:00:000', '00:00:00:1', 10)
    expect(timeInput.input.value).to.eql('00:00:00:100')
    expect(caret.start(timeInput.input)).to.eql(10)
  })

  it.skip('should accept input when entire groups are pasted over', function () {
    timeInput = typeSomething('00:00:00:000', '00:00:00:11', 10)
    expect(timeInput.input.value).to.eql('00:00:00:110')
    expect(caret.start(timeInput.input)).to.eql(10)
    timeInput = typeSomething('00:00:00:000', '11:000', 2)
    expect(timeInput.input.value).to.eql('11:00:00:000')
    expect(caret.start(timeInput.input)).to.eql(2)
    timeInput = typeSomething('00:00:00:000', '00:11', 2)
    expect(timeInput.input.value).to.eql('00:11:00:000')
    expect(caret.start(timeInput.input)).to.eql(2)
  })

  it('should not change if value is invalid', function () {
    timeInput = typeSomething('00:00', 'foobar', 0, true)
    expect(timeInput.input.value).to.eql('00:00')
    expect(caret.start(timeInput.input)).to.eql(0)
  })
})

function typeSomething (oldValue, newValue, caretIndex, omitOnChange) {
  document.body.innerHTML = '<div></div>'
  var timeInput = render(oldValue, null, omitOnChange)
  timeInput.input.value = newValue
  caret.set(timeInput.input, caretIndex)
  ReactTestUtils.Simulate.change(timeInput.input)
  return timeInput
}
