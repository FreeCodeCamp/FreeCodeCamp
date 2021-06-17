/* eslint-disable max-len */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { Modal, Button, Col, Row } from '@freecodecamp/react-bootstrap';
import { Spacer } from '../helpers';
import Heart from '../../assets/icons/Heart';
import Cup from '../../assets/icons/Cup';
import DonateForm from './DonateForm';
import { modalDefaultDonation } from '../../../../config/donation-settings';
import { useTranslation } from 'react-i18next';

import {
  closeDonationModal,
  isDonationModalOpenSelector,
  recentlyClaimedBlockSelector,
  executeGA
} from '../../redux';

import './Donation.css';

const mapStateToProps = createSelector(
  isDonationModalOpenSelector,
  recentlyClaimedBlockSelector,
  (show, recentlyClaimedBlock) => ({
    show,
    recentlyClaimedBlock
  })
);

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      closeDonationModal,
      executeGA
    },
    dispatch
  );

const propTypes = {
  activeDonors: PropTypes.number,
  closeDonationModal: PropTypes.func.isRequired,
  executeGA: PropTypes.func,
  recentlyClaimedBlock: PropTypes.string,
  show: PropTypes.bool
};

function DonateModal({
  show,
  closeDonationModal,
  executeGA,
  recentlyClaimedBlock
}) {
  const [closeLabel, setCloseLabel] = React.useState(false);
  const { t } = useTranslation();
  const handleProcessing = (duration, amount, action) => {
    executeGA({
      type: 'event',
      data: {
        category: 'Donation',
        action: `Modal ${action}`,
        label: duration,
        value: amount
      }
    });
    setCloseLabel(true);
  };

  useEffect(() => {
    if (show) {
      executeGA({ type: 'modal', data: '/donation-modal' });
      executeGA({
        type: 'event',
        data: {
          category: 'Donation View',
          action: `Displayed ${
            recentlyClaimedBlock ? 'block' : 'progress'
          } donation modal`,
          nonInteraction: true
        }
      });
    }
  }, [show, recentlyClaimedBlock, executeGA]);

  const getDonationText = () => {
    const donationDuration = modalDefaultDonation.donationDuration;
    switch (donationDuration) {
      case 'onetime':
        return <b>{t('donate.duration')}</b>;
      case 'month':
        return <b>{t('donate.duration-2')}</b>;
      case 'year':
        return <b>{t('donate.duration-3')}</b>;
      default:
        return <b>{t('donate.duration-4')}</b>;
    }
  };

  const blockDonationText = (
    <div className=' text-center block-modal-text'>
      <div className='donation-icon-container'>
        <Cup className='donation-icon' />
      </div>
      <Row>
        {!closeLabel && (
          <Col sm={10} smOffset={1} xs={12}>
            <b>{t('donate.nicely-done', { block: recentlyClaimedBlock })}</b>
            <br />
            {getDonationText()}
          </Col>
        )}
      </Row>
    </div>
  );

  const progressDonationText = (
    <div className='text-center progress-modal-text'>
      <div className='donation-icon-container'>
        <Heart className='donation-icon' />
      </div>
      <Row>
        {!closeLabel && (
          <Col sm={10} smOffset={1} xs={12}>
            {getDonationText()}
          </Col>
        )}
      </Row>
    </div>
  );

  return (
    <Modal bsSize='lg' className='donation-modal' show={show}>
      <Modal.Body>
        {recentlyClaimedBlock ? blockDonationText : progressDonationText}
        <Spacer />
        <DonateForm handleProcessing={handleProcessing} isMinimalForm={true} />
        <Spacer />
        <Row>
          <Col sm={4} smOffset={4} xs={8} xsOffset={2}>
            <Button
              block={true}
              bsSize='sm'
              bsStyle='primary'
              className='btn-link'
              onClick={closeDonationModal}
              tabIndex='0'
            >
              {closeLabel ? t('buttons.close') : t('buttons.ask-later')}
            </Button>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
}

DonateModal.displayName = 'DonateModal';
DonateModal.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(DonateModal);
