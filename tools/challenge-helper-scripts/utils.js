const fs = require('fs');
const path = require('path');
const ObjectID = require('bson-objectid');
const matter = require('gray-matter');
const { parseMDSync } = require('../challenge-parser/parser');

const padWithLeadingZeros = originalNum => {
  /* always want file step numbers 3 digits */
  return ('' + originalNum).padStart(3, '0');
};

const insertErms = (seedCode, erms) => {
  const lines = seedCode.split('\n');
  if (Number.isInteger(erms[0])) {
    lines.splice(erms[0], 0, '--fcc-editable-region--');
  }
  if (Number.isInteger(erms[1])) {
    lines.splice(erms[1], 0, '--fcc-editable-region--');
  }
  return lines.join('\n');
};

const createStepFile = ({
  projectPath,
  stepNum,
  challengeSeeds = {},
  stepBetween = false
}) => {
  const seedTexts = Object.values(challengeSeeds).map(
    ({ contents, ext, editableRegionBoundaries }) => {
      const fullContents = insertErms(contents, editableRegionBoundaries);
      return `\`\`\`${ext}
${fullContents}
\`\`\``;
    }
  );

  const seedHeads = Object.values(challengeSeeds)
    .filter(({ head }) => head)
    .map(
      ({ ext, head }) => `\`\`\`${ext}
${head}
\`\`\``
    )
    .join('\n');

  const seedTails = Object.values(challengeSeeds)
    .filter(({ tail }) => tail)
    .map(
      ({ ext, tail }) => `\`\`\`${ext}
${tail}
\`\`\``
    )
    .join('\n');

  const descStepNum = stepBetween ? stepNum + 1 : stepNum;
  const stepDescription = `${
    stepBetween ? 'new' : ''
  } step ${descStepNum} instructions`;
  const challengeSeedSection = `
# --seed--

## --seed-contents--

${seedTexts.join('\n')}`;

  const seedHeadSection = seedHeads
    ? `

## --before-user-code--

${seedHeads}`
    : '';

  const seedTailSection = seedTails
    ? `

## --after-user-code--

${seedTails}`
    : '';

  const template =
    `---
id: ${ObjectID.generate()}
title: Part ${stepNum}
challengeType: 0
---

# --description--

${stepDescription}

# --hints--

Test 1

\`\`\`js

\`\`\`
` +
    challengeSeedSection +
    seedHeadSection +
    seedTailSection;

  let finalStepNum = padWithLeadingZeros(stepNum);
  finalStepNum += stepBetween ? 'a' : '';
  fs.writeFileSync(`${projectPath}part-${finalStepNum}.md`, template);
};

const reorderSteps = () => {
  const projectPath = getProjectPath();

  const projectName = process.env.CALLING_DIR
    ? process.env.CALLING_DIR.split(path.sep).slice(-1).toString()
    : process.cwd().split(path.sep).slice(-1).toString();

  const curriculumPath = process.env.CALLING_DIR
    ? ''
    : path.join(__dirname, '../');

  const projectMetaPath = path.resolve(
    curriculumPath,
    'challenges',
    '_meta',
    projectName,
    'meta.json'
  );

  let metaData;
  try {
    metaData = fs.readFileSync(projectMetaPath);
  } catch (err) {
    throw `No _meta.json file exists at ${projectMetaPath}`;
  }

  let foundFinal = false;
  const filesArr = [];
  fs.readdirSync(projectPath).forEach(fileName => {
    if (path.extname(fileName).toLowerCase() === '.md') {
      if (!fileName.endsWith('final.md')) {
        filesArr.push(fileName);
      } else {
        foundFinal = true;
      }
    }
  });

  if (foundFinal) {
    filesArr.push('final.md');
  }

  const filesToReorder = filesArr.map((fileName, i) => {
    const newStepNum = i + 1;
    const newFileName =
      fileName !== 'final.md'
        ? `part-${padWithLeadingZeros(newStepNum)}.md`
        : 'final.md';
    return {
      oldFileName: fileName,
      newFileName,
      newStepNum
    };
  });

  const challengeOrder = [];
  const parsedData = JSON.parse(metaData);

  filesToReorder.forEach(({ oldFileName, newFileName, newStepNum }) => {
    fs.renameSync(
      `${projectPath}${oldFileName}`,
      `${projectPath}${newFileName}.tmp`
    );
    const filePath = `${projectPath}${newFileName}.tmp`;
    const frontMatter = matter.read(filePath);
    const challengeID = frontMatter.data.id || ObjectID.generate();
    const title =
      newFileName === 'final.md' ? 'Final Prototype' : `Part ${newStepNum}`;
    challengeOrder.push(['' + challengeID, title]);
    const newData = {
      ...frontMatter.data,
      id: challengeID,
      title
    };
    fs.writeFileSync(filePath, frontMatter.stringify(newData));
  });

  filesToReorder.forEach(({ newFileName }) => {
    fs.renameSync(
      `${projectPath}${newFileName}.tmp`,
      `${projectPath}${newFileName}`
    );
  });

  const newMeta = { ...parsedData, challengeOrder };
  fs.writeFileSync(projectMetaPath, JSON.stringify(newMeta, null, 2));
  console.log('Reordered steps');
};

const getChallengeSeeds = challengeFilePath => {
  return parseMDSync(challengeFilePath).files;
};

const getExistingStepNums = projectPath => {
  return fs.readdirSync(projectPath).reduce((stepNums, fileName) => {
    if (
      path.extname(fileName).toLowerCase() === '.md' &&
      !fileName.endsWith('final.md')
    ) {
      let stepNum = fileName.split('.')[0].split('-')[1];
      if (!/^\d{3}$/.test(stepNum)) {
        throw (
          `Step not created. File ${fileName} has a step number containing non-digits.` +
          ' Please run reorder-steps script first.'
        );
      }
      stepNum = parseInt(stepNum, 10);
      stepNums.push(stepNum);
    }
    return stepNums;
  }, []);
};

const getProjectPath = () =>
  (process.env.CALLING_DIR || process.cwd()) + path.sep;

const getArgValues = argv => {
  return argv.slice(2).reduce((argsObj, arg) => {
    const [argument, value] = arg.replace(/\s/g, '').split('=');
    if (!argument || !value) {
      throw `Invalid argument/value specified: ${arg}`;
    }
    return { ...argsObj, [argument]: value };
  }, {});
};

module.exports = {
  createStepFile,
  getChallengeSeeds,
  padWithLeadingZeros,
  reorderSteps,
  getExistingStepNums,
  getProjectPath,
  getArgValues
};
