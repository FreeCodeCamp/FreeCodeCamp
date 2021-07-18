import React, { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { Location } from '@reach/router';
import type { WindowLocation } from '@reach/router';
import { connect } from 'react-redux';
import { InstantSearch, Configure } from 'react-instantsearch-dom';
import qs from 'query-string';
import { navigate } from 'gatsby';
import Media from 'react-responsive';
import algoliasearch from 'algoliasearch/lite';
import { newsIndex } from '../../utils/algolia-locale-setup';

import {
  isSearchDropdownEnabledSelector,
  searchQuerySelector,
  toggleSearchDropdown,
  updateSearchQuery
} from './redux';
import envData from '../../../../config/env.json';

import { createSelector } from 'reselect';

const { algoliaAppId, algoliaAPIKey } = envData;

const DEBOUNCE_TIME = 100;

// If a key is missing, searches will fail, but the client will still render.
const searchClient =
  algoliaAppId && algoliaAPIKey
    ? algoliasearch(algoliaAppId, algoliaAPIKey)
    : {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        search: () => {}
      };

const mapStateToProps = createSelector(
  searchQuerySelector,
  isSearchDropdownEnabledSelector,
  function (
    query: string,
    isDropdownEnabled: boolean
  ): { query: string; isDropdownEnabled: boolean } {
    return { query, isDropdownEnabled };
  }
);
const mapDispatchToProps = {
  toggleSearchDropdown,
  updateSearchQuery
};

function searchStateToUrl(
  { pathname }: { pathname: string },
  query: string
): string {
  return `${pathname}${query ? `?${qs.stringify({ query })}` : ''}`;
}
function urlToSearchState({ search }: WindowLocation): { query: string } {
  return qs.parse(search.slice(1)) as { query: string };
}

interface InstantSearchRootProps {
  isDropdownEnabled: boolean;
  location: WindowLocation<{ query: string }>;
  query: string;
  toggleSearchDropdown: (toggle: boolean) => void;
  updateSearchQuery: (query: string) => void;
  children: ReactNode;
}
function InstantSearchRoot({
  isDropdownEnabled,
  location,
  query,
  toggleSearchDropdown,
  updateSearchQuery,
  children
}: InstantSearchRootProps) {
  function isSearchPage(): boolean {
    return location.pathname.startsWith('/search');
  }

  function setQueryFromURL(): void {
    if (isSearchPage()) {
      const { query: queryFromURL } = urlToSearchState(location);
      if (query !== queryFromURL) {
        updateSearchQuery(queryFromURL);
      }
    }
  }

  useEffect(() => {
    toggleSearchDropdown(!isSearchPage());
    setQueryFromURL();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // https://reactjs.org/docs/hooks-faq.html#how-to-get-the-previous-props-or-state
  const prevLocationRef = useRef<InstantSearchRootProps['location']>();
  useEffect(() => {
    prevLocationRef.current = location;
  });
  const prevLocation = prevLocationRef.current;
  useEffect(() => {
    const enableDropdown = !isSearchPage();
    if (isDropdownEnabled !== enableDropdown) {
      toggleSearchDropdown(enableDropdown);
    }

    if (location !== prevLocation) {
      if (isSearchPage()) {
        if (
          location.state &&
          typeof location.state === 'object' &&
          location.state.hasOwnProperty('query')
        ) {
          updateSearchQuery(location.state.query);
        } else if (location.search) {
          setQueryFromURL();
        } else {
          void navigate(searchStateToUrl(location, query), {
            state: { query },
            replace: true
          });
        }
      } else if (query) {
        updateSearchQuery('');
      }
    }
  });

  const debouncedSetState = useRef<ReturnType<typeof setTimeout>>(
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setTimeout(() => {})
  );
  function updateBrowserHistory(query: string): void {
    if (isSearchPage()) {
      clearTimeout(debouncedSetState.current);

      debouncedSetState.current = setTimeout(() => {
        if (isSearchPage()) {
          void navigate(searchStateToUrl(location, query), {
            state: { query }
          });
        }
      }, DEBOUNCE_TIME);
    }
  }

  const propsQuery = query;
  function onSearchStateChange({ query }: { query: string | undefined }): void {
    if (propsQuery === query || typeof query === 'undefined') {
      return;
    }
    updateSearchQuery(query);
    updateBrowserHistory(query);
  }

  const MAX_MOBILE_HEIGHT = 768;
  return (
    <InstantSearch
      indexName={newsIndex}
      onSearchStateChange={onSearchStateChange}
      searchClient={searchClient}
      searchState={{ query }}
    >
      {isSearchPage() ? (
        <Configure hitsPerPage={15} />
      ) : (
        <>
          <Media maxHeight={MAX_MOBILE_HEIGHT}>
            <Configure hitsPerPage={5} />
          </Media>
          <Media minHeight={MAX_MOBILE_HEIGHT + 1}>
            <Configure hitsPerPage={8} />
          </Media>
        </>
      )}
      {children}
    </InstantSearch>
  );
}

InstantSearchRoot.displayName = 'InstantSearchRoot';

const InstantSearchRootConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(InstantSearchRoot);

interface WithInstantSearchProps {
  children: ReactNode;
}
function WithInstantSearch({ children }: WithInstantSearchProps): JSX.Element {
  return (
    <Location>
      {({ location }) => (
        <InstantSearchRootConnected
          location={location as InstantSearchRootProps['location']}
        >
          {children}
        </InstantSearchRootConnected>
      )}
    </Location>
  );
}

WithInstantSearch.displayName = 'WithInstantSearch';

export default WithInstantSearch;
