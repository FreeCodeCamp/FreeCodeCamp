const { Octokit } = require('@octokit/rest');
const _cliProgress = require('cli-progress');

const {
  github: { owner, secret }
} = require('../config');

const octokit = new Octokit({ auth: secret });

const { getRange, getCount } = require('./pr-stats');

/* eslint-disable camelcase */
const prsPaginate = async (
  repo,
  base,
  method,
  firstPR,
  lastPR,
  prPropsToGet
) => {
  let methodProps = {
    owner,
    repo,
    state: 'open',
    sort: 'created',
    direction: 'asc',
    page: 1,
    per_page: 100
  };

  if (base) {
    methodProps = { ...methodProps, base };
  }

  const prFilter = (prs, first, last, prPropsToGet) => {
    const filtered = [];
    for (let pr of prs) {
      if (pr.number >= first && pr.number <= last) {
        const propsObj = prPropsToGet.reduce((obj, prop) => {
          obj[prop] = pr[prop];
          return obj;
        }, {});
        filtered.push(propsObj);
      }
      if (pr.number >= last) {
        done = true;
        return filtered;
      }
    }
    return filtered;
  };

  // will be true when lastPR is seen in paginated results
  let done = false;
  let response = await method(methodProps);
  console.log('x-ratelimit-remaining:', response.meta['x-ratelimit-remaining']);
  let { data } = response;
  data = prFilter(data, firstPR, lastPR, prPropsToGet);
  while (octokit.hasNextPage(response) && !done) {
    response = await octokit.getNextPage(response);
    console.log(
      'x-ratelimit-remaining:',
      response.meta['x-ratelimit-remaining']
    );
    let dataFiltered = prFilter(response.data, firstPR, lastPR, prPropsToGet);
    data = data.concat(dataFiltered);
    // progressBar.increment(dataFiltered.length);
  }
  return data;
};

const getUserInput = async (repo, base, rangeType = '') => {
  let data, firstPR, lastPR;
  if (rangeType === 'all') {
    data = await getRange(repo, base).then((data) => data);
    firstPR = data[0];
    lastPR = data[1];
  } else {
    let [type, start, end] = process.argv.slice(2);
    data = await getRange(repo, base).then((data) => data);
    firstPR = data[0];
    lastPR = data[1];
    if (type !== 'all' && type !== 'range') {
      throw 'Please specify either all or range for 1st arg.';
    }
    if (type === 'range') {
      start = parseInt(start, 10);
      end = parseInt(end, 10);
      if (!start || !end) {
        throw 'Specify both a starting PR # (2nd arg) and ending PR # (3rd arg).';
      }
      if (start > end) {
        throw 'Starting PR # must be less than or equal to end PR #.';
      }
      if (start < firstPR) {
        throw `Starting PR # can not be less than first open PR # (${firstPR})`;
      }
      firstPR = start;
      if (end > lastPR) {
        throw `Ending PR # can not be greater than last open PR # (${lastPR})`;
      }
      lastPR = end;
    }
  }
  // A null value for firstPR or lastPR indicates the repo had no open PRs
  if (firstPR === null || lastPR === null) {
    return { totalPRs: 0, firstPR, lastPR };
  }
  const totalPRs = await getCount(repo, base).then((data) => data);
  return { totalPRs, firstPR, lastPR };
};

const getPRs = async (repo, base, totalPRs, firstPR, lastPR, prPropsToGet) => {
  let progressText = `Retrieve PRs (${firstPR}-${lastPR}) [{bar}] `;
  progressText += '{percentage}% | Elapsed Time: {duration_formatted} ';
  progressText += '| ETA: {eta_formatted}';
  const getPRsBar = new _cliProgress.Bar(
    {
      format: progressText,
      etaBuffer: 50
    },
    _cliProgress.Presets.shades_classic
  );
  // getPRsBar.start(totalPRs, 0);
  let openPRs = await prsPaginate(
    repo,
    base,
    octokit.pulls.list,
    firstPR,
    lastPR,
    prPropsToGet,
    getPRsBar
  );
  // getPRsBar.update(totalPRs);
  // getPRsBar.stop();
  console.log(`# of PRs retrieved: ${openPRs.length}`);
  return { firstPR, lastPR, openPRs };
};

const filesPaginate = async (repo, number) => {
  let methodProps = {
    owner,
    state: 'open',
    sort: 'created',
    direction: 'asc',
    page: 1,
    per_page: 100
  };

  if (repo) {
    methodProps = { ...methodProps, repo };
  }

  let response = await octokit.pulls.listFiles({
    number,
    ...methodProps
  });

  let { data } = response;
  while (octokit.hasNextPage(response)) {
    response = await octokit.getNextPage(response);
    let { data: moreData } = response;
    data = data.concat(moreData);
  }
  return data;
};

const getFiles = async (repo, number) => await filesPaginate(repo, number);

const getFilenames = async (repo, number) =>
  (await getFiles(repo, number)).map(({ filename }) => filename);

module.exports = { getPRs, getUserInput, getFiles, getFilenames };
