import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { find, first } from 'lodash-es';
import {
  Table,
  Button,
  DropdownButton,
  MenuItem
} from '@freecodecamp/react-bootstrap';
import { Link, navigate } from 'gatsby';
import { createSelector } from 'reselect';
import { withTranslation } from 'react-i18next';

import {
  projectMap,
  legacyProjectMap
} from '../../resources/cert-and-project-map';

import SectionHeader from './section-header';
import ProjectModal from '../SolutionViewer/ProjectModal';
import { FullWidthRow, Spacer } from '../helpers';

import { maybeUrlRE } from '../../utils';

import './certification.css';

const propTypes = {
  completedChallenges: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      solution: PropTypes.string,
      githubLink: PropTypes.string,
      challengeType: PropTypes.number,
      completedDate: PropTypes.number,
      challengeFiles: PropTypes.array
    })
  ),
  createFlashMessage: PropTypes.func.isRequired,
  is2018DataVisCert: PropTypes.bool,
  isApisMicroservicesCert: PropTypes.bool,
  isBackEndCert: PropTypes.bool,
  isDataAnalysisPyCertV7: PropTypes.bool,
  isDataVisCert: PropTypes.bool,
  isFrontEndCert: PropTypes.bool,
  isFrontEndLibsCert: PropTypes.bool,
  isFullStackCert: PropTypes.bool,
  isHonest: PropTypes.bool,
  isInfosecCertV7: PropTypes.bool,
  isInfosecQaCert: PropTypes.bool,
  isJsAlgoDataStructCert: PropTypes.bool,
  isMachineLearningPyCertV7: PropTypes.bool,
  isQaCertV7: PropTypes.bool,
  isRespWebDesignCert: PropTypes.bool,
  isSciCompPyCertV7: PropTypes.bool,
  t: PropTypes.func.isRequired,
  username: PropTypes.string,
  verifyCert: PropTypes.func.isRequired
};

const certifications = Object.keys(projectMap);
const legacyCertifications = Object.keys(legacyProjectMap);
const isCertSelector = ({
  is2018DataVisCert,
  isApisMicroservicesCert,
  isJsAlgoDataStructCert,
  isBackEndCert,
  isDataVisCert,
  isFrontEndCert,
  isInfosecQaCert,
  isQaCertV7,
  isInfosecCertV7,
  isFrontEndLibsCert,
  isFullStackCert,
  isRespWebDesignCert,
  isSciCompPyCertV7,
  isDataAnalysisPyCertV7,
  isMachineLearningPyCertV7
}) => ({
  is2018DataVisCert,
  isApisMicroservicesCert,
  isJsAlgoDataStructCert,
  isBackEndCert,
  isDataVisCert,
  isFrontEndCert,
  isInfosecQaCert,
  isQaCertV7,
  isInfosecCertV7,
  isFrontEndLibsCert,
  isFullStackCert,
  isRespWebDesignCert,
  isSciCompPyCertV7,
  isDataAnalysisPyCertV7,
  isMachineLearningPyCertV7
});

const isCertMapSelector = createSelector(
  isCertSelector,
  ({
    is2018DataVisCert,
    isApisMicroservicesCert,
    isJsAlgoDataStructCert,
    isInfosecQaCert,
    isQaCertV7,
    isInfosecCertV7,
    isFrontEndLibsCert,
    isRespWebDesignCert,
    isDataVisCert,
    isFrontEndCert,
    isBackEndCert,
    isSciCompPyCertV7,
    isDataAnalysisPyCertV7,
    isMachineLearningPyCertV7
  }) => ({
    'Responsive Web Design': isRespWebDesignCert,
    'JavaScript Algorithms and Data Structures': isJsAlgoDataStructCert,
    'Front End Libraries': isFrontEndLibsCert,
    'Data Visualization': is2018DataVisCert,
    'APIs and Microservices': isApisMicroservicesCert,
    'Quality Assurance': isQaCertV7,
    'Information Security': isInfosecCertV7,
    'Scientific Computing with Python': isSciCompPyCertV7,
    'Data Analysis with Python': isDataAnalysisPyCertV7,
    'Machine Learning with Python': isMachineLearningPyCertV7,
    'Legacy Front End': isFrontEndCert,
    'Legacy Data Visualization': isDataVisCert,
    'Legacy Back End': isBackEndCert,
    'Legacy Information Security and Quality Assurance': isInfosecQaCert
  })
);

