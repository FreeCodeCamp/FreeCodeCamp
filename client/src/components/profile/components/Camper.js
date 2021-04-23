import {
  faAward,
  faHeart,
  faCalendar
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Row } from '@freecodecamp/react-bootstrap';
import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';

import envData from '../../../../../config/env.json';
import { langCodes } from '../../../../../config/i18n/all-langs';
import { AvatarRenderer } from '../../helpers';
import Link from '../../helpers/Link';

import './camper.css';

import SocialIcons from './SocialIcons';

const { clientLocale } = envData;
const localeCode = langCodes[clientLocale];

const propTypes = {
  about: PropTypes.string,
  githubProfile: PropTypes.string,
  isDonating: PropTypes.bool,
  isGithub: PropTypes.bool,
  isLinkedIn: PropTypes.bool,
  isTwitter: PropTypes.bool,
  isWebsite: PropTypes.bool,
  joinDate: PropTypes.string,
  linkedin: PropTypes.string,
  location: PropTypes.string,
  name: PropTypes.string,
  picture: PropTypes.string,
  points: PropTypes.number,
  twitter: PropTypes.string,
  username: PropTypes.string,
  website: PropTypes.string,
  yearsTopContributor: PropTypes.array
};

function joinArray(array, t) {
  return array.reduce((string, item, index, array) => {
    if (string.length > 0) {
      if (index === array.length - 1) {
        return `${string} ${t('misc.and')} ${item}`;
      } else {
        return `${string}, ${item}`;
      }
    } else {
      return item;
    }
  });
}

function parseDate(joinDate, t) {
  joinDate = new Date(joinDate);
  const date = joinDate.toLocaleString([localeCode, 'en-US'], {
    year: 'numeric',
    month: 'long'
  });
  return t('profile.joined', { date: date });
}

function Camper({
  name,
  username,
  location,
  points,
  picture,
  about,
  yearsTopContributor,
  githubProfile,
  isDonating,
  isLinkedIn,
  isGithub,
  isTwitter,
  isWebsite,
  joinDate,
  linkedin,
  twitter,
  website
}) {
  const { t } = useTranslation();

  return (
    <div>
      <Row>
        <Col className='avatar-container' xs={12}>
          <AvatarRenderer
            isDonating={isDonating}
            isTopContributor={yearsTopContributor.length > 0}
            picture={picture}
            userName={username}
          />
        </Col>
      </Row>
      <SocialIcons
        githubProfile={githubProfile}
        isGithub={isGithub}
        isLinkedIn={isLinkedIn}
        isTwitter={isTwitter}
        isWebsite={isWebsite}
        linkedin={linkedin}
        twitter={twitter}
        username={username}
        website={website}
      />
      <br />
      <h2 className='text-center username'>@{username}</h2>
      {name && <p className='text-center name'>{name}</p>}
      {location && <p className='text-center location'>{location}</p>}
      {isDonating && (
        <p className='text-center supporter'>
          <FontAwesomeIcon icon={faHeart} /> {t('profile.supporter')}
        </p>
      )}
      {about && <p className='bio text-center'>{about}</p>}
      {joinDate && (
        <p className='bio text-center'>
          <FontAwesomeIcon icon={faCalendar} /> {parseDate(joinDate, t)}
        </p>
      )}
      {yearsTopContributor.filter(Boolean).length > 0 && (
        <div>
          <br />
          <p className='text-center yearsTopContributor'>
            <FontAwesomeIcon icon={faAward} />{' '}
            <Link to={'/top-contributors'}>{t('profile.contributor')}</Link>
          </p>
          <p className='text-center'>{joinArray(yearsTopContributor, t)}</p>
        </div>
      )}
      <br />
      {typeof points === 'number' ? (
        <p className='text-center points'>
          {t('profile.total-points', { count: points })}
        </p>
      ) : null}
    </div>
  );
}

Camper.displayName = 'Camper';
Camper.propTypes = propTypes;

export default Camper;
