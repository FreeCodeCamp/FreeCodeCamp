import PropTypes from 'prop-types';
import React, { Fragment, Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

import { createSelector } from 'reselect';
import { fetchUser, isSignedInSelector, executeGA } from '../../redux';

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
      <Fragment>
        <Helmet bodyAttributes={{ class: 'light-palette' }} />
        {children}
      </Fragment>
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
