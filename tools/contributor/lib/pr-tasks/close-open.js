const { addComment } = require('./add-comment');
const { rateLimiter } = require('../utils');
const {
  github: { owner, secret, freeCodeCampRepo, defaultBase }
} = require('../config');

const { Octokit } = require('@octokit/rest');

const octokit = new Octokit({ auth: secret });

/* closes and reopens an open PR with applicable comment */
const closeOpen = async (number) => {
  await octokit.pulls
    .update({
      owner,
      repo: freeCodeCampRepo,
      number,
      state: 'closed',
      base: defaultBase
    })
    .then(async () => {
      await rateLimiter(5000);
      return octokit.pulls.update({
        owner,
        repo: freeCodeCampRepo,
        number,
        state: 'open',
        base: defaultBase
      });
    })
    .then(async () => {
      await rateLimiter(1000);
      const msg = 'Closed/Reopened to resolve a specific Travis build failure.';
      await addComment(number, msg);
    })
    .catch(async (err) => {
      // Octokit stores message as a stringified object
      const { errorMg } = JSON.parse(err.message);
      if (
        errorMg ===
        'state cannot be changed. The repository that submitted this pull request has been deleted.'
      ) {
        await rateLimiter(1000);
        await addComment(
          number,
          "This PR was closed because user's repo was deleted."
        );
        console.log(
          `PR #${number} was closed because user's repo was deleted.`
        );
      } else {
        throw err;
      }
    });
};

module.exports = { closeOpen };
