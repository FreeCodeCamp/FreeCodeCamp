const path = require('path');
const { findIndex, reduce, toString } = require('lodash');
const readDirP = require('readdirp');
const yaml = require('js-yaml');
const { parseMD } = require('../tools/challenge-parser/parser');
const fs = require('fs');
const util = require('util');
/* eslint-disable max-len */
const {
  translateCommentsInChallenge
} = require('../tools/challenge-parser/translation-parser');
/* eslint-enable max-len*/

const { isAuditedCert } = require('../utils/is-audited');
const { dasherize } = require('../utils/slugs');
const { createPoly } = require('../utils/polyvinyl');
const { helpCategoryMap } = require('../client/utils/challengeTypes');
const { curriculum: curriculumLangs } =
  require('../config/i18n/all-langs').availableLangs;

const { showUpcomingChanges } = require('../config/env.json');

const access = util.promisify(fs.access);

const challengesDir = path.resolve(__dirname, './challenges');
const metaDir = path.resolve(challengesDir, '_meta');
exports.challengesDir = challengesDir;
exports.metaDir = metaDir;

const COMMENT_TRANSLATIONS = createCommentMap(
  path.resolve(__dirname, './dictionaries')
);

function getTranslatableComments(dictionariesDir) {
  const COMMENTS_TO_TRANSLATE = require(path.resolve(
    dictionariesDir,
    'english',
    'comments.json'
  ));
  return Object.values(COMMENTS_TO_TRANSLATE);
}

exports.getTranslatableComments = getTranslatableComments;

function createCommentMap(dictionariesDir) {
  // get all the languages for which there are dictionaries.
  const languages = fs
    .readdirSync(dictionariesDir)
    .filter(x => x !== 'english');

  // get all their dictionaries
  const dictionaries = languages.reduce(
    (acc, lang) => ({
      ...acc,
      [lang]: require(path.resolve(dictionariesDir, lang, 'comments.json'))
    }),
    {}
  );

  // get the english dicts
  const COMMENTS_TO_TRANSLATE = require(path.resolve(
    dictionariesDir,
    'english',
    'comments.json'
  ));

  const COMMENTS_TO_NOT_TRANSLATE = require(path.resolve(
    dictionariesDir,
    'english',
    'comments-to-not-translate'
  ));

  // map from english comment text to translations
  const translatedCommentMap = Object.entries(COMMENTS_TO_TRANSLATE).reduce(
    (acc, [id, text]) => {
      return {
        ...acc,
        [text]: getTranslationEntry(dictionaries, { engId: id, text })
      };
    },
    {}
  );

  // map from english comment text to itself
  const untranslatableCommentMap = Object.values(
    COMMENTS_TO_NOT_TRANSLATE
  ).reduce((acc, text) => {
    const englishEntry = languages.reduce(
      (acc, lang) => ({
        ...acc,
        [lang]: text
      }),
      {}
    );
    return {
      ...acc,
      [text]: englishEntry
    };
  }, {});

  return { ...translatedCommentMap, ...untranslatableCommentMap };
}

exports.createCommentMap = createCommentMap;

function getTranslationEntry(dicts, { engId, text }) {
  return Object.keys(dicts).reduce((acc, lang) => {
    const entry = dicts[lang][engId];
    if (entry) {
      return { ...acc, [lang]: entry };
    } else {
      throw Error(`Missing translation for comment
'${text}'
        with id of ${engId}`);
    }
  }, {});
}

function getChallengesDirForLang(lang) {
  return path.resolve(challengesDir, `./${lang}`);
}

function getMetaForBlock(block) {
  return JSON.parse(
    fs.readFileSync(path.resolve(metaDir, `./${block}/meta.json`), 'utf8')
  );
}

function parseCert(filePath) {
  return yaml.load(fs.readFileSync(filePath, 'utf8'));
}

exports.getChallengesDirForLang = getChallengesDirForLang;
exports.getMetaForBlock = getMetaForBlock;

