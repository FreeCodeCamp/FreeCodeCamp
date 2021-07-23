import React from 'react';
import PropTypes from 'prop-types';
import SolutionViewer from './SolutionViewer';
import { Button, Modal } from '@freecodecamp/react-bootstrap';
import { useTranslation } from 'react-i18next';

const propTypes = {
  challengeFiles: PropTypes.array,
  // TODO: removed once refactored to TS
  //   PropTypes.shape({
  //     contents: PropTypes.string,
  //     ext: PropTypes.string,
  //     key: PropTypes.string,
  //     name: PropTypes.string,
  //     path: PropTypes.string
  //   })
  // ),
  handleSolutionModalHide: PropTypes.func,
  isOpen: PropTypes.bool,
  projectTitle: PropTypes.string,
  solution: PropTypes.string
};

const ProjectModal = props => {
  const {
    isOpen,
    projectTitle,
    challengeFiles,
    solution,
    handleSolutionModalHide
  } = props;
  const { t } = useTranslation();
  return (
    <Modal
      aria-labelledby='solution-viewer-modal-title'
      bsSize='large'
      onHide={handleSolutionModalHide}
      show={isOpen}
    >
      <Modal.Header className='this-one?' closeButton={true}>
        <Modal.Title id='solution-viewer-modal-title'>
          {t('settings.labels.solution-for', {
            projectTitle: projectTitle
          })}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <SolutionViewer challengeFiles={challengeFiles} solution={solution} />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleSolutionModalHide}>{t('buttons.close')}</Button>
      </Modal.Footer>
    </Modal>
  );
};

ProjectModal.propTypes = propTypes;
ProjectModal.displayName = 'ProjectModal';

export default ProjectModal;
