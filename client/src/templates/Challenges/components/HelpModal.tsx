import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Modal } from '@freecodecamp/react-bootstrap';
import { Trans, withTranslation } from 'react-i18next';

import { createQuestion, closeModal, isHelpModalOpenSelector } from '../redux';
import { executeGA } from '../../../redux';
import envData from '../../../../../config/env.json';

import './help-modal.css';

const { forumLocation } = envData;

const mapStateToProps = state => ({ isOpen: isHelpModalOpenSelector(state) });
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { createQuestion, executeGA, closeHelpModal: () => closeModal('help') },
    dispatch
  );

const propTypes = {
  closeHelpModal: PropTypes.func.isRequired,
  createQuestion: PropTypes.func.isRequired,
  executeGA: PropTypes.func,
  isOpen: PropTypes.bool,
  t: PropTypes.func.isRequired
};

const RSA = forumLocation + '/t/19514';

export class HelpModal extends Component {
  render() {
    const { isOpen, closeHelpModal, createQuestion, executeGA, t } = this.props;
    if (isOpen) {
      executeGA({ type: 'modal', data: '/help-modal' });
    }
    return (
      <Modal dialogClassName='help-modal' onHide={closeHelpModal} show={isOpen}>
        <Modal.Header
          className='help-modal-header fcc-modal'
          closeButton={true}
        >
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
}

HelpModal.displayName = 'HelpModal';
HelpModal.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(HelpModal));
