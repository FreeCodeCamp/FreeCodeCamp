import {
  Table,
  Button,
  DropdownButton,
  MenuItem
} from '@freecodecamp/react-bootstrap';
import { Link, navigate } from 'gatsby';
import { find, first, values, isString } from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createSelector } from 'reselect';

import { updateLegacyCert } from '../../redux/settings';
import {
  projectMap,
  legacyProjectMap
} from '../../resources/certAndProjectMap';

import { maybeUrlRE } from '../../utils';
import reallyWeirdErrorMessage from '../../utils/reallyWeirdErrorMessage';
import ProjectModal from '../SolutionViewer/ProjectModal';
import { Form } from '../formHelpers';
import { FullWidthRow, Spacer } from '../helpers';

import './certification.css';
import SectionHeader from './SectionHeader';

const mapDispatchToProps = dispatch =>
  bindActionCreators({ updateLegacyCert }, dispatch);

const propTypes = {
  completedChallenges: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      solution: PropTypes.string,
      githubLink: PropTypes.string,
      challengeType: PropTypes.number,
      completedDate: PropTypes.number,
      files: PropTypes.array
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
  updateLegacyCert: PropTypes.func.isRequired,
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
    files: null,
    solution: null,
    isOpen: false
  }
};

export class CertificationSettings extends Component {
  constructor(props) {
    super(props);

    this.state = { ...initialState };
    this.handleSubmitLegacy = this.handleSubmitLegacy.bind(this);
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
    const { solution, githubLink, files } = completedProject;
    const onClickHandler = () =>
      this.setState({
        solutionViewer: {
          projectTitle,
          files,
          solution,
          isOpen: true
        }
      });
    if (files && files.length) {
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

  renderCertifications = certName => {
    const { t } = this.props;
    return (
      <FullWidthRow key={certName}>
        <Spacer />
        <h3 className='text-center'>{certName}</h3>
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
              this.getUserIsCertMap()[certName]
            )}
          </tbody>
        </Table>
      </FullWidthRow>
    );
  };
  renderProjectsFor = (certName, isCert) => {
    const {
      username,
      isHonest,
      createFlashMessage,
      t,
      verifyCert
    } = this.props;
    const { superBlock } = first(projectMap[certName]);
    const certLocation = `/certification/${username}/${superBlock}`;
    const createClickHandler = superBlock => e => {
      e.preventDefault();
      if (isCert) {
        return navigate(certLocation);
      }
      return isHonest
        ? verifyCert(superBlock)
        : createFlashMessage(honestyInfoMessage);
    };
    return projectMap[certName]
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
        <tr key={`cert-${superBlock}-button`}>
          <td colSpan={2}>
            <Button
              block={true}
              bsStyle='primary'
              href={certLocation}
              onClick={createClickHandler(superBlock)}
            >
              {isCert ? t('buttons.show-cert') : t('buttons.claim-cert')}
            </Button>
          </td>
        </tr>
      ]);
  };

  // legacy projects rendering
  handleSubmitLegacy({ values: formChalObj }) {
    const {
      isHonest,
      createFlashMessage,
      verifyCert,
      updateLegacyCert
    } = this.props;
    let legacyTitle;
    let superBlock;
    let certs = Object.keys(legacyProjectMap);
    let loopBreak = false;
    for (let certTitle of certs) {
      for (let chalTitle of legacyProjectMap[certTitle]) {
        if (chalTitle.title === Object.keys(formChalObj)[0]) {
          superBlock = chalTitle.superBlock;
          loopBreak = true;
          legacyTitle = certTitle;
          break;
        }
      }
      if (loopBreak) {
        break;
      }
    }

    // make an object with keys as challenge ids and values as solutions
    let idsToSolutions = {};
    for (let i of Object.keys(formChalObj)) {
      for (let j of legacyProjectMap[legacyTitle]) {
        if (i === j.title) {
          idsToSolutions[j.id] = formChalObj[i];
          break;
        }
      }
    }

    // filter the new solutions that need to be updated
    const completedChallenges = this.props.completedChallenges;
    let challengesToUpdate = {};
    let newChallengeFound = true;
    let oldSubmissions = 0;
    for (let submittedChal of Object.keys(idsToSolutions)) {
      for (let i of completedChallenges) {
        if (i.id === submittedChal) {
          if (idsToSolutions[submittedChal] !== i.solution) {
            challengesToUpdate[submittedChal] = idsToSolutions[submittedChal];
          }
          oldSubmissions++;
          newChallengeFound = false;
          break;
        }
      }
      if (newChallengeFound && idsToSolutions[submittedChal] !== '') {
        challengesToUpdate[submittedChal] = idsToSolutions[submittedChal];
      }
      newChallengeFound = true;
    }

    const valuesSaved = values(formChalObj).filter(Boolean).filter(isString);

    const isProjectSectionComplete = valuesSaved.length === oldSubmissions;

    if (isProjectSectionComplete) {
      return isHonest
        ? verifyCert(superBlock)
        : createFlashMessage(honestyInfoMessage);
    }
    return updateLegacyCert({ challengesToUpdate, superBlock });
  }

  renderLegacyCertifications = certName => {
    const { username, createFlashMessage, completedChallenges, t } = this.props;
    const { superBlock } = first(legacyProjectMap[certName]);
    const certLocation = `/certification/${username}/${superBlock}`;
    const challengeTitles = legacyProjectMap[certName].map(item => item.title);
    const isCertClaimed = this.getUserIsCertMap()[certName];
    const initialObject = {};
    let filledforms = 0;
    legacyProjectMap[certName].forEach(project => {
      let completedProject = find(completedChallenges, function (challenge) {
        return challenge['id'] === project['id'];
      });
      if (!completedProject) {
        initialObject[project.title] = '';
      } else {
        initialObject[project.title] = completedProject.solution;
        filledforms++;
      }
    });

    const options = challengeTitles.reduce(
      (options, current) => {
        options.types[current] = 'url';
        return options;
      },
      { types: {} }
    );

    const formFields = challengeTitles.map(title => ({
      name: title,
      label: title
    }));

    const fullForm = filledforms === challengeTitles.length;

    const createClickHandler = certLocation => e => {
      e.preventDefault();
      if (isCertClaimed) {
        return navigate(certLocation);
      }
      return createFlashMessage(reallyWeirdErrorMessage);
    };

    const buttonStyle = {
      marginBottom: '1.45rem'
    };

    return (
      <FullWidthRow key={superBlock}>
        <Spacer />
        <h3 className='text-center'>{certName}</h3>
        <Form
          buttonText={
            fullForm ? t('buttons.claim-cert') : t('buttons.save-progress')
          }
          enableSubmit={fullForm}
          formFields={formFields}
          hideButton={isCertClaimed}
          id={superBlock}
          initialValues={{
            ...initialObject
          }}
          options={options}
          submit={this.handleSubmitLegacy}
        />
        {isCertClaimed ? (
          <div className={'col-xs-12'}>
            <Button
              bsSize='sm'
              bsStyle='primary'
              className={'col-xs-12'}
              href={certLocation}
              id={'button-' + superBlock}
              onClick={createClickHandler(certLocation)}
              style={buttonStyle}
              target='_blank'
            >
              {t('buttons.show-cert')}
            </Button>
          </div>
        ) : null}
      </FullWidthRow>
    );
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

    // Keep the settings page slug as full-stack rather than
    // legacy-full-stack so we don't break existing links
    const superBlock = 'full-stack';
    const certLocation = `/certification/${username}/${superBlock}`;

    const buttonStyle = {
      marginBottom: '30px',
      padding: '6px 12px',
      fontSize: '18px'
    };

    const createClickHandler = superBlock => e => {
      e.preventDefault();
      if (isFullStackCert) {
        return navigate(certLocation);
      }
      return isHonest
        ? verifyCert(superBlock)
        : createFlashMessage(honestyInfoMessage);
    };
    return (
      <FullWidthRow key={superBlock}>
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
              id={'button-' + superBlock}
              onClick={createClickHandler(superBlock)}
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
              id={'button-' + superBlock}
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
      solutionViewer: { files, solution, isOpen, projectTitle }
    } = this.state;

    const { t } = this.props;
    return (
      <section id='certification-settings'>
        <SectionHeader>{t('settings.headings.certs')}</SectionHeader>
        {certifications.map(this.renderCertifications)}
        <SectionHeader>{t('settings.headings.legacy-certs')}</SectionHeader>
        {this.renderLegacyFullStack()}
        {legacyCertifications.map(this.renderLegacyCertifications)}
        {isOpen ? (
          <ProjectModal
            files={files}
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

export default connect(
  null,
  mapDispatchToProps
)(withTranslation()(CertificationSettings));
