//DDEBUGGING - remove this entire thing

/**
 * Expose `Backoff`.
 */

module.exports = Backoff;

/**
 * Initialize backoff timer with `opts`.
 *
 * - `min` initial timeout in milliseconds [100]
 * - `max` max timeout [10000]
 * - `jitter` [0]
 * - `factor` [2]
 *
 * @param {Object} opts
 * @api public
 */

function Backoff(opts) {
    opts = opts || {};
    this.min = opts.min || 100;
    this.max = opts.max || 10000;
    this.factor = opts.factor || 2;
    this.jitter = opts.jitter > 0 && opts.jitter <= 1 ? opts.jitter : 0;
    this.attempts = 0;
    this.ms = this.min;
}

/**
 * Calculate next backoff duration.
 *
 * @return {Number}
 * @api public
 */

Backoff.prototype.backoff = function() {
    let currentMs = this.ms;
    let nextMs = this.min * Math.pow(this.factor, this.attempts++);

    if (this.jitter) {
        let rand = Math.random();
        let deviation = Math.floor(rand * this.jitter * nextMs);
        nextMs = (Math.floor(rand * 10) & 1) == 0 ? nextMs - deviation : nextMs + deviation;
    }

    this.ms = Math.min(nextMs, this.max) | 0;

    return currentMs;
};

/**
 * Reset the number of attempts.
 *
 * @api public
 */

Backoff.prototype.reset = function() {
    this.ms = this.min;
    this.attempts = 0;
};