const honestyInfoMessage = {
  type: 'info',
  message: 'flash.honest-first'
};

const initialState = {
  solutionViewer: {
    projectTitle: '',
    challengeFiles: null,
    solution: null,
    isOpen: false
  }
};

export class CertificationSettings extends Component {
  constructor(props) {
    super(props);

    this.state = { ...initialState };
  }

  createHandleLinkButtonClick = to => e => {
    e.preventDefault();
    return navigate(to);
  };

  handleSolutionModalHide = () => this.setState({ ...initialState });

  getUserIsCertMap = () => isCertMapSelector(this.props);

  getProjectSolution = (projectId, projectTitle) => {
    const { completedChallenges, t } = this.props;
    const completedProject = find(
      completedChallenges,
      ({ id }) => projectId === id
    );
    if (!completedProject) {
      return null;
    }
    const { solution, githubLink, challengeFiles } = completedProject;
    const onClickHandler = () =>
      this.setState({
        solutionViewer: {
          projectTitle,
          challengeFiles,
          solution,
          isOpen: true
        }
      });
    if (challengeFiles?.length) {
      return (
        <Button
          block={true}
          bsStyle='primary'
          className='btn-invert'
          id={`btn-for-${projectId}`}
          onClick={onClickHandler}
        >
          {t('buttons.show-code')}
        </Button>
      );
    }
    if (githubLink) {
      return (
        <div className='solutions-dropdown'>
          <DropdownButton
            block={true}
            bsStyle='primary'
            className='btn-invert'
            id={`dropdown-for-${projectId}`}
            title='Show Solutions'
          >
            <MenuItem
              bsStyle='primary'
              href={solution}
              rel='noopener noreferrer'
              target='_blank'
            >
              {t('buttons.frontend')}
            </MenuItem>
            <MenuItem
              bsStyle='primary'
              href={githubLink}
              rel='noopener noreferrer'
              target='_blank'
            >
              {t('buttons.backend')}
            </MenuItem>
          </DropdownButton>
        </div>
      );
    }
    if (maybeUrlRE.test(solution)) {
      return (
        <Button
          block={true}
          bsStyle='primary'
          className='btn-invert'
          href={solution}
          id={`btn-for-${projectId}`}
          rel='noopener noreferrer'
          target='_blank'
        >
          {t('buttons.show-solution')}
        </Button>
      );
    }
    return (
      <Button
        block={true}
        bsStyle='primary'
        className='btn-invert'
        id={`btn-for-${projectId}`}
        onClick={onClickHandler}
      >
        {t('buttons.show-code')}
      </Button>
    );
  };

  renderCertifications = (certName, projectsMap) => {
    const { t } = this.props;
    const { certSlug } = first(projectsMap[certName]);
    return (
      <FullWidthRow key={certName}>
        <Spacer />
        <h3 className='text-center' id={`cert-${certSlug}`}>
          {certName}
        </h3>
        <Table>
          <thead>
            <tr>
              <th>{t('settings.labels.project-name')}</th>
              <th>{t('settings.labels.solution')}</th>
            </tr>
          </thead>
          <tbody>
            {this.renderProjectsFor(
              certName,
              this.getUserIsCertMap()[certName],
              projectsMap
            )}
          </tbody>
        </Table>
      </FullWidthRow>
    );
  };
  renderProjectsFor = (certName, isCert, projectsMap) => {
    const { username, isHonest, createFlashMessage, t, verifyCert } =
      this.props;
    const { certSlug } = first(projectsMap[certName]);
    const certLocation = `/certification/${username}/${certSlug}`;
    const createClickHandler = certSlug => e => {
      e.preventDefault();
      if (isCert) {
        return navigate(certLocation);
      }
      return isHonest
        ? verifyCert(certSlug)
        : createFlashMessage(honestyInfoMessage);
    };
    return projectsMap[certName]
      .map(({ link, title, id }) => (
        <tr className='project-row' key={id}>
          <td className='project-title col-sm-8'>
            <Link to={link}>{title}</Link>
          </td>
          <td className='project-solution col-sm-4'>
            {this.getProjectSolution(id, title)}
          </td>
        </tr>
      ))
      .concat([
        <tr key={`cert-${certSlug}-button`}>
          <td colSpan={2}>
            <Button
              block={true}
              bsStyle='primary'
              href={certLocation}
              onClick={createClickHandler(certSlug)}
            >
              {isCert ? t('buttons.show-cert') : t('buttons.claim-cert')}
            </Button>
          </td>
        </tr>
      ]);
  };

