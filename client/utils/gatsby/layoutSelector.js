import PropTypes from 'prop-types';
import React from 'react';

import {
  CertificationLayout,
  DefaultLayout
} from '../../src/components/layouts';
import FourOhFourPage from '../../src/pages/404';

export default function layoutSelector({ element, props }) {
  const {
    location: { pathname }
  } = props;

  if (element.type === FourOhFourPage) {
    return (
      <DefaultLayout pathname={pathname} showFooter={true}>
        {element}
      </DefaultLayout>
    );
  }
  if (/\/certification\//.test(pathname)) {
    return (
      <CertificationLayout pathname={pathname}>{element}</CertificationLayout>
    );
  }

  const splitPath = pathname.split('/').filter(x => x);
  const isSuperBlock =
    (splitPath.length === 2 && splitPath[0]) === 'learn' ||
    (splitPath.length === 3 && splitPath[1]) === 'learn';

  if (/\/learn\//.test(pathname) && !isSuperBlock) {
    return (
      <DefaultLayout pathname={pathname} showFooter={false}>
        {element}
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout pathname={pathname} showFooter={true}>
      {element}
    </DefaultLayout>
  );
}

layoutSelector.propTypes = {
  element: PropTypes.any,
  location: PropTypes.objectOf({ pathname: PropTypes.string }),
  props: PropTypes.any
};
