const { Octokit } = require('@octokit/rest');
const {
  github: { owner, secret }
} = require('../config');

const octokit = new Octokit({ auth: secret });

const getCount = async (repo, base) => {
  const baseStr = base ? `+base:${base}` : '';
  /* eslint-disable camelcase */
  const {
    data: { total_count: count }
  } = await octokit.search
    .issues({
      q: `repo:${owner}/${repo}+is:open+type:pr${baseStr}`,
      sort: 'created',
      order: 'asc',
      page: 1,
      per_page: 1
    })
    .catch((err) => console.log(err));
  return count;
};

const getRange = async (repo, base) => {
  let methodProps = {
    owner,
    repo,
    state: 'open',
    sort: 'created',
    page: 1,
    per_page: 1
  };
  if (base) {
    methodProps = { ...methodProps, base };
  }
  let response = await octokit.pulls.list({
    direction: 'asc',
    ...methodProps
  });
  // In the case there are no open PRs for repo
  if (!response.data.length) {
    return [null, null];
  }
  const firstPR = response.data[0].number;
  response = await octokit.pulls.list({
    direction: 'desc',
    ...methodProps
  });
  const lastPR = response.data[0].number;
  return [firstPR, lastPR];
};

module.exports = { getCount, getRange };
