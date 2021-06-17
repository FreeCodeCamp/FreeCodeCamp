const config = require('../../lib/config');
const { validLabels } = require('../validation');
const { addLabels } = require('./add-labels');
const { rateLimiter } = require('../utils');

const labeler = async (number, prFiles, currentLabels) => {
  // holds potential labels to add based on file path
  const labelsToAdd = {};
  const existingLabels = currentLabels.map(({ name }) => name);
  prFiles.forEach(({ filename }) => {
    /* remove '/challenges' from filename so
       language variable hold the language */
    const filenameReplacement = filename.replace(
      /^curriculum\/challenges\//,
      'curriculum/'
    );
    const regex =
      /^(docs|curriculum)(?:\/)(english|arabic|chinese|portuguese|russian|spanish)?\/?/;
    // need an array to pass to labelsAdder
    const match = filenameReplacement.match(regex) || [];
    const articleType = match[1];
    const language = match[2];
    if (articleType && validLabels[articleType]) {
      labelsToAdd[validLabels[articleType]] = 1;
    }
    if (language && validLabels[language]) {
      labelsToAdd[validLabels[language]] = 1;
    }
    if (articleType === 'curriculum') {
      labelsToAdd['status: need to test locally'] = 1;
    }
  });

  // only adds needed labels which are NOT currently on the PR
  const newLabels = Object.keys(labelsToAdd).filter((label) => {
    return !existingLabels.includes(label);
  });
  if (newLabels.length) {
    if (config.oneoff.productionRun) {
      addLabels(number, newLabels);
      await rateLimiter(1000);
    }
  }
  return newLabels;
};

module.exports = { labeler };
