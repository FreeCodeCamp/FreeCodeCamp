/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React from 'react';
import { Provider } from 'react-redux';
import ShallowRenderer from 'react-test-renderer/shallow';

import layoutSelector from './layout-selector';
import { createStore } from '../../src/redux/createStore';
import FourOhFourPage from '../../src/pages/404';
import Learn from '../../src/pages/learn';
import Certification from '../../src/pages/certification';

jest.mock('../../src/analytics');

const store = createStore();

interface NameAndProps {
  props: Record<string, unknown>;
  name: string;
}
function getComponentNameAndProps(
  elementType: React.JSXElementConstructor<never>,
  pathname: string
): NameAndProps {
  const shallow = ShallowRenderer.createRenderer();
  const LayoutReactComponent = layoutSelector({
    element: { type: elementType, props: {}, key: '' },
    props: {
      location: {
        pathname
      }
    }
  });
  shallow.render(<Provider store={store}>{LayoutReactComponent}</Provider>);
  const renderedComponent = shallow.getRenderOutput();
  return {
    props: renderedComponent.props as Record<string, unknown>,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    name: renderedComponent.type.WrappedComponent.displayName
    // Not really sure what to do with .WrappedComponent here
  };
}

test('Challenge path should have DefaultLayout and no footer', () => {
  const challengePath =
    '/learn/responsive-web-design/basic-html-and-html5/say-hello-to-html-elements';
  const compnentObj = getComponentNameAndProps(Learn, challengePath);
  expect(compnentObj.name).toEqual('DefaultLayout');
  expect(compnentObj.props.showFooter).toEqual(false);
});

test('SuperBlock path should have DefaultLayout and footer', () => {
  const superBlockPath = '/learn/responsive-web-design/';
  const compnentObj = getComponentNameAndProps(Learn, superBlockPath);
  expect(compnentObj.name).toEqual('DefaultLayout');
  expect(compnentObj.props.showFooter).toEqual(true);
});

test('i18l challenge path should have DefaultLayout and no footer', () => {
  const challengePath =
    'espanol/learn/responsive-web-design/basic-html-and-html5/say-hello-to-html-elements/';
  const compnentObj = getComponentNameAndProps(Learn, challengePath);
  expect(compnentObj.name).toEqual('DefaultLayout');
  expect(compnentObj.props.showFooter).toEqual(false);
});

test('i18l superBlock path should have DefaultLayout and footer', () => {
  const superBlockPath = '/learn/responsive-web-design/';
  const compnentObj = getComponentNameAndProps(Learn, superBlockPath);
  expect(compnentObj.name).toEqual('DefaultLayout');
  expect(compnentObj.props.showFooter).toEqual(true);
});

test('404 page should have DefaultLayout and footer', () => {
  const challengePath =
    '/espanol/learn/responsive-web-design/basic-html-and-html5/say-hello-to-html-elements/';
  const compnentObj = getComponentNameAndProps(FourOhFourPage, challengePath);
  expect(compnentObj.name).toEqual('DefaultLayout');
  expect(compnentObj.props.showFooter).toEqual(true);
});

test('Certification path should have CertificationLayout', () => {
  const challengePath =
    '/certification/mot01/javascript-algorithms-and-data-structures/';
  const compnentObj = getComponentNameAndProps(Certification, challengePath);
  expect(compnentObj.name).toEqual('CertificationLayout');
});
