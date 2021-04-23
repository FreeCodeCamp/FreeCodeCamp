import React from 'react';
import styled from 'styled-components';

const Container = styled.input`
  margin-bottom: 10px;
`;

const Input = React.forwardRef((props, ref) => (
  <Container
    type='text'
    onChange={props.onInputEvent}
    onKeyPress={props.onInputEvent}
    value={props.value}
    ref={ref}
  />
));

export default Input;
