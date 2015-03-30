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
});
