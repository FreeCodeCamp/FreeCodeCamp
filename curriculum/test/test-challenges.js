/* eslint-disable no-loop-func */
const path = require('path');
const liveServer = require('live-server');
const stringSimilarity = require('string-similarity');
const { isAuditedCert } = require('../../utils/is-audited');

const spinner = require('ora')();

const clientPath = path.resolve(__dirname, '../../client');
require('@babel/polyfill');
require('@babel/register')({
  root: clientPath,
  babelrc: false,
  presets: ['@babel/preset-env', '@babel/typescript'],
  plugins: ['dynamic-import-node'],
  ignore: [/node_modules/],
  only: [clientPath]
});

const mockRequire = require('mock-require');
const lodash = require('lodash');

// lodash-es can't easily be used in node environments, so we just mock it out
// for the original lodash in testing.
mockRequire('lodash-es', lodash);

const createPseudoWorker = require('./utils/pseudo-worker');
const {
  default: createWorker
} = require('../../client/src/templates/Challenges/utils/worker-executor');

const { assert, AssertionError } = require('chai');
const Mocha = require('mocha');

const { flatten, isEmpty, cloneDeep, isEqual } = lodash;
const { getLines } = require('../../utils/get-lines');

const jsdom = require('jsdom');

const vm = require('vm');

const puppeteer = require('puppeteer');

const {
  getChallengesForLang,
  getMetaForBlock,
  getTranslatableComments
} = require('../getChallenges');

const MongoIds = require('./utils/mongoIds');
const ChallengeTitles = require('./utils/challengeTitles');
const { challengeSchemaValidator } = require('../schema/challengeSchema');
const { challengeTypes } = require('../../client/utils/challengeTypes');

const { toSortedArray } = require('../../utils/sort-files');

const { testedLang } = require('../utils');

const {
  buildDOMChallenge,
  buildJSChallenge
} = require('../../client/src/templates/Challenges/utils/build');

const { sortChallenges } = require('./utils/sort-challenges');

const TRANSLATABLE_COMMENTS = getTranslatableComments(
  path.resolve(__dirname, '..', 'dictionaries')
);

// the config files are created during the build, but not before linting
/* eslint-disable import/no-unresolved */
const testEvaluator =
  require('../../config/client/test-evaluator.json').filename;
/* eslint-enable import/no-unresolved */
const { inspect } = require('util');

const commentExtractors = {
  html: require('./utils/extract-html-comments'),
  js: require('./utils/extract-js-comments'),
  jsx: require('./utils/extract-jsx-comments'),
  css: require('./utils/extract-css-comments'),
  scriptJs: require('./utils/extract-script-js-comments')
};

// rethrow unhandled rejections to make sure the tests exit with -1
process.on('unhandledRejection', err => handleRejection(err));

const handleRejection = err => {
  // setting the error code because node does not (yet) exit with a non-zero
  // code on unhandled exceptions.
  process.exitCode = 1;
  cleanup();
  if (process.env.FULL_OUTPUT === 'true') {
    // some errors *may* not be reported, since cleanup is triggered by the
    // first error and that starts shutting down the browser and the server.
    console.error(err);
  } else {
    throw err;
  }
};

const dom = new jsdom.JSDOM('');
global.document = dom.window.document;

const oldRunnerFail = Mocha.Runner.prototype.fail;
Mocha.Runner.prototype.fail = function (test, err) {
  if (err instanceof AssertionError) {
    const errMessage = String(err.message || '');
    const assertIndex = errMessage.indexOf(': expected');
    if (assertIndex !== -1) {
      err.message = errMessage.slice(0, assertIndex);
    }
    // Don't show stacktrace for assertion errors.
    if (err.stack) {
      delete err.stack;
    }
  }
  return oldRunnerFail.call(this, test, err);
};

async function newPageContext(browser) {
  const page = await browser.newPage();
  // it's needed for workers as context.
  await page.goto('http://127.0.0.1:8080/index.html');
  return page;
}

spinner.start();
spinner.text = 'Populate tests.';

let browser;
let page;

setup()
  .then(runTests)
  .catch(err => handleRejection(err));

