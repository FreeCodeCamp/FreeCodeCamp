import { Image } from '@freecodecamp/react-bootstrap';
import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { defaultUserImage } from '../../../../config/misc';
import DefaultAvatar from '../../assets/icons/DefaultAvatar';
import { borderColorPicker } from '../helpers';

const propTypes = {
  isDonating: PropTypes.bool,
  isTopContributor: PropTypes.bool,
  picture: PropTypes.any.isRequired,
  userName: PropTypes.string.isRequired
};

function AvatarRenderer({ picture, userName, isDonating, isTopContributor }) {
  const { t } = useTranslation();
  let borderColor = borderColorPicker(isDonating, isTopContributor);
  let isPlaceHolderImage =
    /example.com|identicon.org/.test(picture) || picture === defaultUserImage;

  return (
    <div className={`avatar-container ${borderColor}`}>
      {isPlaceHolderImage ? (
        <DefaultAvatar className='avatar default-avatar' />
      ) : (
        <Image
          alt={t('profile.avatar', { username: userName })}
          className='avatar'
          responsive={true}
          src={picture}
        />
      )}
    </div>
  );
}

AvatarRenderer.propTypes = propTypes;
AvatarRenderer.displayName = 'AvatarRenderer';
export default AvatarRenderer;
