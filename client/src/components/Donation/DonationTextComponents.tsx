import React from 'react';
import { useTranslation, Trans } from 'react-i18next';

export const DonationSupportText = () => {
  const { t } = useTranslation();
  return (
    <>
      <h4>
        <b>{t('donate.need-help')}</b>
      </h4>
      <p>{t('donate.forward-receipt')}</p>
    </>
  );
};

export const DonationText = () => {
  const { t } = useTranslation();
  return (
    <>
      <p>{t('donate.efficiency')}</p>
      <p>{t('donate.why-donate-1')}</p>
      <p>{t('donate.why-donate-2')}</p>
    </>
  );
};

export const DonationOptionsText = () => {
  const { t } = useTranslation();
  return (
    <>
      <h4>
        <b>
          <Trans>donate.bigger-donation</Trans>
        </b>
      </h4>
      <p>
        <Trans i18nKey='donate.other-ways'>
          <a href={t('links:donate.other-ways-url')}>placeholder</a>
        </Trans>
      </p>
    </>
  );
};

export const DonationOptionsAlertText = () => {
  const { t } = useTranslation();
  return (
    <p>
      <Trans>donate.bigger-donation</Trans>{' '}
      <Trans i18nKey='donate.other-ways'>
        <a href={t('links:donate.other-ways-url')}>placeholder</a>
      </Trans>
    </p>
  );
};
