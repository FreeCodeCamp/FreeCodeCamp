import path from 'path';
import { dasherize } from '../../../utils/slugs';

import { viewTypes } from '../challenge-types';

import type {
  ChallengeNode,
  ChallengeMetaType
} from '../../src/redux/prop-types';

const backend = path.resolve(
  __dirname,
  '../../src/templates/Challenges/projects/backend/Show.tsx'
);
const classic = path.resolve(
  __dirname,
  '../../src/templates/Challenges/classic/Show.tsx'
);
const frontend = path.resolve(
  __dirname,
  '../../src/templates/Challenges/projects/frontend/Show.tsx'
);
const codeally = path.resolve(
  __dirname,
  '../../src/templates/Challenges/codeally/show.tsx'
);
const intro = path.resolve(
  __dirname,
  '../../src/templates/Introduction/Intro.js'
);
const superBlockIntro = path.resolve(
  __dirname,
  '../../src/templates/Introduction/SuperBlockIntro.js'
);
const video = path.resolve(
  __dirname,
  '../../src/templates/Challenges/video/Show.tsx'
);

const views = {
  backend,
  classic,
  modern: classic,
  frontend,
  video,
  codeally
  // quiz: Quiz
};

interface Node {
  node: ChallengeNode;
}

function getNextChallengePath(
  _node: ChallengeNode,
  index: number,
  nodeArray: Node[]
): string {
  const next = nodeArray[index + 1];
  return next ? next.node.fields.slug : '/learn';
}

function getPrevChallengePath(
  _node: ChallengeNode,
  index: number,
  nodeArray: Node[]
): string {
  const prev = nodeArray[index - 1];
  return prev ? prev.node.fields.slug : '/learn';
}

function getTemplateComponent(challengeType: number): string {
  return views[
    viewTypes[challengeType as keyof typeof viewTypes] as keyof typeof views
  ];
}

// TODO: Fix this
interface CreatePageNodeKwarg {
  path: string;
  component: string;
  context: {
    challengeMeta: Omit<
      ChallengeMetaType,
      'introPath' | 'removeComments' | 'helpCategory'
    > &
      Pick<ChallengeNode, 'template'> & {
        required: ChallengeNode['required'] | [];
      };
    slug: string;
  };
}

export function createChallengePages(
  createPage: (kwarg: CreatePageNodeKwarg) => void
): (kwarg: Node, index: number, thisArray: Node[]) => void {
  return function ({ node }: Node, index: number, thisArray: Node[]): void {
    const {
      superBlock,
      block,
      fields: { slug },
      required = [],
      template,
      challengeType,
      id
    } = node;
    // TODO: challengeType === 7 and isPrivate are the same, right? If so, we
    // should remove one of them.

    createPage({
      path: slug,
      component: getTemplateComponent(challengeType),
      context: {
        challengeMeta: {
          superBlock,
          block,
          template,
          required,
          nextChallengePath: getNextChallengePath(node, index, thisArray),
          prevChallengePath: getPrevChallengePath(node, index, thisArray),
          id
        },
        slug
      }
    });
  };
}

interface Edge {
  node: {
    fields: { slug: string };
    frontmatter: {
      block: string;
      superBlock: string;
    };
  };
}

interface CreatePageEdgeKwarg {
  path: string;
  component: string;
  context: {
    block?: string;
    superBlock?: string;
    slug: string;
  };
}

export function createBlockIntroPages(
  createPage: (kwarg: CreatePageEdgeKwarg) => void
): (edge: Edge) => void {
  return function (edge: Edge) {
    const {
      fields: { slug },
      frontmatter: { block }
    } = edge.node;

    createPage({
      path: slug,
      component: intro,
      context: {
        block: dasherize(block),
        slug
      }
    });
  };
}

export function createSuperBlockIntroPages(
  createPage: (kwarg: CreatePageEdgeKwarg) => void
): (edge: Edge) => void {
  return function (edge: Edge) {
    const {
      fields: { slug },
      frontmatter: { superBlock }
    } = edge.node;

    createPage({
      path: slug,
      component: superBlockIntro,
      context: {
        superBlock,
        slug
      }
    });
  };
}
