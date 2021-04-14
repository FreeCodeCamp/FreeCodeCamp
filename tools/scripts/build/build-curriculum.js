const fs = require('fs');
const path = require('path');

const { getChallengesForLang } = require('../../../curriculum/getChallenges');

const globalConfigPath = path.resolve(__dirname, '../../../config');

// We are defaulting to English because the ids for the challenges are same
// accross all languages.
getChallengesForLang('english')
  .then(JSON.stringify)
  .then(x => fs.writeFileSync(`${globalConfigPath}/curriculum.json`, x));
