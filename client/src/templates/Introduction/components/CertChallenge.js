import { navigate } from 'gatsby';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import CertificationIcon from '../../../assets/icons/CertificationIcon';
import GreenNotCompleted from '../../../assets/icons/GreenNotCompleted';
import GreenPass from '../../../assets/icons/GreenPass';
import { userSelector } from '../../../redux';
import { User } from '../../../redux/propTypes';
import { certMap } from '../../../resources/certAndProjectMap';

const propTypes = {
  superBlock: PropTypes.string,
  t: PropTypes.func,
  title: PropTypes.string,
  user: User
};

const mapStateToProps = state => {
  return createSelector(userSelector, user => ({
    user
  }))(state);
};

export class CertChallenge extends Component {
  render() {
    const {
      superBlock,
      t,
      title,
      user: {
        is2018DataVisCert,
        isApisMicroservicesCert,
        isFrontEndLibsCert,
        isQaCertV7,
        isInfosecCertV7,
        isJsAlgoDataStructCert,
        isRespWebDesignCert,
        isSciCompPyCertV7,
        isDataAnalysisPyCertV7,
        isMachineLearningPyCertV7,
        username
      }
    } = this.props;

    const userCertificates = {
      'responsive-web-design': isRespWebDesignCert,
      'javascript-algorithms-and-data-structures': isJsAlgoDataStructCert,
      'front-end-libraries': isFrontEndLibsCert,
      'data-visualization': is2018DataVisCert,
      'apis-and-microservices': isApisMicroservicesCert,
      'quality-assurance': isQaCertV7,
      'information-security': isInfosecCertV7,
      'scientific-computing-with-python': isSciCompPyCertV7,
      'data-analysis-with-python': isDataAnalysisPyCertV7,
      'machine-learning-with-python': isMachineLearningPyCertV7
    };

    const cert = certMap.find(x => x.title === title);
    const isCertified = userCertificates[superBlock];
    const certLocation = `/certification/${username}/${cert.slug}`;
    const certCheckmarkStyle = { height: '40px', width: '40px' };
    const i18nSuperBlock = t(`intro:${superBlock}.title`);
    const i18nCertText = t(`intro:misc-text.certification`, {
      cert: i18nSuperBlock
    });

    return (
      <div className='block'>
        <button
          className={`map-cert-title ${
            isCertified ? 'map-is-cert' : 'no-cursor'
          }`}
          onClick={isCertified ? () => navigate(certLocation) : null}
        >
          <CertificationIcon />
          <h3>{i18nCertText}</h3>
          <div className='map-title-completed-big'>
            <span>
              {isCertified ? (
                <GreenPass style={certCheckmarkStyle} />
              ) : (
                <GreenNotCompleted style={certCheckmarkStyle} />
              )}
            </span>
          </div>
        </button>
      </div>
    );
  }
}

CertChallenge.displayName = 'CertChallenge';
CertChallenge.propTypes = propTypes;

export default connect(mapStateToProps)(withTranslation()(CertChallenge));
