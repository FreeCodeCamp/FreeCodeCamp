/*
This script was originally created to iterate over all open PRs to label and
comment on specific PR errors (i.e. guide related filenmame syntax and
frontmatter).

Since the first run which covered over 10,000+ PRs, it is curently ran every
couple of days for just the most recent PRs.

To run the script for a specific range,
run `node sweeper.js range startingPrNumber endingPrNumber`
*/

const {
  github: { freeCodeCampRepo, defaultBase }
} = require('../lib/config');
const { getPRs, getUserInput, getFiles } = require('../lib/get-prs');
const { ProcessingLog, rateLimiter } = require('../lib/utils');
const { labeler } = require('../lib/pr-tasks');

const log = new ProcessingLog('sweeper');

log.start();
console.log('Sweeper started...');
(async () => {
  const { totalPRs, firstPR, lastPR } = await getUserInput(
    freeCodeCampRepo,
    defaultBase
  );
  const prPropsToGet = ['number', 'labels', 'user'];
  const { openPRs } = await getPRs(
    freeCodeCampRepo,
    defaultBase,
    totalPRs,
    firstPR,
    lastPR,
    prPropsToGet
  );
  let count = 0;
  if (openPRs.length) {
    console.log('Processing PRs...');
    for (let i = 0; i < openPRs.length; i++) {
      let { number, labels: currentLabels } = openPRs[i];
      const prFiles = await getFiles(freeCodeCampRepo, number);
      count++;

      const labelsAdded = await labeler(number, prFiles, currentLabels);
      const labelLogVal = labelsAdded.length ? labelsAdded : 'none added';

      log.add(number, { number, labels: labelLogVal });
      if (count > 4000) {
        await rateLimiter(2350);
      }
    }
  }
})()
  .then(() => {
    log.finish();
    console.log('Sweeper complete');
  })
  .catch((err) => {
    log.finish();
    console.log(err);
  });
