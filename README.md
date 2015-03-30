# asyncemit

[![Version npm](http://img.shields.io/npm/v/asyncemit.svg?style=flat-square)](http://browsenpm.org/package/asyncemit)[![Build Status](http://img.shields.io/travis/primus/asyncemit/master.svg?style=flat-square)](https://travis-ci.org/primus/asyncemit)[![Dependencies](https://img.shields.io/david/primus/asyncemit.svg?style=flat-square)](https://david-dm.org/primus/asyncemit)[![Coverage Status](http://img.shields.io/coveralls/primus/asyncemit/master.svg?style=flat-square)](https://coveralls.io/r/primus/asyncemit?branch=master)[![IRC channel](http://img.shields.io/badge/IRC-irc.freenode.net%23primus-00a8ff.svg?style=flat-square)](http://webchat.freenode.net/?channels=primus)

The `asyncemit` allows you to emit an event to an EventEmitter3 asynchronously.

## Installation

The module is released in the public npm registry and can be installed using:

```
npm install --save asyncemit
```

## Usage

To make this pattern work we have make a couple assumptions about the way this
module is used:

1. This method should be added on either a class that inherits from the
   EventEmitter or on a new EventEmitter instance.
2. The amount of arguments you pass is the same amount of arguments required for
   your event to be seen as async emitter.

See the following example:

```
var asyncemit = require('asyncemit')
  , EventEmitter = require('eventemitter3');

var ee = new EventEmitter();
ee.asyncemit = asyncemit;

//
// The next `foo` listeners will not be executed until this `next` is called. 
//
ee.on('foo', function (arg, next) {
  // do things with arg?
  next();
});

//
// Still executed, by sync
//
ee.on('foo', function (arg) {

});

ee.asyncemit('foo', 'bar', function (err) {
  //
  // The error argument will be set if one of the async listeners called the
  // `next` callback with an `error` arugment.
  //
});
```

## License

MIT
