import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createSelector } from 'reselect';

import {
  toggleVisibleEditor,
  visibleEditorsSelector,
  challengeFilesSelector
} from '../redux';

const propTypes = {
  challengeFiles: PropTypes.array.isRequired,
  toggleVisibleEditor: PropTypes.func.isRequired,
  visibleEditors: PropTypes.shape({
    indexjs: PropTypes.bool,
    indexjsx: PropTypes.bool,
    indexcss: PropTypes.bool,
    indexhtml: PropTypes.bool
  })
};

const mapStateToProps = createSelector(
  visibleEditorsSelector,
  challengeFilesSelector,
  (visibleEditors, challengeFiles) => ({
    visibleEditors,
    challengeFiles
  })
);

const mapDispatchToProps = {
  toggleVisibleEditor
};

class EditorTabs extends Component {
  render() {
    const { challengeFiles, toggleVisibleEditor, visibleEditors } = this.props;
    return (
      <div className='monaco-editor-tabs'>
        {challengeFiles.map(challengeFile => (
          <button
            aria-selected={visibleEditors[challengeFile.fileKey]}
            className='monaco-editor-tab'
            key={challengeFile.fileKey}
            onClick={() => toggleVisibleEditor(challengeFile.fileKey)}
            role='tab'
          >
            {challengeFile.path}
          </button>
        ))}
      </div>
    );
  }
}

EditorTabs.displayName = 'EditorTabs';
EditorTabs.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(EditorTabs);
