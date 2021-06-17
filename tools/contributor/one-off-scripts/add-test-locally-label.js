/*
This is a one-off script to run on all open PRs to add the
"status: need to test locally" label to any PR with an existing
"scope: curriculum" label on it.
*/

const {
  github: { freeCodeCampRepo, defaultBase },
  oneoff: { productionRun }
} = require('../lib/config');

const { getPRs, getUserInput } = require('../lib/get-prs');
const { addLabels } = require('../lib/pr-tasks');
const { rateLimiter, ProcessingLog } = require('../lib/utils');

const log = new ProcessingLog('all-locally-tested-labels');

(async () => {
  const { totalPRs, firstPR, lastPR } = await getUserInput(
    freeCodeCampRepo,
    defaultBase
  );
  const prPropsToGet = ['number', 'labels'];
  const { openPRs } = await getPRs(
    freeCodeCampRepo,
    defaultBase,
    totalPRs,
    firstPR,
    lastPR,
    prPropsToGet
  );

  if (openPRs.length) {
    log.start();
    console.log('Starting labeling process...');
    for (let count = 0; count < openPRs.length; count++) {
      let { number, labels } = openPRs[count];
      // holds potential labels to add based on file path
      const labelsToAdd = {};
      const existingLabels = labels.map(({ name }) => name);
      if (existingLabels.includes('scope: curriculum')) {
        labelsToAdd['status: need to test locally'] = 1;
      }

      // only adds needed labels which are NOT currently on the PR
      const newLabels = Object.keys(labelsToAdd).filter((label) => {
        return !existingLabels.includes(label);
      });

      if (newLabels.length) {
        log.add(number, { number, labels: newLabels });
        if (productionRun) {
          addLabels(number, newLabels, log);
          await rateLimiter();
        }
      } else {
        log.add(number, { number, labels: 'none added' });
      }
    }
  }
})()
  .then(() => {
    log.finish();
    console.log('Successfully completed labeling');
  })
  .catch((err) => {
    log.finish();
    console.log(err);
  });
