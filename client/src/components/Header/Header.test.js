import React from 'react';
import { create } from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';

import { UniversalNav } from './components/universal-nav';
import { NavLinks } from './components/nav-links';
import AuthOrProfile from './components/auth-or-profile';

import envData from '../../../../config/env.json';

const { apiLocation, clientLocale } = envData;

jest.mock('../../analytics');

describe('<UniversalNav />', () => {
  const UniversalNavProps = {
    displayMenu: false,
    menuButtonRef: {},
    searchBarRef: {},
    toggleDisplayMenu: function () {},
    pathName: '/',
    fetchState: {
      pending: false
    }
  };
  it('renders to the DOM', () => {
    const shallow = new ShallowRenderer();
    shallow.render(<UniversalNav {...UniversalNavProps} />);
    const view = shallow.getRenderOutput();
    expect(view).toBeTruthy();
  });
});

describe('<NavLinks />', () => {
  it('has expected navigation links when not signed in', () => {
    const landingPageProps = {
      fetchState: {
        pending: false
      },
      user: {
        isDonating: false,
        username: null,
        theme: 'default'
      },
      i18n: {
        language: 'en'
      },
      toggleNightMode: theme => theme
    };
    const shallow = new ShallowRenderer();
    shallow.render(<NavLinks {...landingPageProps} />);
    const view = shallow.getRenderOutput();
    expect(
      hasDonateNavItem(view) &&
        hasSignInNavItem(view) &&
        hasCurriculumNavItem(view) &&
        hasForumNavItem(view) &&
        hasNewsNavItem(view) &&
        hasRadioNavItem(view)
    ).toBeTruthy();
  });

  it('has expected navigation links when signed in', () => {
    const landingPageProps = {
      fetchState: {
        pending: false
      },
      user: {
        isDonating: false,
        username: 'nhcarrigan',
        theme: 'default'
      },
      i18n: {
        language: 'en'
      },
      toggleNightMode: theme => theme
    };
    const shallow = new ShallowRenderer();
    shallow.render(<NavLinks {...landingPageProps} />);
    const view = shallow.getRenderOutput();
    expect(
      hasDonateNavItem(view) &&
        hasCurriculumNavItem(view) &&
        hasProfileAndSettingsNavItems(view, landingPageProps.user.username) &&
        hasForumNavItem(view) &&
        hasNewsNavItem(view) &&
        hasRadioNavItem(view) &&
        hasSignOutNavItem(view)
    ).toBeTruthy();
  });

  it('has expected navigation links when signed in and donating', () => {
    const landingPageProps = {
      fetchState: {
        pending: false
      },
      user: {
        isDonating: true,
        username: 'moT01',
        theme: 'default'
      },
      i18n: {
        language: 'en'
      },
      toggleNightMode: theme => theme
    };
    const shallow = new ShallowRenderer();
    shallow.render(<NavLinks {...landingPageProps} />);
    const view = shallow.getRenderOutput();
    expect(
      hasThanksForDonating(view) &&
        hasCurriculumNavItem(view) &&
        hasProfileAndSettingsNavItems(view, landingPageProps.user.username) &&
        hasForumNavItem(view) &&
        hasNewsNavItem(view) &&
        hasRadioNavItem(view) &&
        hasSignOutNavItem(view)
    ).toBeTruthy();
  });
});

