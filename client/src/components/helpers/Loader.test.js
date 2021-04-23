/* global expect */
import { render, cleanup } from '@testing-library/react';
import React from 'react';

import Loader from './Loader';

describe('<Loader />', () => {
  afterEach(cleanup);

  it('renders to the DOM', () => {
    const { container } = render(<Loader />);
    expect(container).toBeTruthy();
  });

  it('adds the correct class when given a fullScreen prop', () => {
    const { container } = render(<Loader fullScreen={true} />);
    expect(container.firstChild).toHaveClass('full-screen-wrapper');
  });

  /**
   * As we only wrap another library Component,
   * there is nothing much to test except snapshots
   */

  it('matches to the default render snapshot', () => {
    const { container } = render(<Loader />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('matches the fullScreen render snapshot', () => {
    const { container } = render(<Loader fullScreen={true} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
