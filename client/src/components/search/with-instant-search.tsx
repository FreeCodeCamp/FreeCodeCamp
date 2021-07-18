import React, { Component } from 'react';
import { Location } from '@reach/router';
import PropTypes from 'prop-types';
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
    : { search: () => {} };

const propTypes = {
  children: PropTypes.any,
  isDropdownEnabled: PropTypes.bool,
  location: PropTypes.object.isRequired,
  query: PropTypes.string,
  toggleSearchDropdown: PropTypes.func.isRequired,
  updateSearchQuery: PropTypes.func.isRequired
};

const mapStateToProps = createSelector(
  searchQuerySelector,
  isSearchDropdownEnabledSelector,
  (query, isDropdownEnabled) => ({ query, isDropdownEnabled })
);
const mapDispatchToProps = {
  toggleSearchDropdown,
  updateSearchQuery
};

const searchStateToUrl = ({ pathname }, query) =>
  `${pathname}${query ? `?${qs.stringify({ query })}` : ''}`;

const urlToSearchState = ({ search }) => qs.parse(search.slice(1));

class InstantSearchRoot extends Component {
  componentDidMount() {
    const { toggleSearchDropdown } = this.props;
    toggleSearchDropdown(!this.isSearchPage());
    this.setQueryFromURL();
  }

  componentDidUpdate(prevProps) {
    const { location, toggleSearchDropdown, isDropdownEnabled } = this.props;

    const enableDropdown = !this.isSearchPage();
    if (isDropdownEnabled !== enableDropdown) {
      toggleSearchDropdown(enableDropdown);
    }

    if (location !== prevProps.location) {
      const { query, updateSearchQuery } = this.props;
      if (this.isSearchPage()) {
        if (
          location.state &&
          typeof location.state === 'object' &&
          location.state.hasOwnProperty('query')
        ) {
          updateSearchQuery(location.state.query);
        } else if (location.search) {
          this.setQueryFromURL();
        } else {
          navigate(searchStateToUrl(this.props.location, query), {
            state: { query },
            replace: true
          });
        }
      } else if (query) {
        updateSearchQuery('');
      }
    }
  }

  isSearchPage = () => this.props.location.pathname.startsWith('/search');

  setQueryFromURL = () => {
    if (this.isSearchPage()) {
      const { updateSearchQuery, location, query } = this.props;
      const { query: queryFromURL } = urlToSearchState(location);
      if (query !== queryFromURL) {
        updateSearchQuery(queryFromURL);
      }
    }
  };

  onSearchStateChange = ({ query }) => {
    const { updateSearchQuery, query: propsQuery } = this.props;
    if (propsQuery === query || typeof query === 'undefined') {
      return;
    }
    updateSearchQuery(query);
    this.updateBrowserHistory(query);
  };

  updateBrowserHistory = query => {
    if (this.isSearchPage()) {
      clearTimeout(this.debouncedSetState);

      this.debouncedSetState = setTimeout(() => {
        if (this.isSearchPage()) {
          navigate(searchStateToUrl(this.props.location, query), {
            state: { query }
          });
        }
      }, DEBOUNCE_TIME);
    }
  };

  render() {
    const { query } = this.props;
    const MAX_MOBILE_HEIGHT = 768;
    return (
      <InstantSearch
        indexName={newsIndex}
        onSearchStateChange={this.onSearchStateChange}
        searchClient={searchClient}
        searchState={{ query }}
      >
        {this.isSearchPage() ? (
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
        {this.props.children}
      </InstantSearch>
    );
  }
}

InstantSearchRoot.displayName = 'InstantSearchRoot';
InstantSearchRoot.propTypes = propTypes;

const InstantSearchRootConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(InstantSearchRoot);

const WithInstantSearch = ({ children }) => (
  <Location>
    {({ location }) => (
      <InstantSearchRootConnected location={location}>
        {children}
      </InstantSearchRootConnected>
    )}
  </Location>
);

WithInstantSearch.displayName = 'WithInstantSearch';
WithInstantSearch.propTypes = { children: PropTypes.any };

export default WithInstantSearch;
