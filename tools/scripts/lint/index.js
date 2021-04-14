const fs = require('fs');
const path = require('path');
const YAML = require('js-yaml');
const argv = require('yargs').argv;
const linter = require('./linter');

const CONFIG_PATH = path.resolve(
  __dirname,
  '../../../curriculum/challenges/.markdownlint.yaml'
);
const isMDRE = /.*\.md$/;

const lintRules = fs.readFileSync(CONFIG_PATH, 'utf8');

const lint = linter(YAML.load(lintRules));

const files = argv._.filter(arg => isMDRE.test(arg));
files.forEach(path => lint({ path: path }));

module.exports = lint;
