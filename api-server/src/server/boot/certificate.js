import _ from 'lodash';
import loopback from 'loopback';
import path from 'path';
import dedent from 'dedent';
import { Observable } from 'rx';
import debug from 'debug';
import { isEmail } from 'validator';
import { reportError } from '../middlewares/sentry-error-handler.js';

import { ifNoUser401 } from '../utils/middleware';
import { observeQuery } from '../utils/rx';

import { getChallenges } from '../utils/get-curriculum';

import {
  completionHours,
  certTypes,
  certSlugTypeMap,
  certTypeTitleMap,
  certTypeIdMap,
  certIds,
  oldDataVizId
} from '../../../../config/certification-settings';

const {
  legacyFrontEndChallengeId,
  legacyBackEndChallengeId,
  legacyDataVisId,
  legacyInfosecQaId,
  legacyFullStackId,
  respWebDesignId,
  frontEndDevLibsId,
  jsAlgoDataStructId,
  dataVis2018Id,
  apisMicroservicesId,
  qaV7Id,
  infosecV7Id,
  sciCompPyV7Id,
  dataAnalysisPyV7Id,
  machineLearningPyV7Id
} = certIds;

const log = debug('fcc:certification');

export default function bootCertificate(app) {
  const api = app.loopback.Router();
  // TODO: rather than getting all the challenges, then grabbing the certs,
  // consider just getting the certs.
  const certTypeIds = createCertTypeIds(getChallenges());
  const showCert = createShowCert(app);
  const verifyCert = createVerifyCert(certTypeIds, app);

  api.put('/certificate/verify', ifNoUser401, ifNoSuperBlock404, verifyCert);
  api.get('/certificate/showCert/:username/:certSlug', showCert);

  app.use(api);
}

export function getFallbackFrontEndDate(completedChallenges, completedDate) {
  var chalIds = [...Object.values(certTypeIdMap), oldDataVizId];

  const latestCertDate = completedChallenges
    .filter(chal => chalIds.includes(chal.id))
    .sort((a, b) => b.completedDate - a.completedDate)[0].completedDate;

  return latestCertDate ? latestCertDate : completedDate;
}

const certSlugs = Object.keys(certSlugTypeMap);

function ifNoSuperBlock404(req, res, next) {
  const { certSlug } = req.body;
  if (certSlug && certSlugs.includes(certSlug)) {
    return next();
  }
  return res.status(404).end();
}

const renderCertifiedEmail = loopback.template(
  path.join(__dirname, '..', 'views', 'emails', 'certified.ejs')
);

function createCertTypeIds(allChallenges) {
  return {
    // legacy
    [certTypes.frontEnd]: getCertById(legacyFrontEndChallengeId, allChallenges),
    [certTypes.backEnd]: getCertById(legacyBackEndChallengeId, allChallenges),
    [certTypes.dataVis]: getCertById(legacyDataVisId, allChallenges),
    [certTypes.infosecQa]: getCertById(legacyInfosecQaId, allChallenges),
    [certTypes.fullStack]: getCertById(legacyFullStackId, allChallenges),

    // modern
    [certTypes.respWebDesign]: getCertById(respWebDesignId, allChallenges),
    [certTypes.frontEndDevLibs]: getCertById(frontEndDevLibsId, allChallenges),
    [certTypes.dataVis2018]: getCertById(dataVis2018Id, allChallenges),
    [certTypes.jsAlgoDataStruct]: getCertById(
      jsAlgoDataStructId,
      allChallenges
    ),
    [certTypes.apisMicroservices]: getCertById(
      apisMicroservicesId,
      allChallenges
    ),
    [certTypes.qaV7]: getCertById(qaV7Id, allChallenges),
    [certTypes.infosecV7]: getCertById(infosecV7Id, allChallenges),
    [certTypes.sciCompPyV7]: getCertById(sciCompPyV7Id, allChallenges),
    [certTypes.dataAnalysisPyV7]: getCertById(
      dataAnalysisPyV7Id,
      allChallenges
    ),
    [certTypes.machineLearningPyV7]: getCertById(
      machineLearningPyV7Id,
      allChallenges
    )
  };
}

function canClaim(ids, completedChallenges = []) {
  return _.every(ids, ({ id }) =>
    _.find(completedChallenges, ({ id: completedId }) => completedId === id)
  );
}

