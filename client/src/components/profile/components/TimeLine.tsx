/* eslint-disable @typescript-eslint/unbound-method */
import React, { Component, useMemo } from 'react';
import { reverse, sortBy } from 'lodash-es';
import {
  Button,
  Modal,
  Table,
  DropdownButton,
  MenuItem
} from '@freecodecamp/react-bootstrap';
import { useStaticQuery, graphql } from 'gatsby';
import { TFunction, withTranslation } from 'react-i18next';

import './timeline.css';
import TimelinePagination from './TimelinePagination';
import { FullWidthRow, Link } from '../../helpers';
import Loadable from '@loadable/component';

import {
  getCertIds,
  getPathFromID,
  getTitleFromId
} from '../../../../../utils';

import { maybeUrlRE } from '../../../utils';
import CertificationIcon from '../../../assets/icons/certification-icon';

import { langCodes } from '../../../../../config/i18n/all-langs';
import envData from '../../../../../config/env.json';
import { ChallengeFile } from '../../../redux/prop-types';

const SolutionViewer = Loadable(
  () => import('../../SolutionViewer/SolutionViewer')
);

const { clientLocale } = envData as { clientLocale: keyof typeof langCodes };
const localeCode = langCodes[clientLocale];

// Items per page in timeline.
const ITEMS_PER_PAGE = 15;

interface CompletedMap {
  id: string;
  completedDate: number;
  challengeType: number;
  solution: string;
  challengeFiles: ChallengeFile[];
  githubLink: string;
}

interface TimelineProps {
  completedMap: CompletedMap[];
  t: TFunction<'translation'>;
  username: string;
}

interface SortedTimeline {
  id: string;
  completedDate: number;
  challengeFiles: ChallengeFile[];
  githubLink: string;
  solution: string;
}

interface TimelineInnerProps extends TimelineProps {
  idToNameMap: Map<string, string>;
  sortedTimeline: SortedTimeline[];
  totalPages: number;
}

interface TimeLineInnerState {
  solutionToView: string | null;
  solutionOpen: boolean;
  pageNo: number;
  solution: string | null;
  challengeFiles: ChallengeFile[] | null;
}

class TimelineInner extends Component<TimelineInnerProps, TimeLineInnerState> {
  constructor(props: TimelineInnerProps) {
    super(props);

    this.state = {
      solutionToView: null,
      solutionOpen: false,
      pageNo: 1,
      solution: null,
      challengeFiles: null
    };

    this.closeSolution = this.closeSolution.bind(this);
    this.renderCompletion = this.renderCompletion.bind(this);
    this.viewSolution = this.viewSolution.bind(this);
    this.firstPage = this.firstPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.lastPage = this.lastPage.bind(this);
    this.renderViewButton = this.renderViewButton.bind(this);
  }

