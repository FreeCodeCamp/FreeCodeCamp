import PropTypes from 'prop-types';
import React from 'react';

import FullWidthRow from '../helpers/FullWidthRow';

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.node
  ])
};

function SectionHeader({ children }) {
  return (
    <FullWidthRow>
      <h2 className='text-center'>{children}</h2>
      <hr />
    </FullWidthRow>
  );
}

SectionHeader.displayName = 'SectionHeader';
SectionHeader.propTypes = propTypes;

export default SectionHeader;
