/* global describe it expect jest */
const path = require('path');
const cloneDeep = require('lodash/cloneDeep');
const toVfile = require('to-vfile');
const selectAll = require('unist-util-select').selectAll;

const originalImportsExtraAST = require('../__fixtures__/ast-imports-extra.json');
const originalImportsTwoAST = require('../__fixtures__/ast-imports-two.json');
const originalImportsAST = require('../__fixtures__/ast-imports.json');
const originalMarkerAST = require('../__fixtures__/ast-marker-imports.json');
const originalSimpleAST = require('../__fixtures__/ast-simple.json');
const addImports = require('./replace-imports');

describe('replace-imports', () => {
  let importsAST;
  let importsTwoAST;
  let importsExtraAST;
  let simpleAST;
  let markerAST;
  let correctFile;
  let incorrectFile;

  beforeEach(() => {
    importsAST = cloneDeep(originalImportsAST);
    importsTwoAST = cloneDeep(originalImportsTwoAST);
    importsExtraAST = cloneDeep(originalImportsExtraAST);
    simpleAST = cloneDeep(originalSimpleAST);
    markerAST = cloneDeep(originalMarkerAST);
    correctFile = toVfile(
      path.resolve(__dirname, '../__fixtures__/with-imports.md')
    );
    incorrectFile = toVfile(
      path.resolve(__dirname, '../__fixtures__/incorrect-path/with-imports.md')
    );
  });

  it('should return a function', () => {
    expect.assertions(1);
    const plugin = addImports();

    expect(typeof plugin).toEqual('function');
  });

  it('should fail when the imported file is null', done => {
    const plugin = addImports();
    const next = err => {
      if (err) {
        done();
      } else {
        done('An error should have been thrown by addImports');
      }
    };
    plugin(importsAST, null, next);
  });

  it('should proceed when the imported file exists', done => {
    const plugin = addImports();
    plugin(importsAST, correctFile, done);
  });

  it('should fail when the imported file cannot be found', done => {
    expect.assertions(1);
    console.error = jest.fn();
    const plugin = addImports();

    // we have to rely on the next callback, because that is how you get error
    // messages out of transformers
    const next = err => {
      if (err) {
        expect(console.error).toHaveBeenCalledTimes(2);
        done();
      } else {
        done('An error should have been thrown by addImports');
      }
    };
    plugin(importsAST, incorrectFile, next);
  });

  it('should modify the tree when there are imports', done => {
    expect.assertions(1);
    const plugin = addImports();
    const next = err => {
      if (err) {
        done(err);
      } else {
        expect(importsAST).not.toEqual(originalImportsAST);
        done();
      }
    };
    plugin(importsAST, correctFile, next);
  });

  it('should NOT modify the tree when there are NO imports', done => {
    expect.assertions(1);
    const plugin = addImports();
    const next = err => {
      if (err) {
        done(err);
      } else {
        expect(simpleAST).toEqual(originalSimpleAST);
        done();
      }
    };
    plugin(simpleAST, correctFile, next);
  });

  it('should remove all import statements', done => {
    expect.assertions(2);
    const selector = 'leafDirective[name=import]';
    const plugin = addImports();
    const importNodes = selectAll(selector, importsAST);

    expect(importNodes.length).toBe(1);

    const next = err => {
      if (err) {
        done(err);
      } else {
        const importNodes = selectAll(selector, importsAST);
        expect(importNodes.length).toBe(0);
        done();
      }
    };
    plugin(importsAST, correctFile, next);
  });

  it('should not remove an ::import without the required attributes', done => {
    expect.assertions(2);
    const selector = 'leafDirective[name=import]';
    const plugin = addImports();
    const importNodes = selectAll(selector, importsExtraAST);

    expect(importNodes.length).toBe(3);

    const next = err => {
      if (err) {
        done(err);
      } else {
        const importNodes = selectAll(selector, importsExtraAST);
        expect(importNodes.length).toBe(1);
        done();
      }
    };
    plugin(importsExtraAST, correctFile, next);
  });

  it('should remove all matching ::use statements', done => {
    expect.assertions(2);
    const selector = 'leafDirective[name=use]';
    const plugin = addImports();
    const components = selectAll(selector, importsAST);

    // one matching component and two other jsx nodes
    expect(components.length).toBe(1);

    const next = err => {
      if (err) {
        done(err);
      } else {
        const components = selectAll(selector, importsAST);
        expect(components.length).toBe(0);
        done();
      }
    };
    plugin(importsAST, correctFile, next);
  });

  it('should replace the ::use statement with the imported content', done => {
    // checks the contents of script.md are there after the import step
    expect.assertions(2);
    const plugin = addImports();

    const next = err => {
      if (err) {
        done(err);
      } else {
        const jsNodes = selectAll('code[lang=js]', importsAST);
        expect(jsNodes.length).toBe(4);

        const codeValues = jsNodes.map(({ value }) => value);
        expect(codeValues).toEqual(
          expect.arrayContaining([
            `for (let index = 0; index < array.length; index++) {
  const element = array[index];
  // imported from script.md
}`
          ])
        );
        done();
      }
    };
    plugin(importsAST, correctFile, next);
  });

  it('should handle multiple import statements', done => {
    // checks the contents of script.md are there after the import step
    expect.assertions(4);
    const plugin = addImports();

    const next = err => {
      if (err) {
        done(err);
      } else {
        const jsNodes = selectAll('code[lang=js]', importsTwoAST);
        expect(jsNodes.length).toBe(4);

        const codeValues = jsNodes.map(({ value }) => value);
        expect(codeValues).toEqual(
          expect.arrayContaining([
            `for (let index = 0; index < array.length; index++) {
  const element = array[index];
  // imported from script.md
}`
          ])
        );
        const cssNodes = selectAll('code[lang=css]', importsTwoAST);
        expect(cssNodes.length).toBe(2);

        const cssValues = cssNodes.map(({ value }) => value);
        expect(cssValues).toEqual(
          expect.arrayContaining([
            `div {
  background: red
}`
          ])
        );
        done();
      }
    };
    plugin(importsTwoAST, correctFile, next);
  });

  it('should reject imported files with editable region markers', done => {
    expect.assertions(1);
    console.error = jest.fn();
    const plugin = addImports();
    const next = err => {
      if (err) {
        expect(console.error).toHaveBeenCalledTimes(2);
        done();
      } else {
        done('An error should have been thrown by addImports');
      }
    };
    plugin(markerAST, correctFile, next);
  });

  it('should have an output to match the snapshot', done => {
    const plugin = addImports();
    const next = err => {
      if (err) {
        done(err);
      } else {
        expect(importsAST).toMatchSnapshot();
        done();
      }
    };
    plugin(importsAST, correctFile, next);
  });
});
