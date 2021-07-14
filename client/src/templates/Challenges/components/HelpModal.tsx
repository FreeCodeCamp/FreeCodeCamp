import React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Button, Modal } from '@freecodecamp/react-bootstrap';
import { Trans, withTranslation } from 'react-i18next';

import { createQuestion, closeModal, isHelpModalOpenSelector } from '../redux';
import { executeGA } from '../../../redux';
import envData from '../../../../../config/env.json';

import './help-modal.css';

interface HelpModalProps {
  closeHelpModal: () => void;
  createQuestion: () => void;
  executeGA: (attributes: { type: string; data: string }) => void;
  isOpen?: boolean;
  t: (text: string) => string;
}

const { forumLocation } = envData;

const mapStateToProps = (state: unknown) => ({
  isOpen: isHelpModalOpenSelector(state) as boolean
});
const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    { createQuestion, executeGA, closeHelpModal: () => closeModal('help') },
    dispatch
  );

const RSA = forumLocation + '/t/19514';

export function HelpModal({
  closeHelpModal,
  createQuestion,
  executeGA,
  isOpen,
  t
}: HelpModalProps): JSX.Element {
  if (isOpen) {
    executeGA({ type: 'modal', data: '/help-modal' });
  }
  return (
    <Modal dialogClassName='help-modal' onHide={closeHelpModal} show={isOpen}>
      <Modal.Header className='help-modal-header fcc-modal' closeButton={true}>
        <Modal.Title className='text-center'>
          {t('buttons.ask-for-help')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='help-modal-body text-center'>
        <h3>
          <Trans i18nKey='learn.tried-rsa'>
            <a
              href={RSA}
              rel='noopener noreferrer'
              target='_blank'
              title={t('learn.rsa')}
            >
              placeholder
            </a>
          </Trans>
        </h3>
        <Button
          block={true}
          bsSize='lg'
          bsStyle='primary'
          onClick={createQuestion}
        >
          {t('buttons.create-post')}
        </Button>
        <Button
          block={true}
          bsSize='lg'
          bsStyle='primary'
          onClick={closeHelpModal}
        >
          {t('buttons.cancel')}
        </Button>
      </Modal.Body>
    </Modal>
  );
}

HelpModal.displayName = 'HelpModal';

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(HelpModal));
