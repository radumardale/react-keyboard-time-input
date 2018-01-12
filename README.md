# react-keyboard-time-input

Forked from [alanclarke/time-input](https://github.com/alanclarke/time-input).

A keyboard friendly react component for capturing time

[demo](https://radumardale.github.io/react-keyboard-time-input/)

## features
- small UI surface area (just a form input)
- keyboard friendly (can type times, use up and down keys to go forwards and backwards in time, can tab between time groups)
- simple api (infers most options from value, e.g. 24hr time or 12hr, whether to display seconds and milliseconds)
- easy going UX: ignores invalid input and simply skips over separator if omitted
- no dependencies
- 95% test coverage

## installation
```
npm install react-keyboard-time-input
```
or
```
yarn add react-keyboard-time-input
```

## usage
```js
var ReactDom = require('ReactDom')
var TimeInput = require('react-keyboard-time-input')

function render (value) {
  ReactDom.render((
    <TimeInput value={value} onChange={render}/>
  ), document.body)
}

render()
```

## valid formats
```js
/*
 * '12:00'
 * '12:00 AM'
 * '12:00:00'
 * '12:00:00:000 AM'
*/
```
## run tests
```
npm test
```

## demo

[link](https://radumardale.github.io/react-keyboard-time-input/)
