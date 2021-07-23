/* eslint-disable import/unambiguous */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable no-undef */
import React from 'react';
import envData from '../../../config/env.json';

const gatsby = jest.requireActual('gatsby');

const { clientLocale } = envData;

module.exports = {
  ...gatsby,
  navigate: jest.fn(),
  graphql: jest.fn(),
  Link: jest.fn().mockImplementation(
    // these props are invalid for an `a` tag
    ({
      activeClassName,
      activeStyle,
      getProps,
      innerRef,
      partiallyActive,
      ref,
      replace,
      to,
      ...rest
    }) =>
      React.createElement('a', {
        ...rest,
        href: to
      })
  ),
  withPrefix: jest.fn().mockImplementation((path: string) => {
    const pathPrefix =
      clientLocale === 'english' || clientLocale === 'chinese'
        ? ''
        : '/' + clientLocale;
    return `${pathPrefix}${path}`;
  }),
  StaticQuery: jest.fn(),
  useStaticQuery: jest.fn()
};
