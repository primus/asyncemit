# asyncemit

[![Version npm](http://img.shields.io/npm/v/asyncemit.svg?style=flat-square)](https://www.npmjs.com/package/asyncemit)[![CI](https://img.shields.io/github/actions/workflow/status/primus/asyncemit/ci.yml?branch=master&label=CI&style=flat-square)](https://github.com/primus/asyncemit/actions?query=workflow%3ACI+branch%3Amaster)[![Coverage Status](http://img.shields.io/coveralls/primus/asyncemit/master.svg?style=flat-square)](https://coveralls.io/r/primus/asyncemit?branch=master)

The `asyncemit` allows you to emit an event to an EventEmitter3 asynchronously.

## Installation

The module is released in the public npm registry and can be installed using:

```
npm install --save asyncemit
```

## Usage

To make this pattern work there are a couple of preconditions that need to be
satisfied:

1. The method should be added on either a class that inherits from the
   EventEmitter or on a new EventEmitter instance.
2. The number of arguments expected by a listener function should match the
   number of arguments passed to the `asyncemit` method excluding the event
   name.

See the following example:

```js
var EventEmitter = require('eventemitter3')
  , asyncemit = require('asyncemit');

var ee = new EventEmitter();
ee.asyncemit = asyncemit;

//
// The next `foo` listeners will not be executed until `next` is called.
//
ee.on('foo', function (arg, next) {
  // Do things with arg?
  next();
});

//
// Still executed, but synchronously.
//
ee.on('foo', function (arg) {

});

ee.asyncemit('foo', 'bar', function (err) {
  //
  // The error argument will be set if one of the async listeners called the
  // `next` callback with an `error` argument.
  //
});
```

## License

[MIT](LICENSE)
