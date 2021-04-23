import { Link as GatsbyLink } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
  children: PropTypes.any,
  external: PropTypes.bool,
  sameTab: PropTypes.bool,
  to: PropTypes.string.isRequired
};

const Link = ({ children, to, external, sameTab, ...other }) => {
  if (!external && /^\/(?!\/)/.test(to)) {
    return (
      <GatsbyLink to={to} {...other}>
        {children}
      </GatsbyLink>
    );
  } else if (sameTab && external) {
    return (
      <a href={to} {...other}>
        {children}
      </a>
    );
  }

  return (
    <a href={to} {...other} rel='noopener noreferrer' target='_blank'>
      {children}
    </a>
  );
};
Link.propTypes = propTypes;

export default Link;
