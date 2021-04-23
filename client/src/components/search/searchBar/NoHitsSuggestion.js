import PropTypes from 'prop-types';
import React from 'react';

const NoHitsSuggestion = ({ title }) => {
  return (
    <div className={'no-hits-footer fcc_suggestion_item'} role='region'>
      <span className='hit-name'>{title}</span>
    </div>
  );
};

NoHitsSuggestion.propTypes = {
  handleMouseEnter: PropTypes.func.isRequired,
  handleMouseLeave: PropTypes.func.isRequired,
  title: PropTypes.string
};

export default NoHitsSuggestion;
