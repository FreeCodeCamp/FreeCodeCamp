import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { withTranslation } from 'react-i18next';
import ScrollableAnchor from 'react-scrollable-anchor';
import * as Tone from 'tone';
import store from 'store';

import { makeExpandedBlockSelector, toggleBlock } from '../redux';
import { completedChallengesSelector, executeGA } from '../../../redux';
import Challenges from './Challenges';
import Caret from '../../../assets/icons/caret';
import GreenPass from '../../../assets/icons/green-pass';
import GreenNotCompleted from '../../../assets/icons/green-not-completed';
import { isAuditedCert } from '../../../../../utils/is-audited';
import envData from '../../../../../config/env.json';
import { Link } from '../../../components/helpers/';

const { curriculumLocale } = envData;

const mapStateToProps = (state, ownProps) => {
  const expandedSelector = makeExpandedBlockSelector(ownProps.blockDashedName);

  return createSelector(
    expandedSelector,
    completedChallengesSelector,
    (isExpanded, completedChallenges) => ({
      isExpanded,
      completedChallenges: completedChallenges.map(({ id }) => id)
    })
  )(state);
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ toggleBlock, executeGA }, dispatch);

const propTypes = {
  blockDashedName: PropTypes.string,
  challenges: PropTypes.array,
  completedChallenges: PropTypes.arrayOf(PropTypes.string),
  executeGA: PropTypes.func,
  isExpanded: PropTypes.bool,
  superBlock: PropTypes.string,
  t: PropTypes.func,
  toggleBlock: PropTypes.func.isRequired
};

const mapIconStyle = { height: '15px', marginRight: '10px', width: '15px' };

export class Block extends Component {
  constructor(...props) {
    super(...props);

    this.handleBlockClick = this.handleBlockClick.bind(this);
  }

  handleBlockClick() {
    const { blockDashedName, toggleBlock, executeGA } = this.props;
    const playSound = store.get('fcc-sound');
    const player = new Tone.Player(
      'https://tonejs.github.io/audio/berklee/guitar_chord1.mp3'
    ).toDestination();
    // eslint-disable-next-line no-unused-expressions
    Tone.context.state === 'running' ? null : Tone.context.resume();
    player.autostart = playSound;
    executeGA({
      type: 'event',
      data: {
        category: 'Map Block Click',
        action: blockDashedName
      }
    });
    return toggleBlock(blockDashedName);
  }

  renderCheckMark(isCompleted) {
    return isCompleted ? (
      <GreenPass style={mapIconStyle} />
    ) : (
      <GreenNotCompleted style={mapIconStyle} />
    );
  }

  renderBlockIntros(arr) {
    return (
      <div className='block-description'>
        {arr.map((str, i) => (
          <p dangerouslySetInnerHTML={{ __html: str }} key={i} />
        ))}
      </div>
    );
  }

  render() {
    const {
      blockDashedName,
      completedChallenges,
      challenges,
      isExpanded,
      superBlock,
      t
    } = this.props;

    let completedCount = 0;
    const challengesWithCompleted = challenges.map(challenge => {
      const { id } = challenge;
      const isCompleted = completedChallenges.some(
        completedId => id === completedId
      );
      if (isCompleted) {
        completedCount++;
      }
      return { ...challenge, isCompleted };
    });

    const isProjectBlock = challenges.some(challenge => {
      const isJsProject =
        challenge.order === 10 && challenge.challengeType === 5;

      const isOtherProject =
        challenge.challengeType === 3 ||
        challenge.challengeType === 4 ||
        challenge.challengeType === 10;

      const isTakeHomeProject = blockDashedName === 'take-home-projects';

      return (
        (isJsProject && !isTakeHomeProject) ||
        (isOtherProject && !isTakeHomeProject)
      );
    });

    const blockIntroObj = t(`intro:${superBlock}.blocks.${blockDashedName}`);
    const blockTitle = blockIntroObj ? blockIntroObj.title : null;
    const blockIntroArr = blockIntroObj ? blockIntroObj.intro : [];
    const {
      expand: expandText,
      collapse: collapseText,
      courses: coursesText
    } = t('intro:misc-text');

    return isProjectBlock ? (
      <ScrollableAnchor id={blockDashedName}>
        <div className='block'>
          <div className='block-title-wrapper'>
            <a className='block-link' href={`#${blockDashedName}`}>
              <h3 className='big-block-title'>
                {blockTitle}
                <span className='block-link-icon'>#</span>
              </h3>
            </a>
            {!isAuditedCert(curriculumLocale, superBlock) && (
              <div className='block-cta-wrapper'>
                <Link
                  className='block-title-translation-cta'
                  to={t('links:help-translate-link-url')}
                >
                  {t('misc.translation-pending')}
                </Link>
              </div>
            )}
          </div>
          {this.renderBlockIntros(blockIntroArr)}
          <Challenges
            challengesWithCompleted={challengesWithCompleted}
            isProjectBlock={isProjectBlock}
          />
        </div>
      </ScrollableAnchor>
    ) : (
      <ScrollableAnchor id={blockDashedName}>
        <div className={`block ${isExpanded ? 'open' : ''}`}>
          <div className='block-title-wrapper'>
            <a className='block-link' href={`#${blockDashedName}`}>
              <h3 className='big-block-title'>
                {blockTitle}
                <span className='block-link-icon'>#</span>
              </h3>
            </a>
            {!isAuditedCert(curriculumLocale, superBlock) && (
              <div className='block-cta-wrapper'>
                <Link
                  className='block-title-translation-cta'
                  to={t('links:help-translate-link-url')}
                >
                  {t('misc.translation-pending')}
                </Link>
              </div>
            )}
          </div>
          {this.renderBlockIntros(blockIntroArr)}
          <button
            aria-expanded={isExpanded}
            className='map-title'
            onClick={this.handleBlockClick}
          >
            <Caret />
            <h4 className='course-title'>
              {`${
                isExpanded ? collapseText : expandText
              } ${coursesText.toLowerCase()}`}
            </h4>
            <div className='map-title-completed course-title'>
              {this.renderCheckMark(
                completedCount === challengesWithCompleted.length
              )}
              <span className='map-completed-count'>{`${completedCount}/${challengesWithCompleted.length}`}</span>
            </div>
          </button>
          {isExpanded && (
            <Challenges
              challengesWithCompleted={challengesWithCompleted}
              isProjectBlock={isProjectBlock}
            />
          )}
        </div>
      </ScrollableAnchor>
    );
  }
}

Block.displayName = 'Block';
Block.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(Block));
