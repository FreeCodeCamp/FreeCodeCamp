const path = require('path');
const debug = require('debug');
require('dotenv').config({ path: path.resolve(__dirname, '../../../.env') });
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;

const envVariables = process.argv;

const log = debug('fcc:tools:seedLocalAuthUser');
const { MONGOHQ_URL } = process.env;

const defaultUserImage = require('../../../config/misc').defaultUserImage;
const fullyCertifiedUser = require('./certifiedUserData');

function handleError(err, client) {
  if (err) {
    console.error('Oh noes!! Error seeding local auth user.');
    console.error(err);
    try {
      client.close();
    } catch (e) {
      // no-op
    } finally {
      /* eslint-disable-next-line no-process-exit */
      process.exit(1);
    }
  }
}

/* eslint-disable max-len */
const authUser = {
  _id: ObjectId('5bd30e0f1caf6ac3ddddddb5'),
  email: 'foo@bar.com',
  emailVerified: true,
  progressTimestamps: [],
  isBanned: false,
  isCheater: false,
  username: 'developmentuser',
  about: '',
  name: 'Development User',
  location: '',
  picture: defaultUserImage,
  acceptedPrivacyTerms: true,
  sendQuincyEmail: false,
  currentChallengeId: '',
  isHonest: false,
  isFrontEndCert: false,
  isDataVisCert: false,
  isBackEndCert: false,
  isFullStackCert: false,
  isRespWebDesignCert: false,
  is2018DataVisCert: false,
  isFrontEndLibsCert: false,
  isJsAlgoDataStructCert: false,
  isApisMicroservicesCert: false,
  isInfosecQaCert: false,
  isQaCertV7: false,
  isInfosecCertV7: false,
  is2018FullStackCert: false,
  isSciCompPyCertV7: false,
  isDataAnalysisPyCertV7: false,
  isMachineLearningPyCertV7: false,
  completedChallenges: [],
  portfolio: [],
  yearsTopContributor: envVariables.includes('--top-contributor')
    ? ['2017', '2018', '2019']
    : [],
  rand: 0.6126749173148205,
  theme: 'default',
  profileUI: {
    isLocked: true,
    showAbout: false,
    showCerts: false,
    showDonation: false,
    showHeatMap: false,
    showLocation: false,
    showName: false,
    showPoints: false,
    showPortfolio: false,
    showTimeLine: false
  },
  badges: {
    coreTeam: []
  },
  isDonating: envVariables.includes('--donor'),
  emailAuthLinkTTL: null,
  emailVerifyTTL: null
};
const blankUser = {
  _id: ObjectId('5bd30e0f1caf6ac3ddddddb9'),
  email: 'bar@bar.com',
  emailVerified: true,
  progressTimestamps: [],
  isBanned: false,
  isCheater: false,
  username: 'twaha',
  about: '',
  name: 'Development User',
  location: '',
  picture: defaultUserImage,
  acceptedPrivacyTerms: true,
  sendQuincyEmail: false,
  currentChallengeId: '',
  isHonest: false,
  isFrontEndCert: false,
  isDataVisCert: false,
  isBackEndCert: false,
  isFullStackCert: false,
  isRespWebDesignCert: false,
  is2018DataVisCert: false,
  isFrontEndLibsCert: false,
  isJsAlgoDataStructCert: false,
  isApisMicroservicesCert: false,
  isInfosecQaCert: false,
  isQaCertV7: false,
  isInfosecCertV7: false,
  is2018FullStackCert: false,
  isSciCompPyCertV7: false,
  isDataAnalysisPyCertV7: false,
  isMachineLearningPyCertV7: false,
  completedChallenges: [],
  portfolio: [],
  yearsTopContributor: [],
  rand: 0.6126749173148205,
  theme: 'default',
  profileUI: {
    isLocked: true,
    showAbout: false,
    showCerts: false,
    showDonation: false,
    showHeatMap: false,
    showLocation: false,
    showName: false,
    showPoints: false,
    showPortfolio: false,
    showTimeLine: false
  },
  badges: {
    coreTeam: []
  },
  isDonating: false,
  emailAuthLinkTTL: null,
  emailVerifyTTL: null
};

MongoClient.connect(MONGOHQ_URL, { useNewUrlParser: true }, (err, client) => {
  handleError(err, client);

  log('Connected successfully to mongo');

  const db = client.db('freecodecamp');
  const user = db.collection('user');

  if (process.argv[2] === 'certUser') {
    user.deleteMany(
      {
        _id: {
          $in: [
            ObjectId('5fa2db00a25c1c1fa49ce067'),
            ObjectId('5bd30e0f1caf6ac3ddddddb5'),
            ObjectId('5bd30e0f1caf6ac3ddddddb9')
          ]
        }
      },
      err => {
        handleError(err, client);

        try {
          user.insertOne(fullyCertifiedUser);
          user.insertOne(blankUser);
        } catch (e) {
          handleError(e, client);
        } finally {
          log('local auth user seed complete');
          client.close();
        }
      }
    );
  } else {
    user.deleteMany(
      {
        _id: {
          $in: [
            ObjectId('5fa2db00a25c1c1fa49ce067'),
            ObjectId('5bd30e0f1caf6ac3ddddddb5'),
            ObjectId('5bd30e0f1caf6ac3ddddddb9')
          ]
        }
      },
      err => {
        handleError(err, client);

        try {
          user.insertOne(authUser);
          user.insertOne(blankUser);
        } catch (e) {
          handleError(e, client);
        } finally {
          log('local auth user seed complete');
          client.close();
        }
      }
    );
  }
});
