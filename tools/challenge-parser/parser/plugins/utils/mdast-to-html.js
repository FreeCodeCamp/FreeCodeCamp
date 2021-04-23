const hastToHTML = require('hast-util-to-html');
const { root } = require('mdast-builder');
const mdastToHast = require('mdast-util-to-hast');

function mdastToHTML(nodes) {
  if (!Array.isArray(nodes))
    throw Error('mdastToHTML expects an array argument');
  // - the 'nodes' are children, so first need embedding in a parent

  return hastToHTML(mdastToHast(root(nodes), { allowDangerousHtml: true }), {
    allowDangerousHtml: true
  });
}

module.exports = mdastToHTML;
