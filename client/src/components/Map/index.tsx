import React from 'react';
import PropTypes from 'prop-types';
import { graphql, useStaticQuery } from 'gatsby';
import i18next from 'i18next';
import { generateIconComponent } from '../../assets/icons';

import { Link, Spacer } from '../helpers';
import LinkButton from '../../assets/icons/link-button';
import './map.css';
import { isAuditedCert } from '../../../../utils/is-audited';
import envData from '../../../../config/env.json';

const { curriculumLocale } = envData;

const propTypes = {
  currentSuperBlock: PropTypes.string,
  forLanding: PropTypes.bool
};

function createSuperBlockTitle(superBlock) {
  const superBlockTitle = i18next.t(`intro:${superBlock}.title`);
  return superBlock === 'coding-interview-prep'
    ? i18next.t('learn.cert-map-estimates.coding-prep', {
        title: superBlockTitle
      })
    : i18next.t('learn.cert-map-estimates.certs', { title: superBlockTitle });
}

const linkSpacingStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
};

function renderLandingMap(nodes) {
  nodes = nodes.filter(node => node.superBlock !== 'coding-interview-prep');
  return (
    <ul data-test-label='certifications'>
      {nodes.map((node, i) => (
        <li key={i}>
          <Link
            className='btn link-btn btn-lg'
            to={`/learn/${node.superBlock}/`}
          >
            <div style={linkSpacingStyle}>
              {generateIconComponent(node.superBlock, 'map-icon')}
              {i18next.t(`intro:${node.superBlock}.title`)}
            </div>
            <LinkButton />
          </Link>
        </li>
      ))}
    </ul>
  );
}

function renderLearnMap(nodes, currentSuperBlock = '') {
  nodes = nodes.filter(node => node.superBlock !== currentSuperBlock);
  return curriculumLocale === 'english' ? (
    <ul data-test-label='learn-curriculum-map'>
      {nodes.map((node, i) => (
        <li key={i}>
          <Link
            className='btn link-btn btn-lg'
            to={`/learn/${node.superBlock}/`}
          >
            <div style={linkSpacingStyle}>
              {generateIconComponent(node.superBlock, 'map-icon')}
              {createSuperBlockTitle(node.superBlock)}
            </div>
          </Link>
        </li>
      ))}
    </ul>
  ) : (
    <ul data-test-label='learn-curriculum-map'>
      {nodes
        .filter(node => isAuditedCert(curriculumLocale, node.superBlock))
        .map((node, i) => (
          <li key={i}>
            <Link
              className='btn link-btn btn-lg'
              to={`/learn/${node.superBlock}/`}
            >
              <div style={linkSpacingStyle}>
                {generateIconComponent(node.superBlock, 'map-icon')}
                {createSuperBlockTitle(node.superBlock)}
              </div>
            </Link>
          </li>
        ))}
      <hr />
      <div style={{ textAlign: 'center' }}>
        <p style={{ marginBottom: 0 }}>{i18next.t('learn.help-translate')} </p>
        <Link
          external={true}
          sameTab={false}
          to={i18next.t('links:help-translate-link-url')}
        >
          {i18next.t('learn.help-translate-link')}
        </Link>
        <Spacer />
      </div>
      {nodes
        .filter(node => !isAuditedCert(curriculumLocale, node.superBlock))
        .map((node, i) => (
          <li key={i}>
            <Link
              className='btn link-btn btn-lg'
              to={`/learn/${node.superBlock}/`}
            >
              <div style={linkSpacingStyle}>
                {generateIconComponent(node.superBlock, 'map-icon')}
                {createSuperBlockTitle(node.superBlock)}
              </div>
            </Link>
          </li>
        ))}
    </ul>
  );
}

export function Map({ forLanding = false, currentSuperBlock = '' }) {
  /*
   * this query gets the first challenge from each block and the second block
   * from each superblock, leaving you with one challenge from each
   * superblock
   */
  const data = useStaticQuery(graphql`
    query SuperBlockNodes {
      allChallengeNode(
        sort: { fields: [superOrder] }
        filter: { order: { eq: 2 }, challengeOrder: { eq: 1 } }
      ) {
        nodes {
          superBlock
          dashedName
        }
      }
    }
  `);

  let nodes = data.allChallengeNode.nodes;

  return (
    <div className='map-ui' data-test-label='learn-curriculum-map'>
      {forLanding
        ? renderLandingMap(nodes)
        : renderLearnMap(nodes, currentSuperBlock)}
    </div>
  );
}

Map.displayName = 'Map';
Map.propTypes = propTypes;

export default Map;
