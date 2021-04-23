/* global jest, expect */

import { render, fireEvent } from '@testing-library/react';
import React from 'react';

import CompletionModalBody from './CompletionModalBody';

const props = {
  block: 'basic-html-and-html5',
  completedPercent: Math.floor(Math.random() * 101),
  superBlock: 'responsive-web-design'
};

describe('<CompletionModalBody />', () => {
  test('matches snapshot', () => {
    const { container } = render(<CompletionModalBody {...props} />);

    expect(container).toMatchSnapshot();
  });

  describe('progress-bar', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    test('renders with 0% width initially', () => {
      const { container } = render(<CompletionModalBody {...props} />);
      expect(container.querySelector('.progress-bar-percent')).toHaveAttribute(
        'style',
        'width: 0%;'
      );
    });

    test('has the correct width after animation', () => {
      const { container } = render(<CompletionModalBody {...props} />);

      fireEvent.animationEnd(
        container.querySelector('.completion-success-icon')
      );

      jest.runAllTimers();

      expect(container.querySelector('.progress-bar-percent')).toHaveAttribute(
        'style',
        `width: ${props.completedPercent}%;`
      );
    });
  });
});
