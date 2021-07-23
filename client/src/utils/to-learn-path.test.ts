import { withPrefix } from 'gatsby';

import toLearnPath from './to-learn-path';

describe('To learn path utility (toLearnPath)', () => {
  const learn = withPrefix('/learn');

  it('should include /learn', () => {
    expect(toLearnPath({})).toMatch(`${learn}`);
  });

  it('should include superBlock after learn', () => {
    expect(toLearnPath({ superBlock: 'testSuper' })).toBe(`${learn}/testSuper`);
  });

  it('should include superBlock, then block after learn', () => {
    expect(toLearnPath({ block: 'testBlock', superBlock: 'testSuper' })).toBe(
      `${learn}/testSuper/testBlock`
    );
  });

  it('should include superBlock, block, then challenge after learn', () => {
    expect(
      toLearnPath({
        block: 'testBlock',
        challenge: 'testChallenge',
        superBlock: 'testSuper'
      })
    ).toBe(`${learn}/testSuper/testBlock/testChallenge`);
  });
});
