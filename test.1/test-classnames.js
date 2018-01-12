/* global describe it */
var React = require('react')
var ReactDOM = require('react-dom')
var expect = require('chai').expect
var TimeInput = require('../src/TimeInput')

describe('classnames', function () {
  it('should render any provided classnames additionally', function () {
    document.body.innerHTML = '<div></div>'
    ReactDOM.render((
      <TimeInput className='extra-1 extra-2' />
    ), document.body.firstElementChild)
    var el = document.body.getElementsByTagName('input')[0]
    expect(el.parentElement.className).to.eql('TimeInput extra-1 extra-2')
  })
})
