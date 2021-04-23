import { navigate } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import { HotKeys, GlobalHotKeys } from 'react-hotkeys';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { canFocusEditorSelector, setEditorFocusability } from '../redux';
import './hotkeys.css';

const mapStateToProps = createSelector(
  canFocusEditorSelector,
  canFocusEditor => ({
    canFocusEditor
  })
);

const mapDispatchToProps = { setEditorFocusability };

const keyMap = {
  NAVIGATION_MODE: 'escape',
  EXECUTE_CHALLENGE: ['ctrl+enter', 'command+enter'],
  FOCUS_EDITOR: 'e',
  NAVIGATE_PREV: ['p'],
  NAVIGATE_NEXT: ['n']
};

const propTypes = {
  canFocusEditor: PropTypes.bool,
  children: PropTypes.any,
  editorRef: PropTypes.object,
  executeChallenge: PropTypes.func,
  innerRef: PropTypes.any,
  nextChallengePath: PropTypes.string,
  prevChallengePath: PropTypes.string,
  setEditorFocusability: PropTypes.func.isRequired
};

function Hotkeys({
  canFocusEditor,
  children,
  editorRef,
  executeChallenge,
  innerRef,
  nextChallengePath,
  prevChallengePath,
  setEditorFocusability
}) {
  const handlers = {
    EXECUTE_CHALLENGE: e => {
      // the 'enter' part of 'ctrl+enter' stops HotKeys from listening, so it
      // needs to be prevented.
      // TODO: 'enter' on its own also disables HotKeys, but default behaviour
      // should not be prevented in that case.
      e.preventDefault();
      if (executeChallenge) executeChallenge();
    },
    FOCUS_EDITOR: e => {
      e.preventDefault();
      if (editorRef && editorRef.current) {
        editorRef.current.getWrappedInstance().focusOnEditor();
      }
    },
    NAVIGATION_MODE: () => setEditorFocusability(false),
    NAVIGATE_PREV: () => {
      if (!canFocusEditor) navigate(prevChallengePath);
    },
    NAVIGATE_NEXT: () => {
      if (!canFocusEditor) navigate(nextChallengePath);
    }
  };
  // GlobalHotKeys is always mounted and tracks all keypresses. Without it,
  // keyup events can be missed and react-hotkeys assumes that that key is still
  // being pressed.
  // allowChanges is necessary if the handlers depend on props (in this case
  // canFocusEditor)
  return (
    <HotKeys
      allowChanges={true}
      handlers={handlers}
      innerRef={innerRef}
      keyMap={keyMap}
    >
      {children}
      <GlobalHotKeys />
    </HotKeys>
  );
}

Hotkeys.displayName = 'Hotkeys';
Hotkeys.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(Hotkeys);