async function setup() {
  if (process.env.npm_config_superblock && process.env.npm_config_block) {
    throw new Error(`Please do not use both a block and superblock as input.`);
  }

  // liveServer starts synchronously
  liveServer.start({
    host: '127.0.0.1',
    port: '8080',
    root: path.resolve(__dirname, 'stubs'),
    mount: [['/js', path.join(clientPath, 'static/js')]],
    open: false,
    logLevel: 0
  });
  browser = await puppeteer.launch({
    args: [
      // Required for Docker version of Puppeteer
      '--no-sandbox',
      '--disable-setuid-sandbox',
      // This will write shared memory files into /tmp instead of /dev/shm,
      // because Docker’s default for /dev/shm is 64MB
      '--disable-dev-shm-usage'
      // dumpio: true
    ]
  });
  global.Worker = createPseudoWorker(await newPageContext(browser));
  page = await newPageContext(browser);
  await page.setViewport({ width: 300, height: 150 });

  const lang = testedLang();

  let challenges = await getChallenges(lang);

  // the next few statements create a list of all blocks and superblocks
  // as they appear in the list of challenges
  const blocks = challenges.map(({ block }) => block);
  const superBlocks = challenges.map(({ superBlock }) => superBlock);
  const targetBlockStrings = [...new Set(blocks)];
  const targetSuperBlockStrings = [...new Set(superBlocks)];

  // the next few statements will filter challenges based on command variables
  if (process.env.npm_config_superblock) {
    const filter = stringSimilarity.findBestMatch(
      process.env.npm_config_superblock,
      targetSuperBlockStrings
    ).bestMatch.target;

    console.log(`\nsuperBlock being tested: ${filter}`);
    challenges = challenges.filter(
      challenge => challenge.superBlock === filter
    );

    if (!challenges.length) {
      throw new Error(`No challenges found with superBlock "${filter}"`);
    }
  }

  if (process.env.npm_config_block) {
    const filter = stringSimilarity.findBestMatch(
      process.env.npm_config_block,
      targetBlockStrings
    ).bestMatch.target;

    console.log(`\nblock being tested: ${filter}`);
    challenges = challenges.filter(challenge => challenge.block === filter);

    if (!challenges.length) {
      throw new Error(`No challenges found with block "${filter}"`);
    }
  }

  const meta = {};
  for (const challenge of challenges) {
    const dashedBlockName = challenge.block;
    if (!meta[dashedBlockName]) {
      meta[dashedBlockName] = (
        await getMetaForBlock(dashedBlockName)
      ).challengeOrder;
    }
  }
  return {
    meta,
    challenges,
    lang
  };
}

// cleanup calls some async functions, but it's the last thing that happens, so
// no need to await anything.
function cleanup() {
  if (browser) {
    browser.close();
  }
  liveServer.shutdown();
  spinner.stop();
}

function runTests(challengeData) {
  describe('Check challenges', function () {
    after(function () {
      cleanup();
    });
    populateTestsForLang(challengeData);
  });
  spinner.text = 'Testing';
  run();
}

async function getChallenges(lang) {
  const challenges = await getChallengesForLang(lang).then(curriculum =>
    Object.keys(curriculum)
      .map(key => curriculum[key].blocks)
      .reduce((challengeArray, superBlock) => {
        const challengesForBlock = Object.keys(superBlock).map(
          key => superBlock[key].challenges
        );
        return [...challengeArray, ...flatten(challengesForBlock)];
      }, [])
  );
  // This matches the order Gatsby uses (via a GraphQL query). Ideally both
  // should be sourced and sorted using a single query, but we're not there yet.
  return sortChallenges(challenges);
}

