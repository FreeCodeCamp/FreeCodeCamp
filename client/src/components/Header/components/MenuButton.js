import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import AuthOrProfile from './AuthOrProfile';

const MenuButton = props => {
  const { t } = useTranslation();

  return (
    <>
      <button
        aria-expanded={props.displayMenu}
        className={
          'toggle-button-nav' +
          (props.displayMenu ? ' reverse-toggle-color' : '')
        }
        onClick={props.onClick}
        ref={props.innerRef}
      >
        {t('buttons.menu')}
      </button>
      <span className='navatar'>
        <AuthOrProfile user={props.user} />
      </span>
    </>
  );
};

MenuButton.displayName = 'MenuButton';
MenuButton.propTypes = {
  className: PropTypes.string,
  displayMenu: PropTypes.bool.isRequired,
  innerRef: PropTypes.object,
  onClick: PropTypes.func.isRequired,
  user: PropTypes.object
};

export default MenuButton;
