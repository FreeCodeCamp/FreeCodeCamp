const getAllBetween = require('./utils/between-headings');
// const visit = require('unist-util-visit');
const visitChildren = require('unist-util-visit-children');
const { root } = require('mdast-builder');
const { getFileVisitor } = require('./utils/get-file-visitor');
const { isEmpty } = require('lodash');

const editableRegionMarker = '--fcc-editable-region--';

function findRegionMarkers(challengeFile) {
  const lines = challengeFile.contents.split('\n');
  const editableLines = lines
    .map((line, id) => (line.trim() === editableRegionMarker ? id : -1))
    .filter(id => id >= 0);

  if (editableLines.length > 2) {
    throw Error('Editable region has too many markers: ' + editableLines);
  }

  if (editableLines.length === 0) {
    return null;
  } else if (editableLines.length === 1) {
    throw Error(`Editable region not closed`);
  } else {
    return editableLines;
  }
}

function removeLines(contents, toRemove) {
  const lines = contents.split('\n');
  return lines.filter((_, id) => !toRemove.includes(id)).join('\n');
}

// TODO: DRY this.  Start with an array of markers and go from there.
function addSeeds() {
  function transformer(tree, file) {
    const seedTree = root(getAllBetween(tree, `--seed--`));
    // Not all challenges have seeds (video challenges, for example), so we stop
    // processing in these cases.
    if (isEmpty(seedTree.children)) return;
    const contentsTree = root(getAllBetween(seedTree, `--seed-contents--`));
    const headTree = root(getAllBetween(seedTree, `--before-user-code--`));
    const tailTree = root(getAllBetween(seedTree, `--after-user-code--`));
    const seeds = [];

    // While before and after code are optional, the contents are not
    if (isEmpty(contentsTree.children))
      throw Error('## --seed-contents-- must appear in # --seed-- sections');

    const visitForContents = visitChildren(
      getFileVisitor(seeds, 'contents', validateEditableMarkers)
    );
    const visitForHead = visitChildren(getFileVisitor(seeds, 'head'));
    const visitForTail = visitChildren(getFileVisitor(seeds, 'tail'));
    visitForContents(contentsTree);
    visitForHead(headTree);
    visitForTail(tailTree);
    const seedVals = Object.values(seeds);
    file.data = {
      ...file.data,
      challengeFiles: seedVals
    };

    // process region markers - remove them from content and add them to data
    seedVals
      .map(x => x.fileKey)
      .forEach(key => {
        const fileData = seedVals.find(x => x.fileKey === key);
        const editRegionMarkers = findRegionMarkers(fileData);
        if (editRegionMarkers) {
          fileData.contents = removeLines(fileData.contents, editRegionMarkers);

          if (editRegionMarkers[1] <= editRegionMarkers[0]) {
            throw Error('Editable region must be non zero');
          }
          fileData.editableRegionBoundaries = editRegionMarkers;
        } else {
          fileData.editableRegionBoundaries = [];
        }
      });
  }

  return transformer;
}

function validateEditableMarkers({ value, position }) {
  const twoMarkersRE = RegExp(
    editableRegionMarker + '.*' + editableRegionMarker
  );
  const formattedMarkerRE = /--fcc - editable - region--/;
  const lines = value.split('\n');
  const baseLineNumber = position.start.line + 1;
  lines.forEach((line, index) => {
    if (line.match(twoMarkersRE)) {
      throw Error(
        `Line ${
          baseLineNumber + index
        } has two markers. Each line should only have one.`
      );
    }
    if (line.match(formattedMarkerRE)) {
      throw Error(
        `Line ${
          baseLineNumber + index
        } has a malformed marker. It should be --fcc-editable-region--`
      );
    }
  });
}

module.exports = addSeeds;
module.exports.editableRegionMarker = editableRegionMarker;
