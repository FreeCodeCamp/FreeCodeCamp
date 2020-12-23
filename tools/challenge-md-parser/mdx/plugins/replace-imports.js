const path = require('path');
const { read } = require('to-vfile');
const modifyChildren = require('unist-util-modify-children');
const remark = require('remark');
const remove = require('unist-util-remove');
const visit = require('unist-util-visit');
const { selectAll } = require('unist-util-select');
const { isEmpty } = require('lodash');

const { editableRegionMarker } = require('./add-seed');
const tableAndStrikeThrough = require('./table-and-strikethrough');

async function parse(file) {
  return await remark()
    .use(tableAndStrikeThrough)
    .parse(file);
}

function plugin() {
  return transformer;

  function transformer(tree, file, next) {
    const importedFiles = selectAll('leafDirective[name=import]', tree);
    if (!file) {
      next('replace-imports must be passed a file');
      return;
    }
    if (isEmpty(importedFiles)) {
      next();
      return;
    }
    const importPromises = importedFiles.map(async ({ attributes }) => {
      const { from, component } = attributes;
      // if these are missing, bail, since it's not an import.
      if (!from || !component) {
        return null;
      }
      const location = path.resolve(file.dirname, from);
      return await read(location)
        .then(parse)
        .then(importedFile => {
          function modifier(node, index, parent) {
            const { type, name, attributes } = node;
            const target = attributes ? attributes.component : null;
            if (
              type === 'leafDirective' &&
              name === 'use' &&
              target === component
            ) {
              if (!validateImports(importedFile))
                throw Error(
                  'Importing files containing ' +
                    editableRegionMarker +
                    's is not supported.'
                );

              parent.children.splice(index, 1, ...importedFile.children);
            }
          }

          const modify = modifyChildren(modifier);
          modify(tree);
        });
    });

    // We're not interested in the results of importing, we just want to
    // modify the tree and pass that new tree to follow plugins - as a result,
    // we can't just use .then(next), as it would pass the array into next.
    // Also, we remove the import statements here.
    Promise.all(importPromises)
      .then(() => {
        remove(tree, { type: 'leafDirective', name: 'import' });
        next();
      })
      .catch(err => {
        console.log('error processing ::import');
        console.log(err);
        next(err);
      });
  }
}

function validateImports(fileTree) {
  let valid = true;

  function visitor({ value }) {
    if (value && value.includes(editableRegionMarker)) {
      valid = false;
      return visit.EXIT;
    } else {
      return visit.CONTINUE;
    }
  }

  visit(fileTree, visitor);
  return valid;
}

module.exports = plugin;