function getCertById(anId, allChallenges) {
  return allChallenges
    .filter(({ id }) => id === anId)
    .map(({ id, tests, name, challengeType }) => ({
      id,
      tests,
      name,
      challengeType
    }))[0];
}

function sendCertifiedEmail(
  {
    email = '',
    name,
    username,
    isRespWebDesignCert,
    isFrontEndLibsCert,
    isJsAlgoDataStructCert,
    isDataVisCert,
    isApisMicroservicesCert,
    isQaCertV7,
    isInfosecCertV7,
    isSciCompPyCertV7,
    isDataAnalysisPyCertV7,
    isMachineLearningPyCertV7
  },
  send$
) {
  if (
    !isEmail(email) ||
    !isRespWebDesignCert ||
    !isFrontEndLibsCert ||
    !isJsAlgoDataStructCert ||
    !isDataVisCert ||
    !isApisMicroservicesCert ||
    !isQaCertV7 ||
    !isInfosecCertV7 ||
    !isSciCompPyCertV7 ||
    !isDataAnalysisPyCertV7 ||
    !isMachineLearningPyCertV7
  ) {
    return Observable.just(false);
  }
  const notifyUser = {
    type: 'email',
    to: email,
    from: 'quincy@freecodecamp.org',
    subject: dedent`
      Congratulations on completing all of the
      freeCodeCamp certifications!
    `,
    text: renderCertifiedEmail({
      username,
      name
    })
  };
  return send$(notifyUser).map(() => true);
}

function getUserIsCertMap(user) {
  const {
    isRespWebDesignCert = false,
    isJsAlgoDataStructCert = false,
    isFrontEndLibsCert = false,
    is2018DataVisCert = false,
    isApisMicroservicesCert = false,
    isInfosecQaCert = false,
    isQaCertV7 = false,
    isInfosecCertV7 = false,
    isFrontEndCert = false,
    isBackEndCert = false,
    isDataVisCert = false,
    isFullStackCert = false,
    isSciCompPyCertV7 = false,
    isDataAnalysisPyCertV7 = false,
    isMachineLearningPyCertV7 = false
  } = user;

  return {
    isRespWebDesignCert,
    isJsAlgoDataStructCert,
    isFrontEndLibsCert,
    is2018DataVisCert,
    isApisMicroservicesCert,
    isInfosecQaCert,
    isQaCertV7,
    isInfosecCertV7,
    isFrontEndCert,
    isBackEndCert,
    isDataVisCert,
    isFullStackCert,
    isSciCompPyCertV7,
    isDataAnalysisPyCertV7,
    isMachineLearningPyCertV7
  };
}

function createVerifyCert(certTypeIds, app) {
  const { Email } = app.models;
  return function verifyCert(req, res, next) {
    const {
      body: { certSlug },
      user
    } = req;
    log(certSlug);
    let certType = certSlugTypeMap[certSlug];
    log(certType);
    return Observable.of(certTypeIds[certType])
      .flatMap(challenge => {
        const certName = certTypeTitleMap[certType];
        if (user[certType]) {
          return Observable.just({
            type: 'info',
            message: 'flash.already-claimed',
            variables: { name: certName }
          });
        }

        // certificate doesn't exist or
        // connection error
        if (!challenge) {
          reportError(`Error claiming ${certName}`);
          return Observable.just({
            type: 'danger',
            message: 'flash.wrong-name',
            variables: { name: certName }
          });
        }

        const { id, tests, challengeType } = challenge;
        if (!canClaim(tests, user.completedChallenges)) {
          return Observable.just({
            type: 'info',
            message: 'flash.incomplete-steps',
            variables: { name: certName }
          });
        }

        const updateData = {
          [certType]: true,
          completedChallenges: [
            ...user.completedChallenges,
            {
              id,
              completedDate: new Date(),
              challengeType
            }
          ]
        };

        if (!user.name) {
          return Observable.just({
            type: 'info',
            message: 'flash.name-needed'
          });
        }
        // set here so sendCertifiedEmail works properly
        // not used otherwise
        user[certType] = true;
        const updatePromise = new Promise((resolve, reject) =>
          user.updateAttributes(updateData, err => {
            if (err) {
              return reject(err);
            }
            return resolve();
          })
        );
        return Observable.combineLatest(
          // update user data
          Observable.fromPromise(updatePromise),
          // sends notification email is user has all 6 certs
          // if not it noop
          sendCertifiedEmail(user, Email.send$),
          (_, pledgeOrMessage) => ({ pledgeOrMessage })
        ).map(({ pledgeOrMessage }) => {
          if (typeof pledgeOrMessage === 'string') {
            log(pledgeOrMessage);
          }
          log('Certificates updated');
          return {
            type: 'success',
            message: 'flash.cert-claim-success',
            variables: {
              username: user.username,
              name: certName
            }
          };
        });
      })
      .subscribe(message => {
        return res.status(200).json({
          response: message,
          isCertMap: getUserIsCertMap(user),
          // send back the completed challenges
          // NOTE: we could just send back the latest challenge, but this
          // ensures the challenges are synced.
          completedChallenges: user.completedChallenges
        });
      }, next);
  };
}

