/*
This is a one-off script to find all open PRs which have one of the
console.error descriptions in the failuresToFind.json file.
*/

const { Octokit } = require('@octokit/rest');
const fetch = require('node-fetch');

const {
  github: { owner, secret, freeCodeCampRepo, defaultBase }
} = require('../lib/config');

const octokit = new Octokit({ auth: secret });

const { getPRs, getUserInput } = require('../lib/get-prs');
const { savePrData, ProcessingLog } = require('../lib/utils');

const log = new ProcessingLog('find-failures-script');

const errorsToFind = [
  {
    error: '',
    regex: ''
  }
];

(async () => {
  const { totalPRs, firstPR, lastPR } = await getUserInput(
    freeCodeCampRepo,
    defaultBase
  );
  const prPropsToGet = ['number', 'labels', 'head'];
  const { openPRs } = await getPRs(
    freeCodeCampRepo,
    defaultBase,
    totalPRs,
    firstPR,
    lastPR,
    prPropsToGet
  );

  if (openPRs.length) {
    savePrData(openPRs, firstPR, lastPR);
    log.start();
    console.log('Starting error finding process...');
    for (let count = 0; count < openPRs.length; count++) {
      let {
        number,
        labels,
        head: { sha: ref }
      } = openPRs[count];
      const existingLabels = labels.map(({ name }) => name);

      if (
        !existingLabels.includes('status: merge conflict') &&
        !existingLabels.includes('status: needs update') &&
        !existingLabels.includes('status: discussing')
      ) {
        const { data: statuses } = await octokit.repos.listStatusesForRef({
          owner,
          repo: freeCodeCampRepo,
          ref
        });
        if (statuses.length) {
          // first element contain most recent status
          const { state, target_url: targetUrl } = statuses[0];
          const hasProblem = state === 'failure' || state === 'error';
          if (hasProblem) {
            let buildNum = Number(targetUrl.match(/\/builds\/(\d+)\?/i)[1]);
            /*
            const logNumber = 'need to use Travis api to
            access the full log for the buildNum above'
            */
            const logNumber = ++buildNum;
            const travisBaseUrl = 'https://api.travis-ci.org/v3/job/';
            const travisLogUrl = `${travisBaseUrl + logNumber}/log.txt`;
            const response = await fetch(travisLogUrl);
            const logText = await response.text();
            let error;
            for (let { error: errorDesc, regex } of errorsToFind) {
              regex = RegExp(regex);
              if (regex.test(logText)) {
                error = errorDesc;
                break;
              }
            }
            const errorDesc = error ? error : 'unknown error';
            log.add(number, { number, errorDesc, buildLog: travisLogUrl });
          }
        }
      }
    }
  }
})()
  .then(() => {
    log.finish();
    console.log('Successfully finished finding all specified errors.');
  })
  .catch((err) => {
    log.finish();
    console.log(err);
  });
