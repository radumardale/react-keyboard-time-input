var React = require('react')
var ReactDom = require('react-dom')
var TimeInput = require('../src/TimeInput')

;(function render (value) {
  ReactDom.render((
    <TimeInput value={value} onChange={render} defaultValue='12:00:00:000 AM'/>
  ), document.getElementById('demo-1'))
})('11:30:00:000 PM')

;(function render (value) {
  ReactDom.render((
    <TimeInput value={value} onChange={render} defaultValue='00:00:00:000'/>
  ), document.getElementById('demo-2'))
})('11:30:00:000')

;(function render (value) {
  ReactDom.render((
    <TimeInput value={value} onChange={render}/>
  ), document.getElementById('demo-3'))
})('11:30 PM')

;(function render (value) {
  ReactDom.render((
    <TimeInput value={value} onChange={render}/>
  ), document.getElementById('demo-4'))
})('11:30')
