const { inspect } = require('util');
const remark = require('remark');
const html = require('remark-html');
const { read } = require('to-vfile');

(async () => {
  const path = './example.md';
  const file = await read(path);
  await remark()
    .use(() => tree => console.log(inspect(tree, null, null, true)))
    .use(html)
    .process(file);
})();
