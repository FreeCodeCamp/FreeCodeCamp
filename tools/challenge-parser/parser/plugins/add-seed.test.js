const isArray = require('lodash/isArray');

const simpleAST = require('../__fixtures__/ast-simple.json');
const withEditableAST = require('../__fixtures__/ast-with-markers.json');
const withSeedKeysAST = require('../__fixtures__/ast-seed-keys.json');
const withExtraLinesAST = require('../__fixtures__/ast-with-extra-lines.json');
const orphanKeyAST = require('../__fixtures__/ast-orphan-key.json');
const adjacentKeysAST = require('../__fixtures__/ast-adjacent-keys.json');
const withBeforeAfterAST = require('../__fixtures__/ast-before-after.json');
const emptyBeforeAST = require('../__fixtures__/ast-empty-before.json');
const emptyAfterAST = require('../__fixtures__/ast-empty-after.json');
const emptyCSSAST = require('../__fixtures__/ast-empty-css.json');
const emptyHTMLAST = require('../__fixtures__/ast-empty-html.json');
const doubleMarkerAST = require('../__fixtures__/ast-double-marker.json');
const jsxSeedAST = require('../__fixtures__/ast-jsx-seed.json');
const cCodeAST = require('../__fixtures__/ast-c-code.json');
const explodedMarkerAST = require('../__fixtures__/ast-exploded-marker.json');
const emptyContentAST = require('../__fixtures__/ast-empty-contents.json');

const addSeed = require('./add-seed');

