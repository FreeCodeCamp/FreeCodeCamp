import fs from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { format } from 'prettier';
import { prompt } from 'inquirer';

import { createStepFile } from './utils.js';
import { blockNameify } from '../../utils/block-nameify';

const superBlocks = [
  'responsive-web-design',
  'javascript-algorithms-and-data-structures',
  'front-end-development-libraries',
  'data-visualization',
  'back-end-development-and-apis',
  'quality-assurance',
  'scientific-computing-with-python',
  'data-analysis-with-python',
  'information-security',
  'machine-learning-with-python',
  'coding-interview-prep'
] as const;

type SuperBlock = typeof superBlocks[number];

const helpCategories = ['HTML-CSS', 'JavaScript', 'Python'] as const;

type BlockInfo = {
  title: string;
  intro: string[];
};

type SuperBlockInfo = {
  blocks: Record<string, BlockInfo>;
};

type IntroJson = Record<SuperBlock, SuperBlockInfo>;

type Meta = {
  name: string;
  isUpcomingChange: boolean;
  dashedName: string;
  order: number;
  time: string;
  template: string;
  required: string[];
  superBlock: string;
  superOrder: number;
  isBeta: boolean;
  challengeOrder: string[][];
};

async function createProject(
  superBlock: SuperBlock,
  block: string,
  helpCategory: string,
  order: number,
  title?: string
) {
  if (!title) {
    title = blockNameify(block);
  } else if (title !== blockNameify(block)) {
    updateBlockNames(block, title).catch(reason => {
      throw reason;
    });
  }
  updateIntroJson(superBlock, block, title).catch(reason => {
    throw reason;
  });
  updateHelpCategoryMap(block, helpCategory).catch(reason => {
    throw reason;
  });

  const challengeId = await createFirstChallenge(superBlock, block).catch(
    reason => {
      throw reason;
    }
  );
  createMetaJson(superBlock, block, title, order, challengeId).catch(reason => {
    throw reason;
  });
  // TODO: remove once we stop relying on markdown in the client.
  createIntroMD(superBlock, block, title).catch(reason => {
    throw reason;
  });
}

async function updateIntroJson(
  superBlock: SuperBlock,
  block: string,
  title: string
) {
  const introJsonPath = path.resolve(
    __dirname,
    '../../client/i18n/locales/english/intro.json'
  );
  const newIntro = await parseJson<IntroJson>(introJsonPath);
  newIntro[superBlock].blocks[block] = {
    title,
    intro: ['', '']
  };
  fs.writeFile(
    introJsonPath,
    format(JSON.stringify(newIntro), { parser: 'json' })
  ).catch(reason => {
    throw reason;
  });
}

async function updateHelpCategoryMap(block: string, helpCategory: string) {
  const helpCategoryPath = path.resolve(
    __dirname,
    '../../client/utils/help-category-map.json'
  );
  const helpMap = await parseJson<Record<string, string>>(helpCategoryPath);
  helpMap[block] = helpCategory;
  fs.writeFile(
    helpCategoryPath,
    format(JSON.stringify(helpMap), { parser: 'json' })
  ).catch(reason => {
    throw reason;
  });
}

async function updateBlockNames(block: string, title: string) {
  const blockNamesPath = path.resolve(
    __dirname,
    '../../utils/preformatted-block-names.json'
  );
  const blockNames = await parseJson<Record<string, string>>(blockNamesPath);
  blockNames[block] = title;
  fs.writeFile(
    blockNamesPath,
    format(JSON.stringify(blockNames), { parser: 'json' })
  ).catch(reason => {
    throw reason;
  });
}

