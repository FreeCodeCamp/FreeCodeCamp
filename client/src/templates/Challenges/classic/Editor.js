import Loadable from '@loadable/component';
import PropTypes from 'prop-types';
import React, { Component, Suspense } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { Loader } from '../../../components/helpers';
import { userSelector, isDonationModalOpenSelector } from '../../../redux';
import {
  canFocusEditorSelector,
  consoleOutputSelector,
  executeChallenge,
  inAccessibilityModeSelector,
  saveEditorContent,
  setEditorFocusability,
  setAccessibilityMode,
  updateFile,
  challengeTestsSelector,
  submitChallenge
} from '../redux';

import './editor.css';

const MonacoEditor = Loadable(() => import('react-monaco-editor'));

const propTypes = {
  canFocus: PropTypes.bool,
  // TODO: use shape
  challengeFiles: PropTypes.object,
  containerRef: PropTypes.any.isRequired,
  contents: PropTypes.string,
  description: PropTypes.string,
  dimensions: PropTypes.object,
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
  submitChallenge: PropTypes.func,
  tests: PropTypes.arrayOf(PropTypes.object),
  theme: PropTypes.string,
  updateFile: PropTypes.func.isRequired
};

const mapStateToProps = createSelector(
  canFocusEditorSelector,
  consoleOutputSelector,
  inAccessibilityModeSelector,
  isDonationModalOpenSelector,
  userSelector,
  challengeTestsSelector,
  (
    canFocus,
    output,
    accessibilityMode,
    open,
    { theme = 'default' },
    tests
  ) => ({
    canFocus: open ? false : canFocus,
    output,
    inAccessibilityMode: accessibilityMode,
    theme,
    tests
  })
);

const mapDispatchToProps = {
  executeChallenge,
  saveEditorContent,
  setAccessibilityMode,
  setEditorFocusability,
  updateFile,
  submitChallenge
};

const modeMap = {
  css: 'css',
  html: 'html',
  js: 'javascript',
  jsx: 'javascript'
};

var monacoThemesDefined = false;
const defineMonacoThemes = monaco => {
  if (monacoThemesDefined) {
    return;
  }
  monacoThemesDefined = true;
  const yellowColor = 'FFFF00';
  const lightBlueColor = '9CDCFE';
  const darkBlueColor = '00107E';
  monaco.editor.defineTheme('vs-dark-custom', {
    base: 'vs-dark',
    inherit: true,
    colors: {
      'editor.background': '#2a2a40'
    },
    rules: [
      { token: 'delimiter.js', foreground: lightBlueColor },
      { token: 'delimiter.parenthesis.js', foreground: yellowColor },
      { token: 'delimiter.array.js', foreground: yellowColor },
      { token: 'delimiter.bracket.js', foreground: yellowColor }
    ]
  });
  monaco.editor.defineTheme('vs-custom', {
    base: 'vs',
    inherit: true,
    rules: [{ token: 'identifier.js', foreground: darkBlueColor }]
  });
};

const toStartOfLine = range => {
  return range.setStartPosition(range.startLineNumber, 1);
};

const toLastLine = range => {
  return range.setStartPosition(range.endLineNumber, 1);
};

