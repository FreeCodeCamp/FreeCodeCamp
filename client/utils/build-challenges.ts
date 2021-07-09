import _ from 'lodash';
import path from 'path';

import {
  getChallengesForLang,
  createChallenge,
  challengesDir,
  getChallengesDirForLang
} from '../../curriculum/getChallenges';
import envData from '../../config/env.json';

import type {
  Meta,
  SuperBlock
} from '../../tools/challenge-helper-scripts/create-project';
import type { ChallengeNode } from '../src/redux/prop-types';

const { curriculumLocale } = envData;

export const localeChallengesRootDir =
  getChallengesDirForLang(curriculumLocale);

export function replaceChallengeNode() {
  return async function (filePath: string): Promise<ChallengeNode> {
    // get the meta so that challengeOrder is accurate
    const blockNameRe = /\d\d-[-\w]+\/([^/]+)\//;
    const posix = path.normalize(filePath).split(path.sep).join(path.posix.sep);
    const blockName = (blockNameRe.exec(posix) as RegExpExecArray)[1];
    const metaPath = path.resolve(
      __dirname,
      `../../curriculum/challenges/_meta/${blockName}/meta.json`
    );
    delete require.cache[require.resolve(metaPath)];
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const meta = require(metaPath) as Meta;
    return (await createChallenge(
      challengesDir,
      filePath,
      curriculumLocale,
      meta
    )) as ChallengeNode;
  };
}

interface BlockInfo {
  [blockName: string]: {
    meta: Meta;
    challenges: ChallengeNode[];
    isPrivate: boolean;
  };
}
type Curriculum = Record<
  SuperBlock,
  {
    superBlock: string;
    order: number;
    blocks: BlockInfo;
  }
>;
export async function buildChallenges(): Promise<ChallengeNode[]> {
  const curriculum = (await getChallengesForLang(
    curriculumLocale
  )) as Curriculum;
  const superBlocks = Object.keys(curriculum) as SuperBlock[];
  const blocks = superBlocks
    .map(superBlock => curriculum[superBlock].blocks)
    .reduce((blocks, superBlock) => {
      const currentBlocks = Object.values(superBlock);
      return blocks.concat(_.flatten(currentBlocks));
      // Pointless flatten?
      // If not, then can be replaced with Array.flat()
    }, [] as BlockInfo[string][]);

  const builtChallenges = blocks
    .filter(block => !block.isPrivate)
    .map(({ challenges }) => challenges)
    .reduce((accu, current) => accu.concat(current), []);
  return builtChallenges;
}
