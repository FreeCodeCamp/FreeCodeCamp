import React from 'react';
import { Provider } from 'react-redux';
import ShallowRenderer from 'react-test-renderer/shallow';

import layoutSelector from './layoutSelector';
import { createStore } from '../../src/redux/createStore';
import FourOhFourPage from '../../src/pages/404';
import Learn from '../../src/pages/learn';
import Certification from '../../src/pages/certification';

jest.mock('../../src/analytics');

const store = createStore();
function getComponentNameAndProps(elementType, pathname) {
  const shallow = new ShallowRenderer();
  const LayoutReactComponent = layoutSelector({
    element: { type: elementType },
    props: {
      location: {
        pathname
      }
    }
  });
  shallow.render(<Provider store={store}>{LayoutReactComponent}</Provider>);
  const renderedComponent = shallow.getRenderOutput();
  return {
    props: renderedComponent.props,
    name: renderedComponent.type.WrappedComponent.displayName
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
