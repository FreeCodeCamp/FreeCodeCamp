import i18next from 'i18next';
import PropTypes from 'prop-types';
import React from 'react';
import GreenPass from '../../../assets/icons/GreenPass';
import { Link } from '../../../components/helpers/index';

import BreadCrumb from './BreadCrumb';

import './challenge-title.css';

const propTypes = {
  block: PropTypes.string,
  children: PropTypes.string,
  isCompleted: PropTypes.bool,
  superBlock: PropTypes.string,
  translationPending: PropTypes.bool.isRequired
};

function ChallengeTitle({
  block,
  children,
  isCompleted,
  superBlock,
  translationPending
}) {
  return (
    <div className='challenge-title-wrap'>
      {translationPending && (
        <Link
          className='title-translation-cta'
          to={i18next.t('links:help-translate-link-url')}
        >
          {i18next.t('misc.translation-pending')}
        </Link>
      )}
      <BreadCrumb block={block} superBlock={superBlock} />
      <div className='challenge-title'>
        <div className='title-text'>
          <b>{children}</b>
          {isCompleted ? (
            <GreenPass
              style={{ height: '15px', width: '15px', marginLeft: '7px' }}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}

ChallengeTitle.displayName = 'ChallengeTitle';
ChallengeTitle.propTypes = propTypes;

export default ChallengeTitle;
