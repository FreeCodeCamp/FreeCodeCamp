/* global expect jest */
import { Button } from '@freecodecamp/react-bootstrap';
import React from 'react';
import TestRenderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';

import Honesty from './Honesty';

describe('<Honesty />', () => {
  const renderer = new ShallowRenderer();
  const updateIsHonestMock = jest.fn();

  test('<Honesty /> snapshot when isHonest is false', () => {
    const componentToRender = (
      <Honesty isHonest={false} updateIsHonest={updateIsHonestMock} />
    );
    const component = renderer.render(componentToRender);
    expect(component).toMatchSnapshot('Honesty');
  });

  test('<Honesty /> snapshot when isHonest is true', () => {
    const componentToRender = (
      <Honesty isHonest={true} updateIsHonest={updateIsHonestMock} />
    );
    const component = renderer.render(componentToRender);
    expect(component).toMatchSnapshot('HonestyAccepted');
  });

  test('should call updateIsHonest method on clicking agree button', () => {
    const root = TestRenderer.create(
      <Honesty isHonest={false} updateIsHonest={updateIsHonestMock} />
    ).root;

    root.findByType(Button).props.onClick();
    expect(updateIsHonestMock).toHaveBeenCalledWith({ isHonest: true });
  });
});
