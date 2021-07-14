import React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Modal } from '@freecodecamp/react-bootstrap';
import { withTranslation } from 'react-i18next';

import { closeModal, isVideoModalOpenSelector } from '../redux';
import { executeGA } from '../../../redux';

import './video-modal.css';

interface IVideoModalProps {
  closeVideoModal: () => void;
  executeGA: (attributes: { type: string; data: string }) => void;
  isOpen?: boolean;
  t: (attribute: string) => string;
  videoUrl?: string;
}

const mapStateToProps = (state: unknown) => ({
  isOpen: isVideoModalOpenSelector(state) as boolean
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    { closeVideoModal: () => closeModal('video'), executeGA },
    dispatch
  );

export function VideoModal({
  closeVideoModal,
  executeGA,
  isOpen,
  t,
  videoUrl
}: IVideoModalProps): JSX.Element {
  if (isOpen) {
    executeGA({ type: 'modal', data: '/completion-modal' });
  }
  return (
    <Modal dialogClassName='video-modal' onHide={closeVideoModal} show={isOpen}>
      <Modal.Header className='video-modal-header fcc-modal' closeButton={true}>
        <Modal.Title className='text-center'>
          {t('buttons.watch-video')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='video-modal-body'>
        <iframe
          frameBorder='0'
          src={videoUrl}
          title={t('buttons.watch-video')}
        />
        <p>{t('learn.scrimba-tip')}</p>
      </Modal.Body>
    </Modal>
  );
}

VideoModal.displayName = 'VideoModal';

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(VideoModal));
