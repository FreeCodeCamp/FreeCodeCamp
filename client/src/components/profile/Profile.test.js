/* global expect jest */

import { render } from '@testing-library/react';
import React from 'react';

import Profile from './Profile';

jest.mock('../../analytics');

const userProps = {
  user: {
    profileUI: {
      isLocked: false,
      showAbout: false,
      showCerts: false,
      showHeatMap: false,
      showLocation: false,
      showName: false,
      showPoints: false,
      showPortfolio: false,
      showTimeLine: false
    },
    calendar: {},
    streak: {
      current: 1,
      longest: 1
    },
    completedChallenges: [],
    portfolio: [],
    about: 'string',
    githubProfile: 'string',
    isGithub: true,
    isLinkedIn: true,
    isTwitter: true,
    isWebsite: true,
    joinDate: 'string',
    linkedin: 'string',
    location: 'string',
    name: 'string',
    picture: 'string',
    points: 1,
    twitter: 'string',
    username: 'string',
    website: 'string',
    yearsTopContributor: []
  },
  navigate: () => {}
};

const myProfileProps = {
  isSessionUser: true,
  ...userProps
};

const notMyProfileProps = {
  isSessionUser: false,
  ...userProps
};

describe('<Profile/>', () => {
  it('renders the settings button on your own profile', () => {
    const { getByText } = render(<Profile {...myProfileProps} />);

    expect(getByText('buttons.update-settings')).toHaveAttribute(
      'href',
      '/settings'
    );
  });

  it('renders the report button on another persons profile', () => {
    const { getByText } = render(<Profile {...notMyProfileProps} />);

    expect(getByText('buttons.flag-user')).toHaveAttribute(
      'href',
      '/user/string/report-user'
    );
  });

  it('renders correctly', () => {
    const { container } = render(<Profile {...notMyProfileProps} />);

    expect(container).toMatchSnapshot();
  });
});
