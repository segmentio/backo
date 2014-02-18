
# backo

  Simple exponential backoff because the others seem to have weird abstractions.

## Installation

```
$ npm install backo
```

## Example

```js
var Backoff = require('backoff');
var backoff = new Backoff({ min: 100, max: 20000 });

setTimeout(function(){
  something.reconnect();
}, backoff.duration());

// later when something works
backoff.reset()
```

# License

  MIT