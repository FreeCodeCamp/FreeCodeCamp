import PropTypes from 'prop-types';
import React, { Fragment, Component } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import createRedirect from '../../components/createRedirect';
import { Loader } from '../../components/helpers';
import {
  userSelector,
  userFetchStateSelector,
  isSignedInSelector,
  tryToShowDonationModal
} from '../../redux';
import DonateModal from '../Donation/DonationModal';

import './prism.css';
import './prism-night.css';
import 'react-reflex/styles.css';
import './learn.css';

const mapStateToProps = createSelector(
  userFetchStateSelector,
  isSignedInSelector,
  userSelector,
  (fetchState, isSignedIn, user) => ({
    fetchState,
    isSignedIn,
    user
  })
);

const mapDispatchToProps = {
  tryToShowDonationModal
};

const RedirectEmailSignUp = createRedirect('/email-sign-up');

class LearnLayout extends Component {
  componentDidMount() {
    this.props.tryToShowDonationModal();
  }

  componentWillUnmount() {
    const metaTag = document.querySelector(`meta[name="robots"]`);
    if (metaTag) {
      metaTag.remove();
    }
  }

  render() {
    const {
      fetchState: { pending, complete },
      isSignedIn,
      user: { acceptedPrivacyTerms },
      children
    } = this.props;

    if (pending && !complete) {
      return <Loader fullScreen={true} />;
    }

    if (isSignedIn && !acceptedPrivacyTerms) {
      return <RedirectEmailSignUp />;
    }

    return (
      <Fragment>
        <Helmet>
          <meta content='noindex' name='robots' />
        </Helmet>
        <main id='learn-app-wrapper'>{children}</main>
        <DonateModal />
      </Fragment>
    );
  }
}

LearnLayout.displayName = 'LearnLayout';
LearnLayout.propTypes = {
  children: PropTypes.any,
  fetchState: PropTypes.shape({
    pending: PropTypes.bool,
    complete: PropTypes.bool,
    errored: PropTypes.bool
  }),
  isSignedIn: PropTypes.bool,
  tryToShowDonationModal: PropTypes.func.isRequired,
  user: PropTypes.shape({
    acceptedPrivacyTerms: PropTypes.bool
  })
};

export default connect(mapStateToProps, mapDispatchToProps)(LearnLayout);