  renderViewButton(
    id: string,
    challengeFiles: ChallengeFile[],
    githubLink: string,
    solution: string
  ): React.ReactNode {
    const { t } = this.props;
    if (challengeFiles?.length) {
      return (
        <Button
          block={true}
          bsStyle='primary'
          className='btn-invert'
          id={`btn-for-${id}`}
          onClick={() => this.viewSolution(id, solution, challengeFiles)}
        >
          {t('buttons.show-code')}
        </Button>
      );
    } else if (githubLink) {
      return (
        <div className='solutions-dropdown'>
          <DropdownButton
            block={true}
            bsStyle='primary'
            className='btn-invert'
            id={`dropdown-for-${id}`}
            title='View'
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
    } else if (maybeUrlRE.test(solution)) {
      return (
        <Button
          block={true}
          bsStyle='primary'
          className='btn-invert'
          href={solution}
          id={`btn-for-${id}`}
          rel='noopener noreferrer'
          target='_blank'
        >
          {t('buttons.view')}
        </Button>
      );
    } else {
      return null;
    }
  }

  renderCompletion(completed: SortedTimeline): JSX.Element {
    const { idToNameMap, username } = this.props;
    const { id, challengeFiles, githubLink, solution } = completed;
    const completedDate = new Date(completed.completedDate);
    // @ts-expect-error idToNameMap is not a <string, string> Map...
    const { challengeTitle, challengePath, certPath } = idToNameMap.get(id);
    return (
      <tr className='timeline-row' key={id}>
        <td>
          {certPath ? (
            <Link
              className='timeline-cert-link'
              external={true}
              to={`certification/${username}/${certPath as string}`}
            >
              {challengeTitle}
              <CertificationIcon />
            </Link>
          ) : (
            <Link to={challengePath as string}>{challengeTitle}</Link>
          )}
        </td>
        <td>
          {this.renderViewButton(id, challengeFiles, githubLink, solution)}
        </td>
        <td className='text-center'>
          <time dateTime={completedDate.toISOString()}>
            {completedDate.toLocaleString([localeCode, 'en-US'], {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}
          </time>
        </td>
      </tr>
    );
  }
  viewSolution(
    id: string,
    solution: string,
    challengeFiles: ChallengeFile[]
  ): void {
    this.setState(state => ({
      ...state,
      solutionToView: id,
      solutionOpen: true,
      solution,
      challengeFiles
    }));
  }

  closeSolution() {
    this.setState(state => ({
      ...state,
      solutionToView: null,
      solutionOpen: false,
      solution: null,
      challengeFiles: null
    }));
  }

  firstPage() {
    this.setState({
      pageNo: 1
    });
  }
  nextPage() {
    this.setState(state => ({
      pageNo: state.pageNo + 1
    }));
  }

  prevPage() {
    this.setState(state => ({
      pageNo: state.pageNo - 1
    }));
  }
  lastPage() {
    this.setState((_, props) => ({
      pageNo: props.totalPages
    }));
  }
  render() {
    const {
      completedMap,
      idToNameMap,
      username,
      sortedTimeline,
      t,
      totalPages = 1
    } = this.props;
    const { solutionToView: id, solutionOpen, pageNo = 1 } = this.state;
    const startIndex = (pageNo - 1) * ITEMS_PER_PAGE;
    const endIndex = pageNo * ITEMS_PER_PAGE;

    return (
      <FullWidthRow>
        <h2 className='text-center'>{t('profile.timeline')}</h2>
        {completedMap.length === 0 ? (
          <p className='text-center'>
            {t('profile.none-completed')}&nbsp;
            <Link to='/learn'>{t('profile.get-started')}</Link>
          </p>
        ) : (
          <Table condensed={true} striped={true}>
            <thead>
              <tr>
                <th>{t('profile.challenge')}</th>
                <th>{t('settings.labels.solution')}</th>
                <th className='text-center'>{t('profile.completed')}</th>
              </tr>
            </thead>
            <tbody>
              {sortedTimeline
                .slice(startIndex, endIndex)
                .map(this.renderCompletion)}
            </tbody>
          </Table>
        )}
        {id && (
          <Modal
            aria-labelledby='contained-modal-title'
            onHide={this.closeSolution}
            show={solutionOpen}
          >
            <Modal.Header closeButton={true}>
              <Modal.Title id='contained-modal-title'>
                {`${username}'s Solution to ${
                  // @ts-expect-error Need better TypeDef for this
                  idToNameMap.get(id).challengeTitle as string
                }`}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <SolutionViewer
                challengeFiles={this.state.challengeFiles}
                solution={this.state.solution ?? ''}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.closeSolution}>{t('buttons.close')}</Button>
            </Modal.Footer>
          </Modal>
        )}
        {totalPages > 1 && (
          <TimelinePagination
            firstPage={this.firstPage}
            lastPage={this.lastPage}
            nextPage={this.nextPage}
            pageNo={pageNo}
            prevPage={this.prevPage}
            totalPages={totalPages}
          />
        )}
      </FullWidthRow>
    );
  }
}
/* eslint-disable */
function useIdToNameMap(): Map<string, string> {
  const {
    allChallengeNode: { edges }
  } = useStaticQuery(graphql`
    query challengeNodes {
      allChallengeNode {
        edges {
          node {
            fields {
              slug
            }
            id
            title
          }
        }
      }
    }
  `);
  const idToNameMap = new Map();
  for (const id of getCertIds()) {
    idToNameMap.set(id, {
      challengeTitle: `${getTitleFromId(id)} Certification`,
      certPath: getPathFromID(id)
    });
  }
  edges.forEach(
    ({
      node: {
        // @ts-expect-error Graphql needs typing
        id,
        // @ts-expect-error Graphql needs typing
        title,
        // @ts-expect-error Graphql needs typing
        fields: { slug }
      }
    }) => {
      idToNameMap.set(id, { challengeTitle: title, challengePath: slug });
    }
  );
  return idToNameMap;
  /* eslint-enable */
}

const Timeline = (props: TimelineProps): JSX.Element => {
  const idToNameMap = useIdToNameMap();
  const { completedMap } = props;
  // Get the sorted timeline along with total page count.
  const { sortedTimeline, totalPages } = useMemo(() => {
    const sortedTimeline = reverse(
      sortBy(completedMap, ['completedDate']).filter(challenge => {
        return idToNameMap.has(challenge.id);
      })
    );
    const totalPages = Math.ceil(sortedTimeline.length / ITEMS_PER_PAGE);
    return { sortedTimeline, totalPages };
  }, [completedMap, idToNameMap]);
  return (
    <TimelineInner
      idToNameMap={idToNameMap}
      sortedTimeline={sortedTimeline}
      totalPages={totalPages}
      {...props}
    />
  );
};

Timeline.displayName = 'Timeline';

export default withTranslation()(Timeline);
