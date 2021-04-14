import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { isBrowser } from '../../utils/index';
import FourOhFour from '../components/FourOhFour';
import Loader from '../components/helpers/Loader';
import Profile from '../components/profile/Profile';
import {
  userByNameSelector,
  userProfileFetchStateSelector,
  fetchProfileForUser,
  usernameSelector
} from '../redux';

const propTypes = {
  fetchProfileForUser: PropTypes.func.isRequired,
  isSessionUser: PropTypes.bool,
  maybeUser: PropTypes.string,
  requestedUser: PropTypes.shape({
    username: PropTypes.string,
    profileUI: PropTypes.object
  }),
  showLoading: PropTypes.bool
};

const createRequestedUserSelector = () => (state, { maybeUser = '' }) =>
  userByNameSelector(maybeUser.toLowerCase())(state);
const createIsSessionUserSelector = () => (state, { maybeUser = '' }) =>
  maybeUser.toLowerCase() === usernameSelector(state);

const makeMapStateToProps = () => (state, props) => {
  const requestedUserSelector = createRequestedUserSelector();
  const isSessionUserSelector = createIsSessionUserSelector();
  const fetchState = userProfileFetchStateSelector(state, props);
  return {
    requestedUser: requestedUserSelector(state, props),
    isSessionUser: isSessionUserSelector(state, props),
    showLoading: fetchState.pending,
    fetchState
  };
};

const mapDispatchToProps = {
  fetchProfileForUser
};

class ShowProfileOrFourOhFour extends Component {
  componentDidMount() {
    const { requestedUser, maybeUser, fetchProfileForUser } = this.props;
    if (isEmpty(requestedUser)) {
      fetchProfileForUser(maybeUser);
    }
  }

  render() {
    if (!isBrowser()) {
      return null;
    }

    const { isSessionUser, requestedUser, showLoading } = this.props;
    if (isEmpty(requestedUser)) {
      if (showLoading) {
        // We don't know if /:maybeUser is a user or not, we will show
        // the loader until we get a response from the API
        return <Loader fullScreen={true} />;
      }
      // We have a response from the API, but there is nothing in the store
      // for /:maybeUser. We can derive from this state the /:maybeUser is not
      // a user the API recognises, so we 404
      return <FourOhFour />;
    }

    // We have a response from the API, and we have some state in the
    // store for /:maybeUser, we now handover rendering to the Profile component
    return <Profile isSessionUser={isSessionUser} user={requestedUser} />;
  }
}

ShowProfileOrFourOhFour.displayName = 'ShowProfileOrFourOhFour';
ShowProfileOrFourOhFour.propTypes = propTypes;

export default connect(
  makeMapStateToProps,
  mapDispatchToProps
)(ShowProfileOrFourOhFour);
