import React, {
  useEffect,
  Suspense,
  RefObject,
  MutableRefObject,
  useRef
} from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import Loadable from '@loadable/component';

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
import { userSelector, isDonationModalOpenSelector } from '../../../redux';
import { Loader } from '../../../components/helpers';
import {
  ChallengeFile,
  DimensionsType,
  ExtTypes,
  FileKeyTypes,
  ResizePropsType,
  Tests
} from '../../../redux/prop-types';

// eslint-disable-next-line import/no-duplicates
import type * as monacoEditor from 'monaco-editor/esm/vs/editor/editor.api';
import type {
  IRange,
  editor,
  Range as RangeType
  // eslint-disable-next-line import/no-duplicates
} from 'monaco-editor/esm/vs/editor/editor.api';

import './editor.css';

const MonacoEditor = Loadable(() => import('react-monaco-editor'));

interface EditorProps {
  canFocus: boolean;
  challengeFiles: ChallengeFile[];
  containerRef: RefObject<HTMLElement>;
  contents: string;
  description: string;
  dimensions: DimensionsType;
  editorRef: MutableRefObject<editor.IStandaloneCodeEditor>;
  executeChallenge: (isShouldCompletionModalOpen?: boolean) => void;
  ext: ExtTypes;
  fileKey: FileKeyTypes;
  inAccessibilityMode: boolean;
  initialEditorContent: string;
  initialExt: string;
  output: string[];
  resizeProps: ResizePropsType;
  saveEditorContent: () => void;
  setAccessibilityMode: (isAccessible: boolean) => void;
  setEditorFocusability: (isFocusable: boolean) => void;
  submitChallenge: () => void;
  tests: Tests[];
  theme: string;
  updateFile: (objest: {
    fileKey: FileKeyTypes;
    editorValue: string;
    editableRegionBoundaries: number[] | null;
  }) => void;
}

interface EditorProperties {
  editor?: editor.IStandaloneCodeEditor;
  model?: editor.ITextModel;
  viewZoneId: string;
  startEditDecId: string;
  endEditDecId: string;
  insideEditDecId: string;
  viewZoneHeight: number;
  outputZoneHeight: number;
  outputZoneId: string;
  descriptionNode?: HTMLDivElement;
  outputNode?: HTMLDivElement;
  overlayWidget?: editor.IOverlayWidget;
  outputWidget?: editor.IOverlayWidget;
}

interface EditorPropertyStore {
  indexcss: EditorProperties;
  indexhtml: EditorProperties;
  indexjs: EditorProperties;
  indexjsx: EditorProperties;
}

const mapStateToProps = createSelector(
  canFocusEditorSelector,
  consoleOutputSelector,
  inAccessibilityModeSelector,
  isDonationModalOpenSelector,
  userSelector,
  challengeTestsSelector,
  (
    canFocus: boolean,
    output: string[],
    accessibilityMode: boolean,
    open,
    { theme = 'default' }: { theme: string },
    tests: [{ text: string; testString: string }]
  ) => ({
    canFocus: open ? false : canFocus,
    output,
    inAccessibilityMode: accessibilityMode,
    theme,
    tests
  })
);

// type ActionDispatchGeneric<P, T> = (payload: P) => ({type: T, payload: P});

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

let monacoThemesDefined = false;
const defineMonacoThemes = (monaco: typeof monacoEditor) => {
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
    // TODO: Use actual color from style-guide
    colors: {
      'editor.background': '#fff'
    },
    rules: [{ token: 'identifier.js', foreground: darkBlueColor }]
  });
};

const toStartOfLine = (range: RangeType) => {
  return range.setStartPosition(range.startLineNumber, 1);
};

const toLastLine = (range: RangeType) => {
  return range.setStartPosition(range.endLineNumber, 1);
};

// TODO: properly initialise data with values not null
const initialData: EditorProperties = {
  viewZoneId: '',
  startEditDecId: '',
  endEditDecId: '',
  insideEditDecId: '',
  viewZoneHeight: 0,
  outputZoneId: '',
  outputZoneHeight: 0
};

