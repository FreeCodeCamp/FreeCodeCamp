const { writeFileSync, mkdirSync } = require('fs');
const getChallenge = require('./curriculum/getChallenges');
const { challengeTypes } = require('./client/utils/challengeTypes');
const path = require('path');

function getCurriculum() {
  return getChallenge.getChallengesForLang('english');
}

function initCurriculum() {
  const superblocks = [
    'apis-and-microservices',
    'data-visualization',
    'front-end-libraries',
    'javascript-algorithms-and-data-structures',
    'responsive-web-design'
  ];

  const init = getCurriculum();

  init.then(curriculum => {
    superblocks.forEach(superblock => {
      console.log(`creating pathdata for ${superblock} now`);

      const blocks = Object.keys(curriculum[superblock]['blocks']);

      createPaths(curriculum, superblock, blocks);
    });
  });
}

function createDirs() {
  mkdirSync(path.join(__dirname, '/cypress/fixtures/path-data'));
  mkdirSync(path.join(__dirname, '/cypress/fixtures/path-data/challenges'));
  mkdirSync(
    path.join(
      __dirname,
      '/cypress/fixtures/path-data/projects-and-back-challenges'
    )
  );
}

createDirs();
initCurriculum();

function createPaths(curriculum, superblock, blocks) {
  let challengeObj = { blocks: {} };
  let challengeObj2 = { blocks: {} };

  let challengePaths;

  // Specifies which challenge type has an editor
  const typeHasEditor = [
    challengeTypes.html,
    challengeTypes.js,
    challengeTypes.bonfire,
    challengeTypes.modern
  ];

  blocks.forEach(block => {
    const challengeArr = curriculum[superblock]['blocks'][block]['challenges'];

    challengePaths = challengeArr.map(challengePath => [
      `/learn/${superblock}/${block}/${challengePath['dashedName']}`,
      challengePath['challengeType']
    ]);

    // Make variables defined before accessing them when checking for challenge type

    challengeObj['blocks'][block] = {};
    challengeObj2['blocks'][block] = {};

    challengePaths.forEach(challengePath => {
      const challengeName = challengePath[0].split('/');

      if (typeHasEditor.includes(challengePath[1])) {
        challengeObj['blocks'][block][challengeName[challengeName.length - 1]] =
          challengePath[0];
      } else {
        challengeObj2['blocks'][block][
          challengeName[challengeName.length - 1]
        ] = challengePath[0];
      }
    });
  });

  // Remove the objects if they are empty
  function cleanEmptyObjects(obj) {
    const getSize = function (obj) {
      let size = 0;

      for (let key in obj) {
        if (obj.hasOwnProperty(key)) size++;
      }
      return size;
    };

    for (let block in obj['blocks']) {
      if (getSize(obj['blocks'][block]) === 0) {
        delete obj['blocks'][block];
      }
    }

    return JSON.stringify(obj, null, 4);
  }

  writeFileSync(
    path.join(
      __dirname,
      `/cypress/fixtures/path-data/challenges/${superblock}.json`
    ),
    cleanEmptyObjects(challengeObj)
  );

  writeFileSync(
    path.join(
      __dirname,
      `/cypress/fixtures/path-data/projects-and-back-challenges/${superblock}.json`
    ),
    cleanEmptyObjects(challengeObj2)
  );
}
