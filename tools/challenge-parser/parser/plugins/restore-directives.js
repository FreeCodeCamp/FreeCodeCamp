const directive = require('mdast-util-directive');
var toMarkdown = require('mdast-util-to-markdown');
const { matches } = require('unist-util-select');
const visit = require('unist-util-visit');

function plugin() {
  return transformer;

  function transformer(tree) {
    visit(tree, visitor);

    function visitor(node, id, parent) {
      // currently `remark-directive` seems to be ignoring containerDirectives
      // but, assuming that will get fixed, we test for it anyway.
      const isDirective =
        matches('leafDirective', node) ||
        matches('textDirective', node) ||
        matches('containerDirective', node);

      if (isDirective) {
        parent.children[id] = {
          type: 'text',
          value: toMarkdown(node, {
            extensions: [directive.toMarkdown]
          }).trim()
        };
      }
    }
  }
}

module.exports = plugin;
