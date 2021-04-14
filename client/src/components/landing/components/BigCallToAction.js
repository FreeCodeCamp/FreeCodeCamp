import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Login from '../../Header/components/Login';

const propTypes = {
  page: PropTypes.string
};

const BigCallToAction = ({ page }) => {
  const { t } = useTranslation();

  return (
    <Login block={true} data-test-label={`${page}-big-cta`}>
      {page === 'landing'
        ? t('buttons.logged-in-cta-btn')
        : t('buttons.logged-out-cta-btn')}
    </Login>
  );
};

BigCallToAction.displayName = 'BigCallToAction';
BigCallToAction.propTypes = propTypes;
export default BigCallToAction;
