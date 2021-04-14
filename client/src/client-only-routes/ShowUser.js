import {
  Panel,
  FormControl,
  FormGroup,
  ControlLabel,
  Button,
  Col,
  Row
} from '@freecodecamp/react-bootstrap';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import Helmet from 'react-helmet';
import { Trans, withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import Login from '../components/Header/components/Login';

import { Spacer, Loader, FullWidthRow } from '../components/helpers';
import {
  isSignedInSelector,
  userFetchStateSelector,
  userSelector,
  reportUser
} from '../redux';

const propTypes = {
  email: PropTypes.string,
  isSignedIn: PropTypes.bool,
  reportUser: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  userFetchState: PropTypes.shape({
    pending: PropTypes.bool,
    complete: PropTypes.bool,
    errored: PropTypes.bool
  }),
  username: PropTypes.string
};

const mapStateToProps = createSelector(
  isSignedInSelector,
  userFetchStateSelector,
  userSelector,
  (isSignedIn, userFetchState, { email }) => ({
    isSignedIn,
    userFetchState,
    email
  })
);

const mapDispatchToProps = {
  reportUser
};

class ShowUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      textarea: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const textarea = e.target.value.slice();
    return this.setState({
      textarea
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { textarea: reportDescription } = this.state;
    const { username, reportUser } = this.props;
    return reportUser({ username, reportDescription });
  }

  render() {
    const { username, isSignedIn, userFetchState, email, t } = this.props;
    const { pending, complete, errored } = userFetchState;
    if (pending && !complete) {
      return <Loader fullScreen={true} />;
    }

    if ((complete || errored) && !isSignedIn) {
      return (
        <main>
          <FullWidthRow>
            <Spacer size={2} />
            <Panel bsStyle='info' className='text-center'>
              <Panel.Heading>
                <Panel.Title componentClass='h3'>
                  {t('report.sign-in')}
                </Panel.Title>
              </Panel.Heading>
              <Panel.Body className='text-center'>
                <Spacer size={2} />
                <Col md={6} mdOffset={3} sm={8} smOffset={2} xs={12}>
                  <Login block={true}>{t('buttons.click-here')}</Login>
                </Col>
                <Spacer size={3} />
              </Panel.Body>
            </Panel>
          </FullWidthRow>
        </main>
      );
    }

    const { textarea } = this.state;
    const placeholderText = t('report.details');
    return (
      <Fragment>
        <Helmet>
          <title>{t('report.portfolio')} | freeCodeCamp.org</title>
        </Helmet>
        <Spacer size={2} />
        <Row className='text-center overflow-fix'>
          <Col sm={8} smOffset={2} xs={12}>
            <h2>{t('report.portfolio-2', { username: username })}</h2>
          </Col>
        </Row>
        <Row className='overflow-fix'>
          <Col sm={6} smOffset={3} xs={12}>
            <p>
              <Trans email={email} i18nKey='report.notify-1'>
                <strong>{{ email }}</strong>
              </Trans>
            </p>
            <p>{t('report.notify-2')}</p>
            <form onSubmit={this.handleSubmit}>
              <FormGroup controlId='report-user-textarea'>
                <ControlLabel>{t('report.what')}</ControlLabel>
                <FormControl
                  componentClass='textarea'
                  onChange={this.handleChange}
                  placeholder={placeholderText}
                  value={textarea}
                />
              </FormGroup>
              <Button block={true} bsStyle='primary' type='submit'>
                {t('report.submit')}
              </Button>
              <Spacer />
            </form>
          </Col>
        </Row>
      </Fragment>
    );
  }
}

ShowUser.displayName = 'ShowUser';
ShowUser.propTypes = propTypes;

export default withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(ShowUser)
);
