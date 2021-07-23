// Package Utilities
import React, { Component } from 'react';
import { Button, Grid, Col, Row } from '@freecodecamp/react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import { createSelector } from 'reselect';
import { ObserveKeys } from 'react-hotkeys';
import { TFunction, withTranslation } from 'react-i18next';
import type { Dispatch } from 'redux';

// Local Utilities
import PrismFormatted from '../components/prism-formatted';
import {
  ChallengeNodeType,
  ChallengeMetaType
} from '../../../redux/prop-types';
import LearnLayout from '../../../components/layouts/learn';
import ChallengeTitle from '../components/challenge-title';
import ChallengeDescription from '../components/Challenge-Description';
import Spacer from '../../../components/helpers/spacer';
import CompletionModal from '../components/completion-modal';
import Hotkeys from '../components/Hotkeys';
import Loader from '../../../components/helpers/loader';
import {
  isChallengeCompletedSelector,
  challengeMounted,
  updateChallengeMeta,
  openModal,
  updateSolutionFormValues
} from '../redux';

import VideoPlayer from '../components/VideoPlayer';

// Styles
import './show.css';

// Redux Setup
const mapStateToProps = createSelector(
  isChallengeCompletedSelector,
  (isChallengeCompleted: boolean) => ({
    isChallengeCompleted
  })
);
const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      updateChallengeMeta,
      challengeMounted,
      updateSolutionFormValues,
      openCompletionModal: () => openModal('completion')
    },
    dispatch
  );

// Types
interface ShowVideoProps {
  challengeMounted: (arg0: string) => void;
  data: { challengeNode: ChallengeNodeType };
  description: string;
  isChallengeCompleted: boolean;
  openCompletionModal: () => void;
  pageContext: {
    challengeMeta: ChallengeMetaType;
  };
  t: TFunction;
  updateChallengeMeta: (arg0: ChallengeMetaType) => void;
  updateSolutionFormValues: () => void;
}

interface ShowVideoState {
  subtitles: string;
  downloadURL: string | null;
  selectedOption: number | null;
  answer: number;
  showWrong: boolean;
  videoIsLoaded: boolean;
}

// Component
class ShowVideo extends Component<ShowVideoProps, ShowVideoState> {
  static displayName: string;
  private _container: HTMLElement | null | undefined;

  constructor(props: ShowVideoProps) {
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

  componentDidMount(): void {
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
  }

  componentDidUpdate(prevProps: ShowVideoProps): void {
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

  handleSubmit(solution: number, openCompletionModal: () => void) {
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

  handleOptionChange = (
    changeEvent: React.ChangeEvent<HTMLInputElement>
  ): void => {
    this.setState({
      showWrong: false,
      selectedOption: parseInt(changeEvent.target.value, 10)
    });
  };

  onVideoLoad = () => {
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
          videoLocaleIds,
          bilibiliIds,
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
                  <VideoPlayer
                    bilibiliIds={bilibiliIds}
                    onVideoLoad={this.onVideoLoad}
                    title={title}
                    videoId={videoId}
                    videoIsLoaded={this.state.videoIsLoaded}
                    videoLocaleIds={videoLocaleIds}
                  />
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

ShowVideo.displayName = 'ShowVideo';

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(ShowVideo));

export const query = graphql`
  query VideoChallenge($slug: String!) {
    challengeNode(fields: { slug: { eq: $slug } }) {
      videoId
      videoLocaleIds {
        espanol
        italian
        portuguese
      }
      bilibiliIds {
        aid
        bvid
        cid
      }
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
