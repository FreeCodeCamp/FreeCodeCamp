/* global expect */

import { render } from '@testing-library/react';
import React from 'react';

import BlockSaveButton from './BlockSaveButton';

test('<BlockSaveButton /> snapshot', () => {
  const { container } = render(<BlockSaveButton />);

  expect(container).toMatchSnapshot();
});

test('Button text should default to the correct translation key', () => {
  const { getByRole } = render(<BlockSaveButton />);

  expect(getByRole('button')).toHaveTextContent('buttons.save');
});

test('Button text should match "children"', () => {
  const testText = 'My Text Here';
  const { getByRole } = render(<BlockSaveButton>{testText}</BlockSaveButton>);

  expect(getByRole('button')).toHaveTextContent(testText);
});
