/* global describe it */
import getGroups from '../src/lib/get-groups';
import stringify from '../src/lib/stringify';

describe('stringify', function () {
  it('should correctly stringify 12 hour time strings', function () {
    ;[ '00:00 PM', '00:00 AM', '00:00:00:000 PM', '00:00:00:000 AM' ].forEach(check)

    function check (str) {
      expect(stringify(getGroups(str))).toEqual(str)
    }
  })
  it('should correctly stringify 24 hour time strings', function () {
    ;[ '00:00', '00:00', '00:00:00:000', '00:00:00:000' ].forEach(check)

    function check (str) {
      expect(stringify(getGroups(str))).toEqual(str)
    }
  })
})
