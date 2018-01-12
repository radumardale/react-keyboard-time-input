/* global describe it */
var expect = require('chai').expect
var getBase = require('../src/lib/get-base')

describe('getBase', function () {
  it('should return the correct base for group 0', function () {
    expect(getBase(0, true)).to.eql(12)
    expect(getBase(0, false)).to.eql(24)
  })
  it('should return the correct base for all other groups', function () {
    ;[1, 2].forEach(checkBase)
    function checkBase (groupId) {
      expect(getBase(groupId)).to.eql(60)
    }
    expect(getBase(3)).to.eql(1000)
  })
})
