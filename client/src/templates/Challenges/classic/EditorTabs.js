import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import {
  toggleVisibleEditor,
  visibleEditorsSelector,
  challengeFilesSelector
} from '../redux';

const propTypes = {
  challengeFiles: PropTypes.object.isRequired,
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
        {challengeFiles['indexjsx'] && (
          <button
            aria-selected={visibleEditors.indexjsx}
            className='monaco-editor-tab'
            onClick={() => toggleVisibleEditor('indexjsx')}
            role='tab'
          >
            script.jsx
          </button>
        )}
        {challengeFiles['indexhtml'] && (
          <button
            aria-selected={visibleEditors.indexhtml}
            className='monaco-editor-tab'
            onClick={() => toggleVisibleEditor('indexhtml')}
            role='tab'
          >
            index.html
          </button>
        )}
        {challengeFiles['indexcss'] && (
          <button
            aria-selected={visibleEditors.indexcss}
            className='monaco-editor-tab'
            onClick={() => toggleVisibleEditor('indexcss')}
            role='tab'
          >
            styles.css
          </button>
        )}
        {challengeFiles['indexjs'] && (
          <button
            aria-selected={visibleEditors.indexjs}
            className='monaco-editor-tab'
            onClick={() => toggleVisibleEditor('indexjs')}
            role='tab'
          >
            script.js
          </button>
        )}
      </div>
    );
  }
}

EditorTabs.displayName = 'EditorTabs';
EditorTabs.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(EditorTabs);
