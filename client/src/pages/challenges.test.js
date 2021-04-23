/* global expect */
import { withPrefix } from 'gatsby';
import toLearnPath from '../utils/to-learn-path';

describe('toLearnPath', () => {
  it('should return a string', () => {
    expect(typeof toLearnPath({})).toBe('string');
  });
  it('should include /learn', () => {
    expect(toLearnPath({})).toMatch(withPrefix('/learn'));
  });
  it('should include superBlock after learn', () => {
    expect(toLearnPath({ superBlock: 'testSuper' })).toBe(
      withPrefix('/learn/testSuper')
    );
  });
  it('should include superBlock, then block after learn', () => {
    expect(toLearnPath({ superBlock: 'testSuper', block: 'testBlock' })).toBe(
      withPrefix('/learn/testSuper/testBlock')
    );
  });
  it('should include superBlock, block, then challenge after learn', () => {
    expect(
      toLearnPath({
        superBlock: 'testSuper',
        block: 'testBlock',
        challenge: 'testChallenge'
      })
    ).toBe(withPrefix('/learn/testSuper/testBlock/testChallenge'));
  });
});
