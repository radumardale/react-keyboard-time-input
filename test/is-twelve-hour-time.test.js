/* global describe it */
import isTwelveHourTime from '../src/lib/is-twelve-hour-time';

describe('is12HourTime', function () {
  it('should return true for 12 hour time strings', function () {
    expect(
    [ '00:00 PM', '00:00 AM', '00:00:00:000 PM', '00:00:00:000 AM' ]
    .map(isTwelveHourTime)
    .reduce(alsoTrue, true)
    ).toEqual(true)
  })
  it('should return false for 24 hour time strings', function () {
    expect(
    [ '00:00', '00:00', '00:00:00:000', '00:00:00:000' ]
    .map(isTwelveHourTime)
    .reduce(alsoFalse, true)
    ).toEqual(true)
  })
})

function alsoTrue (memo, val) {
  return memo && val
}

function alsoFalse (memo, val) {
  return memo && !val
}
