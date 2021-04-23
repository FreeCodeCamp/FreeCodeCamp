import { Col, Row } from '@freecodecamp/react-bootstrap';
import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  AmazonLogo,
  AppleLogo,
  MicrosoftLogo,
  SpotifyLogo,
  GoogleLogo
} from '../../../assets/images/components';
import { Spacer } from '../../helpers';
import BigCallToAction from './BigCallToAction';
import CampersImage from './CampersImage';

const propTypes = {
  page: PropTypes.string
};

function LandingTop({ page }) {
  const { t } = useTranslation();

  return (
    <div className='landing-top'>
      <Row>
        <Spacer />
        <Col lg={8} lgOffset={2} sm={10} smOffset={1} xs={12}>
          <h1 className='big-heading' data-test-label={`${page}-header`}>
            {t('landing.big-heading-1')}
          </h1>
          <p className='big-heading'>{t('landing.big-heading-2')}</p>
          <p className='big-heading'>{t('landing.big-heading-3')}</p>
          <p>{t('landing.h2-heading')}</p>
          <div className='logo-row'>
            <AppleLogo />
            <GoogleLogo />
            <MicrosoftLogo />
            <AmazonLogo />
            <SpotifyLogo />
          </div>
          <Spacer />
          <BigCallToAction page={page} />
          <CampersImage page={page} />
          <Spacer />
        </Col>
      </Row>
    </div>
  );
}

LandingTop.displayName = 'LandingTop';
LandingTop.propTypes = propTypes;
export default LandingTop;
