/* global describe it */
import replaceCharAt from '../src/lib/replace-char-at';

describe('replaceCharAt', function() {
  it('should remove the char at the specified index', function() {
    expect(replaceCharAt('abcd', 0, 1)).toEqual('1bcd');
    expect(replaceCharAt('abcd', 1, 1)).toEqual('a1cd');
    expect(replaceCharAt('abcd', 2, 1)).toEqual('ab1d');
    expect(replaceCharAt('abcd', 3, 1)).toEqual('abc1');
  });
});
