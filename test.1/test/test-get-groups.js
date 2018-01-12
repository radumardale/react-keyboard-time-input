/* global describe it */
var expect = require('chai').expect
var getGroups = require('../src/lib/get-groups')

describe('getGroups', function () {
  it('should correctly split 12 hour time strings', function () {
    expect(getGroups('01:02 PM')).to.eql(['01', '02', 'PM'])
    expect(getGroups('01:02 AM')).to.eql(['01', '02', 'AM'])
    expect(getGroups('01:02:03:004 PM')).to.eql(['01', '02', '03', '004', 'PM'])
    expect(getGroups('01:02:03:004 AM')).to.eql(['01', '02', '03', '004', 'AM'])
  })
  it('should correctly split 24 hour time strings', function () {
    expect(getGroups('01:02')).to.eql(['01', '02'])
    expect(getGroups('01:02:03:004')).to.eql(['01', '02', '03', '004'])
    expect(getGroups('01:02:03:004')).to.eql(['01', '02', '03', '004'])
  })
})
