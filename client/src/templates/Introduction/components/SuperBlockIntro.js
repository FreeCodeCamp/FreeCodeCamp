import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { generateIconComponent } from '../../../assets/icons';
import { Spacer } from '../../../components/helpers';

const propTypes = {
  superBlock: PropTypes.string
};

function SuperBlockIntro(props) {
  const { t } = useTranslation();
  const { superBlock } = props;

  const superBlockIntroObj = t(`intro:${superBlock}`);
  const {
    title: i18nSuperBlock,
    intro: superBlockIntroText
  } = superBlockIntroObj;

  return (
    <>
      <h1 className='text-center big-heading'>{i18nSuperBlock}</h1>
      <Spacer />
      {generateIconComponent(superBlock, 'cert-header-icon')}
      <Spacer />
      {superBlockIntroText.map((str, i) => (
        <p key={i}>{str}</p>
      ))}
    </>
  );
}

SuperBlockIntro.displayName = 'SuperBlockIntro';
SuperBlockIntro.propTypes = propTypes;

export default SuperBlockIntro;
