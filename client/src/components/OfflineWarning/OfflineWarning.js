import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';

import './offline-warning.css';

const delayInMilliSeconds = 5000;
let id;
const propTypes = {
  isOnline: PropTypes.bool.isRequired,
  isSignedIn: PropTypes.bool.isRequired
};
function OfflineWarning({ isOnline, isSignedIn }) {
  const { t } = useTranslation();
  const [showWarning, setShowWarning] = React.useState(false);

  if (!isSignedIn || isOnline) {
    clearTimeout(id);
    if (showWarning) setShowWarning(false);
  } else {
    timeout();
  }

  function timeout() {
    id = setTimeout(function () {
      setShowWarning(true);
    }, delayInMilliSeconds);
  }

  return showWarning ? (
    <div className='offline-warning alert-info'>{t('misc.offline')}</div>
  ) : null;
}

OfflineWarning.displayName = 'OfflineWarning';
OfflineWarning.propTypes = propTypes;

export default OfflineWarning;
