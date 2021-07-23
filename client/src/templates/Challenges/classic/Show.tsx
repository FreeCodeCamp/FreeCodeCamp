// Package Utilities
import React, { Component } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import Media from 'react-responsive';
import { TFunction, withTranslation } from 'react-i18next';

// Local Utilities
import LearnLayout from '../../../components/layouts/learn';
import MultifileEditor from './MultifileEditor';
import Preview from '../components/Preview';
import SidePanel from '../components/Side-Panel';
import Output from '../components/output';
import CompletionModal from '../components/completion-modal';
import HelpModal from '../components/HelpModal';
import VideoModal from '../components/VideoModal';
import ResetModal from '../components/ResetModal';
import MobileLayout from './MobileLayout';
import DesktopLayout from './DesktopLayout';
import Hotkeys from '../components/Hotkeys';
import { getGuideUrl } from '../utils';
import store from 'store';
import { challengeTypes } from '../../../../utils/challengeTypes';
import { isContained } from '../../../utils/is-contained';
import {
  ChallengeNodeType,
  ChallengeFile,
  ChallengeMetaType,
  Tests,
  ResizePropsType
} from '../../../redux/prop-types';
import {
  createFiles,
  challengeFilesSelector,
  challengeTestsSelector,
  initConsole,
  initTests,
  updateChallengeMeta,
  challengeMounted,
  consoleOutputSelector,
  executeChallenge,
  cancelTests
} from '../redux';

// Styles
import './classic.css';
import '../components/test-frame.css';

// Redux Setup
const mapStateToProps = createStructuredSelector({
  challengeFiles: challengeFilesSelector,
  tests: challengeTestsSelector,
  output: consoleOutputSelector
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      createFiles,
      initConsole,
      initTests,
      updateChallengeMeta,
      challengeMounted,
      executeChallenge,
      cancelTests
    },
    dispatch
  );

// Types
interface ShowClassicProps {
  cancelTests: () => void;
  challengeMounted: (arg0: string) => void;
  createFiles: (arg0: ChallengeFile[]) => void;
  data: { challengeNode: ChallengeNodeType };
  executeChallenge: () => void;
  challengeFiles: ChallengeFile[];
  initConsole: (arg0: string) => void;
  initTests: (tests: Tests[]) => void;
  output: string[];
  pageContext: {
    challengeMeta: ChallengeMetaType;
  };
  t: TFunction;
  tests: Tests[];
  updateChallengeMeta: (arg0: ChallengeMetaType) => void;
}

interface ShowClassicState {
  resizing: boolean;
}

interface ReflexLayout {
  codePane: { flex: number };
  editorPane: { flex: number };
  instructionPane: { flex: number };
  previewPane: { flex: number };
  testsPane: { flex: number };
}

const MAX_MOBILE_WIDTH = 767;
const REFLEX_LAYOUT = 'challenge-layout';
const BASE_LAYOUT = {
  codePane: { flex: 1 },
  editorPane: { flex: 1 },
  instructionPane: { flex: 1 },
  previewPane: { flex: 0.7 },
  testsPane: { flex: 0.25 }
};

// Component
class ShowClassic extends Component<ShowClassicProps, ShowClassicState> {
  static displayName: string;
  containerRef: React.RefObject<unknown>;
  editorRef: React.RefObject<unknown>;
  instructionsPanelRef: React.RefObject<HTMLElement>;
  resizeProps: ResizePropsType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  layoutState: any;

  constructor(props: ShowClassicProps) {
    super(props);

    this.resizeProps = {
      onStopResize: this.onStopResize.bind(this),
      onResize: this.onResize.bind(this)
    };

    this.state = {
      resizing: false
    };

    this.containerRef = React.createRef();
    this.editorRef = React.createRef();
    this.instructionsPanelRef = React.createRef();
    // Holds the information of the panes sizes for desktop view
    this.layoutState = this.getLayoutState();
  }

  getLayoutState(): ReflexLayout | string {
    // eslint-disable-next-line
    const reflexLayout: ReflexLayout | string = store.get(REFLEX_LAYOUT);

    // Validate if user has not done any resize of the panes
    if (!reflexLayout) return BASE_LAYOUT;

    // Check that the layout values stored are valid (exist in base layout). If
    // not valid, it will fallback to the base layout values and be set on next
    // user resize.
    const isValidLayout = isContained(
      Object.keys(BASE_LAYOUT),
      Object.keys(reflexLayout)
    );

    return isValidLayout ? reflexLayout : BASE_LAYOUT;
  }

  onResize() {
    this.setState({ resizing: true });
  }

  onStopResize(event: unknown) {
    /* eslint-disable */
    // @ts-expect-error TODO: typing
    const { name, flex } = event.component.props;

    this.setState({ resizing: false });

    // Only interested in tracking layout updates for ReflexElement's
    if (!name) {
      return;
    }

    this.layoutState[name].flex = flex;

    store.set(REFLEX_LAYOUT, this.layoutState);
    /* eslint-enable */
  }

  componentDidMount() {
    const {
      data: {
        challengeNode: { title }
      }
    } = this.props;
    this.initializeComponent(title);
  }

  componentDidUpdate(prevProps: ShowClassicProps) {
    const {
      data: {
        challengeNode: {
          title: prevTitle,
          fields: { tests: prevTests }
        }
      }
    } = prevProps;
    const {
      data: {
        challengeNode: {
          title: currentTitle,
          fields: { tests: currTests }
        }
      }
    } = this.props;
    if (prevTitle !== currentTitle || prevTests !== currTests) {
      this.initializeComponent(currentTitle);
    }
  }

