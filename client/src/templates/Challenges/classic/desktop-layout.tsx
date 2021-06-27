import React, { useState, Fragment, ReactElement } from 'react';
import { ReflexContainer, ReflexSplitter, ReflexElement } from 'react-reflex';
import { first } from 'lodash-es';
import EditorTabs from './EditorTabs';
import ActionRow from './ActionRow';
import envData from '../../../../../config/env.json';
import { ChallengeFileType } from '../../../redux/prop-types';

const { showUpcomingChanges } = envData;

type Pane = { flex: number };

interface DesktopLayoutProps {
  challengeFiles: ChallengeFileType[];
  editor: ReactElement;
  hasEditableBoundaries: boolean;
  hasPreview: boolean;
  instructions: ReactElement;
  layoutState: {
    codePane: Pane;
    editorPane: Pane;
    instructionPane: Pane;
    previewPane: Pane;
    testsPane: Pane;
  };
  preview: ReactElement;
  resizeProps: {
    onStopResize: () => void;
    onResize: () => void;
  };
  testOutput: ReactElement;
}

const reflexProps = {
  propagateDimensions: true,
  renderOnResize: true,
  renderOnResizeRate: 20
};

const DesktopLayout = (props: DesktopLayoutProps): JSX.Element => {
  // TODO: What is the point of this state?
  // const [showNotes, setShowNotes] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const [showConsole, setShowConsole] = useState(false);

  const switchDisplayTab = (displayTab: string): void => {
    switch (displayTab) {
      case 'showPreview':
        setShowPreview(!showPreview);
        break;
      case 'showConsole':
        setShowConsole(!showConsole);
        break;
      default:
        setShowConsole(false);
        setShowPreview(false);
    }
  };

  const getChallengeFile = () => {
    const { challengeFiles } = props;
    // TODO: part of challengeFiles becoming an array
    return first(challengeFiles);
  };

  const {
    resizeProps,
    instructions,
    editor,
    testOutput,
    hasPreview,
    layoutState,
    preview,
    hasEditableBoundaries
  } = props;

  const challengeFile = getChallengeFile();
  const projectBasedChallenge = showUpcomingChanges && hasEditableBoundaries;
  const isPreviewDisplayable = projectBasedChallenge
    ? showPreview && hasPreview
    : hasPreview;
  const isConsoleDisplayable = projectBasedChallenge ? showConsole : true;
  const { codePane, editorPane, instructionPane, previewPane, testsPane } =
    layoutState;

  return (
    <Fragment>
      <ReflexContainer className='desktop-layout' orientation='horizontal'>
        {projectBasedChallenge && (
          <ActionRow
            showConsole={showConsole}
            showPreview={showPreview}
            switchDisplayTab={switchDisplayTab}
          />
        )}
        <ReflexElement flex={8} {...reflexProps} {...resizeProps}>
          <ReflexContainer orientation='vertical'>
            {!projectBasedChallenge && (
              <ReflexElement flex={instructionPane.flex} {...resizeProps}>
                {instructions}
              </ReflexElement>
            )}
            {!projectBasedChallenge && (
              <ReflexSplitter propagate={true} {...resizeProps} />
            )}

            <ReflexElement flex={editorPane.flex} {...resizeProps}>
              {challengeFile &&
                showUpcomingChanges &&
                !hasEditableBoundaries && <EditorTabs />}
              {challengeFile && (
                <ReflexContainer
                  key={challengeFile.fileKey}
                  orientation='horizontal'
                >
                  <ReflexElement
                    flex={codePane.flex}
                    {...reflexProps}
                    {...resizeProps}
                  >
                    <Fragment>{editor}</Fragment>
                  </ReflexElement>
                  {isConsoleDisplayable && (
                    <ReflexSplitter propagate={true} {...resizeProps} />
                  )}
                  {isConsoleDisplayable && (
                    <ReflexElement
                      flex={testsPane.flex}
                      {...reflexProps}
                      {...resizeProps}
                    >
                      {testOutput}
                    </ReflexElement>
                  )}
                </ReflexContainer>
              )}
            </ReflexElement>
            {isPreviewDisplayable && (
              <ReflexSplitter propagate={true} {...resizeProps} />
            )}
            {isPreviewDisplayable && (
              <ReflexElement flex={previewPane.flex} {...resizeProps}>
                {preview}
              </ReflexElement>
            )}
          </ReflexContainer>
        </ReflexElement>
      </ReflexContainer>
    </Fragment>
  );
};

DesktopLayout.displayName = 'DesktopLayout';

export default DesktopLayout;
