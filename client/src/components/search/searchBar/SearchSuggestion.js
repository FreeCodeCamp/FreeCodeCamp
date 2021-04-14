import PropTypes from 'prop-types';
import React from 'react';
import { Highlight } from 'react-instantsearch-dom';

const Suggestion = ({ hit, handleMouseEnter, handleMouseLeave }) => {
  const dropdownFooter = hit.objectID.includes('footer-');
  return (
    <a
      className={
        dropdownFooter
          ? 'fcc_suggestion_footer fcc_suggestion_item'
          : 'fcc_suggestion_item'
      }
      href={hit.url}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      rel='noopener noreferrer'
      target='_blank'
    >
      <span className='hit-name'>
        {dropdownFooter ? (
          <Highlight attribute='query' hit={hit} tagName='strong' />
        ) : (
          <Highlight attribute='title' hit={hit} />
        )}
      </span>
    </a>
  );
};

Suggestion.propTypes = {
  handleMouseEnter: PropTypes.func.isRequired,
  handleMouseLeave: PropTypes.func.isRequired,
  hit: PropTypes.object
};

export default Suggestion;