function createShowCert(app) {
  const { User } = app.models;

  function findUserByUsername$(username, fields) {
    return observeQuery(User, 'findOne', {
      where: { username },
      fields
    });
  }

  return function showCert(req, res, next) {
    let { username, certSlug } = req.params;
    username = username.toLowerCase();
    const certType = certSlugTypeMap[certSlug];
    const certId = certTypeIdMap[certType];
    const certTitle = certTypeTitleMap[certType];
    const completionTime = completionHours[certType] || 300;
    return findUserByUsername$(username, {
      isCheater: true,
      isFrontEndCert: true,
      isBackEndCert: true,
      isFullStackCert: true,
      isRespWebDesignCert: true,
      isFrontEndLibsCert: true,
      isJsAlgoDataStructCert: true,
      isDataVisCert: true,
      is2018DataVisCert: true,
      isApisMicroservicesCert: true,
      isInfosecQaCert: true,
      isQaCertV7: true,
      isInfosecCertV7: true,
      isSciCompPyCertV7: true,
      isDataAnalysisPyCertV7: true,
      isMachineLearningPyCertV7: true,
      isHonest: true,
      username: true,
      name: true,
      completedChallenges: true,
      profileUI: true
    }).subscribe(user => {
      if (!user) {
        return res.json({
          messages: [
            {
              type: 'info',
              message: 'flash.username-not-found',
              variables: { username: username }
            }
          ]
        });
      }
      const { isLocked, showCerts, showName } = user.profileUI;

      if (!user.name) {
        return res.json({
          messages: [
            {
              type: 'info',
              message: 'flash.add-name'
            }
          ]
        });
      }

      if (user.isCheater) {
        return res.json({
          messages: [
            {
              type: 'info',
              message: 'flash.not-eligible'
            }
          ]
        });
      }

      if (isLocked) {
        return res.json({
          messages: [
            {
              type: 'info',
              message: 'flash.profile-private',
              variables: { username: username }
            }
          ]
        });
      }

      if (!showCerts) {
        return res.json({
          messages: [
            {
              type: 'info',
              message: 'flash.certs-private',
              variables: { username: username }
            }
          ]
        });
      }

      if (!user.isHonest) {
        return res.json({
          messages: [
            {
              type: 'info',
              message: 'flash.not-honest',
              variables: { username: username }
            }
          ]
        });
      }

      if (user[certType]) {
        const { completedChallenges = [] } = user;
        const certChallenge = _.find(
          completedChallenges,
          ({ id }) => certId === id
        );
        let { completedDate = new Date() } = certChallenge || {};

        // the challenge id has been rotated for isDataVisCert
        if (certType === 'isDataVisCert' && !certChallenge) {
          let oldDataVisIdChall = _.find(
            completedChallenges,
            ({ id }) => oldDataVizId === id
          );

          if (oldDataVisIdChall) {
            completedDate = oldDataVisIdChall.completedDate || completedDate;
          }
        }

        // if fullcert is not found, return the latest completedDate
        if (certType === 'isFullStackCert' && !certChallenge) {
          completedDate = getFallbackFrontEndDate(
            completedChallenges,
            completedDate
          );
        }

        const { username, name } = user;

        if (!showName) {
          return res.json({
            certTitle,
            username,
            date: completedDate,
            completionTime
          });
        }

        return res.json({
          certTitle,
          username,
          name,
          date: completedDate,
          completionTime
        });
      }
      return res.json({
        messages: [
          {
            type: 'info',
            message: 'flash.user-not-certified',
            variables: { username: username, cert: certTypeTitleMap[certType] }
          }
        ]
      });
    }, next);
  };
}
