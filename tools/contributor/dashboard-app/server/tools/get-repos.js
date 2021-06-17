const { Octokit } = require('@octokit/rest');

const {
  github: { owner, secret }
} = require('../../../lib/config');

const getRepos = async () => {
  const octokit = new Octokit({ auth: secret });

  /* eslint-disable camelcase */
  const methodProps = {
    org: owner,
    sort: 'full_name',
    direction: 'asc',
    per_page: 100
  };

  const repos = await octokit.paginate(octokit.repos.listForOrg, methodProps);
  const otherRepos = repos
    .filter((repo) => !repo.archived && repo.name !== owner)
    .map((repo) => repo.name);

  const reposToAdd = [];
  for (let repo of otherRepos) {
    const methodProps = {
      owner,
      repo,
      state: 'open',
      sort: 'created',
      direction: 'asc',
      page: 1,
      per_page: 100
    };

    const openPRs = await octokit.paginate(octokit.pulls.list, methodProps);

    if (openPRs.length) {
      const prsToAdd = [];
      for (let pr of openPRs) {
        const {
          number,
          title,
          user: { login: username },
          html_url: prLink
        } = pr;
        prsToAdd.push({ _id: number, title, username, prLink });
      }
      reposToAdd.push({ _id: repo, prs: prsToAdd });
    }
  }
  return reposToAdd;
};

module.exports = getRepos;
