import React from 'react';
import styled from 'styled-components';

import ListItem from './ListItem';
import FullWidthDiv from './FullWidthDiv';
import Result from './Result';
import FilterOption from './FilterOption';
import { ENDPOINT_PARETO } from '../constants';

const List = styled.div`
  margin: 5px;
  display: flex;
  flex-direction: column;
`;

const Options = styled.div`
  display: flex;
`;

const detailsStyle = { padding: '3px' };
const filenameTitle = { fontWeight: '600' };

class Pareto extends React.Component {
  state = {
    data: [],
    all: [],
    selectedFileType: 'all',
    selectedLanguage: 'all',
    options: {},
    rateLimitMessage: ''
  };

  componentDidMount() {
    fetch(ENDPOINT_PARETO)
      .then((response) => response.json())
      .then(({ ok, rateLimitMessage, pareto }) => {
        if (ok) {
          if (!pareto.length) {
            pareto.push({
              filename: 'Nothing to show in Pareto Report',
              count: 0,
              prs: []
            });
          }

          this.setState((prevState) => ({
            data: pareto,
            all: [...pareto],
            options: this.createOptions(pareto)
          }));
        } else if (rateLimitMessage) {
          this.setState((prevState) => ({
            rateLimitMessage
          }));
        }
      })
      .catch(() => {
        const pareto = [
          { filename: 'Nothing to show in Pareto Report', count: 0, prs: [] }
        ];
        this.setState((prevState) => ({ data: pareto }));
      });
  }

  createOptions = (data) => {
    const options = data.reduce((seen, { filename }) => {
      const { articleType, language } = this.getFilenameOptions(filename);
      if (articleType && language) {
        if (!seen.hasOwnProperty(articleType)) {
          seen[articleType] = {};
        }
        seen[articleType][language] = true;
      }
      return seen;
    }, {});
    return options;
  };

  handleFileTypeOptionChange = (changeEvent) => {
    let { all, selectedLanguage, options } = this.state;
    const selectedFileType = changeEvent.target.value;

    let data = [...all].filter(({ filename }) => {
      const { articleType, language } = this.getFilenameOptions(filename);
      let condition;
      if (selectedFileType === 'all') {
        condition = true;
        selectedLanguage = 'all';
      } else {
        if (selectedLanguage === 'all') {
          condition = articleType === selectedFileType;
        } else if (!options[selectedFileType][selectedLanguage]) {
          condition = articleType === selectedFileType;
          selectedLanguage = 'all';
        } else {
          condition =
            articleType === selectedFileType && language === selectedLanguage;
        }
      }
      return condition;
    });
    this.setState((prevState) => ({
      data,
      selectedFileType,
      selectedLanguage
    }));
  };

  handleLanguageOptionChange = (changeEvent) => {
    const { all, selectedFileType } = this.state;
    const selectedLanguage = changeEvent.target.value;
    let data = [...all].filter(({ filename }) => {
      const { articleType, language } = this.getFilenameOptions(filename);
      let condition;
      if (selectedLanguage === 'all') {
        condition = articleType === selectedFileType;
      } else {
        condition =
          language === selectedLanguage && articleType === selectedFileType;
      }
      return condition;
    });
    this.setState((prevState) => ({ data, selectedLanguage }));
  };

  getFilenameOptions = (filename) => {
    const filenameReplacement = filename.replace(
      /^curriculum\/challenges\//,
      'curriculum/'
    );
    const regex =
      /^(docs|curriculum|guide)(?:\/)(english|arabic|chinese|portuguese|russian|spanish)?\/?/;
    // need an array to pass to labelsAdder
    // eslint-disable-next-line
    const [_, articleType, language] = filenameReplacement.match(regex) || [];
    return { articleType, language };
  };

  render() {
    const {
      data,
      options,
      selectedFileType,
      selectedLanguage,
      rateLimitMessage
    } = this.state;
    const elements = rateLimitMessage
      ? rateLimitMessage
      : data.map((entry) => {
          const { filename, count, prs } = entry;
          const prsList = prs.map(({ number, username, title }) => {
            return (
              <ListItem
                key={number}
                number={number}
                username={username}
                prTitle={title}
              />
            );
          });
          const fileOnMain = `https://github.com/freeCodeCamp/freeCodeCamp/blob/main/${filename}`;
          return (
            <Result key={filename}>
              <span style={filenameTitle}>{filename}</span>{' '}
              <a href={fileOnMain} rel="noopener noreferrer" target="_blank">
                (File on Main)
              </a>
              <br />
              <details style={detailsStyle}>
                <summary># of PRs: {count}</summary>
                <List>{prsList}</List>
              </details>
            </Result>
          );
        });

    let fileTypeOptions = Object.keys(options).map(
      (articleType) => articleType
    );
    const typeOptions = ['all', ...fileTypeOptions].map((type) => (
      <FilterOption
        key={type}
        name="filetype"
        value={type}
        onOptionChange={this.handleFileTypeOptionChange}
        selectedOption={selectedFileType}
      >
        {type.charAt().toUpperCase() + type.slice(1)}
      </FilterOption>
    ));

    let languageOptions = null;
    if (selectedFileType !== 'all') {
      let languages = Object.keys(options[selectedFileType]);
      languages = ['all', ...languages.sort()];
      languageOptions = languages.map((language) => (
        <FilterOption
          key={language}
          name="language"
          value={language}
          onOptionChange={this.handleLanguageOptionChange}
          selectedOption={selectedLanguage}
        >
          {language.charAt().toUpperCase() + language.slice(1)}
        </FilterOption>
      ));
    }
    return (
      <FullWidthDiv>
        {fileTypeOptions.length > 0 && <strong>Filter Options</strong>}
        <Options>
          {fileTypeOptions.length > 0 && (
            <>
              <fieldset>
                <legend>File Type:</legend>
                <div>{typeOptions}</div>
              </fieldset>
            </>
          )}
          {languageOptions && (
            <fieldset>
              <legend>Language:</legend>
              <div>{languageOptions}</div>
            </fieldset>
          )}
        </Options>
        {rateLimitMessage
          ? rateLimitMessage
          : data.length
          ? elements
          : 'Report Loading...'}
      </FullWidthDiv>
    );
  }
}

export default Pareto;
