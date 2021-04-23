import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import PrismFormatted from './PrismFormatted';
import './challenge-description.css';

const propTypes = {
  block: PropTypes.string,
  description: PropTypes.string,
  instructions: PropTypes.string
};

function ChallengeDescription({ description, instructions, block }) {
  return (
    <div className={`challenge-instructions${block ? ' ' + block : ''}`}>
      {description && <PrismFormatted text={description} />}
      {instructions && (
        <Fragment>
          <hr />
          <PrismFormatted text={instructions} />
        </Fragment>
      )}
      <hr />
    </div>
  );
}

ChallengeDescription.displayName = 'ChallengeDescription';
ChallengeDescription.propTypes = propTypes;

export default ChallengeDescription;
