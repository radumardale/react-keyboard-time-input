/* global describe it */
import getGroups from '../src/lib/get-groups';

describe('getGroups', function() {
  it('should correctly split 12 hour time strings', function() {
    expect(getGroups('01:02 PM')).toEqual(['01', '02', 'PM']);
    expect(getGroups('01:02 AM')).toEqual(['01', '02', 'AM']);
    expect(getGroups('01:02:03:004 PM')).toEqual([
      '01',
      '02',
      '03',
      '004',
      'PM'
    ]);
    expect(getGroups('01:02:03:004 AM')).toEqual([
      '01',
      '02',
      '03',
      '004',
      'AM'
    ]);
  });
  it('should correctly split 24 hour time strings', function() {
    expect(getGroups('01:02')).toEqual(['01', '02']);
    expect(getGroups('01:02:03:004')).toEqual(['01', '02', '03', '004']);
    expect(getGroups('01:02:03:004')).toEqual(['01', '02', '03', '004']);
  });
});
