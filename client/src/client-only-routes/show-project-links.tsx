import React, { useState } from 'react';
import '../components/layouts/project-links.css';
import { maybeUrlRE } from '../utils';
import { Spacer, Link } from '../components/helpers';
import {
  projectMap,
  legacyProjectMap
} from '../resources/cert-and-project-map';
import ProjectModal from '../components/SolutionViewer/ProjectModal';
import { find, first } from 'lodash-es';
import { Trans, useTranslation } from 'react-i18next';
import {
  ChallengeFileType,
  CompletedChallenge,
  UserType
} from '../redux/prop-types';

interface IShowProjectLinksProps {
  certName: string;
  name: string;
  user: UserType;
}

type SolutionStateType = {
  projectTitle: string;
  files?: ChallengeFileType[] | null;
  solution: CompletedChallenge['solution'];
  isOpen: boolean;
};

const initSolutionState: SolutionStateType = {
  projectTitle: '',
  files: null,
  solution: null,
  isOpen: false
};

const ShowProjectLinks = (props: IShowProjectLinksProps): JSX.Element => {
  const [solutionState, setSolutionState] = useState(initSolutionState);

  const handleSolutionModalHide = () => setSolutionState(initSolutionState);

  const { t } = useTranslation();

  const getProjectSolution = (projectId: string, projectTitle: string) => {
    const {
      user: { completedChallenges }
    } = props;
    const completedProject = find(
      completedChallenges,
      ({ id }) => projectId === id
    ) as CompletedChallenge;

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

    if (files) {
      return (
        <button
          className='project-link-button-override'
          onClick={onClickHandler}
        >
          {t('certification.project.solution')}
        </button>
      );
    }
    if (githubLink) {
      return (
        <>
          <a href={solution ?? ''} rel='noopener noreferrer' target='_blank'>
            {t('certification.project.solution')}
          </a>
          ,{' '}
          <a href={githubLink} rel='noopener noreferrer' target='_blank'>
            {t('certification.project.source')}
          </a>
        </>
      );
    }
    if (maybeUrlRE.test(solution ?? '')) {
      return (
        <a
          className='btn-invert'
          href={solution ?? ''}
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

  const renderProjectsFor = (certName: string) => {
    if (certName === 'Legacy Full Stack') {
      const legacyCerts = [
        { title: 'Responsive Web Design' },
        { title: 'JavaScript Algorithms and Data Structures' },
        { title: 'Front End Development Libraries' },
        { title: 'Data Visualization' },
        { title: 'Back End Development and APIs' },
        { title: 'Legacy Information Security and Quality Assurance' }
      ];
      return legacyCerts.map((cert, ind) => {
        /* eslint-disable @typescript-eslint/no-unsafe-assignment */
        /* eslint-disable @typescript-eslint/no-unsafe-call */
        /* eslint-disable @typescript-eslint/no-unsafe-return */
        /* eslint-disable @typescript-eslint/no-unsafe-member-access */
        // @ts-expect-error Error expected until projectMap is typed
        const mapToUse = projectMap[cert.title] || legacyProjectMap[cert.title];
        const { certSlug } = first(mapToUse) as { certSlug: string };
        const certLocation = `/certification/${username}/${certSlug}`;
        return (
          <li key={ind}>
            <a
              className='btn-invert project-link'
              href={certLocation}
              rel='noopener noreferrer'
              target='_blank'
            >
              {t(`certification.project.title.${cert.title}`, cert.title)}
            </a>
          </li>
        );
      });
    }
    // @ts-expect-error Error expected until projectMap is typed
    return (projectMap[certName] || legacyProjectMap[certName]).map(
      // @ts-expect-error Error expected until projectMap is typed
      ({ link, title, id }) => (
        <li key={id}>
          <Link className='project-link' to={link}>
            {t(`certification.project.title.${title as string}`, title)}
          </Link>
          : {getProjectSolution(id, title)}
        </li>
      )
    );
    /* eslint-disable @typescript-eslint/no-unsafe-assignment */
    /* eslint-disable @typescript-eslint/no-unsafe-call */
    /* eslint-disable @typescript-eslint/no-unsafe-return */
    /* eslint-disable @typescript-eslint/no-unsafe-member-access */
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
          rel='noreferrer'
          target='_blank'
        >
          academic honesty policy
        </a>
        , please{' '}
        <a
          href={`/user/${username}/report-user`}
          rel='noreferrer'
          target='_blank'
        >
          report this to our team
        </a>
        .
      </Trans>
    </div>
  );
};

ShowProjectLinks.displayName = 'ShowProjectLinks';

export default ShowProjectLinks;