const Editor = (props: EditorProps): JSX.Element => {
  const { editorRef, fileKey } = props;
  // These refs are used during initialisation of the editor as well as by
  // callbacks.  Since they have to be initialised before editorWillMount and
  // editorDidMount are called, we cannot use useState.  Reason being that will
  // only take effect during the next render, which is too late. We could use
  // plain objects here, but useRef is shared between instances, so avoids
  // unecessary object creation.
  const monacoRef: MutableRefObject<typeof monacoEditor | null> =
    useRef<typeof monacoEditor>(null);
  const dataRef = useRef<EditorPropertyStore>({
    indexcss: { ...initialData },
    indexhtml: { ...initialData },
    indexjs: { ...initialData },
    indexjsx: { ...initialData }
  });

  const data = dataRef.current[fileKey];

  // TENATIVE PLAN: create a typical order [html/jsx, css, js], put the
  // available files into that order.  i.e. if it's just one file it will
  // automatically be first, but  if there's jsx and js (for some reason) it
  //  will be [jsx, js].

  // NOTE: the ARIA state is controlled by fileKey, so changes to it must
  // trigger a re-render.  Hence state:
  const options: editor.IStandaloneEditorConstructionOptions = {
    fontSize: 18,
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
    dragAndDrop: true,
    lightbulb: {
      enabled: false
    },
    quickSuggestions: false,
    suggestOnTriggerCharacters: false
  };

  const getEditableRegion = () => {
    const { challengeFiles, fileKey } = props;
    const edRegBounds = challengeFiles.find(
      challengeFile => challengeFile?.fileKey === fileKey
    )?.editableRegionBoundaries;
    return edRegBounds ? [...edRegBounds] : [];
  };

  const editorWillMount = (monaco: typeof monacoEditor) => {
    const { challengeFiles, fileKey } = props;

    monacoRef.current = monaco;
    defineMonacoThemes(monaco);
    // If a model is not provided, then the editor 'owns' the model it creates
    // and will dispose of that model if it is replaced. Since we intend to
    // swap and reuse models, we have to create our own models to prevent
    // disposal.

    const challengeFile = challengeFiles.find(
      challengeFile => challengeFile?.fileKey === fileKey
    );
    const model =
      data.model ||
      monaco.editor.createModel(
        challengeFile?.contents ?? '',
        modeMap[challengeFile?.ext ?? 'html']
      );
    data.model = model;
    const editableRegion = getEditableRegion();

    if (editableRegion.length === 2) decorateForbiddenRanges(editableRegion);

    // TODO: do we need to return this?
    return { model };
  };

  // Updates the model if the contents has changed. This is only necessary for
  // changes coming from outside the editor (such as code resets).
  const updateEditorValues = () => {
    const { challengeFiles, fileKey } = props;
    const { model } = dataRef.current[fileKey];

    const newContents = challengeFiles.find(
      challengeFile => challengeFile?.fileKey === fileKey
    )?.contents;
    if (model?.getValue() !== newContents) {
      model?.setValue(newContents ?? '');
    }
  };

  const editorDidMount = (
    editor: editor.IStandaloneCodeEditor,
    monaco: typeof monacoEditor
  ) => {
    // TODO this should *probably* be set on focus
    editorRef.current = editor;
    data.editor = editor;
    editor.updateOptions({
      accessibilitySupport: props.inAccessibilityMode ? 'on' : 'auto'
    });
    // Users who are using screen readers should not have to move focus from
    // the editor to the description every time they open a challenge.
    if (props.canFocus && !props.inAccessibilityMode) {
      // TODO: only one Editor should be calling for focus at once.
      editor.focus();
    } else focusOnHotkeys();
    // Removes keybind for intellisense
    // Private method - hopefully changes with future version
    // ref: https://github.com/microsoft/monaco-editor/issues/102
    /* eslint-disable */
    // @ts-ignore
    editor._standaloneKeybindingService.addDynamicKeybinding(
      '-editor.action.triggerSuggest',
      null,
      () => {}
    );
    /* eslint-disable */
    editor.addAction({
      id: 'execute-challenge',
      label: 'Run tests',
      /* eslint-disable no-bitwise */
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter],
      // TODO: Discuss with Ahmad what should pop-up when a challenge is completed
      run: () => props.executeChallenge(true)
    });
    editor.addAction({
      id: 'leave-editor',
      label: 'Leave editor',
      keybindings: [monaco.KeyCode.Escape],
      run: () => {
        focusOnHotkeys();
        props.setEditorFocusability(false);
      }
    });
    editor.addAction({
      id: 'save-editor-content',
      label: 'Save editor content to localStorage',
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S],
      run: props.saveEditorContent
    });
    editor.addAction({
      id: 'toggle-accessibility',
      label: 'Toggle Accessibility Mode',
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.F1],
      run: () => {
        const currentAccessibility = props.inAccessibilityMode;
        // The store needs to be updated first, as onDidChangeConfiguration is
        // called before updateOptions returns
        props.setAccessibilityMode(!currentAccessibility);
        editor.updateOptions({
          accessibilitySupport: currentAccessibility ? 'auto' : 'on'
        });
      }
    });
    editor.onDidFocusEditorWidget(() => props.setEditorFocusability(true));
    // This is to persist changes caused by the accessibility tooltip.
    editor.onDidChangeConfiguration(event => {
      if (
        event.hasChanged(monaco.editor.EditorOption.accessibilitySupport) &&
        editor.getRawOptions().accessibilitySupport === 'on' &&
        !props.inAccessibilityMode
      ) {
        props.setAccessibilityMode(true);
      }
    });

    const editableBoundaries = getEditableRegion();

    if (editableBoundaries.length === 2) {
      const createWidget = (
        id: string,
        domNode: HTMLDivElement,
        getTop: () => string
      ) => {
        const getId = () => id;
        const getDomNode = () => domNode;
        const getPosition = () => {
          domNode.style.width = `${editor.getLayoutInfo().contentWidth}px`;
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

      const domNode = createDescription(editor);

      const outputNode = createOutputNode(editor);

      const overlayWidget = createWidget(
        'my.overlay.widget',
        domNode,
        getViewZoneTop
      );
      data.overlayWidget = overlayWidget;
      const outputWidget = createWidget(
        'my.output.widget',
        outputNode,
        getOutputZoneTop
      );
      data.outputWidget = outputWidget;

      editor.addOverlayWidget(overlayWidget);

      // TODO: order of insertion into the DOM probably matters, revisit once
      // the tabs have been fixed!

      editor.addOverlayWidget(outputWidget);

      editor.changeViewZones(viewZoneCallback);
      editor.changeViewZones(outputZoneCallback);

      editor.onDidScrollChange(() => {
        editor.layoutOverlayWidget(overlayWidget);
        editor.layoutOverlayWidget(outputWidget);
      });
      showEditableRegion(editableBoundaries);
    }
  };

  const viewZoneCallback = (changeAccessor: editor.IViewZoneChangeAccessor) => {
    const editor = data.editor;
    if (!editor) return;
    // TODO: is there any point creating this here? I know it's cached, but
    // would it not be better just sourced from the overlayWidget?
    const domNode = createDescription(editor);

    // make sure the overlayWidget has resized before using it to set the height

    domNode.style.width = `${editor.getLayoutInfo().contentWidth}px`;

    // TODO: set via onComputedHeight?
    data.viewZoneHeight = domNode.offsetHeight;

    const background = document.createElement('div');
    // background.style.background = 'lightgreen';

    // We have to wait for the viewZone to finish rendering before adjusting the
    // position of the overlayWidget (i.e. trigger it via onComputedHeight). If
    // not the editor may report the wrong value for position of the lines.
    const viewZone = {
      afterLineNumber: getLineAfterViewZone() - 1,
      heightInPx: domNode.offsetHeight,
      domNode: background,
      onComputedHeight: () =>
        data.overlayWidget && editor.layoutOverlayWidget(data.overlayWidget)
    };

    data.viewZoneId = changeAccessor.addZone(viewZone);
  };

  // TODO: this is basically the same as viewZoneCallback, so DRY them out.
  const outputZoneCallback = (
    changeAccessor: editor.IViewZoneChangeAccessor
  ) => {
    const editor = data.editor;
    if (!editor) return;
    // TODO: is there any point creating this here? I know it's cached, but
    // would it not be better just sourced from the overlayWidget?
    const outputNode = createOutputNode(editor);

    // make sure the overlayWidget has resized before using it to set the height

    outputNode.style.width = `${editor.getLayoutInfo().contentWidth}px`;

    // TODO: set via onComputedHeight?
    data.outputZoneHeight = outputNode.offsetHeight;

    const background = document.createElement('div');
    // background.style.background = 'lightpink';

    // We have to wait for the viewZone to finish rendering before adjusting the
    // position of the overlayWidget (i.e. trigger it via onComputedHeight). If
    // not the editor may report the wrong value for position of the lines.
    const viewZone = {
      afterLineNumber: getLineAfterEditableRegion() - 1,
      heightInPx: outputNode.offsetHeight,
      domNode: background,
      onComputedHeight: () =>
        data.outputWidget && editor.layoutOverlayWidget(data.outputWidget)
    };

    data.outputZoneId = changeAccessor.addZone(viewZone);
  };

  function createDescription(editor: editor.IStandaloneCodeEditor) {
    if (data.descriptionNode) return data.descriptionNode;
    const { description } = props;
    // TODO: var was used here. Should it?
    const domNode = document.createElement('div');
    const desc = document.createElement('div');
    const descContainer = document.createElement('div');
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

    domNode.setAttribute('aria-hidden', 'true');

    // domNode.style.background = 'lightYellow';
    domNode.style.left = `${editor.getLayoutInfo().contentLeft}px`;
    domNode.style.width = `${editor.getLayoutInfo().contentWidth}px`;

    domNode.style.top = getViewZoneTop();
    data.descriptionNode = domNode;
    return domNode;
  }

  function createOutputNode(editor: editor.IStandaloneCodeEditor) {
    if (data.outputNode) return data.outputNode;
    const outputNode = document.createElement('div');
    const statusNode = document.createElement('div');
    const hintNode = document.createElement('div');
    const editorActionRow = document.createElement('div');
    editorActionRow.classList.add('action-row-container');
    outputNode.classList.add('editor-lower-jaw');
    outputNode.appendChild(editorActionRow);
    hintNode.setAttribute('id', 'test-output');
    statusNode.setAttribute('id', 'test-status');
    const button = document.createElement('button');
    button.setAttribute('id', 'test-button');
    button.classList.add('btn-block');
    button.innerHTML = 'Check Your Code (Ctrl + Enter)';
    editorActionRow.appendChild(button);
    editorActionRow.appendChild(statusNode);
    editorActionRow.appendChild(hintNode);
    button.onclick = () => {
      const { executeChallenge } = props;
      executeChallenge();
    };

    // TODO: does it?
    // The z-index needs increasing as ViewZones default to below the lines.
    outputNode.style.zIndex = '10';

    outputNode.setAttribute('aria-hidden', 'true');

    outputNode.style.left = `${editor.getLayoutInfo().contentLeft}px`;
    outputNode.style.width = `${editor.getLayoutInfo().contentWidth}px`;

    outputNode.style.top = getOutputZoneTop();

    data.outputNode = outputNode;

    return outputNode;
  }

  function focusOnHotkeys() {
    const currContainerRef = props.containerRef.current;
    if (currContainerRef) {
      currContainerRef.focus();
    }
  }

  const onChange = (editorValue: string) => {
    const { updateFile } = props;
    // TODO: use fileKey everywhere?
    const { fileKey } = props;
    // TODO: now that we have getCurrentEditableRegion, should the overlays
    // follow that directly? We could subscribe to changes to that and redraw if
    // those imply that the positions have changed (i.e. if the content height
    // has changed or if content is dragged between regions)

    const editableRegion = getCurrentEditableRegion();
    const editableRegionBoundaries = editableRegion && [
      editableRegion.startLineNumber - 1,
      editableRegion.endLineNumber + 1
    ];
    updateFile({ fileKey, editorValue, editableRegionBoundaries });
  };

  function showEditableRegion(editableBoundaries: number[]) {
    if (editableBoundaries.length !== 2) return;
    const editor = data.editor;
    if (!editor) return;
    // TODO: The heuristic has been commented out for now because the cursor
    // position is not saved at the moment, so it's redundant. I'm leaving it
    // here for now, in case we decide to save it in future.
    // this is a heuristic: if the cursor is at the start of the page, chances
    // are the user has not edited yet. If so, move to the start of the editable
    // region.
    // if (
    //  isEqual({ ..._editor.getPosition() }, { lineNumber: 1, column: 1 })
    // ) {
    editor.setPosition({
      lineNumber: editableBoundaries[0] + 1,
      column: 1
    });
    editor.revealLinesInCenter(editableBoundaries[0], editableBoundaries[1]);
    // }
  }

  function highlightLines(
    stickiness: number,
    target: editor.ITextModel,
    range: IRange,
    oldIds: string[] = []
  ) {
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

  function highlightEditableLines(
    stickiness: number,
    target: editor.ITextModel,
    range: IRange,
    oldIds: string[] = []
  ) {
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

  function highlightText(
    stickiness: number,
    target: editor.ITextModel,
    range: IRange,
    oldIds: string[] = []
  ) {
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
  function getViewZoneTop() {
    const editor = data.editor;
    const heightDelta = data.viewZoneHeight;
    if (editor) {
      const top = `${
        editor.getTopForLineNumber(getLineAfterViewZone()) -
        heightDelta -
        editor.getScrollTop()
      }px`;

      return top;
    }
    return '0';
  }

  function getOutputZoneTop() {
    const editor = data.editor;
    const heightDelta = data.outputZoneHeight;
    if (editor) {
      const top = `${
        editor.getTopForLineNumber(getLineAfterEditableRegion()) -
        heightDelta -
        editor.getScrollTop()
      }px`;
      return top;
    }
    return '0';
  }

  // It's not possible to directly access the current view zone so we track
  // the region it should cover instead.
  // TODO: DRY
  function getLineAfterViewZone() {
    // TODO: abstract away the data, ids etc.
    const range = data.model?.getDecorationRange(data.startEditDecId);
    // if the first decoration is missing, this implies the region reaches the
    // start of the editor.
    return range ? range.endLineNumber + 1 : 1;
  }

  function getLineAfterEditableRegion() {
    // TODO: handle the case that the editable region reaches the bottom of the
    // editor
    return (
      data.model?.getDecorationRange(data.endEditDecId)?.startLineNumber ?? 1
    );
  }

  const translateRange = (range: IRange, lineDelta: number) => {
    const iRange = {
      ...range,
      startLineNumber: range.startLineNumber + lineDelta,
      endLineNumber: range.endLineNumber + lineDelta
    };
    return monacoRef.current?.Range.lift(iRange);
  };

  // TODO: TESTS!
  // Make 100% sure this is inclusive.
  // TODO: pass around monacoRef.current instead of using the global one?
  const getLinesBetweenRanges = (
    firstRange: RangeType,
    secondRange: RangeType
  ) => {
    const startRange = translateRange(toLastLine(firstRange), 1);
    const endRange = translateRange(
      toStartOfLine(secondRange),
      -1
    )?.collapseToStart();

    return {
      startLineNumber: startRange?.startLineNumber ?? 1,
      endLineNumber: endRange?.endLineNumber ?? 2
    };
  };

  const getCurrentEditableRegion = () => {
    const monaco = monacoRef.current;
    const { model, startEditDecId, endEditDecId } = data;
    // TODO: this is a little low-level, but we should bail if there is no
    // editable region defined.
    // NOTE: if a decoration is missing, there is still an editable region - it
    // just extends to the edge of the editor. However, no decorations means no
    // editable region.
    if ((!startEditDecId && !endEditDecId) || !model || !monaco) {
      return null;
    } else {
      const firstRange = startEditDecId
        ? model.getDecorationRange(startEditDecId)
        : getStartOfEditor();
      // TODO: handle the case that the editable region reaches the bottom of the
      // editor
      const secondRange = model.getDecorationRange(endEditDecId);
      if (firstRange && secondRange) {
        const { startLineNumber, endLineNumber } = getLinesBetweenRanges(
          firstRange,
          secondRange
        );

        // getValueInRange includes column x if
        // startColumnNumber <= x < endColumnNumber
        // so we add 1 here
        const endColumn = model.getLineLength(endLineNumber) + 1;
        return new monaco.Range(startLineNumber, 1, endLineNumber, endColumn);
      }
      return null;
    }
  };

  // TODO: do this once after _monaco has been created.
  const getStartOfEditor = () =>
    monacoRef.current?.Range.lift({
      startLineNumber: 1,
      endLineNumber: 1,
      startColumn: 1,
      endColumn: 1
    });

  function decorateForbiddenRanges(editableRegion: number[]) {
    const { model } = data;
    const monaco = monacoRef.current;
    if (!model || !monaco) return;
    const forbiddenRanges: [number, number][] = [
      [0, editableRegion[0]],
      [editableRegion[1], model.getLineCount()]
    ];

    const ranges = forbiddenRanges.map(positions => {
      return positionsToRange(model, monaco, positions);
    });

    const editableRange = positionsToRange(model, monaco, [
      editableRegion[0] + 1,
      editableRegion[1] - 1
    ]);

    data.insideEditDecId = highlightEditableLines(
      monaco.editor.TrackedRangeStickiness.AlwaysGrowsWhenTypingAtEdges,
      model,
      editableRange
    )[0];

    // if the forbidden range includes the top of the editor
    // we simply don't add those decorations
    if (forbiddenRanges[0][1] > 0) {
      // the first range should expand at the top
      // TODO: Unsure what this should be - returns an array, so I added [0] @ojeytonwilliams
      data.startEditDecId = highlightLines(
        monaco.editor.TrackedRangeStickiness.GrowsOnlyWhenTypingBefore,
        model,
        ranges[0]
      )[0];

      highlightText(
        monaco.editor.TrackedRangeStickiness.GrowsOnlyWhenTypingBefore,
        model,
        ranges[0]
      );
    }

    // TODO: handle the case the region covers the bottom of the editor
    // the second range should expand at the bottom
    data.endEditDecId = highlightLines(
      monaco.editor.TrackedRangeStickiness.GrowsOnlyWhenTypingAfter,
      model,
      ranges[1]
    )[0];

    highlightText(
      monaco.editor.TrackedRangeStickiness.GrowsOnlyWhenTypingAfter,
      model,
      ranges[1]
    );

    // The deleted line is always considered to be the one that has moved up.
    // - if the user deletes at the end of line 5, line 6 is deleted and
    // - if the user backspaces at the start of line 6, line 6 is deleted
    // TODO: handle multiple simultaneous changes (multicursors do this)
    function getDeletedLine(event: editor.IModelContentChangedEvent) {
      const isDeleted =
        event.changes[0].text === '' && event.changes[0].range.endColumn === 1;
      return isDeleted ? event.changes[0].range.endLineNumber : 0;
    }

    function getNewLineRanges(event: editor.IModelContentChangedEvent) {
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
      const newLineRanges = getNewLineRanges(e).map(range => {
        if (monaco) {
          return toStartOfLine(monaco.Range.lift(range));
        }
      });
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
        updateViewZone();
        updateOutputZone();
        return;
      }

      const warnUser = (id: string) => {
        const range = model.getDecorationRange(id);
        if (range) {
          const coveringRange = toStartOfLine(range);
          e.changes.forEach(({ range }) => {
            if (monaco.Range.areIntersectingOrTouching(coveringRange, range)) {
              console.log('OVERLAP!');
            }
          });
        }
      };

      // Make sure the zone tracks the decoration (i.e. the region), which might
      // have changed if a line has been added or removed
      const handleHintsZoneChange = () => {
        if (newLineRanges.length > 0 || deletedLine > 0) {
          updateOutputZone();
        }
      };

      // Make sure the zone tracks the decoration (i.e. the region), which might
      // have changed if a line has been added or removed
      const handleDescriptionZoneChange = () => {
        if (newLineRanges.length > 0 || deletedLine > 0) {
          updateViewZone();
        }
      };

      // Stops the greyed out region from covering the editable region. Does not
      // change the font decoration.
      const preventOverlap = (
        id: string,
        stickiness: number,
        highlightFunction: typeof highlightLines
      ) => {
        // Even though the decoration covers the whole line, it has a
        // startColumn that moves.  toStartOfLine ensures that the
        // comparison detects if any change has occurred on that line
        // NOTE: any change in the decoration has already happened by this point
        // so this covers the *new* decoration range.
        const range = model.getDecorationRange(id);
        if (!range) {
          return id;
        }
        const coveringRange = toStartOfLine(range);
        const oldStartOfRange = translateRange(
          coveringRange.collapseToStart(),
          1
        );
        const newCoveringRange = coveringRange.setStartPosition(
          oldStartOfRange?.startLineNumber ?? 1,
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
        if (oldStartOfRange) {
          const touchingDeleted = monaco.Range.areIntersectingOrTouching(
            deletedRange,
            oldStartOfRange
          );

          if (touchingDeleted) {
            // TODO: if they undo this should be reversed
            const decorations = highlightFunction(
              stickiness,
              model,
              newCoveringRange,
              [id]
            );

            updateOutputZone();
            return decorations[0];
          } else {
            return id;
          }
        }
        return id;
      };

      // we only need to handle the special case of the second region being
      // pulled up, the first region already behaves correctly.

      data.endEditDecId = preventOverlap(
        data.endEditDecId,
        monaco.editor.TrackedRangeStickiness.GrowsOnlyWhenTypingBefore,
        highlightLines
      );

      data.insideEditDecId = preventOverlap(
        data.insideEditDecId,
        monaco.editor.TrackedRangeStickiness.AlwaysGrowsWhenTypingAtEdges,
        highlightEditableLines
      );

      // TODO: do the same for the description widget
      // this has to be handle differently, because we care about the END
      // of the zone, not the START
      // if the editable region includes the first line, the first decoration
      // will be missing.
      if (data.startEditDecId) {
        handleDescriptionZoneChange();
        warnUser(data.startEditDecId);
      }
      handleHintsZoneChange();
      if (data.endEditDecId) {
        warnUser(data.endEditDecId);
      }
    });
  }

  // creates a range covering all the lines in 'positions'
  // NOTE: positions is an array of [startLine, endLine]
  function positionsToRange(
    model: editor.ITextModel,
    monaco: typeof monacoEditor,
    [start, end]: [number, number]
  ) {
    // convert to [startLine, startColumn, endLine, endColumn]
    const range = new monaco.Range(start, 1, end, 1);

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

  useEffect(() => {
    // If a challenge is reset, it needs to communicate that change to the
    // editor.
    updateEditorValues();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.challengeFiles]);
  useEffect(() => {
    const { output, tests } = props;
    const editableRegion = getEditableRegion();
    if (editableRegion.length === 2) {
      const challengeComplete = tests.every(test => test.pass && !test.err);
      const chellengeHasErrors = tests.some(test => test.err);
      const testOutput = document.getElementById('test-output');
      const testStatus = document.getElementById('test-status');
      if (challengeComplete) {
        const testButton = document.getElementById('test-button');
        if (testButton) {
          testButton.innerHTML =
            'Submit your code and go to next challenge (Ctrl + Enter)';
          testButton.onclick = () => {
            const { submitChallenge } = props;
            submitChallenge();
          };
        }

        const editableRegionDecorators = document.getElementsByClassName(
          'myEditableLineDecoration'
        );
        if (editableRegionDecorators.length > 0) {
          for (const i of editableRegionDecorators) {
            i.classList.add('tests-passed');
          }
        }
        if (testOutput && testStatus) {
          testOutput.innerHTML = '';
          testStatus.innerHTML = '&#9989; Step completed.';
        }
      } else if (chellengeHasErrors && testStatus && testOutput) {
        const wordsArray = [
          "Not quite. Here's a hint:",
          'Try again. This might help:',
          'Keep trying. A quick hint for you:',
          "You're getting there. This may help:",
          "Hang in there. You'll get there. A hint:",
          "Don't give up. Here's a hint to get you thinking:"
        ];
        testStatus.innerHTML = `✖️ ${
          wordsArray[Math.floor(Math.random() * wordsArray.length)]
        }`;
        testOutput.innerHTML = `${output[1]}`;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.tests]);
  useEffect(() => {
    const { output } = props;
    // TODO: do we need this condition?  What happens if the ref is empty?
    if (data.outputNode) {
      // TODO: output gets wiped when the preview gets updated, keeping the
      // display is an anti-pattern (the render should not ignore props!).
      // The correct solution is probably to create a new redux variable
      // (shownHint,maybe) and have that persist through previews.  But, for
      // now:
      if (output) {
        // if either id exists, the editable region exists
        // TODO: add a layer of abstraction: we should be interacting with
        // the editable region, not the ids
        if (data.startEditDecId || data.endEditDecId) {
          updateOutputZone();
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.output]);
  useEffect(() => {
    const editor = data.editor;
    editor?.layout();
    if (data.startEditDecId) {
      updateViewZone();
      updateOutputZone();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.dimensions]);

  // TODO: DRY (there's going to be a lot of that)
  function updateOutputZone() {
    const editor = data.editor;
    editor?.changeViewZones(changeAccessor => {
      changeAccessor.removeZone(data.outputZoneId);
      outputZoneCallback(changeAccessor);
    });
  }

  function updateViewZone() {
    const editor = data.editor;
    editor?.changeViewZones(changeAccessor => {
      changeAccessor.removeZone(data.viewZoneId);
      viewZoneCallback(changeAccessor);
    });
  }

  const { theme } = props;
  const editorTheme = theme === 'night' ? 'vs-dark-custom' : 'vs-custom';
  return (
    <Suspense fallback={<Loader timeout={600} />}>
      <span className='notranslate'>
        <MonacoEditor
          editorDidMount={editorDidMount}
          editorWillMount={editorWillMount}
          onChange={onChange}
          options={options}
          theme={editorTheme}
        />
      </span>
    </Suspense>
  );
};

Editor.displayName = 'Editor';

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
