import BezierEasing from 'bezier-easing';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { withTranslation } from 'react-i18next';
import GreenPass from '../../../assets/icons/GreenPass';

const propTypes = {
  block: PropTypes.string,
  completedPercent: PropTypes.number,
  superBlock: PropTypes.string,
  t: PropTypes.func.isRequired
};

export class CompletionModalBody extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      progressInterval: null,
      shownPercent: 0
    };

    this.animateProgressBar = this.animateProgressBar.bind(this);
  }

  animateProgressBar(completedPercent) {
    const easing = BezierEasing(0.2, 0.5, 0.4, 1);

    if (completedPercent > 100) completedPercent = 100;
    if (completedPercent < 0) completedPercent = 0;

    const transitionLength = completedPercent * 10 + 750;
    const intervalLength = 10;
    const intervalsToFinish = transitionLength / intervalLength;
    const amountPerInterval = completedPercent / intervalsToFinish;
    let percent = 0;

    const myInterval = setInterval(() => {
      percent += amountPerInterval;

      if (percent > completedPercent) percent = completedPercent;

      this.setState({
        shownPercent: Math.round(
          completedPercent * easing(percent / completedPercent)
        )
      });

      if (percent >= completedPercent) clearInterval(myInterval);
    }, intervalLength);

    this.setState({
      progressInterval: myInterval
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.progressInterval);
  }

  render() {
    const { block, completedPercent, superBlock, t } = this.props;
    const blockTitle = t(`intro:${superBlock}.blocks.${block}.title`);

    return (
      <>
        <div className='completion-challenge-details'>
          <GreenPass
            className='completion-success-icon'
            onAnimationEnd={() => {
              setTimeout(() => {
                this.animateProgressBar(completedPercent);
              }, 50);
            }}
          />
        </div>
        <div className='completion-block-details'>
          <div className='completion-block-name'>{blockTitle}</div>
          <div className='progress-bar-wrap'>
            <div className='progress-bar-background'>
              {t('learn.percent-complete', {
                percent: this.state.shownPercent
              })}
            </div>
            <div
              className='progress-bar-percent'
              style={{ width: this.state.shownPercent + '%' }}
            >
              <div className='progress-bar-foreground'>
                {t('learn.percent-complete', {
                  percent: this.state.shownPercent
                })}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

CompletionModalBody.displayName = 'CompletionModalBody';
CompletionModalBody.propTypes = propTypes;

export default withTranslation()(CompletionModalBody);
