const { readdirSync, readFileSync, writeFileSync } = require('fs');
const path = require('path');

console.log('Creating challenge specfiles...');

function createSpecFiles() {
  // Get blocks in directory

  const challengesFiles = readdirSync(
    path.join(__dirname, '/cypress/fixtures/path-data/challenges')
  );

  const projectsFiles = readdirSync(
    path.join(
      __dirname,
      '/cypress/fixtures/path-data/projects-and-back-challenges'
    )
  );

  const blockExist = readdirSync(
    path.join(__dirname, '/cypress/integration/challenge-tests/blocks')
  );

  // Split the extensions

  let blockInDir = [];
  blockExist.forEach(block => {
    blockInDir.push(block.split('.')[0]);
  });

  function divider(files, project) {
    files.forEach(file => {
      let files = JSON.parse(
        readFileSync(
          path.join(
            __dirname,
            `/cypress/fixtures/path-data/${
              project ? 'projects-and-back-challenges' : 'challenges'
            }/${file}`
          ),
          'utf-8'
        )
      );

      let challengeBlocks = Object.keys(files['blocks']);

      challengeBlocks.forEach(block => {
        if (!blockInDir.includes(block)) {
          writeFileSync(
            path.join(
              __dirname,
              `/cypress/integration/challenge-tests/blocks/${block}.js`
            ),
            `/* global cy */
            const superBlockPath = require('../../../fixtures/path-data/${
              project ? 'projects-and-back-challenges' : 'challenges'
            }/${file}');

            const blocks = Object.entries(superBlockPath['blocks']['${block}'])

            for(const [challengeName , challengePath] of blocks){
              describe('loading challenge', () => {
                before(() => {
                  cy.visit(challengePath)
                })

                it('Challenge ' + challengeName + ' should work correctly', () => {
                  ${
                    project
                      ? 'cy.testProjectsAndBackend(challengePath)'
                      : 'cy.testChallenges(challengePath)'
                  }
                })
              });
            }
            `
          );
        }
      });
    });
  }

  divider(challengesFiles, false);
  divider(projectsFiles, true);

  return null;
}

createSpecFiles();

console.log('specfiles generated!');
