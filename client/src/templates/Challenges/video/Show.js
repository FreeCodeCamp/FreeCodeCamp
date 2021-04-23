// Package Utilities
import { Button, Grid, Col, Row } from '@freecodecamp/react-bootstrap';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { ObserveKeys } from 'react-hotkeys';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import YouTube from 'react-youtube';
import { bindActionCreators } from 'redux';
import { createSelector } from 'reselect';

// Local Utilities
import Loader from '../../../components/helpers/Loader';
import Spacer from '../../../components/helpers/Spacer';
import LearnLayout from '../../../components/layouts/Learn';
import { ChallengeNode } from '../../../redux/propTypes';
import ChallengeDescription from '../components/Challenge-Description';
import ChallengeTitle from '../components/Challenge-Title';
import CompletionModal from '../components/CompletionModal';
import Hotkeys from '../components/Hotkeys';
import PrismFormatted from '../components/PrismFormatted';
import {
  isChallengeCompletedSelector,
  challengeMounted,
  updateChallengeMeta,
  openModal,
  updateSolutionFormValues
} from '../redux';

// Styles
import './show.css';

// Redux Setup
const mapStateToProps = createSelector(
  isChallengeCompletedSelector,
  isChallengeCompleted => ({
    isChallengeCompleted
  })
);
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      updateChallengeMeta,
      challengeMounted,
      updateSolutionFormValues,
      openCompletionModal: () => openModal('completion')
    },
    dispatch
  );

// Proptypes
const propTypes = {
  challengeMounted: PropTypes.func.isRequired,
  data: PropTypes.shape({
    challengeNode: ChallengeNode
  }),
  description: PropTypes.string,
  isChallengeCompleted: PropTypes.bool,
  openCompletionModal: PropTypes.func.isRequired,
  pageContext: PropTypes.shape({
    challengeMeta: PropTypes.object
  }),
  t: PropTypes.func.isRequired,
  updateChallengeMeta: PropTypes.func.isRequired,
  updateSolutionFormValues: PropTypes.func.isRequired
};