class Editor extends Component {
  constructor(...props) {
    super(...props);

    // TENATIVE PLAN: create a typical order [html/jsx, css, js], put the
    // available files into that order.  i.e. if it's just one file it will
    // automatically be first, but  if there's jsx and js (for some reason) it
    //  will be [jsx, js].

    // NOTE: This looks like it should be react state. However we need
    // to access monaco.editor to create the models and store the state and that
    // is only available in the react-monaco-editor component's lifecycle hooks
    // and not react's lifecyle hooks.
    // As a result it was unclear how to link up the editor's lifecycle with
    // react's lifecycle. Simply storing the models and state here and letting
    // the editor control them seems to be the best solution.
    // TODO: IS THIS STILL TRUE NOW EACH EDITOR IS AN ISLAND, ENTIRE OF ITSELF?

    // TODO: is there any point in initializing this? It should be fine with
    // this.data = {}

    this.data = {
      model: null,
      state: null,
      viewZoneId: null,
      startEditDecId: null,
      endEditDecId: null,
      insideEditDecId: null,
      viewZoneHeight: null
    };

    // NOTE: the ARIA state is controlled by fileKey, so changes to it must
    // trigger a re-render.  Hence state:

    this.options = {
      fontSize: '18px',
      scrollBeyondLastLine: false,
      selectionHighlight: false,
      overviewRulerBorder: false,
      hideCursorInOverviewRuler: true,
      renderIndentGuides: false,
      minimap: {
        enabled: false
      },
      selectOnLineNumbers: true,
      wordWrap: 'on',
      scrollbar: {
        horizontal: 'hidden',
        vertical: 'visible',
        verticalHasArrows: false,
        useShadows: false,
        verticalScrollbarSize: 5
      },
      parameterHints: {
        enabled: false
      },
      tabSize: 2,
      hover: false,
      dragAndDrop: true,
      lightbulb: {
        enabled: false
      },
      quickSuggestions: false
    };

    this._editor = null;
    this._monaco = null;
    this.focusOnEditor = this.focusOnEditor.bind(this);
  }

  getEditableRegion = () => {
    const { challengeFiles, fileKey } = this.props;
    return challengeFiles[fileKey].editableRegionBoundaries
      ? [...challengeFiles[fileKey].editableRegionBoundaries]
      : [];
  };

  editorWillMount = monaco => {
    this._monaco = monaco;
    const { challengeFiles, fileKey } = this.props;
    defineMonacoThemes(monaco);
    // If a model is not provided, then the editor 'owns' the model it creates
    // and will dispose of that model if it is replaced. Since we intend to
    // swap and reuse models, we have to create our own models to prevent
    // disposal.

    // TODO: For now, I'm keeping the 'data' machinery, but it'll probably go

    const model =
      this.data.model ||
      monaco.editor.createModel(
        challengeFiles[fileKey].contents,
        modeMap[challengeFiles[fileKey].ext]
      );
    this.data.model = model;

    const editableRegion = this.getEditableRegion();

    if (editableRegion.length === 2)
      this.decorateForbiddenRanges(editableRegion);

    return { model: this.data.model };
  };

  // Updates the model if the contents has changed. This is only necessary for
  // changes coming from outside the editor (such as code resets).
  updateEditorValues = () => {
    const { challengeFiles, fileKey } = this.props;

    const newContents = challengeFiles[fileKey].contents;
    if (this.data.model.getValue() !== newContents) {
      this.data.model.setValue(newContents);
    }
  };

  editorDidMount = (editor, monaco) => {
    this._editor = editor;
    editor.updateOptions({
      accessibilitySupport: this.props.inAccessibilityMode ? 'on' : 'auto'
    });
    // Users who are using screen readers should not have to move focus from
    // the editor to the description every time they open a challenge.
    if (this.props.canFocus && !this.props.inAccessibilityMode) {
      // TODO: only one Editor should be calling for focus at once.
      editor.focus();
    } else this.focusOnHotkeys();
    editor.addAction({
      id: 'execute-challenge',
      label: 'Run tests',
      keybindings: [
        /* eslint-disable no-bitwise */
        monaco.KeyMod.chord(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter)
      ],
      run: this.props.executeChallenge
    });
    editor.addAction({
      id: 'leave-editor',
      label: 'Leave editor',
      keybindings: [monaco.KeyCode.Escape],
      run: () => {
        this.focusOnHotkeys();
        this.props.setEditorFocusability(false);
      }
    });
    editor.addAction({
      id: 'save-editor-content',
      label: 'Save editor content to localStorage',
      keybindings: [
        monaco.KeyMod.chord(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S)
      ],
      run: this.props.saveEditorContent
    });
    editor.addAction({
      id: 'toggle-accessibility',
      label: 'Toggle Accessibility Mode',
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.F1],
      run: () => {
        const currentAccessibility = this.props.inAccessibilityMode;
        // The store needs to be updated first, as onDidChangeConfiguration is
        // called before updateOptions returns
        this.props.setAccessibilityMode(!currentAccessibility);
        editor.updateOptions({
          accessibilitySupport: currentAccessibility ? 'auto' : 'on'
        });
      }
    });
    editor.onDidFocusEditorWidget(() => this.props.setEditorFocusability(true));
    // This is to persist changes caused by the accessibility tooltip.
    editor.onDidChangeConfiguration(event => {
      if (
        event.hasChanged(monaco.editor.EditorOption.accessibilitySupport) &&
        editor.getRawOptions().accessibilitySupport === 'on' &&
        !this.props.inAccessibilityMode
      ) {
        this.props.setAccessibilityMode(true);
      }
    });

