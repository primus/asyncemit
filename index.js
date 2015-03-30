'use strict';

/**
 * Asynchronously emit an event.
 *
 * @param {String} event Name of the event that should be emitted.
 * @param {Arguments} .. Arguments for the emit function.
 * @param {Function} fn Completion callback for when all is emitted.
 * @returns {Self}
 * @api public
 */
module.exports = function asyncemit() {
  var args = Array.prototype.slice.call(arguments, 0)
    , event = args.shift()
    , async = args.length
    , fn = args.pop()
    , selfie = this;

  /**
   * Simple
   *
   * @param {Array} stack The various of event listeners are async emitted.
   * @api public
   */
  (function each(stack) {
    if (!stack.length) return fn();

    var listener = stack.shift();

    if (listener.once) {
      selfie.removeListener(event, listener.fn);
    }

    if (listener.fn.length !== async) {
      listener.fn.apply(listener.context, args);
      return each(stack);
    }

    //
    // Async operation
    //
    listener.fn.apply(
      listener.context,
      args.concat(function done(err) {
        if (err) return fn(err);

        each(stack);
      })
    );
  })(this.listeners(event));

  return this;
};
