import React from 'react';
import PropTypes from 'prop-types';

import {
  CertificationLayout,
  DefaultLayout
} from '../../src/components/layouts';
import FourOhFourPage from '../../src/pages/404';
import { isChallenge } from '../../src/utils/path-parsers';

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
  } else if (/\/certification\//.test(pathname)) {
    return (
      <CertificationLayout pathname={pathname}>{element}</CertificationLayout>
    );
  } else if (isChallenge(pathname)) {
    return (
      <DefaultLayout pathname={pathname} showFooter={false}>
        {element}
      </DefaultLayout>
    );
  } else {
    return (
      <DefaultLayout pathname={pathname} showFooter={true}>
        {element}
      </DefaultLayout>
    );
  }
}

layoutSelector.propTypes = {
  element: PropTypes.any,
  location: PropTypes.objectOf({ pathname: PropTypes.string }),
  props: PropTypes.any
};
