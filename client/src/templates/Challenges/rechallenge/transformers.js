import {
  attempt,
  cond,
  flow,
  identity,
  isError,
  matchesProperty,
  overSome,
  partial,
  stubTrue
} from 'lodash-es';

import protect from '@freecodecamp/loop-protect';

import * as vinyl from '../../../../../utils/polyvinyl.js';
import createWorker from '../utils/worker-executor';

// the config files are created during the build, but not before linting
// eslint-disable-next-line import/no-unresolved
import sassData from '../../../../../config/client/sass-compile.json';

const { filename: sassCompile } = sassData;

const protectTimeout = 100;
const testProtectTimeout = 1500;
const loopsPerTimeoutCheck = 2000;

function loopProtectCB(line) {
  console.log(
    `Potential infinite loop detected on line ${line}. Tests may fail if this is not changed.`
  );
}

function testLoopProtectCB(line) {
  console.log(
    `Potential infinite loop detected on line ${line}. Tests may be failing because of this.`
  );
}

// hold Babel, presets and options so we don't try to import them multiple times

let Babel;
let presetEnv, presetReact;
let babelOptionsJSBase, babelOptionsJS, babelOptionsJSX, babelOptionsJSPreview;

async function loadBabel() {
  if (Babel) return;
  /* eslint-disable no-inline-comments */
  Babel = await import(
    /* webpackChunkName: "@babel/standalone" */ '@babel/standalone'
  );
  /* eslint-enable no-inline-comments */
  Babel.registerPlugin(
    'loopProtection',
    protect(protectTimeout, loopProtectCB)
  );
  Babel.registerPlugin(
    'testLoopProtection',
    protect(testProtectTimeout, testLoopProtectCB, loopsPerTimeoutCheck)
  );
}

async function loadPresetEnv() {
  /* eslint-disable no-inline-comments */
  if (!presetEnv)
    presetEnv = await import(
      /* webpackChunkName: "@babel/preset-env" */ '@babel/preset-env'
    );
  /* eslint-enable no-inline-comments */

  babelOptionsJSBase = {
    presets: [presetEnv]
  };
  babelOptionsJS = {
    ...babelOptionsJSBase,
    plugins: ['testLoopProtection']
  };
  babelOptionsJSPreview = {
    ...babelOptionsJSBase,
    plugins: ['loopProtection']
  };
}

async function loadPresetReact() {
  /* eslint-disable no-inline-comments */
  if (!presetReact)
    presetReact = await import(
      /* webpackChunkName: "@babel/preset-react" */ '@babel/preset-react'
    );
  if (!presetEnv)
    presetEnv = await import(
      /* webpackChunkName: "@babel/preset-env" */ '@babel/preset-env'
    );
  /* eslint-enable no-inline-comments */
  babelOptionsJSX = {
    plugins: ['loopProtection'],
    presets: [presetEnv, presetReact]
  };
}

const babelTransformCode = options => code =>
  Babel.transform(code, options).code;

// const sourceReg =
//  /(<!-- fcc-start-source -->)([\s\S]*?)(?=<!-- fcc-end-source -->)/g;
const NBSPReg = new RegExp(String.fromCharCode(160), 'g');

const testJS = matchesProperty('ext', 'js');
const testJSX = matchesProperty('ext', 'jsx');
const testHTML = matchesProperty('ext', 'html');
const testHTML$JS$JSX = overSome(testHTML, testJS, testJSX);
export const testJS$JSX = overSome(testJS, testJSX);

export const replaceNBSP = cond([
  [
    testHTML$JS$JSX,
    partial(vinyl.transformContents, contents => contents.replace(NBSPReg, ' '))
  ],
  [stubTrue, identity]
]);

function tryTransform(wrap = identity) {
  return function transformWrappedPoly(source) {
    const result = attempt(wrap, source);
    if (isError(result)) {
      // note(Bouncey): Error thrown here to collapse the build pipeline
      // At the minute, it will not bubble up
      // We collapse the pipeline so the app doesn't fall over trying
      // parse bad code (syntax/type errors etc...)
      throw result;
    }
    return result;
  };
}

const babelTransformer = options => {
  return cond([
    [
      testJS,
      async code => {
        await loadBabel();
        await loadPresetEnv();
        const babelOptions = getBabelOptions(options);
        return partial(
          vinyl.transformHeadTailAndContents,
          tryTransform(babelTransformCode(babelOptions))
        )(code);
      }
    ],
    [
      testJSX,
      async code => {
        await loadBabel();
        await loadPresetReact();
        return flow(
          partial(
            vinyl.transformHeadTailAndContents,
            tryTransform(babelTransformCode(babelOptionsJSX))
          ),
          partial(vinyl.setExt, 'js')
        )(code);
      }
    ],
    [stubTrue, identity]
  ]);
};

function getBabelOptions({ preview = false, protect = true }) {
  let options = babelOptionsJSBase;
  // we always protect the preview, since it evaluates as the user types and
  // they may briefly have infinite looping code accidentally
  if (protect) {
    options = preview ? babelOptionsJSPreview : babelOptionsJS;
  } else {
    options = preview ? babelOptionsJSPreview : options;
  }
  return options;
}

const sassWorker = createWorker(sassCompile);
async function transformSASS(contentDocument) {
  // we only teach scss syntax, not sass. Also the compiler does not seem to be
  // able to deal with sass.
  const styleTags = contentDocument.querySelectorAll(
    'style[type~="text/scss"]'
  );
  await Promise.all(
    [].map.call(styleTags, async style => {
      style.type = 'text/css';
      style.innerHTML = await sassWorker.execute(style.innerHTML, 5000).done;
    })
  );
}

async function transformScript(contentDocument) {
  await loadBabel();
  await loadPresetEnv();
  const scriptTags = contentDocument.querySelectorAll('script');
  scriptTags.forEach(script => {
    script.innerHTML = tryTransform(babelTransformCode(babelOptionsJS))(
      script.innerHTML
    );
  });
}

const transformHtml = async function (file) {
  // we use iframe here since file.contents is destined to be be inserted into
  // the root of an iframe.
  const frame = document.createElement('iframe');
  frame.style = 'display: none';
  let contents = file.contents;
  try {
    // the frame needs to be inserted into the document to create the html
    // element
    document.body.appendChild(frame);
    // replace the root element with user code
    frame.contentDocument.documentElement.innerHTML = contents;
    // grab the contents now, in case the transformation fails
    contents = frame.contentDocument.documentElement.innerHTML;
    await Promise.all([
      transformSASS(frame.contentDocument),
      transformScript(frame.contentDocument)
    ]);
    contents = frame.contentDocument.documentElement.innerHTML;
  } finally {
    document.body.removeChild(frame);
  }
  return vinyl.transformContents(() => contents, file);
};

export const composeHTML = cond([
  [testHTML, partial(vinyl.compileHeadTail, '')],
  [stubTrue, identity]
]);

export const htmlTransformer = cond([
  [testHTML, transformHtml],
  [stubTrue, identity]
]);

export const getTransformers = options => [
  replaceNBSP,
  babelTransformer(options ? options : {}),
  composeHTML,
  htmlTransformer
];
