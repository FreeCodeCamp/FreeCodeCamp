import { Button, Modal } from '@freecodecamp/react-bootstrap';
import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createSelector } from 'reselect';

import { executeGA } from '../../../redux';
import { isResetModalOpenSelector, closeModal, resetChallenge } from '../redux';

import './reset-modal.css';

const propTypes = {
  close: PropTypes.func.isRequired,
  executeGA: PropTypes.func,
  isOpen: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired
};

const mapStateToProps = createSelector(isResetModalOpenSelector, isOpen => ({
  isOpen
}));

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      close: () => closeModal('reset'),
      executeGA,
      reset: () => resetChallenge()
    },
    dispatch
  );

function withActions(...fns) {
  return () => fns.forEach(fn => fn());
}

function ResetModal({ reset, close, isOpen }) {
  const { t } = useTranslation();
  if (isOpen) {
    executeGA({ type: 'modal', data: '/reset-modal' });
  }
  return (
    <Modal
      animation={false}
      dialogClassName='reset-modal'
      keyboard={true}
      onHide={close}
      show={isOpen}
    >
      <Modal.Header className='reset-modal-header' closeButton={true}>
        <Modal.Title className='text-center'>{t('learn.reset')}</Modal.Title>
      </Modal.Header>
      <Modal.Body className='reset-modal-body'>
        <div className='text-center'>
          <p>{t('learn.reset-warn')}</p>
          <p>
            <em>{t('learn.reset-warn-2')}</em>.
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer className='reset-modal-footer'>
        <Button
          block={true}
          bsSize='large'
          bsStyle='danger'
          onClick={withActions(reset, close)}
        >
          {t('buttons.reset-lesson')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

ResetModal.displayName = 'ResetModal';
ResetModal.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(ResetModal);
