/* global describe it */
var expect = require('chai').expect
var pad = require('../src/lib/zero-pad')

describe('zeroPad', function () {
  it('should zero pad a number, given n digits', function () {
    expect(pad('1', 2)).to.eql('01')
    expect(pad('1', 3)).to.eql('001')
    expect(pad('01', 4)).to.eql('0001')
    expect(pad('001', 5)).to.eql('00001')
  })
})
