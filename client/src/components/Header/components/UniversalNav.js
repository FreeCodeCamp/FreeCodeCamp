import PropTypes from 'prop-types';
import React from 'react';

import { Link, SkeletonSprite } from '../../helpers';
import SearchBar from '../../search/searchBar/SearchBar';
import MenuButton from './MenuButton';
import NavLinks from './NavLinks';
import NavLogo from './NavLogo';
import './universalNav.css';

export const UniversalNav = ({
  displayMenu,
  toggleDisplayMenu,
  menuButtonRef,
  searchBarRef,
  user,
  fetchState
}) => {
  const { pending } = fetchState;
  return (
    <nav
      className={'universal-nav' + (displayMenu ? ' expand-nav' : '')}
      id='universal-nav'
    >
      <div
        className={
          'universal-nav-left' + (displayMenu ? ' display-search' : '')
        }
      >
        <SearchBar innerRef={searchBarRef} />
      </div>
      <div className='universal-nav-middle'>
        <Link id='universal-nav-logo' to='/learn'>
          <NavLogo />
          <span className='sr-only'>freeCodeCamp.org</span>
        </Link>
      </div>
      <div className='universal-nav-right main-nav'>
        {pending ? (
          <div className='nav-skeleton'>
            <SkeletonSprite />
          </div>
        ) : (
          <MenuButton
            displayMenu={displayMenu}
            innerRef={menuButtonRef}
            onClick={toggleDisplayMenu}
            user={user}
          />
        )}
      </div>

      <NavLinks
        displayMenu={displayMenu}
        fetchState={fetchState}
        toggleDisplayMenu={toggleDisplayMenu}
        user={user}
      />
    </nav>
  );
};

UniversalNav.displayName = 'UniversalNav';
export default UniversalNav;

UniversalNav.propTypes = {
  displayMenu: PropTypes.bool,
  fetchState: PropTypes.shape({ pending: PropTypes.bool }),
  menuButtonRef: PropTypes.object,
  searchBarRef: PropTypes.object,
  toggleDisplayMenu: PropTypes.func,
  user: PropTypes.object
};
