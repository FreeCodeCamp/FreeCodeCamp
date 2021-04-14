import PropTypes from 'prop-types';
import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { randomQuote } from '../../utils/get-words';
import Login from '../Header/components/Login';
import { Link, Spacer, Loader, FullWidthRow } from '../helpers';
import CurrentChallengeLink from '../helpers/CurrentChallengeLink';
import IntroDescription from './components/IntroDescription';

import './intro.css';

const propTypes = {
  complete: PropTypes.bool,
  completedChallengeCount: PropTypes.number,
  isSignedIn: PropTypes.bool,
  name: PropTypes.string,
  pending: PropTypes.bool,
  slug: PropTypes.string,
  username: PropTypes.string
};

function Intro({
  isSignedIn,
  name,
  pending,
  complete,
  completedChallengeCount,
  slug
}) {
  const { t } = useTranslation();
  if (pending && !complete) {
    return (
      <>
        <Spacer />
        <Loader />
        <Spacer />
      </>
    );
  } else if (isSignedIn) {
    const { quote, author } = randomQuote();
    return (
      <>
        <Spacer />
        <h1 className='text-center '>
          {name
            ? `${t('learn.welcome-1', { name: name })}`
            : `${t('learn.welcome-2')}`}
        </h1>
        <Spacer />
        <FullWidthRow>
          <Link className='btn btn-lg btn-primary btn-block' to='/settings'>
            {t('buttons.update-settings')}
          </Link>
          {completedChallengeCount > 0 ? (
            <CurrentChallengeLink isLargeBtn={true}>
              {t('buttons.current-challenge')}
            </CurrentChallengeLink>
          ) : (
            ''
          )}
        </FullWidthRow>
        <Spacer />
        <div className='text-center quote-partial'>
          <blockquote className='blockquote'>
            <span>
              <q>{quote}</q>
              <footer className='quote-author blockquote-footer'>
                <cite>{author}</cite>
              </footer>
            </span>
          </blockquote>
        </div>
        {completedChallengeCount < 15 ? (
          <div className='intro-description'>
            <Spacer />
            <p>
              <Trans i18nKey='learn.start-at-beginning'>
                <Link to={slug} />
              </Trans>
            </p>
          </div>
        ) : (
          ''
        )}
      </>
    );
  } else {
    return (
      <>
        <Spacer />
        <h1>{t('learn.heading')}</h1>
        <Spacer />
        <IntroDescription />
        <Spacer />
        <Login block={true}>{t('buttons.logged-out-cta-btn')}</Login>
        <Spacer />
      </>
    );
  }
}

Intro.propTypes = propTypes;
Intro.displayName = 'Intro';

export default Intro;
