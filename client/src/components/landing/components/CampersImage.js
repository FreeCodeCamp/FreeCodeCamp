import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Media from 'react-responsive';
import wideImg from '../../../assets/images/landing/wide-image.png';
import { Spacer, ImageLoader } from '../../helpers';

const propTypes = {
  page: PropTypes.string
};

const LARGE_SCREEN_SIZE = 1200;

const imageConfig = {
  donate: {
    spacerSize: 0,
    height: 345,
    width: 585
  },
  landing: {
    spacerSize: 2,
    height: 442,
    width: 750
  }
};

function CampersImage({ page }) {
  const { t } = useTranslation();
  const { spacerSize, height, width } = imageConfig[page];

  return (
    <Media minWidth={LARGE_SCREEN_SIZE}>
      <Spacer size={spacerSize} />
      <ImageLoader
        alt={t('landing.hero-img-description')}
        className='landing-page-image'
        height={height}
        src={wideImg}
        width={width}
      />
      <p className='text-center caption'>{t('landing.hero-img-description')}</p>
    </Media>
  );
}

CampersImage.displayName = 'CampersImage';
CampersImage.propTypes = propTypes;
export default CampersImage;
