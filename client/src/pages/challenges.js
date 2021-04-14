// this exists purely to redirect legacy challenge paths to /learn
import { Router } from '@reach/router';
import { navigate, withPrefix } from 'gatsby';
import React from 'react';

import toLearnPath from '../utils/to-learn-path';

const Redirect = props => {
  if (typeof window !== 'undefined') {
    navigate(toLearnPath(props));
  }
  return null;
};

const Challenges = () => (
  <Router basepath={withPrefix('/challenges')}>
    <Redirect path='/:superBlock/' />
    <Redirect path='/:superBlock/:block/' />
    <Redirect path='/:superBlock/:block/:challenge' />
    <Redirect default={true} />
  </Router>
);

Challenges.displayName = 'Challenges';

export default Challenges;