    const editableBoundaries = this.getEditableRegion();

    if (editableBoundaries.length === 2) {
      // TODO: is there a nicer approach/way of organising everything that
      // avoids the binds? babel-plugin-transform-class-properties ?
      const getViewZoneTop = this.getViewZoneTop.bind(this);
      const createDescription = this.createDescription.bind(this);
      const getOutputZoneTop = this.getOutputZoneTop.bind(this);
      const createOutputNode = this.createOutputNode.bind(this);

      const createWidget = (id, domNode, getTop) => {
        const getId = () => id;
        const getDomNode = () => domNode;
        const getPosition = () => {
          domNode.style.width = editor.getLayoutInfo().contentWidth + 'px';
          domNode.style.top = getTop();

          // must return null, so that Monaco knows the widget will position
          // itself.
          return null;
        };
        return {
          getId,
          getDomNode,
          getPosition
        };
      };

      this._domNode = createDescription();

      this._outputNode = createOutputNode();

      this._overlayWidget = createWidget(
        'my.overlay.widget',
        this._domNode,
        getViewZoneTop
      );

      this._outputWidget = createWidget(
        'my.output.widget',
        this._outputNode,
        getOutputZoneTop
      );

      this._editor.addOverlayWidget(this._overlayWidget);
      // TODO: order of insertion into the DOM probably matters, revisit once
      // the tabs have been fixed!
      this._editor.addOverlayWidget(this._outputWidget);
      // TODO: if we keep using a single editor and switching content (rather
      // than having multiple open editors), this view zone needs to be
      // preserved when the tab changes.

      editor.changeViewZones(this.viewZoneCallback);
      editor.changeViewZones(this.outputZoneCallback);

      editor.onDidScrollChange(() => {
        editor.layoutOverlayWidget(this._overlayWidget);
        editor.layoutOverlayWidget(this._outputWidget);
      });
      this.showEditableRegion(editableBoundaries);
    }
  };

  viewZoneCallback = changeAccessor => {
    // TODO: is there any point creating this here? I know it's cached, but
    // would it not be better just sourced from the overlayWidget?
    const domNode = this.createDescription();

    // make sure the overlayWidget has resized before using it to set the height
    domNode.style.width = this._editor.getLayoutInfo().contentWidth + 'px';

    // TODO: set via onComputedHeight?
    this.data.viewZoneHeight = domNode.offsetHeight;

    var background = document.createElement('div');
    // background.style.background = 'lightgreen';

    // We have to wait for the viewZone to finish rendering before adjusting the
    // position of the overlayWidget (i.e. trigger it via onComputedHeight). If
    // not the editor may report the wrong value for position of the lines.
    const viewZone = {
      afterLineNumber: this.getLineAfterViewZone() - 1,
      heightInPx: domNode.offsetHeight,
      domNode: background,
      onComputedHeight: () =>
        this._editor.layoutOverlayWidget(this._overlayWidget)
    };

    this.data.viewZoneId = changeAccessor.addZone(viewZone);
  };

  // TODO: this is basically the same as viewZoneCallback, so DRY them out.
  outputZoneCallback = changeAccessor => {
    // TODO: is there any point creating this here? I know it's cached, but
    // would it not be better just sourced from the overlayWidget?
    const outputNode = this.createOutputNode();

    // make sure the overlayWidget has resized before using it to set the height
    outputNode.style.width = this._editor.getLayoutInfo().contentWidth + 'px';

    // TODO: set via onComputedHeight?
    this.data.outputZoneHeight = outputNode.offsetHeight;

    var background = document.createElement('div');
    // background.style.background = 'lightpink';

    // We have to wait for the viewZone to finish rendering before adjusting the
    // position of the overlayWidget (i.e. trigger it via onComputedHeight). If
    // not the editor may report the wrong value for position of the lines.
    const viewZone = {
      afterLineNumber: this.getLineAfterEditableRegion() - 1,
      heightInPx: outputNode.offsetHeight,
      domNode: background,
      onComputedHeight: () =>
        this._editor.layoutOverlayWidget(this._outputWidget)
    };

    this.data.outputZoneId = changeAccessor.addZone(viewZone);
  };

  createDescription() {
    if (this._domNode) return this._domNode;
    const { description } = this.props;
    var domNode = document.createElement('div');
    var desc = document.createElement('div');
    var descContainer = document.createElement('div');
    descContainer.classList.add('description-container');
    domNode.classList.add('editor-upper-jaw');
    domNode.appendChild(descContainer);
    descContainer.appendChild(desc);
    desc.innerHTML = description;
    // desc.style.background = 'white';
    // domNode.style.background = 'lightgreen';
    // TODO: the solution is probably just to use an overlay that's forced to
    // follow the decorations.
    // TODO: this is enough for Firefox, but Chrome needs more before the
    // user can select text by clicking and dragging.
    domNode.style.userSelect = 'text';
    // The z-index needs increasing as ViewZones default to below the lines.
    domNode.style.zIndex = '10';

    domNode.setAttribute('aria-hidden', true);

    // domNode.style.background = 'lightYellow';
    domNode.style.left = this._editor.getLayoutInfo().contentLeft + 'px';
    domNode.style.width = this._editor.getLayoutInfo().contentWidth + 'px';
    domNode.style.top = this.getViewZoneTop();
    this._domNode = domNode;
    return domNode;
  }

  createOutputNode() {
    if (this._outputNode) return this._outputNode;
    const outputNode = document.createElement('div');
    const statusNode = document.createElement('div');
    const hintNode = document.createElement('div');
    const editorActionRow = document.createElement('div');
    editorActionRow.classList.add('action-row-container');
    outputNode.classList.add('editor-lower-jaw');
    outputNode.appendChild(editorActionRow);
    hintNode.setAttribute('id', 'test-output');
    statusNode.setAttribute('id', 'test-status');
    var button = document.createElement('button');
    button.setAttribute('id', 'test-button');
    button.classList.add('btn-block');
    button.innerHTML = 'Check Your Code (Ctrl + Enter)';
    editorActionRow.appendChild(button);
    editorActionRow.appendChild(statusNode);
    editorActionRow.appendChild(hintNode);
    button.onclick = () => {
      const { executeChallenge } = this.props;
      executeChallenge();
    };

    // TODO: does it?
    // The z-index needs increasing as ViewZones default to below the lines.
    outputNode.style.zIndex = '10';

    outputNode.setAttribute('aria-hidden', true);
    outputNode.style.left = this._editor.getLayoutInfo().contentLeft + 'px';
    outputNode.style.width = this._editor.getLayoutInfo().contentWidth + 'px';
    outputNode.style.top = this.getOutputZoneTop();

    this._outputNode = outputNode;

    return outputNode;
  }

  focusOnHotkeys() {
    if (this.props.containerRef.current) {
      this.props.containerRef.current.focus();
    }
  }

  focusOnEditor() {
    this._editor.focus();
  }

  onChange = editorValue => {
    const { updateFile } = this.props;
    // TODO: use fileKey everywhere?
    const { fileKey: key } = this.props;
    // TODO: now that we have getCurrentEditableRegion, should the overlays
    // follow that directly? We could subscribe to changes to that and redraw if
    // those imply that the positions have changed (i.e. if the content height
    // has changed or if content is dragged between regions)

    const editableRegion = this.getCurrentEditableRegion(key);
    const editableRegionBoundaries = editableRegion && [
      editableRegion.startLineNumber - 1,
      editableRegion.endLineNumber + 1
    ];
    updateFile({ key, editorValue, editableRegionBoundaries });
  };

  showEditableRegion(editableBoundaries) {
    if (editableBoundaries.length !== 2) return;
    // TODO: The heuristic has been commented out for now because the cursor
    // position is not saved at the moment, so it's redundant. I'm leaving it
    // here for now, in case we decide to save it in future.
    // this is a heuristic: if the cursor is at the start of the page, chances
    // are the user has not edited yet. If so, move to the start of the editable
    // region.
    // if (
    //  isEqual({ ...this._editor.getPosition() }, { lineNumber: 1, column: 1 })
    // ) {
    this._editor.setPosition({
      lineNumber: editableBoundaries[0] + 1,
      column: 1
    });
    this._editor.revealLinesInCenter(...editableBoundaries);
    // }
  }

  highlightLines(stickiness, target, range, oldIds = []) {
    const lineDecoration = {
      range,
      options: {
        isWholeLine: true,
        linesDecorationsClassName: 'myLineDecoration',
        className: 'do-not-edit',
        stickiness
      }
    };
    return target.deltaDecorations(oldIds, [lineDecoration]);
  }

  highlightEditableLines(stickiness, target, range, oldIds = []) {
    const lineDecoration = {
      range,
      options: {
        isWholeLine: true,
        linesDecorationsClassName: 'myEditableLineDecoration',
        className: 'do-not-edit',
        stickiness
      }
    };
    return target.deltaDecorations(oldIds, [lineDecoration]);
  }

  highlightText(stickiness, target, range, oldIds = []) {
    const inlineDecoration = {
      range,
      options: {
        inlineClassName: 'myInlineDecoration',
        stickiness
      }
    };

    return target.deltaDecorations(oldIds, [inlineDecoration]);
  }

  // NOTE: this is where the view zone *should* be, not necessarily were it
  // currently is. (see getLineAfterViewZone)
  // TODO: DRY this and getOutputZoneTop out.
  getViewZoneTop() {
    const heightDelta = this.data.viewZoneHeight || 0;

    const top =
      this._editor.getTopForLineNumber(this.getLineAfterViewZone()) -
      heightDelta -
      this._editor.getScrollTop() +
      'px';

    return top;
  }

  getOutputZoneTop() {
    const heightDelta = this.data.outputZoneHeight || 0;

    const top =
      this._editor.getTopForLineNumber(this.getLineAfterEditableRegion()) -
      heightDelta -
      this._editor.getScrollTop() +
      'px';

    return top;
  }

  // It's not possible to directly access the current view zone so we track
  // the region it should cover instead.
  // TODO: DRY
  getLineAfterViewZone() {
    // TODO: abstract away the data, ids etc.
    const range = this.data.model.getDecorationRange(this.data.startEditDecId);
    // if the first decoration is missing, this implies the region reaches the
    // start of the editor.
    return range ? range.endLineNumber + 1 : 1;
  }

  getLineAfterEditableRegion() {
    // TODO: handle the case that the editable region reaches the bottom of the
    // editor
    return this.data.model.getDecorationRange(this.data.endEditDecId)
      .startLineNumber;
  }

  translateRange = (range, lineDelta) => {
    const iRange = {
      ...range,
      startLineNumber: range.startLineNumber + lineDelta,
      endLineNumber: range.endLineNumber + lineDelta
    };
    return this._monaco.Range.lift(iRange);
  };

  // TODO: TESTS!
  // Make 100% sure this is inclusive.
  getLinesBetweenRanges = (firstRange, secondRange) => {
    const startRange = this.translateRange(toLastLine(firstRange), 1);
    const endRange = this.translateRange(
      toStartOfLine(secondRange),
      -1
    ).collapseToStart();

    return {
      startLineNumber: startRange.startLineNumber,
      endLineNumber: endRange.endLineNumber
    };
  };

  getCurrentEditableRegion = () => {
    const model = this.data.model;
    // TODO: this is a little low-level, but we should bail if there is no
    // editable region defined.
    // NOTE: if a decoration is missing, there is still an editable region - it
    // just extends to the edge of the editor. However, no decorations means no
    // editable region.
    if (!this.data.startEditDecId && !this.data.endEditDecId) return null;
    const firstRange = this.data.startEditDecId
      ? model.getDecorationRange(this.data.startEditDecId)
      : this.getStartOfEditor();
    // TODO: handle the case that the editable region reaches the bottom of the
    // editor
    const secondRange = model.getDecorationRange(this.data.endEditDecId);
    const { startLineNumber, endLineNumber } = this.getLinesBetweenRanges(
      firstRange,
      secondRange
    );

    // getValueInRange includes column x if
    // startColumnNumber <= x < endColumnNumber
    // so we add 1 here
    const endColumn = model.getLineLength(endLineNumber) + 1;
    return new this._monaco.Range(startLineNumber, 1, endLineNumber, endColumn);
  };

  // TODO: do this once after _monaco has been created.
  getStartOfEditor = () =>
    this._monaco.Range.lift({
      startLineNumber: 1,
      endLineNumber: 1,
      startColumn: 1,
      endColumn: 1
    });

  decorateForbiddenRanges(editableRegion) {
    const model = this.data.model;
    const forbiddenRanges = [
      [0, editableRegion[0]],
      [editableRegion[1], model.getLineCount()]
    ];

    const ranges = forbiddenRanges.map(positions => {
      return this.positionsToRange(model, positions);
    });

    const editableRange = this.positionsToRange(model, [
      editableRegion[0] + 1,
      editableRegion[1] - 1
    ]);

    this.data.insideEditDecId = this.highlightEditableLines(
      this._monaco.editor.TrackedRangeStickiness.AlwaysGrowsWhenTypingAtEdges,
      model,
      editableRange
    );

    // if the forbidden range includes the top of the editor
    // we simply don't add those decorations
    if (forbiddenRanges[0][1] > 0) {
      // the first range should expand at the top
      this.data.startEditDecId = this.highlightLines(
        this._monaco.editor.TrackedRangeStickiness.GrowsOnlyWhenTypingBefore,
        model,
        ranges[0]
      );

      this.highlightText(
        this._monaco.editor.TrackedRangeStickiness.GrowsOnlyWhenTypingBefore,
        model,
        ranges[0]
      );
    }

    // TODO: handle the case the region covers the bottom of the editor
    // the second range should expand at the bottom
    this.data.endEditDecId = this.highlightLines(
      this._monaco.editor.TrackedRangeStickiness.GrowsOnlyWhenTypingAfter,
      model,
      ranges[1]
    );

    this.highlightText(
      this._monaco.editor.TrackedRangeStickiness.GrowsOnlyWhenTypingAfter,
      model,
      ranges[1]
    );

    // The deleted line is always considered to be the one that has moved up.
    // - if the user deletes at the end of line 5, line 6 is deleted and
    // - if the user backspaces at the start of line 6, line 6 is deleted
    // TODO: handle multiple simultaneous changes (multicursors do this)
    function getDeletedLine(event) {
      const isDeleted =
        event.changes[0].text === '' && event.changes[0].range.endColumn === 1;
      return isDeleted ? event.changes[0].range.endLineNumber : 0;
    }

    function getNewLineRanges(event) {
      const newLines = event.changes.filter(
        ({ text }) => text[0] === event.eol
      );
      return newLines.map(({ range }) => range);
    }

    // TODO refactor this mess
    // TODO this listener needs to be replaced on reset.
    model.onDidChangeContent(e => {
      // TODO: it would be nice if undoing could remove the warning, but
      // it's probably too hard to track. i.e. if they make two warned edits
      // and then ctrl + z twice, it would realise they've removed their
      // edits. However, what if they made a warned edit, then a normal
      // edit, then a warned one.  Could it track that they need to make 3
      // undos?
      const newLineRanges = getNewLineRanges(e).map(range =>
        toStartOfLine(range)
      );
      const deletedLine = getDeletedLine(e);

      const deletedRange = {
        startLineNumber: deletedLine,
        endLineNumber: deletedLine,
        startColumn: 1,
        endColumn: 1
      };

      if (e.isUndoing) {
        // TODO: can we be more targeted? Only update when they could get out of
        // sync
        this.updateViewZone();
        this.updateOutputZone();
        return;
      }

      const warnUser = id => {
        const coveringRange = toStartOfLine(model.getDecorationRange(id));
        e.changes.forEach(({ range }) => {
          if (
            this._monaco.Range.areIntersectingOrTouching(coveringRange, range)
          ) {
            console.log('OVERLAP!');
          }
        });
      };

      // Make sure the zone tracks the decoration (i.e. the region), which might
      // have changed if a line has been added or removed
      const handleHintsZoneChange = () => {
        if (newLineRanges.length > 0 || deletedLine > 0) {
          this.updateOutputZone();
        }
      };

      // Make sure the zone tracks the decoration (i.e. the region), which might
      // have changed if a line has been added or removed
      const handleDescriptionZoneChange = () => {
        if (newLineRanges.length > 0 || deletedLine > 0) {
          this.updateViewZone();
        }
      };

      // Stops the greyed out region from covering the editable region. Does not
      // change the font decoration.
      const preventOverlap = (id, stickiness, highlightFunction) => {
        // Even though the decoration covers the whole line, it has a
        // startColumn that moves.  toStartOfLine ensures that the
        // comparison detects if any change has occurred on that line
        // NOTE: any change in the decoration has already happened by this point
        // so this covers the *new* decoration range.
        const coveringRange = toStartOfLine(model.getDecorationRange(id));
        const oldStartOfRange = this.translateRange(
          coveringRange.collapseToStart(),
          1
        );
        const newCoveringRange = coveringRange.setStartPosition(
          oldStartOfRange.startLineNumber,
          1
        );

        // TODO: this triggers both when you delete the first line of the
        // decoration AND the second. To see this, consider a region on line 5
        // If you delete 5, then the new start is 4 and the computed start is 5
        // so they match.
        // If you delete 6, then the start of the region stays at 5, so the
        // computed start is 6 and they still match.
        // Is there a way to tell these cases apart?
        // This means that if you delete the second line it actually removes the
        // grey background from the first line.
        const touchingDeleted = this._monaco.Range.areIntersectingOrTouching(
          deletedRange,
          oldStartOfRange
        );

        if (touchingDeleted) {
          // TODO: if they undo this should be reversed
          const decorations = highlightFunction(
            stickiness,
            model,
            newCoveringRange,
            id
          );

          this.updateOutputZone();
          return decorations;
        } else {
          return id;
        }
      };

      // we only need to handle the special case of the second region being
      // pulled up, the first region already behaves correctly.
      this.data.endEditDecId = preventOverlap(
        this.data.endEditDecId,
        this._monaco.editor.TrackedRangeStickiness.GrowsOnlyWhenTypingBefore,
        this.highlightLines
      );

      this.data.insideEditDecId = preventOverlap(
        this.data.insideEditDecId,
        this._monaco.editor.TrackedRangeStickiness.AlwaysGrowsWhenTypingAtEdges,
        this.highlightEditableLines
      );

      // TODO: do the same for the description widget
      // this has to be handle differently, because we care about the END
      // of the zone, not the START
      // if the editable region includes the first line, the first decoration
      // will be missing.
      if (this.data.startEditDecId) {
        handleDescriptionZoneChange();
        warnUser(this.data.startEditDecId);
      }
      handleHintsZoneChange();
      warnUser(this.data.endEditDecId);
    });
  }

  // creates a range covering all the lines in 'positions'
  // NOTE: positions is an array of [startLine, endLine]
  positionsToRange(model, [start, end]) {
    console.log('positionsToRange', start, end);
    // start and end should always be defined, but if not:
    start = start || 1;
    end = end || model.getLineCount();

    // convert to [startLine, startColumn, endLine, endColumn]
    const range = new this._monaco.Range(start, 1, end, 1);

    // Protect against ranges that extend outside the editor
    const startLineNumber = Math.max(1, range.startLineNumber);
    const endLineNumber = Math.min(model.getLineCount(), range.endLineNumber);
    const endColumnText = model.getLineContent(endLineNumber);
    // NOTE: the end column is incremented by 2 so that the dangerous range
    // extends far enough to capture new text added to the end.
    // NOTE: according to the spec, it should only need to be +1, but in
    // practice that's not enough.
    return range
      .setStartPosition(startLineNumber, 1)
      .setEndPosition(range.endLineNumber, endColumnText.length + 2);
  }

  componentDidUpdate(prevProps) {
    // TODO: re-organise into something less nested

    // If a challenge is reset, it needs to communicate that change to the
    // editor. This looks for changes any challenge files and updates if needed.
    if (this.props.challengeFiles !== prevProps.challengeFiles) {
      this.updateEditorValues();
    }

    if (this._editor) {
      const { output, tests } = this.props;
      const editableRegion = this.getEditableRegion();
      if (this.props.tests !== prevProps.tests && editableRegion.length === 2) {
        const challengeComplete = tests.every(test => test.pass && !test.err);
        const chellengeHasErrors = tests.some(test => test.err);

        if (challengeComplete) {
          let testButton = document.getElementById('test-button');
          testButton.innerHTML =
            'Submit your code and go to next challenge (Ctrl + Enter)';
          testButton.onclick = () => {
            const { submitChallenge } = this.props;
            submitChallenge();
          };

          let editableRegionDecorators = document.getElementsByClassName(
            'myEditableLineDecoration'
          );
          if (editableRegionDecorators.length > 0) {
            for (var i of editableRegionDecorators) {
              i.classList.add('tests-passed');
            }
          }
          document.getElementById('test-output').innerHTML = '';
          document.getElementById('test-status').innerHTML =
            '&#9989; Step completed.';
        } else if (chellengeHasErrors) {
          const wordsArray = [
            "Not quite. Here's a hint:",
            'Try again. This might help:',
            'Keep trying. A quick hint for you:',
            "You're getting there. This may help:",
            "Hang in there. You'll get there. A hint:",
            "Don't give up. Here's a hint to get you thinking:"
          ];
          document.getElementById('test-status').innerHTML = `✖️ ${
            wordsArray[Math.floor(Math.random() * wordsArray.length)]
          }`;
          document.getElementById('test-output').innerHTML = `${output[1]}`;
        }
      }
      if (this.props.output !== prevProps.output && this._outputNode) {
        // TODO: output gets wiped when the preview gets updated, keeping the
        // display is an anti-pattern (the render should not ignore props!).
        // The correct solution is probably to create a new redux variable
        // (shownHint,maybe) and have that persist through previews.  But, for
        // now:
        if (output) {
          // if either id exists, the editable region exists
          // TODO: add a layer of abstraction: we should be interacting with
          // the editable region, not the ids
          if (this.data.startEditDecId || this.data.endEditDecId) {
            this.updateOutputZone();
          }
        }
      }

      // TODO: to get the 'dimensions' prop, this needs to be a inside a
      // ReflexElement
      if (this.props.dimensions !== prevProps.dimensions) {
        // Order matters here. The view zones need to know the new editor
        // dimensions in order to render correctly.
        this._editor.layout();
        if (this.data.startEditDecId) {
          this.updateViewZone();
          this.updateOutputZone();
        }
      }
    }
  }

  // TODO: DRY (there's going to be a lot of that)
  updateOutputZone() {
    this._editor.changeViewZones(changeAccessor => {
      changeAccessor.removeZone(this.data.outputZoneId);
      this.outputZoneCallback(changeAccessor);
    });
  }

  updateViewZone() {
    this._editor.changeViewZones(changeAccessor => {
      changeAccessor.removeZone(this.data.viewZoneId);
      this.viewZoneCallback(changeAccessor);
    });
  }

  componentWillUnmount() {
    this.data = null;
  }

  render() {
    const { theme } = this.props;
    const editorTheme = theme === 'night' ? 'vs-dark-custom' : 'vs-custom';
    return (
      <Suspense fallback={<Loader timeout={600} />}>
        <span className='notranslate'>
          <MonacoEditor
            editorDidMount={this.editorDidMount}
            editorWillMount={this.editorWillMount}
            onChange={this.onChange}
            options={this.options}
            theme={editorTheme}
          />
        </span>
      </Suspense>
    );
  }
}

Editor.displayName = 'Editor';
Editor.propTypes = propTypes;

// NOTE: withRef gets replaced by forwardRef in react-redux 6,
// https://github.com/reduxjs/react-redux/releases/tag/v6.0.0
export default connect(mapStateToProps, mapDispatchToProps, null, {
  withRef: true
})(Editor);
