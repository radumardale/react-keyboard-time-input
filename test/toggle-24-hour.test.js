/* global describe it */
import toggle24Hr from '../src/lib/toggle-24-hour';

describe('toggle24Hr', function() {
  it('should correctly stringify 12 hour time strings', function() {
    expect(toggle24Hr(['01', '02', 'AM'])).toEqual(['01', '02', 'PM']);
    expect(toggle24Hr(['01', '02', 'PM'])).toEqual(['01', '02', 'AM']);
    expect(toggle24Hr(['01', '02', '03', '004', 'AM'])).toEqual([
      '01',
      '02',
      '03',
      '004',
      'PM'
    ]);
    expect(toggle24Hr(['01', '02', '03', '004', 'PM'])).toEqual([
      '01',
      '02',
      '03',
      '004',
      'AM'
    ]);
  });
});
