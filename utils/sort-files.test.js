/* global expect */

const { challengeFiles } = require('./__fixtures__/challenges');
const { toSortedArray } = require('./sort-files');

describe('sort-files', () => {
  describe('toSortedArray', () => {
    it('should return an array', () => {
      const sorted = toSortedArray(challengeFiles);
      expect(Array.isArray(sorted)).toBe(true);
    });
    it('should not modify the challenges', () => {
      const sorted = toSortedArray(challengeFiles);
      const expected = Object.values(challengeFiles);
      expect(sorted).toEqual(expect.arrayContaining(expected));
      expect(sorted.length).toEqual(expected.length);
    });

    it('should sort the objects into html, js, css order', () => {
      const sorted = toSortedArray(challengeFiles);
      const sortedKeys = sorted.map(({ key }) => key);
      const expected = ['indexhtml', 'indexjsx', 'indexjs', 'indexcss'];
      expect(sortedKeys).toStrictEqual(expected);
    });
  });
});
