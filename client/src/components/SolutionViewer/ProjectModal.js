import { Button, Modal } from '@freecodecamp/react-bootstrap';
import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import SolutionViewer from './SolutionViewer';

const propTypes = {
  files: PropTypes.arrayOf(
    PropTypes.shape({
      contents: PropTypes.string,
      ext: PropTypes.string,
      key: PropTypes.string,
      name: PropTypes.string,
      path: PropTypes.string
    })
  ),
  handleSolutionModalHide: PropTypes.func,
  isOpen: PropTypes.bool,
  projectTitle: PropTypes.string,
  solution: PropTypes.string
};

const ProjectModal = props => {
  const {
    isOpen,
    projectTitle,
    files,
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
        <SolutionViewer files={files} solution={solution} />
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
