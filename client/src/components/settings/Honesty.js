import { Button, Panel } from '@freecodecamp/react-bootstrap';
import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';

import HonestyPolicy from '../../resources/honesty-policy';
import { FullWidthRow } from '../helpers';
import SectionHeader from './SectionHeader';

import './honesty.css';

const propTypes = {
  isHonest: PropTypes.bool,
  updateIsHonest: PropTypes.func.isRequired
};

const Honesty = ({ isHonest, updateIsHonest }) => {
  const { t } = useTranslation();
  const button = isHonest ? (
    <Button
      block={true}
      bsStyle='primary'
      className='disabled-agreed'
      disabled={true}
    >
      <p>{t('buttons.accepted-honesty')}</p>
    </Button>
  ) : (
    <Button
      block={true}
      bsStyle='primary'
      onClick={() => updateIsHonest({ isHonest: true })}
    >
      {t('buttons.agree')}
    </Button>
  );
  return (
    <section className='honesty-policy'>
      <SectionHeader>{t('settings.headings.honesty')}</SectionHeader>
      <FullWidthRow>
        <Panel className='honesty-panel'>
          <HonestyPolicy />
        </Panel>
        <br />
        {button}
      </FullWidthRow>
    </section>
  );
};

Honesty.displayName = 'Honesty';
Honesty.propTypes = propTypes;

export default Honesty;
