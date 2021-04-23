import { Form } from '@freecodecamp/react-bootstrap';
import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';

import ToggleSetting from './ToggleSetting';

const propTypes = {
  currentTheme: PropTypes.string.isRequired,
  toggleNightMode: PropTypes.func.isRequired
};

export default function ThemeSettings({ currentTheme, toggleNightMode }) {
  const { t } = useTranslation();

  return (
    <Form inline={true} onSubmit={e => e.preventDefault()}>
      <ToggleSetting
        action={t('settings.labels.night-mode')}
        flag={currentTheme === 'night'}
        flagName='currentTheme'
        offLabel={t('buttons.off')}
        onLabel={t('buttons.on')}
        toggleFlag={() =>
          toggleNightMode(currentTheme === 'night' ? 'default' : 'night')
        }
      />
    </Form>
  );
}

ThemeSettings.displayName = 'ThemeSettings';
ThemeSettings.propTypes = propTypes;