  initializeComponent(title: string) {
    const {
      challengeMounted,
      createFiles,
      initConsole,
      initTests,
      updateChallengeMeta,
      data: {
        challengeNode: {
          challengeFiles,
          fields: { tests },
          challengeType,
          removeComments,
          helpCategory
        }
      },
      pageContext: { challengeMeta }
    } = this.props;
    initConsole('');
    createFiles(challengeFiles ?? []);
    initTests(tests);
    updateChallengeMeta({
      ...challengeMeta,
      title,
      removeComments: removeComments !== false,
      challengeType,
      helpCategory
    });
    challengeMounted(challengeMeta.id);
  }

  componentWillUnmount() {
    const { createFiles, cancelTests } = this.props;
    createFiles([]);
    cancelTests();
  }

  getChallenge = () => this.props.data.challengeNode;

  getBlockNameTitle() {
    const {
      fields: { blockName },
      title
    } = this.getChallenge();
    return `${blockName}: ${title}`;
  }

  getVideoUrl = () => this.getChallenge().videoUrl;

  hasPreview() {
    const { challengeType } = this.getChallenge();
    return (
      challengeType === challengeTypes.html ||
      challengeType === challengeTypes.modern
    );
  }

  renderInstructionsPanel({ showToolPanel }: { showToolPanel: boolean }) {
    const { block, description, instructions, superBlock, translationPending } =
      this.getChallenge();

    const { forumTopicId, title } = this.getChallenge();
    return (
      <SidePanel
        block={block}
        className='full-height'
        description={description}
        guideUrl={getGuideUrl({ forumTopicId, title })}
        instructions={instructions}
        instructionsPanelRef={this.instructionsPanelRef}
        showToolPanel={showToolPanel}
        superBlock={superBlock}
        title={title}
        translationPending={translationPending}
        videoUrl={this.getVideoUrl()}
      />
    );
  }

  renderEditor() {
    const { challengeFiles } = this.props;
    const { description } = this.getChallenge();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return (
      challengeFiles && (
        <MultifileEditor
          challengeFiles={challengeFiles}
          containerRef={this.containerRef}
          description={description}
          editorRef={this.editorRef}
          hasEditableBoundries={this.hasEditableBoundries()}
          resizeProps={this.resizeProps}
        />
      )
    );
  }

  renderTestOutput() {
    const { output, t } = this.props;
    return (
      <Output
        defaultOutput={`
/**
* ${t('learn.test-output')}
*/
`}
        output={output}
      />
    );
  }

  renderPreview() {
    return (
      <Preview className='full-height' disableIframe={this.state.resizing} />
    );
  }

  hasEditableBoundries() {
    const { challengeFiles } = this.props;
    return (
      challengeFiles?.some(
        challengeFile => challengeFile?.editableRegionBoundaries?.length === 2
      ) ?? false
    );
  }

  render() {
    const {
      block,
      fields: { blockName },
      forumTopicId,
      superBlock,
      title
    } = this.getChallenge();
    const {
      executeChallenge,
      pageContext: {
        challengeMeta: { nextChallengePath, prevChallengePath }
      },
      challengeFiles,
      t
    } = this.props;

    return (
      <Hotkeys
        editorRef={this.editorRef}
        executeChallenge={executeChallenge}
        innerRef={this.containerRef}
        instructionsPanelRef={this.instructionsPanelRef}
        nextChallengePath={nextChallengePath}
        prevChallengePath={prevChallengePath}
      >
        <LearnLayout>
          <Helmet
            title={`${t(
              'learn.learn'
            )} ${this.getBlockNameTitle()} | freeCodeCamp.org`}
          />
          <Media maxWidth={MAX_MOBILE_WIDTH}>
            <MobileLayout
              editor={this.renderEditor()}
              guideUrl={getGuideUrl({ forumTopicId, title })}
              hasPreview={this.hasPreview()}
              instructions={this.renderInstructionsPanel({
                showToolPanel: false
              })}
              preview={this.renderPreview()}
              testOutput={this.renderTestOutput()}
              videoUrl={this.getVideoUrl()}
            />
          </Media>
          <Media minWidth={MAX_MOBILE_WIDTH + 1}>
            <DesktopLayout
              challengeFiles={challengeFiles}
              editor={this.renderEditor()}
              hasEditableBoundries={this.hasEditableBoundries()}
              hasPreview={this.hasPreview()}
              instructions={this.renderInstructionsPanel({
                showToolPanel: true
              })}
              // eslint-disable-next-line
              layoutState={this.layoutState}
              preview={this.renderPreview()}
              resizeProps={this.resizeProps}
              testOutput={this.renderTestOutput()}
            />
          </Media>
          <CompletionModal
            block={block}
            blockName={blockName}
            superBlock={superBlock}
          />
          <HelpModal />
          <VideoModal videoUrl={this.getVideoUrl()} />
          <ResetModal />
        </LearnLayout>
      </Hotkeys>
    );
  }
}

ShowClassic.displayName = 'ShowClassic';

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(ShowClassic));

// TODO: handle jsx (not sure why it doesn't get an editableRegion) EDIT:
// probably because the dummy challenge didn't include it, so Gatsby couldn't
// infer it.
export const query = graphql`
  query ClassicChallenge($slug: String!) {
    challengeNode(fields: { slug: { eq: $slug } }) {
      block
      title
      description
      instructions
      removeComments
      challengeType
      helpCategory
      videoUrl
      superBlock
      translationPending
      forumTopicId
      fields {
        blockName
        slug
        tests {
          text
          testString
        }
      }
      required {
        link
        src
      }
      challengeFiles {
        fileKey
        ext
        name
        contents
        head
        tail
        editableRegionBoundaries
      }
    }
  }
`;
