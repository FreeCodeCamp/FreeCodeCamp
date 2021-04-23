/* global expect*/
const isArray = require('lodash/isArray');
const { root } = require('mdast-builder');
const find = require('unist-util-find');

const extraHeadingAst = require('../../__fixtures__/ast-extra-heading.json');
const simpleAst = require('../../__fixtures__/ast-simple.json');
const getAllBetween = require('./between-headings');

describe('between-headings', () => {
  it('should return an array', () => {
    expect.assertions(1);
    const actual = getAllBetween(simpleAst, '--hints--');
    expect(isArray(actual)).toBe(true);
  });

  it('should return an empty array if the marker is not present', () => {
    expect.assertions(2);
    const actual = getAllBetween(simpleAst, '--not-a-marker--');
    expect(isArray(actual)).toBe(true);
    expect(actual.length).toBe(0);
  });

  it('should include any headings without markers', () => {
    expect.assertions(1);
    const actual = getAllBetween(extraHeadingAst, '--description--');
    expect(
      find(root(actual), {
        value: 'this should still be inside --description--'
      })
    ).not.toBeUndefined();
  });

  it('should include the rest of the AST if there is no end marker', () => {
    expect.assertions(2);
    const actual = getAllBetween(extraHeadingAst, '--solutions--');
    expect(actual.length > 0).toBe(true);
    expect(
      find(root(actual), { value: 'body {\n  background: white;\n}' })
    ).not.toBeUndefined();
  });

  it('should match the hints snapshot', () => {
    const actual = getAllBetween(simpleAst, '--hints--');
    expect(actual).toMatchSnapshot();
  });
  it('should match the instructions snapshot', () => {
    const actual = getAllBetween(simpleAst, '--instructions--');
    expect(actual).toMatchSnapshot();
  });
});
