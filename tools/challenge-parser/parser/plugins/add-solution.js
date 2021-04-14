const { root } = require('mdast-builder');
const visitChildren = require('unist-util-visit-children');

const { editableRegionMarker } = require('./add-seed');
const getAllBetween = require('./utils/between-headings');
const { getFileVisitor } = require('./utils/get-file-visitor');
const { splitOnThematicBreak } = require('./utils/split-on-thematic-break');

function validateMarkers({ value }) {
  const lines = value.split('\n');
  if (lines.some(line => line.match(RegExp(editableRegionMarker))))
    throw Error(
      '--fcc-editable-region-- should only appear in the --seed-contents--\n' +
        'section, not in --solutions--'
    );
}

function createPlugin() {
  return function transformer(tree, file) {
    const solutionArrays = splitOnThematicBreak(
      getAllBetween(tree, `--solutions--`)
    );
    const solutions = [];

    solutionArrays.forEach(nodes => {
      const solution = {};
      const solutionTree = root(nodes);
      const visitForContents = visitChildren(
        getFileVisitor(solution, 'contents', validateMarkers)
      );

      visitForContents(solutionTree);
      solutions.push(solution);
    });

    file.data = {
      ...file.data,
      solutions: solutions
    };
  };
}

module.exports = createPlugin;
