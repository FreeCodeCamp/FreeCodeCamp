/*
This is a one-off script to run on all open PRs to add
a comment and "status: needs update" label to any PR with guide articles which
have frontmatter issues.
*/

const fetch = require('node-fetch');
const { getPRs, getUserInput, getFiles } = require('../lib/get-prs');
const { addLabels, addComment } = require('../lib/pr-tasks');
const { rateLimiter, ProcessingLog } = require('../lib/utils');
const {
  frontmatterCheck
} = require('../lib/validation/guide-folder-checks/frontmatter-check');
const {
  createErrorMsg
} = require('../lib/validation/guide-folder-checks/create-error-msg');

const {
  github: { freeCodeCampRepo, defaultBase },
  oneoff: { productionRun }
} = require('../config');

const allowedLangDirNames = [
  'arabic',
  'chinese',
  'english',
  'portuguese',
  'russian',
  'spanish'
];

const log = new ProcessingLog('all-frontmatter-checks');

const labeler = async (
  number,
  prFiles,
  currentLabels,
  guideFolderErrorsComment
) => {
  // holds potential labels to add based on file path
  const labelsToAdd = {};
  if (guideFolderErrorsComment) {
    labelsToAdd['status: needs update'] = 1;
  }
  const existingLabels = currentLabels.map(({ name }) => name);

  /* only adds needed labels which are NOT currently on the PR. */
  const newLabels = Object.keys(labelsToAdd).filter((label) => {
    return !existingLabels.includes(label);
  });
  if (newLabels.length) {
    if (productionRun) {
      addLabels(number, newLabels);
      await rateLimiter();
    }
  }
  return newLabels;
};

const checkPath = (fullPath, fileContent) => {
  let errorMsgs = [];
  const remaining = fullPath.split('/');
  const isTranslation =
    allowedLangDirNames.includes(remaining[1]) && remaining[1] !== 'english';
  const frontMatterErrMsgs = frontmatterCheck(
    fullPath,
    isTranslation,
    fileContent
  );
  return errorMsgs.concat(frontMatterErrMsgs);
};

const guideFolderChecks = async (number, prFiles, user) => {
  let prErrors = [];
  for (let { filename: fullPath, raw_url: fileUrl } of prFiles) {
    let newErrors;
    if (/^guide\//.test(fullPath)) {
      const response = await fetch(fileUrl);
      const fileContent = await response.text();
      newErrors = checkPath(fullPath, fileContent);
    }
    if (newErrors) {
      prErrors = prErrors.concat(newErrors);
    }
  }

  if (prErrors.length) {
    const comment = createErrorMsg(prErrors, user);
    if (productionRun) {
      await addComment(number, comment);
      await rateLimiter();
    }
    return comment;
  } else {
    return null;
  }
};

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

  log.start();
  console.log('Starting frontmatter checks process...');
  let count = 0;
  for (let i = 0; i < openPRs.length; i++) {
    if (openPRs.length) {
      let {
        number,
        labels: currentLabels,
        user: { login: username }
      } = openPRs[count];

      const prFiles = await getFiles(freeCodeCampRepo, number);
      if (count > 4000) {
        await rateLimiter(2350);
      }
      const guideFolderErrorsComment = await guideFolderChecks(
        number,
        prFiles,
        username
      );
      const commentLogVal = guideFolderErrorsComment
        ? guideFolderErrorsComment
        : 'none';

      const labelsAdded = await labeler(
        number,
        prFiles,
        currentLabels,
        guideFolderErrorsComment
      );
      const labelLogVal = labelsAdded.length ? labelsAdded : 'none added';

      log.add(number, { number, comment: commentLogVal, labels: labelLogVal });
    }
  }
})()
  .then(() => {
    log.finish();
    console.log('Successfully completed frontmatter checks');
  })
  .catch((err) => {
    log.finish();
    console.log(err);
  });
