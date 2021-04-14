import { Col, Row } from '@freecodecamp/react-bootstrap';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { AsFeatureLogo } from '../../../assets/images/components';

const AsSeenIn = () => {
  const { t } = useTranslation();

  return (
    <Row className='as-seen-in'>
      <Col sm={8} smOffset={2} xs={12}>
        <div className='text-center'>
          <p className='big-heading'>{t('landing.as-seen-in')}</p>
          <AsFeatureLogo fill='light' />
        </div>
      </Col>
    </Row>
  );
};

AsSeenIn.displayName = 'AsSeenIn';
export default AsSeenIn;
