import React from 'react';
import { Link } from '../../../components/helpers/index';

import './challenge-title.css';
import i18next from 'i18next';

interface BreadCrumbProps {
  block: string;
  superBlock: string;
}

function BreadCrumb({ block, superBlock }: BreadCrumbProps): JSX.Element {
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

export default BreadCrumb;
