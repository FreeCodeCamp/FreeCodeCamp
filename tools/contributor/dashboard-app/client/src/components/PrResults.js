import React from 'react';
import styled from 'styled-components';

import ListItem from './ListItem';
import FullWidthDiv from './FullWidthDiv';
import Result from './Result';

const List = styled.ul`
  margin: 3px;
`;

const PrResults = ({ searchValue, results, rateLimitMessage }) => {
  const elements = results.map((result, idx) => {
    const { number, filenames, username, title } = result;
    const files = filenames.map((filename, index) => {
      const fileOnMain = `https://github.com/freeCodeCamp/freeCodeCamp/blob/main/${filename}`;
      return (
        <li key={`${number}-${index}`}>
          {filename}{' '}
          <a href={fileOnMain} rel="noopener noreferrer" target="_blank">
            (File on Main)
          </a>
        </li>
      );
    });

    return (
      <Result key={`${number}-${idx}`}>
        <ListItem number={number} username={username} prTitle={title} />
        <List>{files}</List>
      </Result>
    );
  });

  const showResults = () => {
    if (!rateLimitMessage) {
      return (
        (results.length ? <h3>Results for PR# {searchValue}</h3> : null) &&
        elements
      );
    } else {
      return rateLimitMessage;
    }
  };

  return <FullWidthDiv style={{ width: '100%' }}>{showResults()}</FullWidthDiv>;
};

export default PrResults;