function populateTestsForLang({ lang, challenges, meta }) {
  const mongoIds = new MongoIds();
  const challengeTitles = new ChallengeTitles();
  const validateChallenge = challengeSchemaValidator();

  describe(`Check challenges (${lang})`, function () {
    this.timeout(5000);
    challenges.forEach((challenge, id) => {
      const dashedBlockName = challenge.block;
      describe(challenge.block || 'No block', function () {
        describe(challenge.title || 'No title', function () {
          // Note: the title in meta.json are purely for human readability and
          // do not include translations, so we do not validate against them.
          it('Matches an ID in meta.json', function () {
            const index = meta[dashedBlockName].findIndex(
              arr => arr[0] === challenge.id
            );

            if (index < 0) {
              throw new AssertionError(
                `Cannot find ID "${challenge.id}" in meta.json file`
              );
            }
          });

          it('Common checks', function () {
            const result = validateChallenge(challenge);

            if (result.error) {
              throw new AssertionError(result.error);
            }
            const { id, title, block, dashedName } = challenge;
            const pathAndTitle = `${block}/${dashedName}`;
            mongoIds.check(id, title);
            challengeTitles.check(title, pathAndTitle);
          });

          it('Has replaced all the English comments', () => {
            // special cases are where this process breaks for some reason, but
            // we have validated that the challenge gets parsed correctly.
            const specialCases = [
              '587d7b84367417b2b2512b36',
              '587d7b84367417b2b2512b37',
              '587d7db0367417b2b2512b82',
              '587d7dbe367417b2b2512bb8',
              '5a24c314108439a4d4036161',
              '5a24c314108439a4d4036154',
              '5a94fe0569fb03452672e45c',
              '5a94fe7769fb03452672e463',
              '5a24c314108439a4d4036148'
            ];
            if (specialCases.includes(challenge.id)) return;
            if (
              lang === 'english' ||
              !isAuditedCert(lang, challenge.superBlock)
            ) {
              return;
            }

            // If no .files, then no seed:
            if (!challenge.challengeFiles) return;

            // - None of the translatable comments should appear in the
            //   translations. While this is a crude check, no challenges
            //   currently have the text of a comment elsewhere. If that happens
            //   we can handle that challenge separately.
            TRANSLATABLE_COMMENTS.forEach(comment => {
              challenge.challengeFiles.forEach(challengeFile => {
                if (challengeFile.contents.includes(comment))
                  throw Error(
                    `English comment '${comment}' should be replaced with its translation`
                  );
              });
            });

            // - None of the translated comment texts should appear *outside* a
            //   comment
            // TODO: Does not look correct @ShaunSHamilton
            challenge.challengeFiles.forEach(challengeFile => {
              let comments = {};

              // We get all the actual comments using the appropriate parsers
              if (challengeFile.ext === 'html') {
                const commentTypes = ['css', 'html', 'scriptJs'];
                for (let type of commentTypes) {
                  const newComments = commentExtractors[type](
                    challengeFile.contents
                  );
                  for (const [key, value] of Object.entries(newComments)) {
                    comments[key] = comments[key]
                      ? comments[key] + value
                      : value;
                  }
                }
              } else {
                comments = commentExtractors[challengeFile.ext](
                  challengeFile.contents
                );
              }

              // Then we compare the number of times each comment appears in the
              // translated text (commentMap) with the number of replacements
              // made during translation (challenge.__commentCounts). If they
              // differ, the translation must have gone wrong

              const commentMap = new Map(Object.entries(comments));

              if (isEmpty(challenge.__commentCounts) && isEmpty(commentMap))
                return;

              if (!isEqual(commentMap, challenge.__commentCounts))
                throw Error(`Mismatch in ${challenge.title}. Replaced comments:
${inspect(challenge.__commentCounts)}
Comments in translated text:
${inspect(commentMap)}
`);
            });
          });

          const { challengeType } = challenge;
          if (
            challengeType !== challengeTypes.html &&
            challengeType !== challengeTypes.js &&
            challengeType !== challengeTypes.bonfire &&
            challengeType !== challengeTypes.modern &&
            challengeType !== challengeTypes.backend
          ) {
            return;
          }

          let { tests = [] } = challenge;
          tests = tests.filter(test => !!test.testString);
          if (tests.length === 0) {
            it('Check tests. No tests.');
            return;
          }

          describe('Check tests syntax', function () {
            tests.forEach(test => {
              it(`Check for: ${test.text}`, function () {
                assert.doesNotThrow(() => new vm.Script(test.testString));
              });
            });
          });

          if (challengeType === challengeTypes.backend) {
            it('Check tests is not implemented.');
            return;
          }

          const buildChallenge =
            challengeType === challengeTypes.js ||
            challengeType === challengeTypes.bonfire
              ? buildJSChallenge
              : buildDOMChallenge;

          it('Test suite must fail on the initial contents', async function () {
            this.timeout(5000 * tests.length + 1000);
            // suppress errors in the console.
            const oldConsoleError = console.error;
            console.error = () => {};
            let fails = false;
            let testRunner;
            try {
              testRunner = await createTestRunner(
                challenge,
                [],
                buildChallenge
              );
            } catch {
              fails = true;
            }
            if (!fails) {
              for (const test of tests) {
                try {
                  await testRunner(test);
                } catch (e) {
                  fails = true;
                  break;
                }
              }
            }
            console.error = oldConsoleError;
            assert(fails, 'Test suit does not fail on the initial contents');
          });

          let { solutions = [] } = challenge;

          // if there's an empty string as solution, this is likely a mistake
          // TODO: what does this look like now? (this being detection of empty
          // lines in solutions - rather than entirely missing solutions)

          // We need to track where the solution came from to give better
          // feedback if the solution is failing.
          let solutionFromNext = false;

          if (isEmpty(solutions)) {
            // if there are no solutions in the challenge, it's assumed the next
            // challenge's seed will be a solution to the current challenge.
            // This is expected to happen in the project based curriculum.

            const nextChallenge = challenges[id + 1];
            // TODO: can this be dried out, ideally by removing the redux
            // handler?
            if (nextChallenge) {
              const solutionFiles = cloneDeep(nextChallenge.challengeFiles);
              solutionFiles.forEach(challengeFile => {
                challengeFile.editableContents = getLines(
                  challengeFile.contents,
                  challenge.challengeFiles.find(
                    x => x.fileKey === challengeFile.fileKey
                  ).editableRegionBoundaries
                );
              });
              solutions = [solutionFiles];
              solutionFromNext = true;
            } else {
              throw Error('solution omitted');
            }
          }

          // TODO: the no-solution filtering is a little convoluted:
          const noSolution = new RegExp('// solution required');

          const solutionsAsArrays = solutions.map(toSortedArray);

          const filteredSolutions = solutionsAsArrays.filter(solution => {
            return !isEmpty(
              solution.filter(
                challengeFile => !noSolution.test(challengeFile.contents)
              )
            );
          });

          if (isEmpty(filteredSolutions)) {
            it('Check tests. No solutions');
            return;
          }

          describe('Check tests against solutions', function () {
            solutions.forEach((solution, index) => {
              it(`Solution ${
                index + 1
              } must pass the tests`, async function () {
                this.timeout(5000 * tests.length + 2000);
                const testRunner = await createTestRunner(
                  challenge,
                  solution,
                  buildChallenge,
                  solutionFromNext
                );
                for (const test of tests) {
                  await testRunner(test);
                }
              });
            });
          });
        });
      });
    });
  });
}

