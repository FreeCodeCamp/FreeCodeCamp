const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const { challengeTypes } = require('../../client/utils/challenge-types');

const slugRE = new RegExp('^[a-z0-9-]+$');

const fileJoi = Joi.object().keys({
  key: Joi.string(),
  ext: Joi.string(),
  name: Joi.string(),
  editableRegionBoundaries: [Joi.array().items(Joi.number())],
  path: Joi.string(),
  error: Joi.valid(null),
  head: Joi.string().allow(''),
  tail: Joi.string().allow(''),
  seed: Joi.string().allow(''),
  contents: Joi.string().allow(''),
  id: Joi.string().allow(''),
  history: [Joi.array().items(Joi.string().allow('')), Joi.string().allow('')]
});

const schema = Joi.object()
  .keys({
    block: Joi.string().regex(slugRE),
    blockId: Joi.objectId(),
    challengeOrder: Joi.number(),
    removeComments: Joi.bool(),
    challengeType: Joi.number().min(0).max(12).required(),
    checksum: Joi.number(),
    // __commentCounts is only used to test the comment replacement
    __commentCounts: Joi.object(),
    // TODO: require this only for normal challenges, not certs
    dashedName: Joi.string().regex(slugRE),
    description: Joi.when('challengeType', {
      is: [challengeTypes.step, challengeTypes.video, challengeTypes.codeally],
      then: Joi.string().allow(''),
      otherwise: Joi.string().required()
    }),
    files: Joi.object().keys({
      indexcss: fileJoi,
      indexhtml: fileJoi,
      indexjs: fileJoi,
      indexjsx: fileJoi
    }),
    guideUrl: Joi.string().uri({ scheme: 'https' }),
    helpCategory: Joi.valid(
      'JavaScript',
      'HTML-CSS',
      'Python',
      'Relational Databases'
    ),
    videoUrl: Joi.string().allow(''),
    forumTopicId: Joi.number(),
    id: Joi.objectId().required(),
    instructions: Joi.string().allow(''),
    isComingSoon: Joi.bool(),
    isLocked: Joi.bool(),
    isPrivate: Joi.bool(),
    order: Joi.number(),
    // video challenges only:
    videoId: Joi.when('challengeType', {
      is: challengeTypes.video,
      then: Joi.string().required()
    }),
    question: Joi.object().keys({
      text: Joi.string().required(),
      answers: Joi.array().items(Joi.string()).required(),
      solution: Joi.number().required()
    }),
    required: Joi.array().items(
      Joi.object().keys({
        link: Joi.string(),
        raw: Joi.bool(),
        src: Joi.string(),
        crossDomain: Joi.bool()
      })
    ),
    solutions: Joi.array().items(
      Joi.object().keys({
        indexcss: fileJoi,
        indexhtml: fileJoi,
        indexjs: fileJoi,
        indexjsx: fileJoi,
        indexpy: fileJoi
      })
    ),
    superBlock: Joi.string().regex(slugRE),
    superOrder: Joi.number(),
    suborder: Joi.number(),
    tests: Joi.array().items(
      // public challenges
      Joi.object().keys({
        id: Joi.string().allow(''),
        text: Joi.string().required(),
        testString: Joi.string().allow('').required()
      }),
      // our tests used in certification verification
      Joi.object().keys({
        id: Joi.string().required(),
        title: Joi.string().required()
      })
    ),
    template: Joi.string().allow(''),
    time: Joi.string().allow(''),
    title: Joi.string().required(),
    translationPending: Joi.bool().required(),
    url: Joi.when('challengeType', {
      is: challengeTypes.codeally,
      then: Joi.string().required()
    })
  })
  .xor('helpCategory', 'isPrivate');

exports.challengeSchemaValidator = () => {
  return challenge => schema.validate(challenge);
};
