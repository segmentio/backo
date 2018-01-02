var Backoff = require('..');
var assert = require('assert');

describe('.backoff()', function() {
    it('should increase the backoff', function() {
        var b = new Backoff();

        assert(100 == b.backoff());
        assert(100 == b.ms);
        assert(1 == b.attempts);
        assert(100 == b.backoff());
        assert(200 == b.ms);
        assert(2 == b.attempts);
        assert(200 == b.backoff());
        assert(400 == b.ms);
        assert(3 == b.attempts);
        assert(400 == b.backoff());
        assert(800 == b.ms);
        assert(4 == b.attempts);
        assert(800 == b.backoff());

        b.reset();
        assert(100 == b.backoff());
        assert(100 == b.ms);
        assert(1 == b.attempts);
        assert(100 == b.backoff());
        assert(200 == b.ms);
        assert(2 == b.attempts);
        assert(200 == b.backoff());
    });
});
