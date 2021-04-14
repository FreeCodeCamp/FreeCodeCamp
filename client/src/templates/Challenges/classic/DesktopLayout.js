import { first } from 'lodash';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { ReflexContainer, ReflexSplitter, ReflexElement } from 'react-reflex';
import envData from '../../../../../config/env.json';
import ActionRow from './ActionRow';
import EditorTabs from './EditorTabs';

const { showUpcomingChanges } = envData;

const propTypes = {
  challengeFiles: PropTypes.object,
  editor: PropTypes.element,
  hasEditableBoundries: PropTypes.bool,
  hasPreview: PropTypes.bool,
  instructions: PropTypes.element,
  preview: PropTypes.element,
  resizeProps: PropTypes.shape({
    onStopResize: PropTypes.func,
    onResize: PropTypes.func
  }),
  testOutput: PropTypes.element
};

const reflexProps = {
  propagateDimensions: true,
  renderOnResize: true,
  renderOnResizeRate: 20
};

class DesktopLayout extends Component {
  constructor(props) {
    super(props);
    this.state = { showNotes: false, showPreview: true, showConsole: false };
    this.switchDisplayTab = this.switchDisplayTab.bind(this);
  }

  switchDisplayTab(displayTab) {
    this.setState(state => {
      return {
        [displayTab]: !state[displayTab]
      };
    });
  }

  getChallengeFile() {
    const { challengeFiles } = this.props;
    return first(Object.keys(challengeFiles).map(key => challengeFiles[key]));
  }

  render() {
    const {
      resizeProps,
      instructions,
      editor,
      testOutput,
      hasPreview,
      preview,
      hasEditableBoundries
    } = this.props;

    const { showPreview, showConsole } = this.state;

    const challengeFile = this.getChallengeFile();
    const projectBasedChallenge = showUpcomingChanges && hasEditableBoundries;
    const isPreviewDisplayable = projectBasedChallenge
      ? showPreview && hasPreview
      : hasPreview;
    const isConsoleDisplayable = projectBasedChallenge ? showConsole : true;

    return (
      <Fragment>
        {projectBasedChallenge && (
          <ActionRow switchDisplayTab={this.switchDisplayTab} {...this.state} />
        )}
        <ReflexContainer className='desktop-layout' orientation='vertical'>
          {!projectBasedChallenge && (
            <ReflexElement flex={1} {...resizeProps}>
              {instructions}
            </ReflexElement>
          )}
          {!projectBasedChallenge && (
            <ReflexSplitter propagate={true} {...resizeProps} />
          )}

          <ReflexElement flex={1} {...resizeProps}>
            {challengeFile && (
              <ReflexContainer key={challengeFile.key} orientation='horizontal'>
                <ReflexElement flex={1} {...reflexProps} {...resizeProps}>
                  {
                    <Fragment>
                      {showUpcomingChanges && !hasEditableBoundries && (
                        <EditorTabs />
                      )}
                      {editor}
                    </Fragment>
                  }
                </ReflexElement>
                {isConsoleDisplayable && (
                  <ReflexSplitter propagate={true} {...resizeProps} />
                )}
                {isConsoleDisplayable && (
                  <ReflexElement flex={0.25} {...reflexProps} {...resizeProps}>
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
            <ReflexElement flex={0.7} {...resizeProps}>
              {preview}
            </ReflexElement>
          )}
        </ReflexContainer>
      </Fragment>
    );
  }
}

DesktopLayout.displayName = 'DesktopLayout';
DesktopLayout.propTypes = propTypes;

export default DesktopLayout;
