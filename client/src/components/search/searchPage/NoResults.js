import PropTypes from 'prop-types';
import React from 'react';
import { Trans } from 'react-i18next';

const propTypes = {
  query: PropTypes.string
};

function NoResults({ query }) {
  return (
    <div className='no-results-wrapper'>
      <p>
        <Trans i18nKey='search.no-results' query={query}>
          <em>{{ query }}</em>
        </Trans>
      </p>
    </div>
  );
}

NoResults.displayName = 'NoResults';
NoResults.propTypes = propTypes;

export default NoResults;
