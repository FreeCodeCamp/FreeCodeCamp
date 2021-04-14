/* global expect */

import { render } from '@testing-library/react';
import React from 'react';

import BlockSaveWrapper from './BlockSaveWrapper';

test('<BlockSaveWrapper /> snapshot', () => {
  const { container } = render(<BlockSaveWrapper />);

  expect(container).toMatchSnapshot();
});
