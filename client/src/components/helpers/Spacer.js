import PropTypes from 'prop-types';
import React from 'react';

const styles = { padding: '15px 0', height: '1px' };

const Comp = props => <div className='spacer' style={styles} {...props} />;

const Spacer = ({ size = 1 }) =>
  size === 1 ? (
    <Comp />
  ) : (
    '#'
      .repeat(size)
      .split('')
      .map((_, i) => <Comp key={`spacer_${i}`} />)
  );

Spacer.propTypes = {
  size: PropTypes.number
};

export default Spacer;
