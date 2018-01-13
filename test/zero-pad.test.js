/* global describe it */
import pad from '../src/lib/zero-pad';

describe('zeroPad', function () {
  it('should zero pad a number, given n digits', function () {
    expect(pad('1', 2)).toEqual('01')
    expect(pad('1', 3)).toEqual('001')
    expect(pad('01', 4)).toEqual('0001')
    expect(pad('001', 5)).toEqual('00001')
  })
})
