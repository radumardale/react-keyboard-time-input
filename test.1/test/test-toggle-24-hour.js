/* global describe it */
var expect = require('chai').expect
var toggle24Hr = require('../src/lib/toggle-24-hour')

describe('toggle24Hr', function () {
  it('should correctly stringify 12 hour time strings', function () {
    expect(toggle24Hr(['01', '02', 'AM'])).to.eql(['01', '02', 'PM'])
    expect(toggle24Hr(['01', '02', 'PM'])).to.eql(['01', '02', 'AM'])
    expect(toggle24Hr(['01', '02', '03', '004', 'AM'])).to.eql(['01', '02', '03', '004', 'PM'])
    expect(toggle24Hr(['01', '02', '03', '004', 'PM'])).to.eql(['01', '02', '03', '004', 'AM'])
  })
})
