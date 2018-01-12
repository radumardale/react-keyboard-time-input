/* global describe it */
import getBase from '../src/lib/get-base';

describe('getBase', function () {
  it('should return the correct base for group 0', function () {
    expect(getBase(0, true)).toEqual(12)
    expect(getBase(0, false)).toEqual(24)
  })
  it('should return the correct base for all other groups', function () {
    ;[1, 2].forEach(checkBase)
    function checkBase (groupId) {
      expect(getBase(groupId)).toEqual(60)
    }
    expect(getBase(3)).toEqual(1000)
  })
})
