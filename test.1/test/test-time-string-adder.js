/* global describe it */
var expect = require('chai').expect
var adder = require('../src/lib/time-string-adder')

describe('adder', function () {
  it('should add correctly to each group', function () {
    expect(adder('00:00', 0, 1)).to.eql('01:00')
    expect(adder('00:00', 1, 2)).to.eql('00:02')
    expect(adder('00:00:00', 2, 3)).to.eql('00:00:03')
    expect(adder('00:00:00:000', 3, 4)).to.eql('00:00:00:004')
  })
  it('should subtract correctly from each group', function () {
    expect(adder('01:00', 0, -1)).to.eql('00:00')
    expect(adder('00:02', 1, -2)).to.eql('00:00')
    expect(adder('00:00:03', 2, -3)).to.eql('00:00:00')
    expect(adder('00:00:00:004', 3, -4)).to.eql('00:00:00:000')
  })
  it('should overflow to preceeding group', function () {
    expect(adder('00:59', 1, 1)).to.eql('01:00')
    expect(adder('00:00:59', 2, 1)).to.eql('00:01:00')
    expect(adder('00:00:00:999', 3, 1)).to.eql('00:00:01:000')
    expect(adder('12:00', 0, 1)).to.eql('13:00')
    expect(adder('12:00 AM', 0, 1)).to.eql('01:00 AM')
  })
  it('should underflow to preceeding group', function () {
    expect(adder('01:00', 1, -1)).to.eql('00:59')
    expect(adder('00:01:00', 2, -1)).to.eql('00:00:59')
    expect(adder('00:00:01:00', 3, -1)).to.eql('00:00:00:999')
  })
  it('should toggle AM/PM when overflowing group zero', function () {
    expect(adder('11:59 PM', 1, 1)).to.eql('12:00 AM')
    expect(adder('12:00 AM', 1, -1)).to.eql('11:59 PM')
    expect(adder('11:59 AM', 1, 1)).to.eql('12:00 PM')
    expect(adder('12:00 PM', 1, -1)).to.eql('11:59 AM')
  })
  it('should not toggle AM/PM when not overflowing group zero', function () {
    expect(adder('10:59 PM', 1, 1)).to.eql('11:00 PM')
    expect(adder('11:00 PM', 1, -1)).to.eql('10:59 PM')
    expect(adder('10:59 AM', 1, 1)).to.eql('11:00 AM')
    expect(adder('11:00 AM', 1, -1)).to.eql('10:59 AM')
  })
  it('should toggle 24hr/12hr', function () {
    expect(adder('00:00 PM', 2)).to.eql('00:00 AM')
    expect(adder('00:00:00 PM', 3)).to.eql('00:00:00 AM')
    expect(adder('00:00:00:000 PM', 4)).to.eql('00:00:00:000 AM')
    expect(adder('00:00 AM', 2)).to.eql('00:00 PM')
    expect(adder('00:00:00 AM', 3)).to.eql('00:00:00 PM')
    expect(adder('00:00:00:000 AM', 4)).to.eql('00:00:00:000 PM')
  })
})
