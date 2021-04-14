import { isEqual } from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { HotKeys, ObserveKeys } from 'react-hotkeys';
import { withTranslation } from 'react-i18next';
import { SearchBox } from 'react-instantsearch-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createSelector } from 'reselect';
import { searchPageUrl } from '../../../utils/algolia-locale-setup';

import {
  isSearchDropdownEnabledSelector,
  isSearchBarFocusedSelector,
  toggleSearchDropdown,
  toggleSearchFocused,
  updateSearchQuery
} from '../redux';
import SearchHits from './SearchHits';

import './searchbar-base.css';
import './searchbar.css';

const propTypes = {
  innerRef: PropTypes.object,
  isDropdownEnabled: PropTypes.bool,
  isSearchFocused: PropTypes.bool,
  t: PropTypes.func.isRequired,
  toggleSearchDropdown: PropTypes.func.isRequired,
  toggleSearchFocused: PropTypes.func.isRequired,
  updateSearchQuery: PropTypes.func.isRequired
};

const mapStateToProps = createSelector(
  isSearchDropdownEnabledSelector,
  isSearchBarFocusedSelector,
  (isDropdownEnabled, isSearchFocused) => ({
    isDropdownEnabled,
    isSearchFocused
  })
);

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { toggleSearchDropdown, toggleSearchFocused, updateSearchQuery },
    dispatch
  );

export class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleHits = this.handleHits.bind(this);
    this.state = {
      index: -1,
      hits: []
    };
  }

  componentDidMount() {
    document.addEventListener('click', this.handleFocus);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleFocus);
  }

  handleChange() {
    const { isSearchFocused, toggleSearchFocused } = this.props;
    if (!isSearchFocused) {
      toggleSearchFocused(true);
    }

    this.setState({
      index: -1
    });
  }

  handleFocus(e) {
    const { toggleSearchFocused } = this.props;
    const isSearchFocused = this.props.innerRef.current.contains(e.target);
    if (!isSearchFocused) {
      // Reset if user clicks outside of
      // search bar / closes dropdown
      this.setState({ index: -1 });
    }
    return toggleSearchFocused(isSearchFocused);
  }

  handleSearch(e, query) {
    e.preventDefault();
    const { toggleSearchDropdown, updateSearchQuery } = this.props;
    const { index, hits } = this.state;
    const selectedHit = hits[index];

    // Disable the search dropdown
    toggleSearchDropdown(false);
    if (selectedHit) {
      // Redirect to hit / footer selected by arrow keys
      return window.location.assign(selectedHit.url);
    } else if (!query) {
      // Set query to value in search bar if enter is pressed
      query = e.currentTarget.children[0].value;
    }
    updateSearchQuery(query);

    // For Learn search results page
    // return navigate('/search');

    // Temporary redirect to News search results page
    // when non-empty search input submitted and there
    // are hits besides the footer
    return query && hits.length > 1
      ? window.location.assign(
          `${searchPageUrl}?query=${encodeURIComponent(query)}`
        )
      : false;
  }

  handleMouseEnter(e) {
    e.persist();
    const hoveredText = e.currentTarget.innerText;

    this.setState(({ hits }) => {
      const hitsTitles = hits.map(hit => hit.title);
      const hoveredIndex = hitsTitles.indexOf(hoveredText);

      return { index: hoveredIndex };
    });
  }

  handleMouseLeave() {
    this.setState({
      index: -1
    });
  }

  handleHits(currHits) {
    const { hits } = this.state;

    if (!isEqual(hits, currHits)) {
      this.setState({
        index: -1,
        hits: currHits
      });
    }
  }

  keyMap = {
    INDEX_UP: ['up'],
    INDEX_DOWN: ['down']
  };

  keyHandlers = {
    INDEX_UP: e => {
      e.preventDefault();
      this.setState(({ index, hits }) => ({
        index: index === -1 ? hits.length - 1 : index - 1
      }));
    },
    INDEX_DOWN: e => {
      e.preventDefault();
      this.setState(({ index, hits }) => ({
        index: index === hits.length - 1 ? -1 : index + 1
      }));
    }
  };

  render() {
    const { isDropdownEnabled, isSearchFocused, innerRef, t } = this.props;
    const { index } = this.state;
    const placeholder = t('search.placeholder');

    return (
      <div className='fcc_searchBar' data-testid='fcc_searchBar' ref={innerRef}>
        <HotKeys handlers={this.keyHandlers} keyMap={this.keyMap}>
          <div className='fcc_search_wrapper'>
            <label className='fcc_sr_only' htmlFor='fcc_instantsearch'>
              {t('search.label')}
            </label>
            <ObserveKeys except={['Space']}>
              <SearchBox
                focusShortcuts={[83, 191]}
                onChange={this.handleChange}
                onFocus={this.handleFocus}
                onSubmit={this.handleSearch}
                showLoadingIndicator={false}
                translations={{ placeholder }}
              />
            </ObserveKeys>
            {isDropdownEnabled && isSearchFocused && (
              <SearchHits
                handleHits={this.handleHits}
                handleMouseEnter={this.handleMouseEnter}
                handleMouseLeave={this.handleMouseLeave}
                selectedIndex={index}
              />
            )}
          </div>
        </HotKeys>
      </div>
    );
  }
}

SearchBar.displayName = 'SearchBar';
SearchBar.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(SearchBar));