async function createTestRunner(
  challenge,
  solutionFiles,
  buildChallenge,
  solutionFromNext
) {
  const { required = [], template, removeComments } = challenge;
  // we should avoid modifying challenge, as it gets reused:
  const challengeFiles = cloneDeep(challenge.challengeFiles);
  // const solutions = cloneDeep(challenge.solutions);
  solutionFiles.forEach(solutionFile => {
    const challengeFile = challengeFiles.find(
      x => x.fileKey === solutionFile.fileKey
    );
    challengeFile.contents = solutionFile.contents;
    challengeFile.editableContents = solutionFile.editableContents;
  });

  const { build, sources, loadEnzyme } = await buildChallenge({
    challengeFiles,
    required,
    template
  });

  const code = {
    contents: sources.index,
    editableContents: sources.editableContents
  };

  const evaluator = await (buildChallenge === buildDOMChallenge
    ? getContextEvaluator(build, sources, code, loadEnzyme)
    : getWorkerEvaluator(build, sources, code, removeComments));

  return async ({ text, testString }) => {
    try {
      const { pass, err } = await evaluator.evaluate(testString, 5000);
      if (!pass) {
        throw err;
      }
    } catch (err) {
      // add more info to the error so the failing test can be identified.
      text = 'Test text: ' + text;
      const newMessage = solutionFromNext
        ? 'Check next step for solution!\n' + text
        : text;
      // if the stack is missing, the message should be included. Otherwise it
      // is redundant.
      err.message = err.stack
        ? newMessage
        : `${newMessage}
      ${err.message}`;
      throw err;
    }
  };
}

async function getContextEvaluator(build, sources, code, loadEnzyme) {
  await initializeTestRunner(build, sources, code, loadEnzyme);

  return {
    evaluate: async (testString, timeout) =>
      Promise.race([
        new Promise((_, reject) =>
          setTimeout(() => reject('timeout'), timeout)
        ),
        await page.evaluate(async testString => {
          return await document.__runTest(testString);
        }, testString)
      ])
  };
}

async function getWorkerEvaluator(build, sources, code, removeComments) {
  const testWorker = createWorker(testEvaluator, { terminateWorker: true });
  return {
    evaluate: async (testString, timeout) =>
      await testWorker.execute(
        { testString, build, code, sources, removeComments },
        timeout
      ).done
  };
}

async function initializeTestRunner(build, sources, code, loadEnzyme) {
  await page.reload();
  await page.setContent(build);
  await page.evaluate(
    async (code, sources, loadEnzyme) => {
      const getUserInput = fileName => sources[fileName];
      await document.__initTestFrame({ code, getUserInput, loadEnzyme });
    },
    code,
    sources,
    loadEnzyme
  );
}
