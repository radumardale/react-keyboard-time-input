/* global describe it */
var ReactTestUtils = require('react-dom/test-utils')
var expect = require('chai').expect
var caret = require('../src/lib/caret')
var render = require('./lib/renderTimeInput')

describe('backspace', function () {
  var timeInput

  it('should replace char to left of caret with defaultValue and move caret left', function () {
    timeInput = deleteSomething('11:11:11:111', false, 1)
    expect(timeInput.input.value).to.eql('01:11:11:111')
    expect(caret.start(timeInput.input)).to.eql(0)
  })

  it('should ignore ":"s to the left of caret', function () {
    timeInput = deleteSomething('11:11:11:111', false, 3)
    expect(timeInput.input.value).to.eql('10:11:11:111')
    expect(caret.start(timeInput.input)).to.eql(1)
  })

  describe('multiple', function () {
    it('should replace all selected multiple chars', function () {
      timeInput = deleteSomething('11:11:11:111', false, 4, 10)
      expect(timeInput.input.value).to.eql('11:10:00:011')
      expect(caret.start(timeInput.input)).to.eql(4)
    })
  })
})

describe('forward delete', function () {
  var timeInput

  it('should replace char to right of caret with defaultValue and move caret right', function () {
    timeInput = deleteSomething('11:11:11:111', true, 0)
    expect(timeInput.input.value).to.eql('01:11:11:111')
    expect(caret.start(timeInput.input)).to.eql(1)
  })

  it('should ignore ":"s to the right of caret', function () {
    timeInput = deleteSomething('11:11:11:111', true, 2)
    expect(timeInput.input.value).to.eql('11:01:11:111')
    expect(caret.start(timeInput.input)).to.eql(4)
  })

  describe('multiple', function () {
    it('should replace all selected multiple chars', function () {
      timeInput = deleteSomething('11:11:11:111', true, 4, 10)
      expect(timeInput.input.value).to.eql('11:10:00:011')
      expect(caret.start(timeInput.input)).to.eql(10)
    })
  })
})

function deleteSomething (newValue, forward, start, end) {
  document.body.innerHTML = '<div></div>'
  var timeInput = render('11:11:11:111')
  timeInput.input.value = newValue
  caret.set(timeInput.input, start, end)
  ReactTestUtils.Simulate.keyDown(timeInput.input, {
    keyCode: forward ? 46 : 8,
    which: forward ? 46 : 8
  })
  return timeInput
}
