import { Col, Row } from '@freecodecamp/react-bootstrap';
import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Map from '../../Map/index';
import { Spacer } from '../../helpers';
import BigCallToAction from './BigCallToAction';

const propTypes = {
  page: PropTypes.string
};

const Certifications = ({ page = 'landing' }) => {
  const { t } = useTranslation();

  return (
    <Row className='certification-section'>
      <Col md={8} mdOffset={2} sm={10} smOffset={1} xs={12}>
        <h1 className='big-heading'>{t('landing.certification-heading')}</h1>
        <Map forLanding={true} />
        <Spacer />
        <BigCallToAction page={page} />
        <Spacer />
      </Col>
    </Row>
  );
};

Certifications.displayName = 'Certifications';
Certifications.propTypes = propTypes;
export default Certifications;
