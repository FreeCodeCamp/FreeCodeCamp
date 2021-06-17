const rateLimit = require('express-rate-limit');

const limitHandler = (req, res) => {
  res.status(429).json({
    ok: false,
    rateLimitMessage:
      "You have accessed this app's pages too quickly.  Please try again in 5 minutes."
  });
};

const rateLimitOptions = {
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 100,
  message: 'rate limit activated',
  handler: limitHandler,
  onLimitReached: limitHandler
};

const reqLimiter = rateLimit(rateLimitOptions);

module.exports = { reqLimiter };
