const path = require('path');
const { inspect } = require('util');

const { parseMD } = require('../index');

(async () => {
  const fullPath = path.resolve(__dirname, './example.md');
  const output = await parseMD(fullPath);
  console.log(inspect(output, null, null, true));
})();
