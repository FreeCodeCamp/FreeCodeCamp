import debug from 'debug';
import { check } from 'express-validator';

import { isValidUsername } from '../../../../utils/validate';
import { alertTypes } from '../../common/utils/flash.js';
import { themes } from '../../common/utils/themes.js';
import { ifNoUser401, createValidatorErrorHandler } from '../utils/middleware';

const log = debug('fcc:boot:settings');

export default function settingsController(app) {
  const api = app.loopback.Router();

  const updateMyUsername = createUpdateMyUsername(app);

  api.put('/update-privacy-terms', ifNoUser401, updatePrivacyTerms);

  api.post(
    '/refetch-user-completed-challenges',
    ifNoUser401,
    refetchCompletedChallenges
  );
  api.post(
    '/update-my-current-challenge',
    ifNoUser401,
    updateMyCurrentChallengeValidators,
    createValidatorErrorHandler(alertTypes.danger),
    updateMyCurrentChallenge
  );
  api.post('/update-my-portfolio', ifNoUser401, updateMyPortfolio);
  api.post('/update-my-projects', ifNoUser401, updateMyProjects);
  api.post(
    '/update-my-theme',
    ifNoUser401,
    updateMyThemeValidators,
    createValidatorErrorHandler(alertTypes.danger),
    updateMyTheme
  );
  api.put('/update-my-about', ifNoUser401, updateMyAbout);
  api.put(
    '/update-my-email',
    ifNoUser401,
    updateMyEmailValidators,
    createValidatorErrorHandler(alertTypes.danger),
    updateMyEmail
  );
  api.put('/update-my-profileui', ifNoUser401, updateMyProfileUI);
  api.put('/update-my-username', ifNoUser401, updateMyUsername);
  api.put('/update-user-flag', ifNoUser401, updateUserFlag);

  app.use(api);
}

const standardErrorMessage = {
  type: 'danger',
  message: 'flash.wrong-updating'
};

const standardSuccessMessage = {
  type: 'success',
  message: 'flash.updated-preferences'
};

const createStandardHandler = (req, res, next) => err => {
  if (err) {
    res.status(500).json(standardErrorMessage);
    return next(err);
  }
  return res.status(200).json(standardSuccessMessage);
};

function refetchCompletedChallenges(req, res, next) {
  const { user } = req;
  return user
    .requestCompletedChallenges()
    .subscribe(completedChallenges => res.json({ completedChallenges }), next);
}

const updateMyEmailValidators = [
  check('email').isEmail().withMessage('Email format is invalid.')
];

function updateMyEmail(req, res, next) {
  const {
    user,
    body: { email }
  } = req;
  return user
    .requestUpdateEmail(email)
    .subscribe(message => res.json({ message }), next);
}

const updateMyCurrentChallengeValidators = [
  check('currentChallengeId')
    .isMongoId()
    .withMessage('currentChallengeId is not a valid challenge ID')
];

function updateMyCurrentChallenge(req, res, next) {
  const {
    user,
    body: { currentChallengeId }
  } = req;
  return user.updateAttribute(
    'currentChallengeId',
    currentChallengeId,
    (err, updatedUser) => {
      if (err) {
        return next(err);
      }
      const { currentChallengeId } = updatedUser;
      return res.status(200).json(currentChallengeId);
    }
  );
}

const updateMyThemeValidators = [
  check('theme').isIn(Object.keys(themes)).withMessage('Theme is invalid.')
];

function updateMyTheme(req, res, next) {
  const {
    body: { theme }
  } = req;
  if (req.user.theme === theme) {
    return res.sendFlash(alertTypes.info, 'Theme already set');
  }
  return req.user
    .updateTheme(theme)
    .then(
      () => res.sendFlash(alertTypes.info, 'Your theme has been updated!'),
      next
    );
}

function updateMyPortfolio(req, res, next) {
  const {
    user,
    body: { portfolio }
  } = req;
  // if we only have one key, it should be the id
  // user cannot send only one key to this route
  // other than to remove a portfolio item
  const requestDelete = Object.keys(portfolio).length === 1;
  return user
    .updateMyPortfolio(portfolio, requestDelete)
    .subscribe(message => res.json({ message }), next);
}

function updateMyProfileUI(req, res, next) {
  const {
    user,
    body: { profileUI }
  } = req;
  user.updateAttribute(
    'profileUI',
    profileUI,
    createStandardHandler(req, res, next)
  );
}

function updateMyProjects(req, res, next) {
  const {
    user,
    body: { projects: project }
  } = req;
  return user
    .updateMyProjects(project)
    .subscribe(message => res.json({ message }), next);
}

function updateMyAbout(req, res, next) {
  const {
    user,
    body: { name, location, about, picture }
  } = req;
  log(name, location, picture, about);
  return user.updateAttributes(
    { name, location, about, picture },
    createStandardHandler(req, res, next)
  );
}

function createUpdateMyUsername(app) {
  const { User } = app.models;
  return async function updateMyUsername(req, res, next) {
    const {
      user,
      body: { username }
    } = req;
    if (username === user.username) {
      return res.json({
        type: 'info',
        message: 'flash.username-used'
      });
    }
    const validation = isValidUsername(username);

    if (!validation.valid) {
      return res.json({
        type: 'info',
        message: `Username ${username} ${validation.error}`
      });
    }

    const exists = await User.doesExist(username);

    if (exists) {
      return res.json({
        type: 'info',
        message: 'flash.username-taken'
      });
    }

    return user.updateAttribute('username', username, err => {
      if (err) {
        res.status(500).json(standardErrorMessage);
        return next(err);
      }

      return res.status(200).json({
        type: 'success',
        message: `flash.username-updated`,
        variables: { username: username }
      });
    });
  };
}

const updatePrivacyTerms = (req, res, next) => {
  const {
    user,
    body: { quincyEmails }
  } = req;
  const update = {
    acceptedPrivacyTerms: true,
    sendQuincyEmail: !!quincyEmails
  };
  return user.updateAttributes(update, err => {
    if (err) {
      res.status(500).json(standardErrorMessage);
      return next(err);
    }
    return res.status(200).json(standardSuccessMessage);
  });
};

function updateUserFlag(req, res, next) {
  const { user, body: update } = req;
  return user.updateAttributes(update, createStandardHandler(req, res, next));
}
