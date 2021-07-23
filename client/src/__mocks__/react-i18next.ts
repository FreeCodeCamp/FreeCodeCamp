/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React from 'react';

const reactI18next = jest.genMockFromModule('react-i18next');

// modified from https://github.com/i18next/react-i18next/blob/master/example/test-jest/src/__mocks__/react-i18next.js
const hasChildren = <T>(node: {
  children: React.ReactNode;
  props: { children: React.PropsWithChildren<T> };
}) => node && (node.children || (node.props && node.props.children));

const getChildren = <T>(node: {
  children: React.ReactNode;
  props: { children: React.PropsWithChildren<T> };
}) =>
  node && node.children ? node.children : node.props && node.props.children;

// for now unknown as a quick alt fix
const renderNodes = (reactNodes: any) => {
  if (typeof reactNodes === 'string') {
    return reactNodes;
  }

  return Object.keys(reactNodes).map((key, i) => {
    const child = reactNodes[key];
    const isElement = React.isValidElement(child);

    if (typeof child === 'string') {
      return child;
    }
    if (hasChildren(child)) {
      const inner: any = renderNodes(getChildren(child));
      return React.cloneElement(child, { ...child.props, key: i }, inner);
    }
    if (typeof child === 'object' && !isElement) {
      return Object.keys(child).reduce(
        (str: string, childKey: string) => `${str}${child[childKey] as string}`,
        ''
      );
    }

    return child;
  });
};

const withTranslation = () => (Component: { defaultProps: any }) => {
  Component.defaultProps = { ...Component.defaultProps, t: (str: any) => str };
  return Component;
};

const useTranslation = () => {
  return {
    t: (str: string) => str,
    i18n: {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      changeLanguage: () => new Promise(() => {})
    }
  };
};

const Trans = ({ children }: never) =>
  Array.isArray(children) ? renderNodes(children) : renderNodes([children]);

// translate isn't being used anywhere, uncomment if needed
/* const translate = () => Component => props => (
  <Component t={() => ''} {...props} />
); */

// reactI18next.translate = translate;
// @ts-ignore
reactI18next.withTranslation = withTranslation;
// @ts-ignore
reactI18next.useTranslation = useTranslation;
// @ts-ignore
reactI18next.Trans = Trans;

module.exports = reactI18next;
