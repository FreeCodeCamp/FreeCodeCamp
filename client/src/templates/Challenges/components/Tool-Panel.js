import {
  Button,
  DropdownButton,
  MenuItem
} from '@freecodecamp/react-bootstrap';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './tool-panel.css';
import { openModal, executeChallenge } from '../redux';

const mapStateToProps = () => ({});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      executeChallenge,
      openHelpModal: () => openModal('help'),
      openVideoModal: () => openModal('video'),
      openResetModal: () => openModal('reset')
    },
    dispatch
  );

const propTypes = {
  executeChallenge: PropTypes.func.isRequired,
  guideUrl: PropTypes.string,
  isMobile: PropTypes.bool,
  openHelpModal: PropTypes.func.isRequired,
  openResetModal: PropTypes.func.isRequired,
  openVideoModal: PropTypes.func.isRequired,
  videoUrl: PropTypes.string
};

function ToolPanel({
  executeChallenge,
  isMobile,
  openHelpModal,
  openVideoModal,
  openResetModal,
  guideUrl,
  videoUrl
}) {
  const { t } = useTranslation();
  return (
    <Fragment>
      <div
        className={`tool-panel-group button-group ${
          isMobile ? 'tool-panel-group-mobile' : ''
        }`}
      >
        <Button block={true} bsStyle='primary' onClick={executeChallenge}>
          {isMobile ? t('buttons.run') : t('buttons.run-test')}
        </Button>
        <Button
          block={true}
          bsStyle='primary'
          className='btn-invert'
          onClick={openResetModal}
        >
          {isMobile ? t('buttons.reset') : t('buttons.reset-code')}
        </Button>
        <DropdownButton
          block={true}
          bsStyle='primary'
          className='btn-invert'
          id='get-help-dropdown'
          title={isMobile ? t('buttons.help') : t('buttons.get-help')}
        >
          {guideUrl ? (
            <MenuItem
              bsStyle='primary'
              className='btn-invert'
              href={guideUrl}
              target='_blank'
            >
              {t('buttons.get-hint')}
            </MenuItem>
          ) : null}
          {videoUrl ? (
            <MenuItem
              bsStyle='primary'
              className='btn-invert'
              onClick={openVideoModal}
            >
              {t('buttons.watch-video')}
            </MenuItem>
          ) : null}
          <MenuItem
            bsStyle='primary'
            className='btn-invert'
            onClick={openHelpModal}
          >
            {t('buttons.ask-for-help')}
          </MenuItem>
        </DropdownButton>
      </div>
    </Fragment>
  );
}

ToolPanel.displayName = 'ToolPanel';
ToolPanel.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(ToolPanel);
