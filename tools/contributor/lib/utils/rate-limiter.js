const rateLimiter = (delay = 1500) => {
  /* The 1500 delay will guarantee the script will not exceed Github request
    limit of 1500 per hour. Only increase if you have a higher rate limit */
  return new Promise((resolve) => setTimeout(() => resolve(true), delay));
};

module.exports = { rateLimiter };
