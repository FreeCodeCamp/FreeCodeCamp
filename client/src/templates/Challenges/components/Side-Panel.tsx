import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ChallengeTitle from './challenge-title';
import ChallengeDescription from './Challenge-Description';
import ToolPanel from './Tool-Panel';
import TestSuite from './Test-Suite';

import { challengeTestsSelector, isChallengeCompletedSelector } from '../redux';
import { createSelector } from 'reselect';
import './side-panel.css';
import { mathJaxScriptLoader } from '../../../utils/script-loaders';

const mapStateToProps = createSelector(
  isChallengeCompletedSelector,
  challengeTestsSelector,
  (isChallengeCompleted, tests) => ({
    isChallengeCompleted,
    tests
  })
);

const propTypes = {
  block: PropTypes.string,
  description: PropTypes.string,
  guideUrl: PropTypes.string,
  instructions: PropTypes.string,
  instructionsPanelRef: PropTypes.any.isRequired,
  isChallengeCompleted: PropTypes.bool,
  showToolPanel: PropTypes.bool,
  superBlock: PropTypes.string,
  tests: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
  translationPending: PropTypes.bool.isRequired,
  videoUrl: PropTypes.string
};

export class SidePanel extends Component {
  componentDidMount() {
    const MathJax = global.MathJax;
    const mathJaxMountPoint = document.querySelector('#mathjax');
    const mathJaxChallenge =
      this.props.block === 'rosetta-code' ||
      this.props.block === 'project-euler';
    if (MathJax) {
      // Configure MathJax when it's loaded and
      // users navigate from another challenge
      MathJax.Hub.Config({
        tex2jax: {
          inlineMath: [
            ['$', '$'],
            ['\\(', '\\)']
          ],
          processEscapes: true,
          processClass: 'rosetta-code|project-euler'
        }
      });
      MathJax.Hub.Queue([
        'Typeset',
        MathJax.Hub,
        document.querySelector('.rosetta-code'),
        document.querySelector('.project-euler')
      ]);
    } else if (!mathJaxMountPoint && mathJaxChallenge) {
      mathJaxScriptLoader();
    }
  }

  render() {
    const {
      block,
      title,
      description,
      instructions,
      instructionsPanelRef,
      isChallengeCompleted,
      guideUrl,
      tests,
      showToolPanel,
      superBlock,
      translationPending,
      videoUrl
    } = this.props;
    return (
      <div
        className='instructions-panel'
        ref={instructionsPanelRef}
        role='complementary'
        tabIndex='-1'
      >
        <div>
          <ChallengeTitle
            block={block}
            isCompleted={isChallengeCompleted}
            superBlock={superBlock}
            translationPending={translationPending}
          >
            {title}
          </ChallengeTitle>
          <ChallengeDescription
            block={block}
            description={description}
            instructions={instructions}
          />
        </div>
        {showToolPanel && <ToolPanel guideUrl={guideUrl} videoUrl={videoUrl} />}
        <TestSuite tests={tests} />
      </div>
    );
  }
}

SidePanel.displayName = 'SidePanel';
SidePanel.propTypes = propTypes;

export default connect(mapStateToProps)(SidePanel);
