/* global expect jest */

import { render } from '@testing-library/react';
import { useStaticQuery } from 'gatsby';
import React from 'react';

import mockChallengeNodes from '../../__mocks__/challenge-nodes';
import { Map } from './';

beforeEach(() => {
  useStaticQuery.mockImplementationOnce(() => ({
    allChallengeNode: {
      nodes: mockChallengeNodes
    }
  }));
});

// set .scrollTo to avoid errors in default test environment
window.scrollTo = jest.fn();

test('<Map /> snapshot', () => {
  const { container } = render(<Map {...props} />);

  expect(container).toMatchSnapshot('Map');
});

const props = {
  forLanding: true
};
