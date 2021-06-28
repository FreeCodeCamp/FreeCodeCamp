import React from 'react';
import { Form } from '@freecodecamp/react-bootstrap';
import { useTranslation } from 'react-i18next';

import ToggleSetting from './toggle-setting';

type SoundProps = {
  sound: boolean;
  toggleSoundMode: (sound: boolean) => void;
};

export default function SoundSettings({
  sound,
  toggleSoundMode
}: SoundProps): JSX.Element {
  const { t } = useTranslation();

  return (
    <Form inline={true} onSubmit={(e: React.FormEvent) => e.preventDefault()}>
      <ToggleSetting
        action={t('settings.labels.sound-mode')}
        flag={sound}
        flagName='sound'
        offLabel={t('buttons.off')}
        onLabel={t('buttons.on')}
        toggleFlag={() => {
          toggleSoundMode(sound ? false : true);
        }}
      />
    </Form>
  );
}

SoundSettings.displayName = 'SoundSettings';
