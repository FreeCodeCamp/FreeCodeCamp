const directive = require('remark-directive');
const frontmatter = require('remark-frontmatter');
const remark = require('remark-parse');
const { readSync } = require('to-vfile');
const unified = require('unified');
const addFrontmatter = require('./plugins/add-frontmatter');
const addSeed = require('./plugins/add-seed');
const addSolution = require('./plugins/add-solution');
const addTests = require('./plugins/add-tests');
const addText = require('./plugins/add-text');
const addVideoQuestion = require('./plugins/add-video-question');
const replaceImports = require('./plugins/replace-imports');
const restoreDirectives = require('./plugins/restore-directives');
const tableAndStrikeThrough = require('./plugins/table-and-strikethrough');

// by convention, anything that adds to file.data has the name add<name>.
const processor = unified()
  // add the remark parser
  .use(remark)
  // modify the parser so that Github flavour tables and strikethroughs get
  // converted to 'delete' nodes
  .use(tableAndStrikeThrough)
  // directives are parsed into 'leafDirective' nodes and used for imports
  .use(directive)
  // convert the text at the top of the document (surrounded by ---) into a
  // 'yaml' node
  .use(frontmatter, ['yaml'])
  // extract the content from that 'yaml' node
  .use(addFrontmatter)
  // Any imports will be replaced (in the tree) with
  // the sub-tree of the target file. e.g.
  // ::import{component="Script" from="./file.path" }
  // means that file.path's tree will be inserted wherever
  // ::use{component="Script"}
  // appears.
  .use(replaceImports)
  // the final five 'add' plugins insert content into file.data
  // TODO: rename test->hint everywhere? It should make things easier to reason
  // about.
  .use(addSeed)
  .use(addSolution)
  // the directives will have been parsed and used by this point, any remaining
  // 'directives' will be from text like the css selector :root. These should be
  // converted back to text before they're added to the challenge object.
  .use(restoreDirectives)
  .use(addVideoQuestion)
  .use(addTests)
  .use(addText, ['description', 'instructions']);

exports.parseMD = function parseMD(filename) {
  return new Promise((resolve, reject) => {
    const file = readSync(filename);
    const tree = processor.parse(file);
    processor.run(tree, file, function (err, node, file) {
      if (!err) {
        resolve(file.data);
      } else {
        err.message += ' in file ' + filename;
        reject(err);
      }
    });
  });
};

exports.parseMDSync = function parseMDSync(filename) {
  const file = readSync(filename);
  const tree = processor.parse(file);
  try {
    processor.runSync(tree, file);
  } catch (err) {
    err.message += ' in file ' + filename;
    throw err;
  }
  return file.data;
};
