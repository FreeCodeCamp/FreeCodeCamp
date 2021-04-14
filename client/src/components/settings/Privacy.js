import { Button, Form } from '@freecodecamp/react-bootstrap';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createSelector } from 'reselect';

import { userSelector } from '../../redux';
import { submitProfileUI } from '../../redux/settings';

import FullWidthRow from '../helpers/FullWidthRow';
import Spacer from '../helpers/Spacer';
import SectionHeader from './SectionHeader';
import ToggleSetting from './ToggleSetting';

const mapStateToProps = createSelector(userSelector, user => ({
  user
}));

const mapDispatchToProps = dispatch =>
  bindActionCreators({ submitProfileUI }, dispatch);

const propTypes = {
  submitProfileUI: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  user: PropTypes.shape({
    profileUI: PropTypes.shape({
      isLocked: PropTypes.bool,
      showAbout: PropTypes.bool,
      showCerts: PropTypes.bool,
      showDonation: PropTypes.bool,
      showHeatMap: PropTypes.bool,
      showLocation: PropTypes.bool,
      showName: PropTypes.bool,
      showPoints: PropTypes.bool,
      showPortfolio: PropTypes.bool,
      showTimeLine: PropTypes.bool
    }),
    username: PropTypes.String
  })
};

class PrivacySettings extends Component {
  handleSubmit = e => e.preventDefault();

  toggleFlag = flag => () => {
    const privacyValues = { ...this.props.user.profileUI };
    privacyValues[flag] = !privacyValues[flag];
    this.props.submitProfileUI(privacyValues);
  };

  render() {
    const { t, user } = this.props;
    const {
      isLocked = true,
      showAbout = false,
      showCerts = false,
      showDonation = false,
      showHeatMap = false,
      showLocation = false,
      showName = false,
      showPoints = false,
      showPortfolio = false,
      showTimeLine = false
    } = user.profileUI;

    return (
      <div className='privacy-settings'>
        <SectionHeader>{t('settings.headings.privacy')}</SectionHeader>
        <FullWidthRow>
          <p>{t('settings.privacy')}</p>
          <Form inline={true} onSubmit={this.handleSubmit}>
            <ToggleSetting
              action={t('settings.labels.my-profile')}
              explain={t('settings.disabled')}
              flag={isLocked}
              flagName='isLocked'
              offLabel={t('buttons.public')}
              onLabel={t('buttons.private')}
              toggleFlag={this.toggleFlag('isLocked')}
            />
            <ToggleSetting
              action={t('settings.labels.my-name')}
              flag={!showName}
              flagName='name'
              offLabel={t('buttons.public')}
              onLabel={t('buttons.private')}
              toggleFlag={this.toggleFlag('showName')}
            />
            <ToggleSetting
              action={t('settings.labels.my-location')}
              flag={!showLocation}
              flagName='showLocation'
              offLabel={t('buttons.public')}
              onLabel={t('buttons.private')}
              toggleFlag={this.toggleFlag('showLocation')}
            />
            <ToggleSetting
              action={t('settings.labels.my-about')}
              flag={!showAbout}
              flagName='showAbout'
              offLabel={t('buttons.public')}
              onLabel={t('buttons.private')}
              toggleFlag={this.toggleFlag('showAbout')}
            />
            <ToggleSetting
              action={t('settings.labels.my-points')}
              flag={!showPoints}
              flagName='showPoints'
              offLabel={t('buttons.public')}
              onLabel={t('buttons.private')}
              toggleFlag={this.toggleFlag('showPoints')}
            />
            <ToggleSetting
              action={t('settings.labels.my-heatmap')}
              flag={!showHeatMap}
              flagName='showHeatMap'
              offLabel={t('buttons.public')}
              onLabel={t('buttons.private')}
              toggleFlag={this.toggleFlag('showHeatMap')}
            />
            <ToggleSetting
              action={t('settings.labels.my-certs')}
              explain={t('settings.disabled')}
              flag={!showCerts}
              flagName='showCerts'
              offLabel={t('buttons.public')}
              onLabel={t('buttons.private')}
              toggleFlag={this.toggleFlag('showCerts')}
            />
            <ToggleSetting
              action={t('settings.labels.my-portfolio')}
              flag={!showPortfolio}
              flagName='showPortfolio'
              offLabel={t('buttons.public')}
              onLabel={t('buttons.private')}
              toggleFlag={this.toggleFlag('showPortfolio')}
            />
            <ToggleSetting
              action={t('settings.labels.my-timeline')}
              flag={!showTimeLine}
              flagName='showTimeLine'
              offLabel={t('buttons.public')}
              onLabel={t('buttons.private')}
              toggleFlag={this.toggleFlag('showTimeLine')}
            />
            <ToggleSetting
              action={t('settings.labels.my-donations')}
              flag={!showDonation}
              flagName='showPortfolio'
              offLabel={t('buttons.public')}
              onLabel={t('buttons.private')}
              toggleFlag={this.toggleFlag('showDonation')}
            />
          </Form>
        </FullWidthRow>
        <FullWidthRow>
          <Spacer />
          <p>{t('settings.data')}</p>
          <Button
            block={true}
            bsSize='lg'
            bsStyle='primary'
            download={`${user.username}.json`}
            href={`data:text/json;charset=utf-8,${encodeURIComponent(
              JSON.stringify(user)
            )}`}
          >
            {t('buttons.download-data')}
          </Button>
        </FullWidthRow>
      </div>
    );
  }
}

PrivacySettings.displayName = 'PrivacySettings';
PrivacySettings.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(PrivacySettings));