// This recursively walks the directories starting at root, and calls cb for
// each file/directory and only resolves once all the callbacks do.
const walk = (root, target, options, cb) => {
  return new Promise(resolve => {
    let running = 1;
    function done() {
      if (--running === 0) {
        resolve(target);
      }
    }
    readDirP(root, options)
      .on('data', file => {
        running++;
        cb(file, target).then(done);
      })
      .on('end', done);
  });
};

exports.getChallengesForLang = async function getChallengesForLang(lang) {
  const root = getChallengesDirForLang(lang);
  // scaffold the curriculum, first set up the superblocks, then recurse into
  // the blocks
  const curriculum = await walk(
    root,
    {},
    { type: 'directories', depth: 1 },
    buildSuperBlocks
  );
  const cb = (file, curriculum) => buildChallenges(file, curriculum, lang);
  // fill the scaffold with the challenges
  return walk(
    root,
    curriculum,
    { type: 'files', fileFilter: ['*.md', '*.yml'] },
    cb
  );
};

async function buildBlocks({ basename: blockName }, curriculum, superBlock) {
  const metaPath = path.resolve(
    __dirname,
    `./challenges/_meta/${blockName}/meta.json`
  );
  const blockMeta = require(metaPath);
  const { isUpcomingChange } = blockMeta;
  if (typeof isUpcomingChange !== 'boolean') {
    throw Error(
      `meta file at ${metaPath} is missing 'isUpcomingChange', it must be 'true' or 'false'`
    );
  }

  if (!isUpcomingChange || showUpcomingChanges) {
    // add the block to the superBlock
    const blockInfo = { meta: blockMeta, challenges: [] };
    curriculum[superBlock].blocks[blockName] = blockInfo;
  }
}

async function buildSuperBlocks({ path, fullPath }, curriculum) {
  const { order, name: superBlock } = superBlockInfo(path);
  curriculum[superBlock] = { superBlock, order, blocks: {} };

  const cb = (file, curriculum) => buildBlocks(file, curriculum, superBlock);
  return walk(fullPath, curriculum, { depth: 1, type: 'directories' }, cb);
}

async function buildChallenges({ path }, curriculum, lang) {
  // path is relative to getChallengesDirForLang(lang)
  const block = getBlockNameFromPath(path);
  const { name: superBlock } = superBlockInfoFromPath(path);
  let challengeBlock;

  // TODO: this try block and process exit can all go once errors terminate the
  // tests correctly.
  try {
    challengeBlock = curriculum[superBlock].blocks[block];
    if (!challengeBlock) {
      // this should only happen when a isUpcomingChange block is skipped
      return;
    }
  } catch (e) {
    console.log(`failed to create superBlock ${superBlock}`);
    // eslint-disable-next-line no-process-exit
    process.exit(1);
  }
  const { meta } = challengeBlock;

  const challenge = await createChallenge(challengesDir, path, lang, meta);

  challengeBlock.challenges = [...challengeBlock.challenges, challenge];
}

async function parseTranslation(transPath, dict, lang, parse = parseMD) {
  const translatedChal = await parse(transPath);

  const { challengeType } = translatedChal;
  // challengeType 11 is for video challenges and 3 is for front-end projects
  // neither of which have seeds.
  return challengeType !== 11 && challengeType !== 3
    ? translateCommentsInChallenge(translatedChal, lang, dict)
    : translatedChal;
}

