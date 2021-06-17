const { Octokit } = require('@octokit/rest');
const {
  github: { owner, secret, freeCodeCampRepo }
} = require('../config');

const octokit = new Octokit({ auth: secret });

const addLabels = (number, labels, log) => {
  octokit.issues
    .addLabels({ owner, repo: freeCodeCampRepo, number, labels })
    .then(() => {
      console.log(`PR #${number} added ${JSON.stringify(labels)}\n`);
    })
    .catch((err) => {
      console.log(
        `PR #${number} had an error when trying to labels: ${JSON.stringify(
          labels
        )}\n`
      );
      console.log(err);
      log.finish();
    });
};

module.exports = { addLabels };
