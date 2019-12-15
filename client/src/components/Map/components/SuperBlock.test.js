/* global jest, expect */

import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from '../../../redux/createStore';

import { SuperBlock } from './SuperBlock';
import mockChallengeNodes from '../../../__mocks__/challenge-nodes';
import mockIntroNodes from '../../../__mocks__/intro-nodes';

function renderWithRedux(ui) {
  return render(<Provider store={createStore()}>{ui}</Provider>);
}

test('<SuperBlock /> not expanded snapshot for logged in users', () => {
  const props = {
    introNodes: mockIntroNodes,
    isExpanded: false,
    nodes: mockChallengeNodes,
    superBlock: 'Super Block One',
    toggleSuperBlock: () => {},
    isSignedIn: true
  };

  const { container } = render(<SuperBlock {...props} />);

  expect(container).toMatchSnapshot('superBlock-not-expanded-logged-in');
});

test('<SuperBlock /> not expanded snapshot if not logged in', () => {
  const props = {
    introNodes: mockIntroNodes,
    isExpanded: false,
    nodes: mockChallengeNodes,
    superBlock: 'Super Block One',
    toggleSuperBlock: () => {},
    isSignedIn: false
  };

  const { container } = render(<SuperBlock {...props} />);

  expect(container).toMatchSnapshot('superBlock-not-expanded-not-logged-in');
});

test('<SuperBlock /> expanded snapshot for logged in users', () => {
  const props = {
    introNodes: mockIntroNodes,
    isExpanded: true,
    nodes: mockChallengeNodes,
    superBlock: 'Super Block One',
    toggleSuperBlock: () => {},
    isSignedIn: true
  };

  const { container } = renderWithRedux(<SuperBlock {...props} />);

  expect(container).toMatchSnapshot('superBlock-expanded-logged-in');
});

test('<SuperBlock /> expanded snapshot if not logged in', () => {
  const props = {
    introNodes: mockIntroNodes,
    isExpanded: true,
    nodes: mockChallengeNodes,
    superBlock: 'Super Block One',
    toggleSuperBlock: () => {},
    isSignedIn: true
  };

  const { container } = renderWithRedux(<SuperBlock {...props} />);

  expect(container).toMatchSnapshot('superBlock-expanded-not-logged-in');
});

test('<SuperBlock should handle toggle clicks correctly', () => {
  const toggleSpy = jest.fn();
  const props = {
    introNodes: mockIntroNodes,
    isExpanded: false,
    nodes: mockChallengeNodes,
    superBlock: 'Super Block One',
    toggleSuperBlock: toggleSpy
  };

  const { container, rerender } = renderWithRedux(<SuperBlock {...props} />);

  expect(toggleSpy).not.toHaveBeenCalled();
  expect(container.querySelector('.map-title h4')).toHaveTextContent(
    'Super Block One Certification (300 hours)'
  );
  expect(container.querySelector('ul')).not.toBeInTheDocument();

  fireEvent.click(container.querySelector('.map-title'));

  expect(toggleSpy).toHaveBeenCalledTimes(1);
  expect(toggleSpy).toHaveBeenCalledWith('Super Block One');

  rerender(
    <Provider store={createStore()}>
      <SuperBlock {...props} isExpanded={true} />
    </Provider>
  );

  expect(container.querySelector('ul')).toBeInTheDocument();
});

test('renders without the circle when not signed in', () => {
  const props = {
    introNodes: mockIntroNodes,
    isExpanded: true,
    nodes: mockChallengeNodes,
    superBlock: 'Super Block One',
    toggleSuperBlock: () => {},
    isSignedIn: false
  };
  const { container } = renderWithRedux(<SuperBlock {...props} />);

  expect(container.querySelector('svg circle')).toBeNull();
});