async function createChallenge(basePath, filePath, lang, maybeMeta) {
  function getFullPath(pathLang) {
    return path.resolve(__dirname, basePath, pathLang, filePath);
  }
  let meta;
  if (maybeMeta) {
    meta = maybeMeta;
  } else {
    const metaPath = path.resolve(
      metaDir,
      `./${getBlockNameFromPath(filePath)}/meta.json`
    );
    meta = require(metaPath);
  }
  const { name: superBlock } = superBlockInfoFromPath(filePath);
  if (!curriculumLangs.includes(lang))
    throw Error(`${lang} is not a accepted language.
  Trying to parse ${filePath}`);
  if (lang !== 'english' && !(await hasEnglishSource(basePath, filePath)))
    throw Error(`Missing English challenge for
${filePath}
It should be in
${getFullPath('english')}
`);
  // assumes superblock names are unique
  // while the auditing is ongoing, we default to English for un-audited certs
  // once that's complete, we can revert to using isEnglishChallenge(fullPath)
  const useEnglish = lang === 'english' || !isAuditedCert(lang, superBlock);
  const isCert = path.extname(filePath) === '.yml';
  let challenge;

  if (isCert) {
    challenge = await (useEnglish
      ? parseCert(getFullPath('english'))
      : parseCert(getFullPath(lang)));
  } else {
    challenge = await (useEnglish
      ? parseMD(getFullPath('english'))
      : parseTranslation(getFullPath(lang), COMMENT_TRANSLATIONS, lang));
  }
  const challengeOrder = findIndex(
    meta.challengeOrder,
    ([id]) => id === challenge.id
  );
  const {
    name: blockName,
    order,
    superOrder,
    isPrivate,
    required = [],
    template,
    time
  } = meta;
  challenge.block = dasherize(blockName);
  challenge.order = order;
  challenge.superOrder = superOrder;
  challenge.superBlock = superBlock;
  challenge.challengeOrder = challengeOrder;
  challenge.isPrivate = challenge.isPrivate || isPrivate;
  challenge.required = required.concat(challenge.required || []);
  challenge.template = template;
  challenge.time = time;
  challenge.helpCategory =
    challenge.helpCategory || helpCategoryMap[challenge.block];
  challenge.translationPending =
    lang !== 'english' && !isAuditedCert(lang, superBlock);

  return prepareChallenge(challenge);
}

// TODO: tests and more descriptive name.
// Is this already an object now?
function filesToObject(challengeFiles) {
  return reduce(
    challengeFiles,
    (map, challengeFile) => {
      map[challengeFile.fileKey] = {
        ...challengeFile,
        head: arrToString(challengeFile.head),
        contents: arrToString(challengeFile.contents),
        tail: arrToString(challengeFile.tail)
      };
      return map;
    },
    {}
  );
}

// gets the challenge ready for sourcing into Gatsby
function prepareChallenge(challenge) {
  if (challenge.challengeFiles) {
    challenge.challengeFiles = challenge.challengeFiles.reduce(
      (challengeFiles, challengeFile) => {
        return [
          ...challengeFiles,
          {
            ...createPoly(challengeFile),
            seed: challengeFile.contents.slice(0)
          }
        ];
      },
      []
    );
  }
  // solutions = [[{fileKey: 'indexhtml'}, {fileKey: 'indexcss'}]]
  // TODO: I am convinced this does not exist (remove)
  if (challenge.solutionFiles) {
    challenge.solutionFiles = filesToObject(challenge.solutionFiles);
  }
  return challenge;
}

async function hasEnglishSource(basePath, translationPath) {
  const englishRoot = path.resolve(__dirname, basePath, 'english');
  return await access(
    path.join(englishRoot, translationPath),
    fs.constants.F_OK
  )
    .then(() => true)
    .catch(() => false);
}

function superBlockInfoFromPath(filePath) {
  const [maybeSuper] = filePath.split(path.sep);
  return superBlockInfo(maybeSuper);
}

function superBlockInfo(fileName) {
  const [maybeOrder, ...superBlock] = fileName.split('-');
  let order = parseInt(maybeOrder, 10);
  if (isNaN(order)) {
    return { order: 0, name: fileName };
  } else {
    return {
      order: order,
      name: superBlock.join('-')
    };
  }
}

function getBlockNameFromPath(filePath) {
  const [, block] = filePath.split(path.sep);
  return block;
}

function arrToString(arr) {
  return Array.isArray(arr) ? arr.join('\n') : toString(arr);
}

exports.hasEnglishSource = hasEnglishSource;
exports.parseTranslation = parseTranslation;
exports.createChallenge = createChallenge;
