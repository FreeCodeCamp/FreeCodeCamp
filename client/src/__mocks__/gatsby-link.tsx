/* eslint-disable */
import React from 'react';

const mockComponent = name => props =>
  React.createElement(name, props, props.children);

export const navigateTo = () => {};
export default mockComponent('MockedLink');
