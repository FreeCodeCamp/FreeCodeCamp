const is = require('unist-util-is');
const position = require('unist-util-position');
const { isEmpty } = require('lodash');

const getId = require('./get-id');

const keyToSection = {
  head: 'before-user-code',
  tail: 'after-user-code'
};
const supportedLanguages = ['js', 'css', 'html', 'jsx', 'py'];

function defaultFile(lang, id) {
  return {
    fileKey: `index${lang}`,
    ext: lang,
    name: 'index',
    contents: '',
    head: '',
    tail: '',
    id
  };
}

function getFileVisitor(seeds, seedKey, validate) {
  return (node, index, parent) => {
    if (is(node, 'root')) return;
    if (is(node, 'code')) {
      codeToData(node, seeds, seedKey, validate);
      return;
    }
    idToData(node, index, parent, seeds);
  };
}

function codeToData(node, seeds, seedKey, validate) {
  if (validate) validate(node);
  const lang = node.lang;
  if (!supportedLanguages.includes(lang))
    throw Error(`On line ${
      position.start(node).line
    } '${lang}' is not a supported language.
 Please use one of js, css, html, jsx or py
`);

  const fileKey = `index${lang}`;
  const id = seeds[fileKey] ? seeds[fileKey].id : '';
  // the contents will be missing if there is an id preceding this code
  // block.
  if (!seeds[fileKey]) {
    seeds[fileKey] = defaultFile(lang, id);
  }
  if (isEmpty(node.value) && seedKey !== 'contents') {
    const section = keyToSection[seedKey];
    throw Error(`Empty code block in --${section}-- section`);
  }

  seeds[fileKey][seedKey] = isEmpty(seeds[fileKey][seedKey])
    ? node.value
    : seeds[fileKey][seedKey] + '\n' + node.value;
}

function idToData(node, index, parent, seeds) {
  const id = getId(node);

  // If this is reached, the node type is neither root nor code. If it is not
  // an id, there must be a syntax error.
  if (!id) {
    throw Error(
      'Unexpected syntax in seed/solution. Must be ::id{#id} or a code ' +
        'block (```) \n'
    );
  }
  const codeNode = parent.children[index + 1];
  if (codeNode && is(codeNode, 'code')) {
    const fileKey = `index${codeNode.lang}`;
    if (seeds[fileKey]) throw Error('::id{#id}s must come before code blocks');
    seeds[fileKey] = defaultFile(codeNode.lang, id);
  } else {
    throw Error('::id{#id}s must come before code blocks');
  }
}

module.exports.getFileVisitor = getFileVisitor;
