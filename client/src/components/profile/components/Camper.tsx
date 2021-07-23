import React from 'react';
import { Col, Row } from '@freecodecamp/react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAward,
  faCalendar,
  faHeart
} from '@fortawesome/free-solid-svg-icons';
import { TFunction, useTranslation } from 'react-i18next';

import { AvatarRenderer } from '../../helpers';
import SocialIcons from './SocialIcons';
import Link from '../../helpers/link';

import './camper.css';

import { langCodes } from '../../../../../config/i18n/all-langs';
import envData from '../../../../../config/env.json';

const { clientLocale } = envData;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const localeCode = langCodes[clientLocale];

interface ICamperProps {
  about: string;
  githubProfile: string;
  isDonating: boolean;
  isGithub: boolean;
  isLinkedIn: boolean;
  isTwitter: boolean;
  isWebsite: boolean;
  joinDate: string;
  linkedin: string;
  location: string;
  name: string;
  picture: string;
  points: number | null;
  twitter: string;
  username: string;
  website: string;
  yearsTopContributor: string[];
}

function joinArray(array: string[], t: TFunction): string {
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

function parseDate(joinDate: string, t: TFunction): string {
  const convertedJoinDate = new Date(joinDate);
  const date = convertedJoinDate.toLocaleString([localeCode, 'en-US'], {
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
}: ICamperProps): JSX.Element {
  const { t } = useTranslation();

  return (
    <div>
      <Row>
        <Col className='avatar-camper' xs={12}>
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

export default Camper;
