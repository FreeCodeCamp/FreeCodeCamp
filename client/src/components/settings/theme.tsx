import React from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Form } from '@freecodecamp/react-bootstrap';
import { useTranslation } from 'react-i18next';

import ToggleSetting from './toggle-setting';
import * as Tone from 'tone';

type ThemeProps = {
  currentTheme: string;
  toggleNightMode: (theme: 'default' | 'night') => void;
};

export default function ThemeSettings({
  currentTheme,
  toggleNightMode
}: ThemeProps): JSX.Element {
  const { t } = useTranslation();

  const nightToDayPlayer = new Tone.Player(
    'https://cdn.nhcarrigan.com/content/audio/day.mp3'
  ).toDestination();
  const dayToNightPlayer = new Tone.Player(
    'https://cdn.nhcarrigan.com/content/audio/night.mp3'
  ).toDestination();

  return (
    <Form
      inline={true}
      onSubmit={(e: React.FormEvent): void => e.preventDefault()}
    >
      <ToggleSetting
        action={t('settings.labels.night-mode')}
        flag={currentTheme === 'night'}
        flagName='currentTheme'
        offLabel={t('buttons.off')}
        onLabel={t('buttons.on')}
        toggleFlag={async () => {
          if (Tone.context.state === 'running') await Tone.context.resume();
          if (currentTheme === 'night') {
            nightToDayPlayer.start(1);
          } else {
            dayToNightPlayer.start(1);
          }
          toggleNightMode(currentTheme === 'night' ? 'default' : 'night');
        }}
      />
    </Form>
  );
}

ThemeSettings.displayName = 'ThemeSettings';
