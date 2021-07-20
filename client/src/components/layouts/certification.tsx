import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchUser, isSignedInSelector, executeGA } from '../../redux';
import { createSelector } from 'reselect';
import Helmet from 'react-helmet';

const mapStateToProps = createSelector(isSignedInSelector, isSignedIn => ({
  isSignedIn
}));

const mapDispatchToProps = { fetchUser, executeGA };

class CertificationLayout extends Component {
  componentDidMount() {
    const { isSignedIn, fetchUser, pathname } = this.props;
    if (!isSignedIn) {
      fetchUser();
    }
    this.props.executeGA({ type: 'page', data: pathname });
  }

  render() {
    const { children } = this.props;

    return (
      <>
        <Helmet bodyAttributes={{ class: 'light-palette' }} />
        {children}
      </>
    );
  }
}

CertificationLayout.displayName = 'CertificationLayout';
CertificationLayout.propTypes = {
  children: PropTypes.any,
  executeGA: PropTypes.func,
  fetchUser: PropTypes.func.isRequired,
  isSignedIn: PropTypes.bool,
  pathname: PropTypes.string.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CertificationLayout);
