const YAML = require('js-yaml');
const visit = require('unist-util-visit');

function plugin() {
  return transformer;

  function transformer(tree, file) {
    visit(tree, 'yaml', visitor);

    function visitor(node) {
      const frontmatter = YAML.load(node.value);

      file.data = { ...file.data, ...frontmatter };
    }
  }
}

module.exports = plugin;
