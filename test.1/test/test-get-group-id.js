/* global describe it */
var expect = require('chai').expect
var getGroupId = require('../src/lib/get-group-id')

describe('getGroupId', function () {
  it('should return the correct group index', function () {
    ;[[0, 1, 2], [3, 4, 5], [6, 7, 8], [9, 10, 11, 12], [14]]
      .forEach(check)

    function check (indexes, groupId) {
      indexes.forEach(checkIndex)
      function checkIndex (index) {
        expect(getGroupId(index)).to.eql(groupId)
      }
    }
  })
})
