/* global describe it */
var ReactTestUtils = require('react-dom/test-utils')
var expect = require('chai').expect
var caret = require('../src/lib/caret')
var render = require('./lib/renderTimeInput')

describe('up', function () {
  var timeInput
  it('should increment group caret is in and preserve the caret position', function () {
    ;[0, 1, 2].forEach((n) => {
      timeInput = arrow('00:00:00:000', n, true)
      expect(timeInput.input.value).to.eql('01:00:00:000')
      expect(caret.start(timeInput.input)).to.eql(n)
    })
    ;[3, 4, 5].forEach((n) => {
      timeInput = arrow('00:15:00:000', n, true)
      expect(timeInput.input.value).to.eql('00:16:00:000')
      expect(caret.start(timeInput.input)).to.eql(n)
    })
    ;[6, 7, 8].forEach((n) => {
      timeInput = arrow('00:00:50:000', n, true)
      expect(timeInput.input.value).to.eql('00:00:51:000')
      expect(caret.start(timeInput.input)).to.eql(n)
    })
    ;[9, 10, 11].forEach((n) => {
      timeInput = arrow('00:00:00:100', n, true)
      expect(timeInput.input.value).to.eql('00:00:00:101')
      expect(caret.start(timeInput.input)).to.eql(n)
    })
  })
  it('should go back to zero when incrementing max value', function () {
    timeInput = arrow('23:00:00:000', 1, true)
    expect(timeInput.input.value).to.eql('00:00:00:000')
    expect(caret.start(timeInput.input)).to.eql(1)
  })
  it('should increment previous group when max value exceeded', function () {
    timeInput = arrow('00:59:00:000', 3, true)
    expect(timeInput.input.value).to.eql('01:00:00:000')
    timeInput = arrow('00:00:59:000', 6, true)
    expect(timeInput.input.value).to.eql('00:01:00:000')
    timeInput = arrow('00:00:00:999', 9, true)
    expect(timeInput.input.value).to.eql('00:00:01:000')
  })
  it('should increment 2x more when shift key is pressed', function () {
    expect(arrow('00:00:00:000', 0, true, true).input.value).to.eql('02:00:00:000')
    expect(arrow('00:15:00:000', 3, true, true).input.value).to.eql('00:17:00:000')
    expect(arrow('00:00:40:000', 6, true, true).input.value).to.eql('00:00:42:000')
    expect(arrow('00:00:00:100', 9, true, true).input.value).to.eql('00:00:00:102')
  })
  it('should increment 4x more when shift key is pressed', function () {
    expect(arrow('00:00:00:100', 9, true, true, true).input.value).to.eql('00:00:00:104')
  })
  it('should toggle AM/PM when carat is over AM/PM', function () {
    expect(arrow('01:00 AM', 6, true).input.value).to.eql('01:00 PM')
    expect(arrow('01:00:00:000 PM', 13, true).input.value).to.eql('01:00:00:000 AM')
  })
})

describe('down', function () {
  var timeInput
  it('should decriment group caret is in and preserve the caret position', function () {
    ;[0, 1, 2].forEach((n) => {
      timeInput = arrow('01:00:00:000', n)
      expect(timeInput.input.value).to.eql('00:00:00:000')
      expect(caret.start(timeInput.input)).to.eql(n)
    })
    ;[3, 4, 5].forEach((n) => {
      timeInput = arrow('00:15:00:000', n)
      expect(timeInput.input.value).to.eql('00:14:00:000')
      expect(caret.start(timeInput.input)).to.eql(n)
    })
    ;[6, 7, 8].forEach((n) => {
      timeInput = arrow('00:00:50:000', n)
      expect(timeInput.input.value).to.eql('00:00:49:000')
      expect(caret.start(timeInput.input)).to.eql(n)
    })
    ;[9, 10, 11].forEach((n) => {
      timeInput = arrow('00:00:00:100', n)
      expect(timeInput.input.value).to.eql('00:00:00:099')
      expect(caret.start(timeInput.input)).to.eql(n)
    })
  })
  it('should go back when decrimenting max value', function () {
    timeInput = arrow('00:00:00:000', 1)
    expect(timeInput.input.value).to.eql('23:00:00:000')
    expect(caret.start(timeInput.input)).to.eql(1)
  })
  it('should increment previous group when max value exceeded', function () {
    timeInput = arrow('01:00:00:000', 3)
    expect(timeInput.input.value).to.eql('00:59:00:000')
    timeInput = arrow('00:01:00:000', 6)
    expect(timeInput.input.value).to.eql('00:00:59:000')
    timeInput = arrow('00:00:01:000', 9)
    expect(timeInput.input.value).to.eql('00:00:00:999')
  })
  it('should decrement 2x more when shift key is pressed', function () {
    expect(arrow('02:00:00:000', 0, false, true).input.value).to.eql('00:00:00:000')
    expect(arrow('00:17:00:000', 3, false, true).input.value).to.eql('00:15:00:000')
    expect(arrow('00:00:42:000', 6, false, true).input.value).to.eql('00:00:40:000')
    expect(arrow('00:00:00:102', 9, false, true).input.value).to.eql('00:00:00:100')
  })
  it('should decrement 4x more when shift and meta keys are pressed', function () {
    expect(arrow('00:00:00:104', 9, false, true, true).input.value).to.eql('00:00:00:100')
  })
  it('should toggle AM/PM when carat is over AM/PM', function () {
    expect(arrow('01:00 AM', 6, false).input.value).to.eql('01:00 PM')
    expect(arrow('01:00:00:000 PM', 13, false).input.value).to.eql('01:00:00:000 AM')
  })
})

function arrow (value, caretIndex, up, shiftKey, metaKey) {
  document.body.innerHTML = '<div></div>'
  var timeInput = render(value)
  caret.set(timeInput.input, caretIndex)
  ReactTestUtils.Simulate.keyDown(timeInput.input, {
    keyCode: up ? 38 : 40,
    which: up ? 38 : 40,
    shiftKey: shiftKey,
    metaKey: metaKey
  })
  return timeInput
}
