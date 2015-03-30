describe('asyncemit', function () {
  'use strict';

  var ee
    , asyncemit = require('./')
    , assume = require('assume')
    , EventEmitter = require('eventemitter3');

  beforeEach(function () {
    ee = new EventEmitter;
    ee.asyncemit = asyncemit;
  });

  afterEach(function () {
    ee.removeAllListeners();
  });

  it('is exported as function', function () {
    assume(asyncemit).is.a('function');
  });

  it('works with `sync` emitters', function (next) {
    next = assume.plan(2, next);
    var foo;

    ee.on('foo', function (arg) {
      assume(arg).equals('bar');
      foo = 'foo';
    });

    ee.asyncemit('foo', 'bar', function () {
      assume(foo).equals('foo');
      next();
    });
  });

  it('works with full async emitters', function (next) {
    next = assume.plan(2, next);
    var foo;

    ee.on('foo', function (arg, next) {
      assume(arg).equals('bar');
      foo = 'foo';

      setTimeout(next, 100);
    });

    ee.asyncemit('foo', 'bar', function () {
      assume(foo).equals('foo');
      next();
    });
  });

  it('bails out completely if one emitter errors', function (next) {
    next = assume.plan(3, next);

    ee.on('foo', function (arg, next) {
      assume(arg).equals('bar');
      next(new Error('He\'s dead jim'));
    });

    /* istanbul ignore next */
    ee.on('foo', function (arg, next) {
      throw new Error('I should never be called');
    });

    ee.asyncemit('foo', 'bar', function (err) {
      assume(err).is.instanceOf(Error);
      assume(err.message).equals('He\'s dead jim');

      next();
    });
  });

  it('processes in order of assignment', function (next) {
    var flow = '';

    ee.on('foo', function (arg, next) {
      assume(arg).equals('bar');

      flow += '1';
      next();
    });

    ee.on('foo', function (arg) {
      assume(arg).equals('bar');
      flow += '2';
    });

    ee.asyncemit('foo', 'bar', function (err) {
      assume(err).is.undefined();
      assume(flow).equals('12');
      next();
    });
  });

  it('works correctly with once listeners', function (next) {
    var flow = '';

    ee.once('foo', function (arg, next) {
      assume(arg).equals('bar');

      flow += '1';
      next();
    });

    ee.once('foo', function (arg) {
      assume(arg).equals('bar');
      flow += '2';
    });

    ee.asyncemit('foo', 'bar', function (err) {
      assume(err).is.undefined();
      assume(flow).equals('12');

      ee.asyncemit('foo', 'bar', function (err) {
        assume(err).is.undefined();
        assume(flow).equals('12');
        next();
      });
    });
  });
});
