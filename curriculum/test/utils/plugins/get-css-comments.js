var css = require('css');
const { isEmpty } = require('lodash');
const visit = require('unist-util-visit');
const { commentToData } = require('../comment-to-data');

function visitComments(node, cb) {
  node.rules.forEach(rule => {
    if (rule.type === 'rule') {
      visitDeclarations(rule.declarations, cb);
    } else if (rule.type === 'comment') {
      cb(rule.comment);
    } else if (rule.type === 'media') {
      visitComments(rule, cb);
    }
  });
}

function visitDeclarations(declarations, cb) {
  declarations.forEach(dec => {
    if (dec.type === 'comment') {
      cb(dec.comment);
    }
  });
}

function plugin() {
  return transformer;

  function transformer(tree, file) {
    if (isEmpty(file.data)) file.data = {};
    visit(tree, { type: 'element', tagName: 'style' }, styleVisitor);

    function styleVisitor(node) {
      visit(node, 'text', cssVisitor);
    }
    function cssVisitor(node) {
      const ast = css.parse(node.value);
      visitComments(ast.stylesheet, comment =>
        commentToData(file, comment.trim())
      );
    }
  }
}

module.exports = plugin;
