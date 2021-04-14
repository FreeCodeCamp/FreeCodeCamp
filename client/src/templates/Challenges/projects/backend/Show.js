import { Grid, Col, Row } from '@freecodecamp/react-bootstrap';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import Spacer from '../../../../components/helpers/Spacer';
import LearnLayout from '../../../../components/layouts/Learn';
import { isSignedInSelector } from '../../../../redux';
import { ChallengeNode } from '../../../../redux/propTypes';
import ChallengeDescription from '../../components/Challenge-Description';
import ChallengeTitle from '../../components/Challenge-Title';
import CompletionModal from '../../components/CompletionModal';
import HelpModal from '../../components/HelpModal';
import Hotkeys from '../../components/Hotkeys';
import Output from '../../components/Output';
import TestSuite from '../../components/Test-Suite';
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
import SolutionForm from '../SolutionForm';
import ProjectToolPanel from '../Tool-Panel';

import '../../components/test-frame.css';

const propTypes = {
  challengeMounted: PropTypes.func.isRequired,
  data: PropTypes.shape({
    challengeNode: ChallengeNode
  }),
  description: PropTypes.string,
  executeChallenge: PropTypes.func.isRequired,
  forumTopicId: PropTypes.number,
  id: PropTypes.string,
  initConsole: PropTypes.func.isRequired,
  initTests: PropTypes.func.isRequired,
  isChallengeCompleted: PropTypes.bool,
  isSignedIn: PropTypes.bool,
  output: PropTypes.arrayOf(PropTypes.string),
  pageContext: PropTypes.shape({
    challengeMeta: PropTypes.object
  }),
  t: PropTypes.func.isRequired,
  tests: PropTypes.array,
  title: PropTypes.string,
  updateChallengeMeta: PropTypes.func.isRequired,
  updateSolutionFormValues: PropTypes.func.isRequired
};

const mapStateToProps = createSelector(
  consoleOutputSelector,
  challengeTestsSelector,
  isChallengeCompletedSelector,
  isSignedInSelector,
  (output, tests, isChallengeCompleted, isSignedIn) => ({
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

class BackEnd extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.updateDimensions = this.updateDimensions.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.initializeComponent();
    window.addEventListener('resize', this.updateDimensions);
    this._container.focus();
  }

  updateDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  componentDidUpdate(prevProps) {
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

  handleSubmit({ isShouldCompletionModalOpen }) {
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
        innerRef={c => (this._container = c)}
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
                  dimensions={this.state}
                  height={150}
                  output={output}
                />
                <TestSuite tests={tests} />
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
BackEnd.propTypes = propTypes;

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