async function createMetaJson(
  superBlock: SuperBlock,
  block: string,
  title: string,
  order: number,
  challengeId: string
) {
  const metaDir = path.resolve(__dirname, '../../curriculum/challenges/_meta');
  const newMeta = await parseJson<Meta>('./base-meta.json');
  newMeta.name = title;
  newMeta.dashedName = block;
  newMeta.order = order;
  newMeta.superOrder = superBlocks.indexOf(superBlock) + 1;
  newMeta.superBlock = superBlock;
  newMeta.challengeOrder = [[challengeId, 'Part 1']];
  const newMetaDir = path.resolve(metaDir, block);
  if (!existsSync(newMetaDir)) {
    await fs.mkdir(newMetaDir);
  }
  fs.writeFile(
    path.resolve(metaDir, `${block}/meta.json`),
    format(JSON.stringify(newMeta), { parser: 'json' })
  ).catch(reason => {
    throw reason;
  });
}

async function createIntroMD(superBlock: string, block: string, title: string) {
  const introMD = `---
title: Introduction to the ${title}
block: ${block}
superBlock: Responsive Web Design
isBeta: true
---
## Introduction to the ${title}

This is a test for the new project-based curriculum.`;
  const dirPath = path.resolve(
    __dirname,
    `../../client/src/pages/learn/${superBlock}/${block}/`
  );
  const filePath = path.resolve(dirPath, 'index.md');
  if (!existsSync(dirPath)) {
    await fs.mkdir(dirPath);
  }
  fs.writeFile(filePath, introMD, { encoding: 'utf8' }).catch(reason => {
    throw reason;
  });
}

async function createFirstChallenge(
  superBlock: SuperBlock,
  block: string
): Promise<string> {
  const superBlockId = (superBlocks.indexOf(superBlock) + 1)
    .toString()
    .padStart(2, '0');
  const newChallengeDir = path.resolve(
    __dirname,
    `../../curriculum/challenges/english/${superBlockId}-${superBlock}/${block}`
  );
  if (!existsSync(newChallengeDir)) {
    await fs.mkdir(newChallengeDir);
  }
  // TODO: would be nice if the extension made sense for the challenge, but, at
  // least until react I think they're all going to be html anyway.
  const challengeSeeds = {
    indexhtml: {
      contents: '',
      ext: 'html',
      editableRegionBoundaries: [0, 2]
    }
  };
  // including trailing slash for compatibility with createStepFile
  return createStepFile({
    projectPath: newChallengeDir + '/',
    stepNum: 1,
    challengeSeeds,
    stepBetween: false
  });
}

function parseJson<JsonSchema>(filePath: string) {
  return fs
    .readFile(filePath, { encoding: 'utf8' })
    .then(result => JSON.parse(result) as JsonSchema)
    .catch(reason => {
      throw reason;
    });
}

prompt([
  {
    name: 'superBlock',
    message: 'Which certification does this belong to?',
    default: 'responsive-web-design',
    type: 'list',
    choices: superBlocks
  },
  {
    name: 'block',
    message: 'What is the short name (in kebab-case) for this project?',
    validate: (block: string) => {
      if (!block.length) {
        return 'please enter a short name';
      }
      if (/[^a-z0-9\-]/.test(block)) {
        return 'please use alphanumerical characters and kebab case';
      }
      return true;
    },
    filter: (block: string) => {
      return block.toLowerCase();
    }
  },
  {
    name: 'title',
    default: ({ block }: { block: string }) => blockNameify(block)
  },
  {
    name: 'helpCategory',
    message: 'Choose a help category',
    default: 'HTML-CSS',
    type: 'list',
    choices: helpCategories
  },
  {
    name: 'order',
    message: 'Which position does this appear in the certificate?',
    default: 42,
    validate: (order: string) => {
      return parseInt(order, 10) > 0
        ? true
        : 'Order must be an number greater than zero.';
    },
    filter: (order: string) => {
      return parseInt(order, 10);
    }
  }
])
  .then(({ superBlock, block, title, helpCategory, order }) =>
    createProject(superBlock, block, helpCategory, order, title)
  )
  .then(() =>
    console.log(
      'All set.  Now use npm run clean:client in the root and it should be good to go.'
    )
  )
  .catch(console.error);
