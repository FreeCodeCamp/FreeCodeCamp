/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// Package Utilities
import React, { Component } from 'react';
import { Grid, Col, Row } from '@freecodecamp/react-bootstrap';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import { withTranslation } from 'react-i18next';

// Local Utilities
import {
  executeChallenge,
  challengeMounted,
  challengeTestsSelector,
  consoleOutputSelector,
  initConsole,
  initTests,
  isChallengeCompletedSelector,
  updateChallengeMeta,
  updateSolutionFormValues
} from '../../redux';
import { getGuideUrl } from '../../utils';
import LearnLayout from '../../../../components/layouts/learn';
import ChallengeTitle from '../../components/challenge-title';
import ChallengeDescription from '../../components/Challenge-Description';
import TestSuite from '../../components/Test-Suite';
import Output from '../../components/output';
import CompletionModal from '../../components/completion-modal';
import HelpModal from '../../components/help-modal';
import ProjectToolPanel from '../tool-panel';
import SolutionForm from '../solution-form';
import Spacer from '../../../../components/helpers/spacer';
import {
  ChallengeNodeType,
  ChallengeMetaType,
  TestType
} from '../../../../redux/prop-types';
import { isSignedInSelector } from '../../../../redux';
import Hotkeys from '../../components/Hotkeys';

// Styles
import '../../components/test-frame.css';

// Redux Setup
const mapStateToProps = createSelector(
  consoleOutputSelector,
  challengeTestsSelector,
  isChallengeCompletedSelector,
  isSignedInSelector,
  (
    output: string[],
    tests: TestType[],
    isChallengeCompleted: boolean,
    isSignedIn: boolean
  ) => ({
    tests,
    output,
    isChallengeCompleted,
    isSignedIn
  })
);

const mapDispatchToActions = {
  challengeMounted,
  executeChallenge,
  initConsole,
  initTests,
  updateChallengeMeta,
  updateSolutionFormValues
};

// Types
interface BackEndProps {
  challengeMounted: (arg0: string) => void;
  data: { challengeNode: ChallengeNodeType };
  description: string;
  executeChallenge: (arg0: boolean) => void;
  forumTopicId: number;
  id: string;
  initConsole: () => void;
  initTests: (tests: TestType[]) => void;
  isChallengeCompleted: boolean;
  isSignedIn: boolean;
  output: string[];
  pageContext: {
    challengeMeta: ChallengeMetaType;
  };
  t: (arg0: string) => string;
  tests: TestType[];
  title: string;
  updateChallengeMeta: (arg0: ChallengeMetaType) => void;
  updateSolutionFormValues: () => void;
}

// Component
class BackEnd extends Component<BackEndProps> {
  static displayName: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _container: any;
  constructor(props: BackEndProps) {
    super(props);
    this.state = {};
    this.updateDimensions = this.updateDimensions.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.initializeComponent();
    window.addEventListener('resize', () => this.updateDimensions());
    this._container.focus();
  }

  updateDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', () => this.updateDimensions());
  }

  componentDidUpdate(prevProps: BackEndProps) {
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
      this.initializeComponent();
    }
  }

  initializeComponent() {
    const {
      challengeMounted,
      initConsole,
      initTests,
      updateChallengeMeta,
      data: {
        challengeNode: {
          fields: { tests },
          title,
          challengeType,
          helpCategory
        }
      },
      pageContext: { challengeMeta }
    } = this.props;
    initConsole();
    initTests(tests);
    updateChallengeMeta({
      ...challengeMeta,
      title,
      challengeType,
      helpCategory
    });
    challengeMounted(challengeMeta.id);
  }

  handleSubmit({
    isShouldCompletionModalOpen
  }: {
    isShouldCompletionModalOpen: boolean;
  }): void {
    this.props.executeChallenge(isShouldCompletionModalOpen);
  }

  render() {
    const {
      data: {
        challengeNode: {
          fields: { blockName },
          challengeType,
          forumTopicId,
          title,
          description,
          instructions,
          translationPending,
          superBlock,
          block
        }
      },
      isChallengeCompleted,
      output,
      pageContext: {
        challengeMeta: { nextChallengePath, prevChallengePath }
      },
      t,
      tests,
      updateSolutionFormValues
    } = this.props;

    const blockNameTitle = `${blockName} - ${title}`;

    return (
      <Hotkeys
        innerRef={(c: HTMLElement | null) => (this._container = c)}
        nextChallengePath={nextChallengePath}
        prevChallengePath={prevChallengePath}
      >
        <LearnLayout>
          <Helmet
            title={`${blockNameTitle} | ${t('learn.learn')} | freeCodeCamp.org`}
          />
          <Grid>
            <Row>
              <Col md={8} mdOffset={2} sm={10} smOffset={1} xs={12}>
                {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                {/* @ts-ignore */}
                <Spacer />
                <ChallengeTitle
                  block={block}
                  isCompleted={isChallengeCompleted}
                  superBlock={superBlock}
                  translationPending={translationPending}
                >
                  {title}
                </ChallengeTitle>
                <ChallengeDescription
                  description={description}
                  instructions={instructions}
                />
                <SolutionForm
                  challengeType={challengeType}
                  // eslint-disable-next-line @typescript-eslint/unbound-method
                  onSubmit={this.handleSubmit}
                  updateSolutionForm={updateSolutionFormValues}
                />
                <ProjectToolPanel
                  guideUrl={getGuideUrl({ forumTopicId, title })}
                />
                <br />
                <Output
                  defaultOutput={`/**
*
* ${t('learn.test-output')}
*
*
*/`}
                  output={output}
                />
                <TestSuite tests={tests} />
                {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                {/* @ts-ignore */}
                <Spacer />
              </Col>
              <CompletionModal
                block={block}
                blockName={blockName}
                superBlock={superBlock}
              />
              <HelpModal />
            </Row>
          </Grid>
        </LearnLayout>
      </Hotkeys>
    );
  }
}

BackEnd.displayName = 'BackEnd';

export default connect(
  mapStateToProps,
  mapDispatchToActions
)(withTranslation()(BackEnd));

export const query = graphql`
  query BackendChallenge($slug: String!) {
    challengeNode(fields: { slug: { eq: $slug } }) {
      forumTopicId
      title
      description
      instructions
      challengeType
      helpCategory
      superBlock
      block
      translationPending
      fields {
        blockName
        slug
        tests {
          text
          testString
        }
      }
    }
  }
`;
