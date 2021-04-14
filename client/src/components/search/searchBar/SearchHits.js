import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { connectStateResults, connectHits } from 'react-instantsearch-dom';
import { searchPageUrl } from '../../../utils/algolia-locale-setup';

import NoHitsSuggestion from './NoHitsSuggestion';
import Suggestion from './SearchSuggestion';

const CustomHits = connectHits(
  ({
    hits,
    searchQuery,
    handleMouseEnter,
    handleMouseLeave,
    selectedIndex,
    handleHits
  }) => {
    const { t } = useTranslation();
    const noHits = isEmpty(hits);
    const noHitsTitle = t('search.no-tutorials');
    const footer = [
      {
        objectID: `footer-${searchQuery}`,
        query: searchQuery,
        url: noHits
          ? null
          : `${searchPageUrl}?query=${encodeURIComponent(searchQuery)}`,
        title: t('search.see-results', { searchQuery: searchQuery }),
        _highlightResult: {
          query: {
            value: `
              <ais-highlight-0000000000>
                ${t('search.see-results', { searchQuery: searchQuery })}
              </ais-highlight-0000000000>
            `
          }
        }
      }
    ];
    const allHits = hits.slice(0, 8).concat(footer);
    useEffect(() => {
      handleHits(allHits);
    });

    return (
      <div className='ais-Hits'>
        <ul className='ais-Hits-list'>
          {allHits.map((hit, i) => (
            <li
              className={
                !noHits && i === selectedIndex
                  ? 'ais-Hits-item selected'
                  : 'ais-Hits-item'
              }
              data-fccobjectid={hit.objectID}
              key={hit.objectID}
            >
              {noHits ? (
                <NoHitsSuggestion
                  handleMouseEnter={handleMouseEnter}
                  handleMouseLeave={handleMouseLeave}
                  title={noHitsTitle}
                />
              ) : (
                <Suggestion
                  handleMouseEnter={handleMouseEnter}
                  handleMouseLeave={handleMouseLeave}
                  hit={hit}
                />
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  }
);

const SearchHits = connectStateResults(
  ({
    searchState,
    handleMouseEnter,
    handleMouseLeave,
    selectedIndex,
    handleHits
  }) => {
    return isEmpty(searchState) || !searchState.query ? null : (
      <CustomHits
        handleHits={handleHits}
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
        searchQuery={searchState.query}
        selectedIndex={selectedIndex}
      />
    );
  }
);

CustomHits.propTypes = {
  handleHits: PropTypes.func.isRequired
};

export default SearchHits;
