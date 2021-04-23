const remark = require('remark');
const directives = require('remark-directive');
const stringify = require('remark-stringify');
const { read } = require('to-vfile');

(async () => {
  const path = './example.md';
  const file = await read(path);
  const contents = await remark()
    .use(directives)
    .use(() => tree => console.dir(tree, { depth: null, colors: true }))
    .use(stringify)
    .process(file);
  console.log(contents);
})();
