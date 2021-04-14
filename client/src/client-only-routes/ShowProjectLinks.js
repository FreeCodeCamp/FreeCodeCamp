/* eslint-disable react/jsx-sort-props */
import { find, first } from 'lodash';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import ProjectModal from '../components/SolutionViewer/ProjectModal';
import { Spacer, Link } from '../components/helpers';
import { projectMap, legacyProjectMap } from '../resources/certAndProjectMap';
import { maybeUrlRE } from '../utils';

import '../components/layouts/project-links.css';

const propTypes = {
  certName: PropTypes.string,
  name: PropTypes.string,
  user: PropTypes.shape({
    completedChallenges: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        solution: PropTypes.string,
        githubLink: PropTypes.string,
        files: PropTypes.arrayOf(
          PropTypes.shape({
            contents: PropTypes.string,
            ext: PropTypes.string,
            key: PropTypes.string,
            name: PropTypes.string,
            path: PropTypes.string
          })
        )
      })
    ),
    username: PropTypes.string
  })
};

const initSolutionState = {
  projectTitle: '',
  files: null,
  solution: null,
  isOpen: false
};

const ShowProjectLinks = props => {
  const [solutionState, setSolutionState] = useState(initSolutionState);

  const handleSolutionModalHide = () => setSolutionState(initSolutionState);

  const { t } = useTranslation();

  const getProjectSolution = (projectId, projectTitle) => {
    const {
      user: { completedChallenges }
    } = props;

    const completedProject = find(
      completedChallenges,
      ({ id }) => projectId === id
    );

    if (!completedProject) {
      return null;
    }

    const { solution, githubLink, files } = completedProject;
    const onClickHandler = () =>
      setSolutionState({
        projectTitle,
        files,
        solution,
        isOpen: true
      });

    if (files && files.length) {
      return (
        <button
          onClick={onClickHandler}
          className='project-link-button-override'
        >
          {t('certification.project.solution')}
        </button>
      );
    }
    if (githubLink) {
      return (
        <>
          <a href={solution} rel='noopener noreferrer' target='_blank'>
            {t('certification.project.solution')}
          </a>
          ,{' '}
          <a href={githubLink} rel='noopener noreferrer' target='_blank'>
            {t('certification.project.source')}
          </a>
        </>
      );
    }
    if (maybeUrlRE.test(solution)) {
      return (
        <a
          block={'true'}
          className='btn-invert'
          href={solution}
          rel='noopener noreferrer'
          target='_blank'
        >
          {t('certification.project.solution')}
        </a>
      );
    }
    return (
      <button className='project-link-button-override' onClick={onClickHandler}>
        {t('certification.project.solution')}
      </button>
    );
  };

  const renderProjectsFor = certName => {
    if (certName === 'Legacy Full Stack') {
      const legacyCerts = [
        { title: 'Responsive Web Design' },
        { title: 'JavaScript Algorithms and Data Structures' },
        { title: 'Front End Libraries' },
        { title: 'Data Visualization' },
        { title: 'APIs and Microservices' },
        { title: 'Legacy Information Security and Quality Assurance' }
      ];
      return legacyCerts.map((cert, ind) => {
        const mapToUse = projectMap[cert.title] || legacyProjectMap[cert.title];
        const { superBlock } = first(mapToUse);
        const certLocation = `/certification/${username}/${superBlock}`;
        return (
          <li key={ind}>
            <a
              href={certLocation}
              className='btn-invert project-link'
              rel='noopener noreferrer'
              target='_blank'
            >
              {t(`certification.project.title.${cert.title}`, cert.title)}
            </a>
          </li>
        );
      });
    }
    return (projectMap[certName] || legacyProjectMap[certName]).map(
      ({ link, title, id }) => (
        <li key={id}>
          <Link to={link} className='project-link'>
            {t(`certification.project.title.${title}`, title)}
          </Link>
          : {getProjectSolution(id, title)}
        </li>
      )
    );
  };

  const {
    certName,
    name,
    user: { username }
  } = props;
  const { files, isOpen, projectTitle, solution } = solutionState;
  return (
    <div>
      {t(
        certName === 'Legacy Full Stack'
          ? 'certification.project.heading-legacy-full-stack'
          : 'certification.project.heading',
        { user: name }
      )}
      <Spacer />
      <ul>{renderProjectsFor(certName)}</ul>
      <Spacer />
      {isOpen ? (
        <ProjectModal
          files={files}
          handleSolutionModalHide={handleSolutionModalHide}
          isOpen={isOpen}
          projectTitle={projectTitle}
          solution={solution}
        />
      ) : null}
      <Trans i18nKey='certification.project.footnote'>
        If you suspect that any of these projects violate the{' '}
        <a
          href='https://www.freecodecamp.org/news/academic-honesty-policy/'
          target='_blank'
          rel='noreferrer'
        >
          academic honesty policy
        </a>
        , please{' '}
        <a
          href={`/user/${username}/report-user`}
          target='_blank'
          rel='noreferrer'
        >
          report this to our team
        </a>
        .
      </Trans>
    </div>
  );
};

ShowProjectLinks.propTypes = propTypes;
ShowProjectLinks.displayName = 'ShowProjectLinks';

export default ShowProjectLinks;
