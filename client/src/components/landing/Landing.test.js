/* global expect jest */
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import mockChallengeNodes from '../../__mocks__/challenge-nodes';
import IndexPage from '../../pages';

jest.mock('../../analytics');

describe('<Landing />', () => {
  it('renders when visiting index page and logged out', () => {
    const shallow = new ShallowRenderer();
    shallow.render(<IndexPage {...loggedOutProps} />);
    const result = shallow.getRenderOutput();
    expect(result.type.displayName === 'Landing').toBeTruthy();
  });
});

const loggedOutProps = {
  data: { allChallengeNode: { edges: mockChallengeNodes } },
  fetchState: {
    complete: true,
    error: null,
    errored: false,
    pending: false
  },
  isSignedIn: false,
  user: {}
};
