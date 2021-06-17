/*
This script was created to iterate over all open PRs to label.

To run the script for a specific range,
run `node sweeper.js range startingPrNumber endingPrNumber`
*/

const {
  github: { freeCodeCampRepo, defaultBase }
} = require('../lib/config');
const { getPRs, getUserInput, getFiles } = require('../lib/get-prs');
const { ProcessingLog, rateLimiter } = require('../lib/utils');
const { labeler } = require('../lib/pr-tasks');

const log = new ProcessingLog('add-language-labels');

log.start();
console.log('Curriculum File language labeler started...');
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
    console.log('Labeler complete');
  })
  .catch((err) => {
    log.finish();
    console.log(err);
  });