describe('<AuthOrProfile />', () => {
  it('has avatar with default border for default users', () => {
    const defaultUserProps = {
      user: {
        username: 'test-user',
        picture: 'https://freecodecamp.org/image.png'
      },
      pending: false,
      pathName: '/learn'
    };

    const componentTree = create(
      <AuthOrProfile {...defaultUserProps} />
    ).toJSON();
    expect(avatarHasClass(componentTree, 'default-border')).toBeTruthy();
  });

  it('has avatar with gold border for donating users', () => {
    const donatingUserProps = {
      user: {
        username: 'test-user',
        picture: 'https://freecodecamp.org/image.png',
        isDonating: true
      },
      pending: false,
      pathName: '/learn'
    };

    const componentTree = create(
      <AuthOrProfile {...donatingUserProps} />
    ).toJSON();
    expect(avatarHasClass(componentTree, 'gold-border')).toBeTruthy();
  });

  it('has avatar with blue border for top contributors', () => {
    const topContributorUserProps = {
      user: {
        username: 'test-user',
        picture: 'https://freecodecamp.org/image.png',
        yearsTopContributor: [2020]
      },
      pending: false,
      pathName: '/learn'
    };

    const componentTree = create(
      <AuthOrProfile {...topContributorUserProps} />
    ).toJSON();
    expect(avatarHasClass(componentTree, 'blue-border')).toBeTruthy();
  });

  it('has avatar with purple border for donating top contributors', () => {
    const topDonatingContributorUserProps = {
      user: {
        username: 'test-user',
        picture: 'https://freecodecamp.org/image.png',
        isDonating: true,
        yearsTopContributor: [2020]
      },
      pending: false,
      pathName: '/learn'
    };

    const componentTree = create(
      <AuthOrProfile {...topDonatingContributorUserProps} />
    ).toJSON();
    expect(avatarHasClass(componentTree, 'purple-border')).toBeTruthy();
  });
});

const navigationLinks = (component, key) => {
  const target = component.props.children.find(
    child => child && child.key === key
  );
  return target.props;
};

const profileNavItem = component => component.children[0];

const hasDonateNavItem = component => {
  const { children, to } = navigationLinks(component, 'donate');
  return children === 'buttons.donate' && to === '/donate';
};

const hasThanksForDonating = component => {
  const { children } = navigationLinks(component, 'donate');
  return children[0].props.children === 'donate.thanks';
};

const hasSignInNavItem = component => {
  const { children } = navigationLinks(component, 'signin');
  return children === 'buttons.sign-in';
};

const hasCurriculumNavItem = component => {
  const { children, to } = navigationLinks(component, 'learn');
  return children === 'buttons.curriculum' && to === '/learn';
};

const hasProfileAndSettingsNavItems = (component, username) => {
  const fragment = navigationLinks(component, 'profile-settings');

  const profile = fragment.children[0].props;
  const settings = fragment.children[1].props;

  const hasProfile =
    profile.children === 'buttons.profile' && profile.to === `/${username}`;
  const hasSettings =
    settings.children === 'buttons.settings' && settings.to === '/settings';

  return hasProfile && hasSettings;
};

const hasForumNavItem = component => {
  const { children, to } = navigationLinks(component, 'forum');
  const localizedForums = {
    chinese: 'https://chinese.freecodecamp.org/forum',
    'chinese-traditional': 'https://chinese.freecodecamp.org/forum',
    espanol: 'https://forum.freecodecamp.org/c/espanol/',
    english: 'https://forum.freecodecamp.org/',
    italian: 'https://forum.freecodecamp.org/c/italian/'
  };
  return (
    children[0].props.children === 'buttons.forum' &&
    to === localizedForums[clientLocale]
  );
};

const hasNewsNavItem = component => {
  const { children, to } = navigationLinks(component, 'news');
  const localizedNews = {
    chinese: 'https://chinese.freecodecamp.org/news',
    'chinese-traditional': 'https://chinese.freecodecamp.org/news',
    espanol: 'https://www.freecodecamp.org/espanol/news',
    english: 'https://www.freecodecamp.org/news',
    italian: 'https://www.freecodecamp.org/italian/news'
  };
  return (
    children[0].props.children === 'buttons.news' &&
    to === localizedNews[clientLocale]
  );
};

const hasRadioNavItem = component => {
  const { children, to } = navigationLinks(component, 'radio');
  return (
    children[0].props.children === 'buttons.radio' &&
    to === 'https://coderadio.freecodecamp.org'
  );
};

const hasSignOutNavItem = component => {
  const { children } = navigationLinks(component, 'signout-frag');
  const signOutProps = children[1].props;

  return (
    signOutProps.children === 'buttons.sign-out' &&
    signOutProps.href === `${apiLocation}/signout`
  );
};

/* TODO: Apply this to Universalnav component
const hasSignInButton = component =>
  component.props.children[1].props.children === 'buttons.sign-in';
*/

const avatarHasClass = (componentTree, classes) => {
  return (
    profileNavItem(componentTree).props.className ===
    'avatar-container ' + classes
  );
};
