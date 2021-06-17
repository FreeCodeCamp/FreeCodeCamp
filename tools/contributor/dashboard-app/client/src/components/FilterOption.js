import React from 'react';
import styled from 'styled-components';

const Container = styled.label`
  @media (max-width: 600px) {
    display: block;
  }
`;

const FilterOption = ({
  group,
  children,
  value,
  selectedOption,
  onOptionChange
}) => {
  return (
    <Container>
      <input
        name={group}
        type="radio"
        value={value}
        checked={selectedOption === value}
        onChange={onOptionChange}
      />
      {children}
    </Container>
  );
};
export default FilterOption;
