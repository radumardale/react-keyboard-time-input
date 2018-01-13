# react-keyboard-time-input

[![Build Status](https://travis-ci.org/radumardale/react-keyboard-time-input.svg?branch=master)](https://travis-ci.org/radumardale/react-keyboard-time-input)
[![codecov](https://codecov.io/gh/radumardale/react-keyboard-time-input/branch/master/graph/badge.svg)](https://codecov.io/gh/radumardale/react-keyboard-time-input)

[![PeerDependencies](https://img.shields.io/david/peer/radumardale/react-keyboard-time-input.svg)](https://david-dm.org/radumardale/react-keyboard-time-input#info=peerDependencies&view=list)
[![Dependencies](https://img.shields.io/david/radumardale/react-keyboard-time-input.svg)](https://david-dm.org/radumardale/react-keyboard-time-input)
[![DevDependencies](https://img.shields.io/david/dev/radumardale/react-keyboard-time-input.svg)](https://david-dm.org/radumardale/react-keyboard-time-input#info=devDependencies&view=list)

Forked from [alanclarke/time-input](https://github.com/alanclarke/time-input).

A keyboard friendly react component for capturing time.

#### Only es6 modules (`import/export default`) import is available. `commonjs` (`require()/module.export`) build is published but is not tested.

[DEMO HERE](https://radumardale.github.io/react-keyboard-time-input/)

## Features
- small UI surface area (just a form input)
- keyboard friendly (can type times, use up and down keys to go forwards and backwards in time, can tab between time groups)
- simple api (infers most options from value, e.g. 24hr time or 12hr, whether to display seconds and milliseconds)
- easy going UX: ignores invalid input and simply skips over separator if omitted
- no dependencies
- 95% test coverage

## Installation
```
yarn add react-keyboard-time-input
```
or
```
npm install react-keyboard-time-input
```

## Usage
```js
import ReactDom from 'ReactDom';
import TimeInput from 'react-keyboard-time-input';

function render (value) {
  ReactDom.render((
    <TimeInput value={value} onChange={render}/>
  ), document.body)
}

render()
```

## Valid formats
```js
/*
 * '12:00'
 * '12:00 AM'
 * '12:00:00'
 * '12:00:00:000 AM'
*/
```
## Run tests
```
npm test
```
