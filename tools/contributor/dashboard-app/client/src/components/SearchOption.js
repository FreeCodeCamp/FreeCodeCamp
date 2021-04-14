import React from 'react';

const SearchOption = ({ children, value, selectedOption, onOptionChange }) => (
  <label>
    <input
      name='searchType'
      type='radio'
      value={value}
      checked={selectedOption === value}
      onChange={onOptionChange}
    />
    {children}
  </label>
);

export default SearchOption;
