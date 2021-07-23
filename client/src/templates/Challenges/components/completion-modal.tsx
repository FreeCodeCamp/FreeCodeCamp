/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, { Component } from 'react';
import { noop } from 'lodash-es';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { Button, Modal } from '@freecodecamp/react-bootstrap';
import { useStaticQuery, graphql } from 'gatsby';
import { TFunction, withTranslation } from 'react-i18next';
import { Dispatch } from 'redux';

import Login from '../../../components/Header/components/Login';
import CompletionModalBody from './completion-modal-body';
import { dasherize } from '../../../../../utils/slugs';
import { AllChallengeNodeType, ChallengeFile } from '../../../redux/prop-types';

import {
  closeModal,
  submitChallenge,
  completedChallengesIds,
  isCompletionModalOpenSelector,
  successMessageSelector,
  challengeFilesSelector,
  challengeMetaSelector
} from '../redux';

import {
  isSignedInSelector,
  executeGA,
  allowBlockDonationRequests
} from '../../../redux';

import './completion-modal.css';

const mapStateToProps = createSelector(
  challengeFilesSelector,
  challengeMetaSelector,
  completedChallengesIds,
  isCompletionModalOpenSelector,
  isSignedInSelector,
  successMessageSelector,
  (
    challengeFiles: ChallengeFile[],
    { title, id }: { title: string; id: string },
    completedChallengesIds: string[],
    isOpen: boolean,
    isSignedIn: boolean,
    message: string
  ) => ({
    challengeFiles,
    title,
    id,
    completedChallengesIds,
    isOpen,
    isSignedIn,
    message
  })
);

const mapDispatchToProps = function (dispatch: Dispatch) {
  const dispatchers = {
    close: () => dispatch(closeModal('completion')),
    submitChallenge: () => {
      dispatch(submitChallenge());
    },
    allowBlockDonationRequests: (block: string) => {
      dispatch(allowBlockDonationRequests(block));
    },
    executeGA
  };
  return () => dispatchers;
};

export function getCompletedPercent(
  completedChallengesIds: string[] = [],
  currentBlockIds: string[] = [],
  currentChallengeId: string
): number {
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

interface CompletionModalsProps {
  allowBlockDonationRequests: (arg0: string) => void;
  block: string;
  blockName: string;
  close: () => void;
  completedChallengesIds: string[];
  currentBlockIds?: string[];
  executeGA: () => void;
  challengeFiles: ChallengeFile[];
  id: string;
  isOpen: boolean;
  isSignedIn: boolean;
  message: string;
  submitChallenge: () => void;
  superBlock: string;
  t: TFunction;
  title: string;
}

interface CompletionModalInnerState {
  downloadURL: null | string;
  completedPercent: number;
}

export class CompletionModalInner extends Component<
  CompletionModalsProps,
  CompletionModalInnerState
> {
  constructor(props: CompletionModalsProps) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKeypress = this.handleKeypress.bind(this);

    this.state = {
      downloadURL: null,
      completedPercent: 0
    };
  }

  static getDerivedStateFromProps(
    props: CompletionModalsProps,
    state: CompletionModalInnerState
  ): CompletionModalInnerState {
    const { challengeFiles, isOpen } = props;
    if (!isOpen) {
      return { downloadURL: null, completedPercent: 0 };
    }
    const { downloadURL } = state;
    if (downloadURL) {
      URL.revokeObjectURL(downloadURL);
    }
    let newURL = null;
    if (challengeFiles.length) {
      const filesForDownload = challengeFiles
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .reduce<string>((allFiles, currentFile: any) => {
          const beforeText = `** start of ${currentFile.path} **\n\n`;
          const afterText = `\n\n** end of ${currentFile.path} **\n\n`;
          allFiles +=
            challengeFiles.length > 1
              ? `${beforeText}${currentFile.contents}${afterText}`
              : currentFile.contents;
          return allFiles;
        }, '');
      const blob = new Blob([filesForDownload], {
        type: 'text/json'
      });
      newURL = URL.createObjectURL(blob);
    }

    const { completedChallengesIds, currentBlockIds, id, isSignedIn } = props;
    const completedPercent = isSignedIn
      ? getCompletedPercent(completedChallengesIds, currentBlockIds, id)
      : 0;
    return { downloadURL: newURL, completedPercent: completedPercent };
  }

  handleKeypress(e: React.KeyboardEvent): void {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      // Since Hotkeys also listens to Ctrl + Enter we have to stop this event
      // getting to it.
      e.stopPropagation();
      this.handleSubmit();
    }
  }

  handleSubmit(): void {
    this.props.submitChallenge();
    this.checkBlockCompletion();
  }

  // check block completion for donation
  checkBlockCompletion(): void {
    if (
      this.state.completedPercent === 100 &&
      !this.props.completedChallengesIds.includes(this.props.id)
    ) {
      this.props.allowBlockDonationRequests(this.props.blockName);
    }
  }

  componentWillUnmount(): void {
    if (this.state.downloadURL) {
      URL.revokeObjectURL(this.state.downloadURL);
    }
    this.props.close();
  }

  render(): JSX.Element {
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
        // eslint-disable-next-line @typescript-eslint/unbound-method
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
            onClick={() => this.handleSubmit()}
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

const useCurrentBlockIds = (blockName: string) => {
  const {
    allChallengeNode: { edges }
  }: { allChallengeNode: AllChallengeNodeType } = useStaticQuery(graphql`
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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    .map(edge => edge.node.id);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return currentBlockIds;
};

const CompletionModal = (props: CompletionModalsProps) => {
  const currentBlockIds = useCurrentBlockIds(props.blockName || '');
  return <CompletionModalInner currentBlockIds={currentBlockIds} {...props} />;
};

CompletionModal.displayName = 'CompletionModal';

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(CompletionModal));
