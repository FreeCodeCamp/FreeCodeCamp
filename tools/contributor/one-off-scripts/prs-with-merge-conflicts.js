/*
This script was created to find all open PRs that  have merge
conflicts and then add a the 'status: merge conflict' label to any PR
which does not already have the label.

To run the script for a specific language, call the script with the language
name as the first argument.

Note: It is possible that it could take more than 4 seconds for GitHub to
determine if a PR is mergeable.  If that happens, the PR will not be labeled.
*/

const { Octokit } = require('@octokit/rest');
const {
  github: { owner, secret, freeCodeCampRepo, defaultBase }
} = require('../lib/config');

const octokit = new Octokit({ auth: secret });

const { getPRs, getUserInput } = require('../lib/get-prs');
const { ProcessingLog, rateLimiter } = require('../lib/utils');
const { addLabels } = require('../lib/pr-tasks');
const { validLabels } = require('../lib/validation/valid-labels');

let languageLabel;
let [languageArg] = process.argv.slice(2);
if (languageArg) {
  languageArg = languageArg.toLowerCase();
  languageLabel = validLabels[languageArg] ? validLabels[languageArg] : null;
}

if (languageLabel) {
  console.log(`finding PRs with label = ${languageLabel}`);
}

const log = new ProcessingLog('prs-with-merge-conflicts');
log.start();
(async () => {
  const { totalPRs, firstPR, lastPR } = await getUserInput(
    freeCodeCampRepo,
    defaultBase,
    'all'
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
  if (openPRs.length) {
    let count = 0;
    let mergeConflictCount = 0;
    for (let i = 0; i < openPRs.length; i++) {
      let { labels, number } = openPRs[i];

      const hasLanguage =
        languageLabel && labels.some(({ name }) => languageLabel === name);

      const hasMergeConflictLabel = labels.some(
        ({ name }) => 'status: merge conflict' === name
      );

      if (!languageLabel || hasLanguage) {
        let data = await octokit.pulls.get({
          owner,
          repo: freeCodeCampRepo,
          number
        });
        let mergeableState = data.data.mergeable_state;
        count++;
        if (mergeableState === 'unknown') {
          await rateLimiter(4000);
          data = await octokit.pulls.get({
            owner,
            repo: freeCodeCampRepo,
            number
          });
          mergeableState = data.data.mergeable_state;
          count++;
        }

        if (mergeableState === 'dirty' && !hasMergeConflictLabel) {
          mergeConflictCount++;
          addLabels(number, ['status: merge conflict'], log);
          await rateLimiter();
        }

        if (count > 4000) {
          await rateLimiter(2350);
        }
      }
    }
    console.log(
      `There were ${mergeConflictCount} PRs with potential merge conflicts out of ${count} PRs received from GitHub`
    );
  } else {
    throw 'There were no open PRs received from Github';
  }
})()
  .then(async () => {
    log.finish();
    console.log('Finished finding PRs with merge conflicts');
  })
  .catch((err) => {
    log.finish();
    console.log(err);
  });
