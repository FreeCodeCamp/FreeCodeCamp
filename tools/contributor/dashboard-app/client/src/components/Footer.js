import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin-top: 5px;
  text-align: center;
`;

const Info = styled.div`
  font-size: 14px;
  padding: 2px;
`;

const Footer = (props) => {
  const localTime = (lastUpdate) => {
    const newTime = new Date(lastUpdate);
    return newTime.toLocaleString();
  };

  const {
    footerInfo: { numPRs, prRange, lastUpdate }
  } = props;
  return (
    lastUpdate && (
      <Container>
        <Info>Last Update: {localTime(lastUpdate)}</Info>
        <Info>
          # of open PRs: {numPRs} ({prRange})
        </Info>
      </Container>
    )
  );
};

export default Footer;
