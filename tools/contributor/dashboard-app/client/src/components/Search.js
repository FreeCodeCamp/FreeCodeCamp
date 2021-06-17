import React, { Component } from 'react';

import Input from './Input';
import PrResults from './PrResults';
import FilenameResults from './FilenameResults';
import SearchOption from './SearchOption';

import { ENDPOINT_PR, ENDPOINT_SEARCH } from '../constants';
class Search extends Component {
  state = {
    searchValue: '',
    selectedOption: 'pr',
    results: [],
    message: ''
  };

  clearObj = { searchValue: '', results: [] };

  inputRef = React.createRef();

  handleInputEvent = (event) => {
    const {
      type,
      key,
      target: { value: searchValue }
    } = event;

    if (type === 'change') {
      if (this.state.selectedOption === 'pr') {
        if (Number(searchValue) || searchValue === '') {
          this.setState((prevState) => ({ searchValue, results: [] }));
        }
      } else {
        this.setState((prevState) => ({ searchValue, results: [] }));
      }
    } else if (type === 'keypress' && key === 'Enter') {
      this.searchPRs(searchValue);
    }
  };

  handleButtonClick = () => {
    const { searchValue } = this.state;
    if (searchValue) {
      this.searchPRs(searchValue);
    } else {
      this.inputRef.current.focus();
    }
  };

  handleOptionChange = (changeEvent) => {
    const selectedOption = changeEvent.target.value;

    this.setState((prevState) => ({ selectedOption, ...this.clearObj }));
    this.inputRef.current.focus();
  };

  searchPRs = (value) => {
    const { selectedOption } = this.state;

    const fetchUrl =
      selectedOption === 'pr'
        ? `${ENDPOINT_PR}/${value}`
        : `${ENDPOINT_SEARCH}/?value=${value}`;

    fetch(fetchUrl)
      .then((response) => response.json())
      .then(({ ok, message, results, rateLimitMessage }) => {
        if (ok) {
          this.setState((prevState) => ({ message, results }));
        } else if (rateLimitMessage) {
          this.setState((prevState) => ({
            rateLimitMessage
          }));
        }
      })
      .catch(() => {
        this.setState((prevState) => this.clearObj);
      });
  };

  componentDidMount() {
    this.inputRef.current.focus();
  }

  render() {
    const {
      handleButtonClick,
      handleInputEvent,
      inputRef,
      handleOptionChange,
      state
    } = this;
    const { searchValue, message, results, selectedOption, rateLimitMessage } =
      state;

    return (
      <>
        <div>
          <SearchOption
            value="pr"
            onOptionChange={handleOptionChange}
            selectedOption={selectedOption}
          >
            PR #
          </SearchOption>
          <SearchOption
            value="filename"
            onOptionChange={handleOptionChange}
            selectedOption={selectedOption}
          >
            Filename
          </SearchOption>
        </div>
        <Input
          ref={inputRef}
          value={searchValue}
          onInputEvent={handleInputEvent}
        />
        <button onClick={handleButtonClick}>Search</button>
        {message}
        {selectedOption === 'pr' && (
          <PrResults
            searchValue={searchValue}
            results={results}
            rateLimitMessage={rateLimitMessage}
          />
        )}
        {selectedOption === 'filename' && (
          <FilenameResults
            searchValue={searchValue}
            results={results}
            rateLimitMessage={rateLimitMessage}
          />
        )}
      </>
    );
  }
}

export default Search;
