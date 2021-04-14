import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
  children: PropTypes.node
};

const style = {
  padding: '0 15px'
};

function BlockSaveWrapper({ children, ...restProps }) {
  return (
    <div style={style} {...restProps}>
      {children}
    </div>
  );
}

BlockSaveWrapper.displayName = 'BlockSaveWrapper';
BlockSaveWrapper.propTypes = propTypes;

export default BlockSaveWrapper;