// Component
class Project extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subtitles: '',
      downloadURL: null,
      selectedOption: null,
      answer: 1,
      showWrong: false,
      videoIsLoaded: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const {
      challengeMounted,
      data: {
        challengeNode: { title, challengeType, helpCategory }
      },
      pageContext: { challengeMeta },
      updateChallengeMeta
    } = this.props;
    updateChallengeMeta({
      ...challengeMeta,
      title,
      challengeType,
      helpCategory
    });
    challengeMounted(challengeMeta.id);
    this._container.focus();
  }

  componentDidUpdate(prevProps) {
    const {
      data: {
        challengeNode: { title: prevTitle }
      }
    } = prevProps;
    const {
      challengeMounted,
      data: {
        challengeNode: { title: currentTitle, challengeType, helpCategory }
      },
      pageContext: { challengeMeta },
      updateChallengeMeta
    } = this.props;
    if (prevTitle !== currentTitle) {
      updateChallengeMeta({
        ...challengeMeta,
        title: currentTitle,
        challengeType,
        helpCategory
      });
      challengeMounted(challengeMeta.id);
    }
  }

  handleSubmit(solution, openCompletionModal) {
    if (solution - 1 === this.state.selectedOption) {
      this.setState({
        showWrong: false
      });
      openCompletionModal();
    } else {
      this.setState({
        showWrong: true
      });
    }
  }

  handleOptionChange = changeEvent => {
    this.setState({
      showWrong: false,
      selectedOption: parseInt(changeEvent.target.value, 10)
    });
  };

  videoIsReady = () => {
    this.setState({
      videoIsLoaded: true
    });
  };

  render() {
    const {
      data: {
        challengeNode: {
          fields: { blockName },
          title,
          description,
          superBlock,
          block,
          translationPending,
          videoId,
          question: { text, answers, solution }
        }
      },
      openCompletionModal,
      pageContext: {
        challengeMeta: { nextChallengePath, prevChallengePath }
      },
      t,
      isChallengeCompleted
    } = this.props;

    const blockNameTitle = `${blockName} - ${title}`;
    return (
      <Hotkeys
        executeChallenge={() => {
          this.handleSubmit(solution, openCompletionModal);
        }}
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
              <Spacer />
              <ChallengeTitle
                block={block}
                isCompleted={isChallengeCompleted}
                superBlock={superBlock}
                translationPending={translationPending}
              >
                {title}
              </ChallengeTitle>

              <Col lg={10} lgOffset={1} md={10} mdOffset={1}>
                <div className='video-wrapper'>
                  {!this.state.videoIsLoaded ? (
                    <div className='video-placeholder-loader'>
                      <Loader />
                    </div>
                  ) : null}
                  <YouTube
                    className={
                      this.state.videoIsLoaded
                        ? 'display-youtube-video'
                        : 'hide-youtube-video'
                    }
                    onReady={this.videoIsReady}
                    opts={{
                      playerVars: {
                        rel: 0
                      },
                      width: 'auto',
                      height: 'auto'
                    }}
                    videoId={videoId}
                  />
                  <i>
                    <a
                      href={
                        'https://www.youtube.com/timedtext_editor?action_mde_edit_form=1&v=' +
                        videoId +
                        '&lang=en&bl=watch&ui=hd&ref=wt&tab=captions'
                      }
                      rel='noopener noreferrer'
                      target='_blank'
                    >
                      {t('learn.add-subtitles')}
                    </a>
                    .
                  </i>
                </div>
              </Col>
              <Col md={8} mdOffset={2} sm={10} smOffset={1} xs={12}>
                <ChallengeDescription description={description} />
                <PrismFormatted className={'line-numbers'} text={text} />
                <Spacer />
                <ObserveKeys>
                  <div className='video-quiz-options'>
                    {answers.map((option, index) => (
                      // answers are static and have no natural id property, so
                      // index should be fine as a key:
                      <label className='video-quiz-option-label' key={index}>
                        <input
                          aria-label={t('aria.answer')}
                          checked={this.state.selectedOption === index}
                          className='video-quiz-input-hidden'
                          name='quiz'
                          onChange={this.handleOptionChange}
                          type='radio'
                          value={index}
                        />{' '}
                        <span className='video-quiz-input-visible'>
                          {this.state.selectedOption === index ? (
                            <span className='video-quiz-selected-input' />
                          ) : null}
                        </span>
                        <PrismFormatted
                          className={'video-quiz-option'}
                          text={option}
                        />
                      </label>
                    ))}
                  </div>
                </ObserveKeys>
                <Spacer />
                <div
                  style={{
                    textAlign: 'center'
                  }}
                >
                  {this.state.showWrong ? (
                    <span>{t('learn.wrong-answer')}</span>
                  ) : (
                    <span>{t('learn.check-answer')}</span>
                  )}
                </div>
                <Spacer />
                <Button
                  block={true}
                  bsSize='large'
                  bsStyle='primary'
                  onClick={() =>
                    this.handleSubmit(solution, openCompletionModal)
                  }
                >
                  {t('buttons.check-answer')}
                </Button>
                <Spacer size={2} />
              </Col>
              <CompletionModal
                block={block}
                blockName={blockName}
                superBlock={superBlock}
              />
            </Row>
          </Grid>
        </LearnLayout>
      </Hotkeys>
    );
  }
}

Project.displayName = 'Project';
Project.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(Project));

export const query = graphql`
  query VideoChallenge($slug: String!) {
    challengeNode(fields: { slug: { eq: $slug } }) {
      videoId
      title
      description
      challengeType
      helpCategory
      superBlock
      block
      fields {
        blockName
        slug
      }
      question {
        text
        answers
        solution
      }
      translationPending
    }
  }
`;
