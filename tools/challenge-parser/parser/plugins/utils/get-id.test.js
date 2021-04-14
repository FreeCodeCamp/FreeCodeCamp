/* global expect*/
const idNode = require('./__fixtures__/id-node.json');
const imageNode = require('./__fixtures__/image-node.json');
const multipleChildrenNode = require('./__fixtures__/multiple-children.json');
const nonIdNode = require('./__fixtures__/non-id-node.json');
const getId = require('./get-id');

describe('get-id', () => {
  it('should return a string', () => {
    expect.assertions(1);
    const actual = getId(idNode);
    expect(typeof actual).toBe('string');
  });

  it('should get the expected identifier', () => {
    expect.assertions(1);
    const actual = getId(idNode);
    expect(actual).toBe('html-key');
  });

  it('should return null if the node does contain an id', () => {
    expect.assertions(1);
    const actual = getId(nonIdNode);
    expect(actual).toBeNull();
  });

  // TODO: bin this (and the json!) after development (it'll be a silly test
  // once we're using directives)
  it('should ignore image nodes', () => {
    expect.assertions(1);
    const actual = getId(imageNode);
    expect(actual).toBeNull();
  });

  // TODO: bin this (and the json!) after development (it'll be a silly test
  // once we're using directives)

  // TODO: do we want to fail silently? Might it be better to output warnings
  // or perhaps even stop the parser? Probably warnings if anything.
  it('should ignore paragraphs that contain more than the id element', () => {
    expect.assertions(1);
    const actual = getId(multipleChildrenNode);
    expect(actual).toBeNull();
  });
});
