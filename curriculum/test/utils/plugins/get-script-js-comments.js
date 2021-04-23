const acorn = require('acorn');
const { isEmpty } = require('lodash');
const visit = require('unist-util-visit');
const { commentToData } = require('../comment-to-data');

const parser = acorn.Parser;

function plugin() {
  return transformer;

  function transformer(tree, file) {
    if (isEmpty(file.data)) file.data = {};
    visit(tree, { type: 'element', tagName: 'script' }, scriptVisitor);

    function scriptVisitor(node) {
      visit(node, 'text', jsVisitor);
    }
    function jsVisitor(node) {
      let comments = [];
      parser.parse(node.value, { onComment: comments, ecmaVersion: 2020 });

      comments
        .map(({ value }) => value.trim())
        .forEach(comment => commentToData(file, comment));
    }
  }
}

module.exports = plugin;