describe('add-seed plugin', () => {
  const plugin = addSeed();
  let file = { data: {} };

  beforeEach(() => {
    file = { data: {} };
  });

  it('returns a function', () => {
    expect(typeof plugin).toEqual('function');
  });

  it('adds a `challengeFiles` property to `file.data`', () => {
    plugin(simpleAST, file);
    expect('challengeFiles' in file.data).toBe(true);
  });

  it('ensures that the `challengeFiles` property is an object', () => {
    plugin(simpleAST, file);
    expect(isArray(file.data.challengeFiles)).toBe(true);
  });

  it('adds test objects to the challengeFiles array following a schema', () => {
    expect.assertions(17);
    plugin(simpleAST, file);
    const {
      data: { challengeFiles }
    } = file;
    const testObject = challengeFiles.find(x => x.fileKey === 'indexjs');
    expect(Object.keys(testObject).length).toEqual(8);
    expect(testObject).toHaveProperty('fileKey');
    expect(typeof testObject['fileKey']).toBe('string');
    expect(testObject).toHaveProperty('ext');
    expect(typeof testObject['ext']).toBe('string');
    expect(testObject).toHaveProperty('name');
    expect(typeof testObject['name']).toBe('string');
    expect(testObject).toHaveProperty('contents');
    expect(typeof testObject['contents']).toBe('string');
    expect(testObject).toHaveProperty('head');
    expect(typeof testObject['head']).toBe('string');
    expect(testObject).toHaveProperty('tail');
    expect(typeof testObject['tail']).toBe('string');
    expect(testObject).toHaveProperty('id');
    expect(typeof testObject['id']).toBe('string');
    expect(testObject).toHaveProperty('editableRegionBoundaries');
    expect(isArray(testObject['editableRegionBoundaries'])).toBe(true);
  });

  it('parses seeds without ids', () => {
    expect.assertions(6);
    plugin(simpleAST, file);
    const {
      data: { challengeFiles }
    } = file;
    const { indexjs, indexhtml, indexcss } = challengeFiles.reduce(
      (challengeObjs, challengeObj) => {
        return {
          ...challengeObjs,
          [challengeObj.fileKey]: {
            ...challengeObj
          }
        };
      },
      {}
    );

    expect(indexjs.contents).toBe(`var x = 'y';`);
    expect(indexjs.fileKey).toBe(`indexjs`);
    expect(indexhtml.contents).toBe(`<html>
  <body>
  </body>
</html>`);
    expect(indexhtml.fileKey).toBe(`indexhtml`);
    expect(indexcss.contents).toBe(`body {
  background: green;
}`);
    expect(indexcss.fileKey).toBe(`indexcss`);
  });

  it('removes region markers from contents', () => {
    expect.assertions(2);
    plugin(withEditableAST, file);
    const {
      data: { challengeFiles }
    } = file;
    const indexcss = challengeFiles.find(x => x.fileKey === 'indexcss');

    expect(indexcss.contents).not.toMatch('--fcc-editable-region--');
    expect(indexcss.editableRegionBoundaries).toEqual([1, 4]);
  });

  // TODO: can we reuse 'name'? It's always 'index', I think, which suggests
  // it could be reused as an id. Revisit this once the parser is live.
  it('parses seeds with adjacent ids, adding the id to data', () => {
    expect.assertions(3);
    plugin(withSeedKeysAST, file);
    const {
      data: { challengeFiles }
    } = file;
    const { indexhtml, indexcss, indexjs } = challengeFiles.reduce(
      (challengeObjs, challengeObj) => {
        return {
          ...challengeObjs,
          [challengeObj.fileKey]: {
            ...challengeObj
          }
        };
      },
      {}
    );

    expect(indexhtml.id).toBe('');
    expect(indexcss.id).toBe('key-for-css');
    expect(indexjs.id).toBe('key-for-js');
  });

  it('throws if an id is anywhere except directly before a code node', () => {
    expect.assertions(2);
    expect(() => plugin(adjacentKeysAST, file)).toThrow(
      '::id{#id}s must come before code blocks'
    );
    expect(() => plugin(orphanKeyAST, file)).toThrow(
      '::id{#id}s must come before code blocks'
    );
  });

  it('ignores empty lines between ::id{#id}s and code blocks', () => {
    expect.assertions(1);
    plugin(withSeedKeysAST, file);
    const fileTwo = { data: {} };
    plugin(withExtraLinesAST, fileTwo);
    expect(file).toEqual(fileTwo);
  });

  it('gets the before-user-code for each language', () => {
    expect.assertions(3);
    plugin(withBeforeAfterAST, file);
    const {
      data: { challengeFiles }
    } = file;
    const { indexjs, indexhtml, indexcss } = challengeFiles.reduce(
      (challengeObjs, challengeObj) => {
        return {
          ...challengeObjs,
          [challengeObj.fileKey]: {
            ...challengeObj
          }
        };
      },
      {}
    );

    expect(indexjs.head).toBe('');
    expect(indexhtml.head).toBe(`<!-- comment -->`);
    expect(indexcss.head).toBe(`body {
  etc: ''
}`);
  });

  it('gets the after-user-code for each language', () => {
    expect.assertions(3);
    plugin(withBeforeAfterAST, file);
    const {
      data: { challengeFiles }
    } = file;
    const { indexjs, indexhtml, indexcss } = challengeFiles.reduce(
      (challengeObjs, challengeObj) => {
        return {
          ...challengeObjs,
          [challengeObj.fileKey]: {
            ...challengeObj
          }
        };
      },
      {}
    );

    expect(indexjs.tail).toBe(`function teardown(params) {
  // after
}`);
    expect(indexhtml.tail).toBe('');
    expect(indexcss.tail).toBe(`body {
  background: blue;
}`);
  });

  it('throws an error if there is any code of an unsupported language', () => {
    expect.assertions(1);
    expect(() => plugin(cCodeAST, file)).toThrow(
      "On line 30 'c' is not a supported language.\n" +
        ' Please use one of js, css, html, jsx or py'
    );
  });

  it('throws if there is before/after code with empty blocks', () => {
    expect.assertions(2);
    expect(() => plugin(emptyHTMLAST, file)).toThrow(
      'Empty code block in --before-user-code-- section'
    );
    expect(() => plugin(emptyCSSAST, file)).toThrow(
      'Empty code block in --after-user-code-- section'
    );
  });

  it('quietly ignores empty before sections', () => {
    expect.assertions(6);
    plugin(emptyBeforeAST, file);
    const {
      data: { challengeFiles }
    } = file;
    const { indexjs, indexhtml, indexcss } = challengeFiles.reduce(
      (challengeObjs, challengeObj) => {
        return {
          ...challengeObjs,
          [challengeObj.fileKey]: {
            ...challengeObj
          }
        };
      },
      {}
    );

    expect(indexjs.head).toBe('');
    expect(indexjs.tail).toBe('function teardown(params) {\n  // after\n}');
    expect(indexhtml.head).toBe('');
    expect(indexhtml.tail).toBe('');
    expect(indexcss.head).toBe('');
    expect(indexcss.tail).toBe('body {\n  background: blue;\n}');
  });

  it('quietly ignores empty after sections', () => {
    expect.assertions(6);
    plugin(emptyAfterAST, file);
    const {
      data: { challengeFiles }
    } = file;
    const { indexjs, indexhtml, indexcss } = challengeFiles.reduce(
      (challengeObjs, challengeObj) => {
        return {
          ...challengeObjs,
          [challengeObj.fileKey]: {
            ...challengeObj
          }
        };
      },
      {}
    );

    expect(indexjs.head).toBe('');
    expect(indexjs.tail).toBe('');
    expect(indexhtml.head).toBe('<!-- comment -->');
    expect(indexhtml.tail).toBe('');
    expect(indexcss.head).toBe("body {\n  etc: ''\n}");
    expect(indexcss.tail).toBe('');
  });

  it('throws an error (with line number) if 2 markers appear on 1 line', () => {
    expect.assertions(1);
    expect(() => plugin(doubleMarkerAST, file)).toThrow(
      `Line 8 has two markers. Each line should only have one.`
    );
  });

  it('throws if a javascript file has formatted a marker', () => {
    expect.assertions(1);
    expect(() => plugin(explodedMarkerAST, file)).toThrow(
      `Line 66 has a malformed marker. It should be --fcc-editable-region--`
    );
  });

  it('handles jsx', () => {
    expect.assertions(4);
    plugin(jsxSeedAST, file);
    const {
      data: { challengeFiles }
    } = file;
    const indexjsx = challengeFiles.find(x => x.fileKey === 'indexjsx');

    expect(indexjsx.head).toBe(`function setup() {}`);
    expect(indexjsx.tail).toBe(`function teardown(params) {
  // after
}`);
    expect(indexjsx.contents).toBe(`var x = 'y';

/* comment */
const Button = () => {
  return <button> {/* another comment! */} text </button>;
};`);
    expect(indexjsx.fileKey).toBe(`indexjsx`);
  });

  it('combines all the code of a specific language into a single file', () => {
    /* Revisit this once we've decided what to do about multifile imports. I
    think the best approach is likely to be use the following format for .files

    { css: [css files],
      html: [html files],
      ...
    }

    or

     { css: {css files},
      html: {html files},
      ...
    }

    depending on what's easier to work with in graphQL

    */
  });

  it('should throw an error if a seed has no contents', () => {
    expect.assertions(1);
    expect(() => plugin(emptyContentAST, file)).toThrow(
      `## --seed-contents-- must appear in # --seed-- sections`
    );
  });

  it('should have an output to match the snapshot', () => {
    plugin(simpleAST, file);
    expect(file.data).toMatchSnapshot();
  });
});
