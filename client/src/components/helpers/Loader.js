import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import Spinner from 'react-spinkit';

import './loader.css';

function Loader({ fullScreen, timeout }) {
  const [showSpinner, setShowSpinner] = useState(!timeout);
  useEffect(() => {
    let timerId;
    if (!showSpinner) {
      timerId = setTimeout(() => setShowSpinner(true), timeout);
    }
    return () => clearTimeout(timerId);
  }, [setShowSpinner, showSpinner, timeout]);
  return (
    <div className={`fcc-loader ${fullScreen ? 'full-screen-wrapper' : ''}`}>
      {showSpinner && <Spinner name='line-scale-pulse-out' />}
    </div>
  );
}

Loader.displayName = 'Loader';
Loader.propTypes = {
  fullScreen: PropTypes.bool,
  timeout: PropTypes.number
};

export default Loader;
