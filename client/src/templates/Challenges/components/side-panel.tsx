import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import ChallengeTitle from './challenge-title';
import ChallengeDescription from './Challenge-Description';
import ToolPanel from './Tool-Panel';
import TestSuite from './Test-Suite';

import {
  challengeTestsSelector,
  isChallengeCompletedSelector,
  openModal,
  executeChallenge
} from '../redux';
import { createSelector } from 'reselect';
import './side-panel.css';
import { mathJaxScriptLoader } from '../../../utils/script-loaders';

const mapStateToProps = createSelector(
  isChallengeCompletedSelector,
  challengeTestsSelector,
  (isChallengeCompleted: boolean, tests: Record<string, unknown>[]) => ({
    isChallengeCompleted,
    tests
  })
);

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      executeChallenge,
      openHelpModal: () => openModal('help'),
      openVideoModal: () => openModal('video'),
      openResetModal: () => openModal('reset')
    },
    dispatch
  );

interface SidePanelProps {
  className: string;
  block: string;
  description?: string;
  guideUrl?: string;
  instructions?: string;
  instructionsPanelRef: React.RefObject<HTMLDivElement>;
  isChallengeCompleted: boolean;
  showToolPanel: boolean;
  superBlock: string;
  tests?: Record<string, unknown>[];
  title: string;
  translationPending: boolean;
  videoUrl?: string;
  openHelpModal: () => void;
  openResetModal: () => void;
  openVideoModal: () => void;
  executeChallenge: () => void;
}

export function SidePanel({
  block,
  className,
  description,
  guideUrl,
  instructions,
  instructionsPanelRef,
  isChallengeCompleted,
  showToolPanel = false,
  superBlock,
  tests,
  title,
  translationPending,
  videoUrl,
  openHelpModal,
  openResetModal,
  openVideoModal,
  executeChallenge
}: SidePanelProps): JSX.Element {
  useEffect(() => {
    const MathJax = global.MathJax;
    const mathJaxMountPoint = document.querySelector('#mathjax');
    const mathJaxChallenge =
      block === 'rosetta-code' || block === 'project-euler';
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
  }, [block]);

  return (
    <div
      className={`${className} instructions-panel`}
      ref={instructionsPanelRef}
      role='complementary'
      tabIndex={-1}
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
      {showToolPanel && (
        <ToolPanel
          executeChallenge={executeChallenge}
          guideUrl={guideUrl}
          openHelpModal={openHelpModal}
          openResetModal={openResetModal}
          openVideoModal={openVideoModal}
          videoUrl={videoUrl}
        />
      )}
      <TestSuite tests={tests} />
    </div>
  );
}

SidePanel.displayName = 'SidePanel';

export default connect(mapStateToProps, mapDispatchToProps)(SidePanel);
