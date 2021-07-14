import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Modal } from '@freecodecamp/react-bootstrap';
import { withTranslation } from 'react-i18next';

import { closeModal, isVideoModalOpenSelector } from '../redux';
import { executeGA } from '../../../redux';

import './video-modal.css';

const mapStateToProps = state => ({ isOpen: isVideoModalOpenSelector(state) });
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { closeVideoModal: () => closeModal('video'), executeGA },
    dispatch
  );

const propTypes = {
  closeVideoModal: PropTypes.func.isRequired,
  executeGA: PropTypes.func,
  isOpen: PropTypes.bool,
  t: PropTypes.func.isRequired,
  videoUrl: PropTypes.string
};

export class VideoModal extends Component {
  render() {
    const { isOpen, closeVideoModal, videoUrl, executeGA, t } = this.props;
    if (isOpen) {
      executeGA({ type: 'modal', data: '/completion-modal' });
    }
    return (
      <Modal
        dialogClassName='video-modal'
        onHide={closeVideoModal}
        show={isOpen}
      >
        <Modal.Header
          className='video-modal-header fcc-modal'
          closeButton={true}
        >
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
}

VideoModal.displayName = 'VideoModal';
VideoModal.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(VideoModal));
