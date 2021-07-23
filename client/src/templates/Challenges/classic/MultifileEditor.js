import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ReflexContainer, ReflexElement, ReflexSplitter } from 'react-reflex';
import { createSelector } from 'reselect';
import { getTargetEditor } from '../utils/getTargetEditor';
import { isDonationModalOpenSelector, userSelector } from '../../../redux';
import {
  canFocusEditorSelector,
  consoleOutputSelector,
  executeChallenge,
  inAccessibilityModeSelector,
  saveEditorContent,
  setAccessibilityMode,
  setEditorFocusability,
  visibleEditorsSelector,
  updateFile
} from '../redux';
import './editor.css';
import Editor from './editor';

const propTypes = {
  canFocus: PropTypes.bool,
  // TODO: use shape
  challengeFiles: PropTypes.array,
  containerRef: PropTypes.any.isRequired,
  contents: PropTypes.string,
  description: PropTypes.string,
  dimensions: PropTypes.object,
  editorRef: PropTypes.any.isRequired,
  executeChallenge: PropTypes.func.isRequired,
  ext: PropTypes.string,
  fileKey: PropTypes.string,
  inAccessibilityMode: PropTypes.bool.isRequired,
  initialEditorContent: PropTypes.string,
  initialExt: PropTypes.string,
  output: PropTypes.arrayOf(PropTypes.string),
  resizeProps: PropTypes.shape({
    onStopResize: PropTypes.func,
    onResize: PropTypes.func
  }),
  saveEditorContent: PropTypes.func.isRequired,
  setAccessibilityMode: PropTypes.func.isRequired,
  setEditorFocusability: PropTypes.func,
  theme: PropTypes.string,
  updateFile: PropTypes.func.isRequired,
  visibleEditors: PropTypes.shape({
    indexjs: PropTypes.bool,
    indexjsx: PropTypes.bool,
    indexcss: PropTypes.bool,
    indexhtml: PropTypes.bool
  })
};

const mapStateToProps = createSelector(
  visibleEditorsSelector,
  canFocusEditorSelector,
  consoleOutputSelector,
  inAccessibilityModeSelector,
  isDonationModalOpenSelector,
  userSelector,
  (
    visibleEditors,
    canFocus,
    output,
    accessibilityMode,
    open,
    { theme = 'default' }
  ) => ({
    visibleEditors,
    canFocus: open ? false : canFocus,
    output,
    inAccessibilityMode: accessibilityMode,
    theme
  })
);

const mapDispatchToProps = {
  executeChallenge,
  saveEditorContent,
  setAccessibilityMode,
  setEditorFocusability,
  updateFile
};

class MultifileEditor extends Component {
  focusOnHotkeys() {
    if (this.props.containerRef.current) {
      this.props.containerRef.current.focus();
    }
  }

  render() {
    const {
      challengeFiles,
      containerRef,
      description,
      editorRef,
      theme,
      resizeProps,
      visibleEditors: { indexcss, indexhtml, indexjs, indexjsx }
    } = this.props;
    const editorTheme = theme === 'night' ? 'vs-dark-custom' : 'vs-custom';
    // TODO: the tabs mess up the rendering (scroll doesn't work properly and
    // the in-editor description)

    // TODO: the splitters should appear between editors, so logically this
    // would be best as
    // editors.map(props => <EditorWrapper ...props>).join(<ReflexSplitter>)
    // ...probably! As long as we can put keys in the right places.
    const reflexProps = {
      propagateDimensions: true,
      renderOnResize: true,
      renderOnResizeRate: 20
    };

    let splitterJSXRight, splitterHTMLRight, splitterCSSRight;
    if (indexjsx) {
      if (indexhtml || indexcss || indexjs) {
        splitterJSXRight = true;
      }
    }
    if (indexhtml) {
      if (indexcss || indexjs) {
        splitterHTMLRight = true;
      }
    }
    if (indexcss) {
      if (indexjs) {
        splitterCSSRight = true;
      }
    }

    // TODO: tabs should be dynamically created from the challengeFiles
    // TODO: the tabs mess up the rendering (scroll doesn't work properly and
    // the in-editor description)
    const targetEditor = getTargetEditor(challengeFiles);
    return (
      <ReflexContainer
        orientation='horizontal'
        {...reflexProps}
        {...resizeProps}
        className='editor-container'
      >
        <ReflexElement flex={10} {...reflexProps} {...resizeProps}>
          <ReflexContainer orientation='vertical'>
            {indexjsx && (
              <ReflexElement {...reflexProps} {...resizeProps}>
                <Editor
                  challengeFiles={challengeFiles}
                  containerRef={containerRef}
                  description={targetEditor === 'indexjsx' ? description : null}
                  editorRef={editorRef}
                  fileKey='indexjsx'
                  key='indexjsx'
                  resizeProps={resizeProps}
                  theme={editorTheme}
                />
              </ReflexElement>
            )}
            {splitterJSXRight && (
              <ReflexSplitter propagate={true} {...resizeProps} />
            )}
            {indexhtml && (
              <ReflexElement {...reflexProps} {...resizeProps}>
                <Editor
                  challengeFiles={challengeFiles}
                  containerRef={containerRef}
                  description={
                    targetEditor === 'indexhtml' ? description : null
                  }
                  editorRef={editorRef}
                  fileKey='indexhtml'
                  key='indexhtml'
                  resizeProps={resizeProps}
                  theme={editorTheme}
                />
              </ReflexElement>
            )}
            {splitterHTMLRight && (
              <ReflexSplitter propagate={true} {...resizeProps} />
            )}
            {indexcss && (
              <ReflexElement {...reflexProps} {...resizeProps}>
                <Editor
                  challengeFiles={challengeFiles}
                  containerRef={containerRef}
                  description={targetEditor === 'indexcss' ? description : null}
                  editorRef={editorRef}
                  fileKey='indexcss'
                  key='indexcss'
                  resizeProps={resizeProps}
                  theme={editorTheme}
                />
              </ReflexElement>
            )}
            {splitterCSSRight && (
              <ReflexSplitter propagate={true} {...resizeProps} />
            )}

            {indexjs && (
              <ReflexElement {...reflexProps} {...resizeProps}>
                <Editor
                  challengeFiles={challengeFiles}
                  containerRef={containerRef}
                  description={targetEditor === 'indexjs' ? description : null}
                  editorRef={editorRef}
                  fileKey='indexjs'
                  key='indexjs'
                  resizeProps={resizeProps}
                  theme={editorTheme}
                />
              </ReflexElement>
            )}
          </ReflexContainer>
        </ReflexElement>
      </ReflexContainer>
    );
  }
}

MultifileEditor.displayName = 'MultifileEditor';
MultifileEditor.propTypes = propTypes;

// NOTE: withRef gets replaced by forwardRef in react-redux 6,
// https://github.com/reduxjs/react-redux/releases/tag/v6.0.0
export default connect(mapStateToProps, mapDispatchToProps, null, {
  withRef: true
})(MultifileEditor);
