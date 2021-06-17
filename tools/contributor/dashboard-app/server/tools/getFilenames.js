const { Octokit } = require('@octokit/rest');

const {
  github: { owner, secret, freeCodeCampRepo }
} = require('../../../lib/config');

const octokit = new Octokit({ auth: secret });

const getFiles = async (number) => {
  /* eslint-disable camelcase */
  const methodProps = {
    owner,
    repo: freeCodeCampRepo,
    pull_number: number,
    per_page: 100
  };

  const files = await octokit.paginate(octokit.pulls.listFiles, methodProps);
  return files;
};

const getFilenames = async (number) => {
  const files = await getFiles(number);
  return files.map(({ filename }) => filename);
};

module.exports = getFilenames;
