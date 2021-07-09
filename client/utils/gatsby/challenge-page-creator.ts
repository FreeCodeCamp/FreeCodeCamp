const path = require('path');
const { dasherize } = require('../../../utils/slugs');

const { viewTypes } = require('../challengeTypes');

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

const getNextChallengePath = (node, index, nodeArray) => {
  const next = nodeArray[index + 1];
  return next ? next.node.fields.slug : '/learn';
};

const getPrevChallengePath = (node, index, nodeArray) => {
  const prev = nodeArray[index - 1];
  return prev ? prev.node.fields.slug : '/learn';
};

const getTemplateComponent = challengeType => views[viewTypes[challengeType]];

exports.createChallengePages =
  createPage =>
  ({ node }, index, thisArray) => {
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

    return createPage({
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

exports.createBlockIntroPages = createPage => edge => {
  const {
    fields: { slug },
    frontmatter: { block }
  } = edge.node;

  return createPage({
    path: slug,
    component: intro,
    context: {
      block: dasherize(block),
      slug
    }
  });
};

exports.createSuperBlockIntroPages = createPage => edge => {
  const {
    fields: { slug },
    frontmatter: { superBlock }
  } = edge.node;

  return createPage({
    path: slug,
    component: superBlockIntro,
    context: {
      superBlock,
      slug
    }
  });
};
