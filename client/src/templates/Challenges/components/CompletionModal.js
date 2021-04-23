import { Button, Modal } from '@freecodecamp/react-bootstrap';
import { useStaticQuery, graphql } from 'gatsby';
import noop from 'lodash/noop';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { dasherize } from '../../../../../utils/slugs';
import Login from '../../../components/Header/components/Login';

import './completion-modal.css';

import {
  isSignedInSelector,
  executeGA,
  allowBlockDonationRequests
} from '../../../redux';
import {
  closeModal,
  submitChallenge,
  completedChallengesIds,
  isCompletionModalOpenSelector,
  successMessageSelector,
  challengeFilesSelector,
  challengeMetaSelector
} from '../redux';

import CompletionModalBody from './CompletionModalBody';

const mapStateToProps = createSelector(
  challengeFilesSelector,
  challengeMetaSelector,
  completedChallengesIds,
  isCompletionModalOpenSelector,
  isSignedInSelector,
  successMessageSelector,
  (
    files,
    { title, id },
    completedChallengesIds,
    isOpen,
    isSignedIn,
    message
  ) => ({
    files,
    title,
    id,
    completedChallengesIds,
    isOpen,
    isSignedIn,
    message
  })
);

const mapDispatchToProps = function (dispatch) {
  const dispatchers = {
    close: () => dispatch(closeModal('completion')),
    submitChallenge: () => {
      dispatch(submitChallenge());
    },
    allowBlockDonationRequests: block => {
      dispatch(allowBlockDonationRequests(block));
    },
    executeGA
  };
  return () => dispatchers;
};

const propTypes = {
  allowBlockDonationRequests: PropTypes.func,
  block: PropTypes.string,
  blockName: PropTypes.string,
  close: PropTypes.func.isRequired,
  completedChallengesIds: PropTypes.array,
  currentBlockIds: PropTypes.array,
  executeGA: PropTypes.func,
  files: PropTypes.object.isRequired,
  id: PropTypes.string,
  isOpen: PropTypes.bool,
  isSignedIn: PropTypes.bool.isRequired,
  message: PropTypes.string,
  submitChallenge: PropTypes.func.isRequired,
  superBlock: PropTypes.string,
  t: PropTypes.func.isRequired,
  title: PropTypes.string
};

export function getCompletedPercent(
  completedChallengesIds = [],
  currentBlockIds = [],
  currentChallengeId
) {
  completedChallengesIds = completedChallengesIds.includes(currentChallengeId)
    ? completedChallengesIds
    : [...completedChallengesIds, currentChallengeId];

  const completedChallengesInBlock = completedChallengesIds.filter(id => {
    return currentBlockIds.includes(id);
  });

  const completedPercent = Math.round(
    (completedChallengesInBlock.length / currentBlockIds.length) * 100
  );

  return completedPercent > 100 ? 100 : completedPercent;
}

export class CompletionModalInner extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKeypress = this.handleKeypress.bind(this);
  }

  state = {
    downloadURL: null,
    completedPercent: 0
  };

  static getDerivedStateFromProps(props, state) {
    const { files, isOpen } = props;
    if (!isOpen) {
      return null;
    }
    const { downloadURL } = state;
    if (downloadURL) {
      URL.revokeObjectURL(downloadURL);
    }
    let newURL = null;
    if (Object.keys(files).length) {
      const filesForDownload = Object.keys(files)
        .map(key => files[key])
        .reduce((allFiles, { path, contents }) => {
          const beforeText = `** start of ${path} **\n\n`;
          const afterText = `\n\n** end of ${path} **\n\n`;
          allFiles +=
            files.length > 1 ? beforeText + contents + afterText : contents;
          return allFiles;
        }, '');
      const blob = new Blob([filesForDownload], {
        type: 'text/json'
      });
      newURL = URL.createObjectURL(blob);
    }

    const { completedChallengesIds, currentBlockIds, id, isSignedIn } = props;
    let completedPercent = isSignedIn
      ? getCompletedPercent(completedChallengesIds, currentBlockIds, id)
      : 0;
    return { downloadURL: newURL, completedPercent: completedPercent };
  }

  handleKeypress(e) {
    if (e.keyCode === 13 && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      // Since Hotkeys also listens to Ctrl + Enter we have to stop this event
      // getting to it.
      e.stopPropagation();
      this.handleSubmit();
    }
  }

  handleSubmit() {
    this.props.submitChallenge();
    this.checkBlockCompletion();
  }

  // check block completion for donation
  checkBlockCompletion() {
    if (
      this.state.completedPercent === 100 &&
      !this.props.completedChallengesIds.includes(this.props.id)
    ) {
      this.props.allowBlockDonationRequests(this.props.blockName);
    }
  }

  componentWillUnmount() {
    if (this.state.downloadURL) {
      URL.revokeObjectURL(this.state.downloadURL);
    }
    this.props.close();
  }

  render() {
    const {
      block,
      close,
      isOpen,
      message,
      t,
      title,
      isSignedIn,
      superBlock = ''
    } = this.props;

    const { completedPercent } = this.state;

    if (isOpen) {
      executeGA({ type: 'modal', data: '/completion-modal' });
    }
    // normally dashedName should be graphQL queried and then passed around,
    // but it's only used to make a nice filename for downloading, so dasherize
    // is fine here.
    const dashedName = dasherize(title);
    return (
      <Modal
        animation={false}
        bsSize='lg'
        dialogClassName='challenge-success-modal'
        keyboard={true}
        onHide={close}
        onKeyDown={isOpen ? this.handleKeypress : noop}
        show={isOpen}
      >
        <Modal.Header
          className='challenge-list-header fcc-modal'
          closeButton={true}
        >
          <Modal.Title className='completion-message'>{message}</Modal.Title>
        </Modal.Header>
        <Modal.Body className='completion-modal-body'>
          <CompletionModalBody
            block={block}
            completedPercent={completedPercent}
            superBlock={superBlock}
          />
        </Modal.Body>
        <Modal.Footer>
          {isSignedIn ? null : (
            <Login block={true}>{t('learn.sign-in-save')}</Login>
          )}
          <Button
            block={true}
            bsSize='large'
            bsStyle='primary'
            onClick={this.handleSubmit}
          >
            {isSignedIn ? t('buttons.submit-and-go') : t('buttons.go-to-next')}
            <span className='hidden-xs'> (Ctrl + Enter)</span>
          </Button>
          {this.state.downloadURL ? (
            <Button
              block={true}
              bsSize='lg'
              bsStyle='primary'
              className='btn-invert'
              download={`${dashedName}.txt`}
              href={this.state.downloadURL}
            >
              {t('learn.download-solution')}
            </Button>
          ) : null}
        </Modal.Footer>
      </Modal>
    );
  }
}

CompletionModalInner.propTypes = propTypes;

const useCurrentBlockIds = blockName => {
  const {
    allChallengeNode: { edges }
  } = useStaticQuery(graphql`
    query getCurrentBlockNodes {
      allChallengeNode(sort: { fields: [superOrder, order, challengeOrder] }) {
        edges {
          node {
            fields {
              blockName
            }
            id
          }
        }
      }
    }
  `);

  const currentBlockIds = edges
    .filter(edge => edge.node.fields.blockName === blockName)
    .map(edge => edge.node.id);
  return currentBlockIds;
};

const CompletionModal = props => {
  const currentBlockIds = useCurrentBlockIds(props.blockName || '');
  return <CompletionModalInner currentBlockIds={currentBlockIds} {...props} />;
};

CompletionModal.displayName = 'CompletionModal';
CompletionModal.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(CompletionModal));
