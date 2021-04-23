require('dotenv').config({ path: `${__dirname}/../../.env` });
const exec = util.promisify(require('child_process').exec);
const util = require('util');

const { getFiles, deleteFile } = require('../../utils/files');

const getOutputFromCommand = async command => {
  try {
    const { stdout } = await exec(command);
    return stdout;
  } catch (err) {
    console.log('Error');
    console.log('command');
    console.log(command + '\n');
    console.log(err.message);
    return null;
  }
};

const removeDeletedFiles = async projectId => {
  console.log('start deleting source files no longer in English curriculum...');
  const crowdinFiles = await getFiles(projectId);

  if (crowdinFiles && crowdinFiles.length) {
    const challengeCommand = 'find curriculum/challenges/english -name \\*.*';
    const listOfEnglishFiles = await getOutputFromCommand(challengeCommand);
    const dictionaryCommand =
      'find curriculum/dictionaries/english -name \\*.*';
    const listOfDictFiles = await getOutputFromCommand(dictionaryCommand);
    let curriculumFilesArr = listOfEnglishFiles.split('\n');
    curriculumFilesArr = curriculumFilesArr.concat(listOfDictFiles.split('\n'));
    if (curriculumFilesArr.length) {
      const curriculumLookup = curriculumFilesArr.reduce((obj, filename) => {
        return { ...obj, [filename]: 1 };
      }, {});
      for (let { fileId, path: crowdinFilePath } of crowdinFiles) {
        if (!curriculumLookup.hasOwnProperty(crowdinFilePath)) {
          await deleteFile(projectId, fileId, crowdinFilePath);
        }
      }
    }
  } else {
    console.log(`WARNING! No Crowdin files found for projectId ${projectId}`);
  }
  console.log('deleting source non-existent source files complete');
};

const projectId = process.env.CROWDIN_PROJECT_ID;
removeDeletedFiles(projectId);
