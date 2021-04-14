import i18next from 'i18next';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from '../../../components/helpers/index';

import './challenge-title.css';

const propTypes = {
  block: PropTypes.string,
  superBlock: PropTypes.string
};

function BreadCrumb({ block, superBlock }) {
  return (
    <div className='challenge-title-breadcrumbs'>
      <Link
        className='breadcrumb-left'
        state={{ breadcrumbBlockClick: block }}
        to={`/learn/${superBlock}`}
      >
        <span className='ellipsis'>
          {i18next.t(`intro:${superBlock}.title`)}
        </span>
      </Link>
      <div className='breadcrumb-center' />
      <Link
        className='breadcrumb-right'
        state={{ breadcrumbBlockClick: block }}
        to={`/learn/${superBlock}/#${block}`}
      >
        {i18next.t(`intro:${superBlock}.blocks.${block}.title`)}
      </Link>
    </div>
  );
}

BreadCrumb.displayName = 'BreadCrumb';
BreadCrumb.propTypes = propTypes;

export default BreadCrumb;
