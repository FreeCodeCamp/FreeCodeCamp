import PropTypes from 'prop-types';
import React from 'react';

import Landing from '../components/landing';
import { AllChallengeNode } from '../redux/propTypes';

const IndexPage = () => {
  return <Landing />;
};

const propTypes = {
  data: PropTypes.shape({
    allChallengeNode: AllChallengeNode
  })
};

IndexPage.propTypes = propTypes;
IndexPage.displayName = 'IndexPage';

export default IndexPage;
