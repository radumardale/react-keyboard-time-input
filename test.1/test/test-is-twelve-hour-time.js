/* global describe it */
var expect = require('chai').expect
var isTwelveHourTime = require('../src/lib/is-twelve-hour-time')

describe('is12HourTime', function () {
  it('should return true for 12 hour time strings', function () {
    expect(
    [ '00:00 PM', '00:00 AM', '00:00:00:000 PM', '00:00:00:000 AM' ]
    .map(isTwelveHourTime)
    .reduce(alsoTrue, true)
    ).to.eql(true)
  })
  it('should return false for 24 hour time strings', function () {
    expect(
    [ '00:00', '00:00', '00:00:00:000', '00:00:00:000' ]
    .map(isTwelveHourTime)
    .reduce(alsoFalse, true)
    ).to.eql(true)
  })
})

function alsoTrue (memo, val) {
  return memo && val
}

function alsoFalse (memo, val) {
  return memo && !val
}
