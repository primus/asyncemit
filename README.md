# asyncemit

The `asyncemit` allows you to emit an event to an EventEmitter3 asynchronously.

## Installation

The module is released in the public npm registry.

```
npm install asyncemit
```

## Usage

To make this pattern work we have make a couple assumptions about the way this
module is used:

1. This method should be added on either a class that inherits from the
   EventEmitter or on a new EventEmitter instance.
2. The amount of arguments you pass is the same amount of arguments required for
   your event to be seen as async emitter.

## License

MIT
