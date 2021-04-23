import { Row, Col } from '@freecodecamp/react-bootstrap';
import { curry } from 'lodash';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { certificatesByNameSelector } from '../../../redux';
import { ButtonSpacer, FullWidthRow, Link, Spacer } from '../../helpers';
import './certifications.css';

const mapStateToProps = (state, props) =>
  createSelector(
    certificatesByNameSelector(props.username),
    ({ hasModernCert, hasLegacyCert, currentCerts, legacyCerts }) => ({
      hasModernCert,
      hasLegacyCert,
      currentCerts,
      legacyCerts
    })
  )(state, props);

const certArrayTypes = PropTypes.arrayOf(
  PropTypes.shape({
    show: PropTypes.bool,
    title: PropTypes.string,
    showURL: PropTypes.string
  })
);

const propTypes = {
  currentCerts: certArrayTypes,
  hasLegacyCert: PropTypes.bool,
  hasModernCert: PropTypes.bool,
  legacyCerts: certArrayTypes,
  username: PropTypes.string
};

function renderCertShow(username, cert) {
  return cert.show ? (
    <Fragment key={cert.title}>
      <Row>
        <Col className='certifications' sm={10} smPush={1}>
          <Link
            className='btn btn-lg btn-primary btn-block'
            external={true}
            to={`/certification/${username}/${cert.showURL}`}
          >
            View {cert.title}
          </Link>
        </Col>
      </Row>
      <ButtonSpacer />
    </Fragment>
  ) : null;
}

function Certificates({
  currentCerts,
  legacyCerts,
  hasLegacyCert,
  hasModernCert,
  username
}) {
  const { t } = useTranslation();
  const renderCertShowWithUsername = curry(renderCertShow)(username);
  return (
    <FullWidthRow className='certifications'>
      <h2 className='text-center'>{t('profile.fcc-certs')}</h2>
      <br />
      {hasModernCert ? (
        currentCerts.map(renderCertShowWithUsername)
      ) : (
        <p className='text-center'>{t('profile.no-certs')}</p>
      )}
      {hasLegacyCert ? (
        <div>
          <br />
          <h3 className='text-center'>{t('settings.headings.legacy-certs')}</h3>
          <br />
          {legacyCerts.map(renderCertShowWithUsername)}
          <Spacer size={2} />
        </div>
      ) : null}
      <hr />
    </FullWidthRow>
  );
}

Certificates.propTypes = propTypes;
Certificates.displayName = 'Certifications';

export default connect(mapStateToProps)(Certificates);
