/* eslint-disable */
// @ts-nocheck Likely need to not use ShallowRenderer
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import envData from '../../../config/env.json';
import { navigate } from '@reach/router';

import { ShowSettings } from './show-settings';

const { apiLocation } = envData as Record<string, string>;

jest.mock('../analytics');
jest.mock('@reach/router');

describe('<ShowSettings />', () => {
  it('renders to the DOM when user is logged in', () => {
    const shallow = new ShallowRenderer();
    shallow.render(<ShowSettings {...loggedInProps} />);
    expect(navigate).toHaveBeenCalledTimes(0);
    const result = shallow.getRenderOutput();
    expect(result.type.toString()).toBe('Symbol(react.fragment)');
    // Renders Helmet component rather than Loader
    expect(result.props.children[0].props.title).toEqual(
      'buttons.settings | freeCodeCamp.org'
    );
  });

  it('redirects to sign in page when user is not logged in', () => {
    const shallow = new ShallowRenderer();
    shallow.render(<ShowSettings {...loggedOutProps} />);
    expect(navigate).toHaveBeenCalledTimes(1);
    expect(navigate).toHaveBeenCalledWith(`${apiLocation}/signin`);
    const result = shallow.getRenderOutput();
    // Renders Loader rather than ShowSettings
    expect(result.type.displayName).toBe('Loader');
  });
});

const loggedInProps = {
  createFlashMessage: jest.fn(),
  isSignedIn: true,
  showLoading: false,
  submitNewAbout: jest.fn(),
  toggleNightMode: jest.fn(),
  updateInternetSettings: jest.fn(),
  updateIsHonest: jest.fn(),
  updatePortfolio: jest.fn(),
  updateQuincyEmail: jest.fn(),
  user: {
    about: '',
    completedChallenges: []
  },
  verifyCert: jest.fn()
};
const loggedOutProps = { ...loggedInProps };
loggedOutProps.isSignedIn = false;
