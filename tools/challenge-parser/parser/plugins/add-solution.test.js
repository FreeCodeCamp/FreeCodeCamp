const mockAST = require('../__fixtures__/ast-simple.json');
const editableSolutionAST = require('../__fixtures__/ast-erm-in-solution.json');
const multiSolnsAST = require('../__fixtures__/ast-multiple-solutions.json');

const addSolution = require('./add-solution');
const { isObject } = require('lodash');

describe('add solution plugin', () => {
  const plugin = addSolution();
  let file = { data: {} };

  beforeEach(() => {
    file = { data: {} };
  });

  it('returns a function', () => {
    expect(typeof plugin).toEqual('function');
  });

  it('adds a `solutions` property to `file.data`', () => {
    plugin(mockAST, file);
    expect('solutions' in file.data).toBe(true);
  });

  it('ensures that the `solutions` property is an array', () => {
    plugin(mockAST, file);
    expect(Array.isArray(file.data.solutions)).toBe(true);
  });

  it('each entry in the `solutions` array is an object', () => {
    plugin(mockAST, file);

    expect(file.data.solutions.every(el => isObject(el))).toBe(true);
  });

  it('adds solution objects to the challengeFiles array following a schema', () => {
    expect.assertions(15);
    plugin(mockAST, file);
    const {
      data: { solutions }
    } = file;
    const testObject = solutions[0].find(
      solution => solution.fileKey === 'indexjs'
    );
    expect(Object.keys(testObject).length).toEqual(7);
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
  });

  it('adds multiple solutions if they exist', () => {
    expect.assertions(5);
    plugin(multiSolnsAST, file);
    const {
      data: { solutions }
    } = file;
    expect(solutions.length).toBe(3);
    expect(
      solutions[0].find(solution => solution.fileKey === 'indexjs').contents
    ).toBe("var x = 'y';");
    expect(
      solutions[1].find(solution => solution.fileKey === 'indexhtml').contents
    ).toBe(`<html>
  <body>
  solution number two
  </body>
</html>`);
    expect(
      solutions[1].find(solution => solution.fileKey === 'indexcss').contents
    ).toBe(`body {
  background: white;
}`);
    expect(
      solutions[2].find(solution => solution.fileKey === 'indexjs').contents
    ).toBe("var x = 'y3';");
  });

  it('should reject solutions with editable region markers', () => {
    expect.assertions(1);
    expect(() => plugin(editableSolutionAST, file)).toThrow(
      '--fcc-editable-region-- should only appear in the --seed-contents--\n' +
        'section, not in --solutions--'
    );
  });

  it('should have an output to match the snapshot', () => {
    plugin(mockAST, file);
    expect(file.data).toMatchSnapshot();
  });
});