  renderLegacyFullStack = () => {
    const {
      isFullStackCert,
      username,
      isHonest,
      createFlashMessage,
      verifyCert,
      is2018DataVisCert,
      isApisMicroservicesCert,
      isFrontEndLibsCert,
      isInfosecQaCert,
      isJsAlgoDataStructCert,
      isRespWebDesignCert,
      t
    } = this.props;

    const fullStackClaimable =
      is2018DataVisCert &&
      isApisMicroservicesCert &&
      isFrontEndLibsCert &&
      isInfosecQaCert &&
      isJsAlgoDataStructCert &&
      isRespWebDesignCert;

    // Keep the settings page certSlug as full-stack rather than
    // legacy-full-stack so we don't break existing links
    const certSlug = 'full-stack';
    const certLocation = `/certification/${username}/${certSlug}`;

    const buttonStyle = {
      marginBottom: '30px',
      padding: '6px 12px',
      fontSize: '18px'
    };

    const createClickHandler = certSlug => e => {
      e.preventDefault();
      if (isFullStackCert) {
        return navigate(certLocation);
      }
      return isHonest
        ? verifyCert(certSlug)
        : createFlashMessage(honestyInfoMessage);
    };
    return (
      <FullWidthRow key={certSlug}>
        <Spacer />
        <h3 className='text-center'>Legacy Full Stack Certification</h3>
        <div>
          <p>
            {t('settings.claim-legacy', {
              cert: 'Legacy Full Stack Certification'
            })}
          </p>
          <ul>
            <li>Responsive Web Design</li>
            <li>JavaScript Algorithms and Data Structures</li>
            <li>Front End Libraries</li>
            <li>Data Visualization</li>
            <li>APIs and Microservices</li>
            <li>Legacy Information Security and Quality Assurance</li>
          </ul>
        </div>

        <div className={'col-xs-12'}>
          {fullStackClaimable ? (
            <Button
              bsSize='sm'
              bsStyle='primary'
              className={'col-xs-12'}
              href={certLocation}
              id={'button-' + certSlug}
              onClick={createClickHandler(certSlug)}
              style={buttonStyle}
              target='_blank'
            >
              {isFullStackCert
                ? t('buttons.show-cert')
                : t('buttons.claim-cert')}
            </Button>
          ) : (
            <Button
              bsSize='sm'
              bsStyle='primary'
              className={'col-xs-12'}
              disabled={true}
              id={'button-' + certSlug}
              style={buttonStyle}
              target='_blank'
            >
              {t('buttons.claim-cert')}
            </Button>
          )}
        </div>
        <Spacer />
      </FullWidthRow>
    );
  };

  render() {
    const {
      solutionViewer: { challengeFiles, solution, isOpen, projectTitle }
    } = this.state;

    const { t } = this.props;
    return (
      <section id='certification-settings'>
        <SectionHeader>{t('settings.headings.certs')}</SectionHeader>
        {certifications.map(certName =>
          this.renderCertifications(certName, projectMap)
        )}
        <SectionHeader>{t('settings.headings.legacy-certs')}</SectionHeader>
        {this.renderLegacyFullStack()}
        {legacyCertifications.map(certName =>
          this.renderCertifications(certName, legacyProjectMap)
        )}
        {isOpen ? (
          <ProjectModal
            challengeFiles={challengeFiles}
            handleSolutionModalHide={this.handleSolutionModalHide}
            isOpen={isOpen}
            projectTitle={projectTitle}
            solution={solution}
            t={t}
          />
        ) : null}
      </section>
    );
  }
}

CertificationSettings.displayName = 'CertificationSettings';
CertificationSettings.propTypes = propTypes;

export default withTranslation()(CertificationSettings);
