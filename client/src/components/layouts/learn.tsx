import React, { Component } from 'react';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Loader } from '../../components/helpers';
import { tryToShowDonationModal, userFetchStateSelector } from '../../redux';
import DonateModal from '../Donation/DonationModal';

import './prism.css';
import './prism-night.css';
import 'react-reflex/styles.css';
import './learn.css';

type FetchState = {
  pending: boolean;
  complete: boolean;
  errored: boolean;
};

const mapStateToProps = createSelector(
  userFetchStateSelector,
  (fetchState: FetchState) => ({
    fetchState
  })
);

const mapDispatchToProps = {
  tryToShowDonationModal
};

type LearnLayoutProps = {
  children?: React.ReactNode;
  fetchState: FetchState;
  tryToShowDonationModal: () => void;
};

class LearnLayout extends Component<LearnLayoutProps> {
  static displayName = 'LearnLayout';

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
      children
    } = this.props;

    if (pending && !complete) {
      return <Loader fullScreen={true} />;
    }

    return (
      <>
        <Helmet>
          <meta content='noindex' name='robots' />
        </Helmet>
        <main id='learn-app-wrapper'>{children}</main>
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
        /* @ts-ignore  */}
        <DonateModal />
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LearnLayout);
