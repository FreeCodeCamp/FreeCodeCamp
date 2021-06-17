const { Octokit } = require('@octokit/rest');

const {
  github: { owner, secret, freeCodeCampRepo }
} = require('../config');

const octokit = new Octokit({ auth: secret });

const addComment = async (number, comment) => {
  const result = await octokit.issues
    .createComment({
      owner,
      repo: freeCodeCampRepo,
      number,
      body: comment
    })
    .catch((err) => {
      console.log(`PR #${number} had an error when trying to add a comment\n`);
      console.log(err);
    });

  if (result) {
    console.log(`PR #${number} successfully added a comment\n`);
  }
  return result;
};

module.exports = { addComment };
