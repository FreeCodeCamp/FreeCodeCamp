/* global describe it expect beforeEach */
const brokenHintsAST = require('../__fixtures__/ast-broken-hints.json');
const simpleAST = require('../__fixtures__/ast-simple.json');
const addTests = require('./add-tests');

describe('add-tests plugin', () => {
  const plugin = addTests();
  let file = { data: {} };

  beforeEach(() => {
    file = { data: {} };
  });

  it('returns a function', () => {
    expect(typeof plugin).toEqual('function');
  });

  it('adds a `tests` property to `file.data`', () => {
    plugin(simpleAST, file);

    expect('tests' in file.data).toBe(true);
  });

  it('adds test objects to the tests array following a schema', () => {
    expect.assertions(5);
    plugin(simpleAST, file);
    const testObject = file.data.tests[0];
    expect(Object.keys(testObject).length).toBe(2);
    expect(testObject).toHaveProperty('testString');
    expect(typeof testObject.testString).toBe('string');
    expect(testObject).toHaveProperty('text');
    expect(typeof testObject.text).toBe('string');
  });

  // TODO: make this a bit more robust and informative
  it('should throw if a test pair is out of order', () => {
    expect.assertions(1);
    expect(() => plugin(brokenHintsAST, file)).toThrow(
      'testString (code block) is missing from hint'
    );
  });

  it('preserves code whitespace in testStrings', () => {
    plugin(simpleAST, file);
    const testObject = file.data.tests[2];
    expect(testObject.testString).toBe(`// more test code
if(let x of xs) {
  console.log(x);
}`);
  });

  it('does not encode html', () => {
    plugin(simpleAST, file);
    const testObject = file.data.tests[1];
    expect(testObject.text).toBe('<p>Second hint with <code>code</code></p>');
  });

  it('converts test text from md to html', () => {
    plugin(simpleAST, file);
    const testObject = file.data.tests[2];
    expect(testObject.text).toBe(
      '<p>Third <em>hint</em> with <code>code</code>' +
        ' and <code>inline code</code></p>'
    );
  });

  it('should have an output to match the snapshot', () => {
    plugin(simpleAST, file);
    expect(file.data).toMatchSnapshot();
  });
});
