import dedent from 'dedent';
import { Observable } from 'rx';
// import debug from 'debug';
import { isEmail } from 'validator';

import { wrapHandledError } from '../../server/utils/create-handled-error.js';
import { observeMethod, observeQuery } from '../../server/utils/rx';

// const log = debug('fcc:models:userIdent');

export function ensureLowerCaseEmail(profile) {
  return typeof profile?.emails?.[0]?.value === 'string'
    ? profile.emails[0].value.toLowerCase()
    : '';
}

export default function initializeUserIdent(UserIdent) {
  UserIdent.on('dataSourceAttached', () => {
    UserIdent.findOne$ = observeMethod(UserIdent, 'findOne');
  });

  UserIdent.login = function (
    _provider,
    authScheme,
    profile,
    credentials,
    options,
    cb
  ) {
    const User = UserIdent.app.models.User;
    const AccessToken = UserIdent.app.models.AccessToken;
    options = options || {};
    if (typeof options === 'function' && !cb) {
      cb = options;
      options = {};
    }

    // get the social provider data and the external id from auth0
    profile.id = profile.id || profile.openid;
    const auth0IdString = '' + profile.id;
    const [provider, socialExtId] = auth0IdString.split('|');
    const query = {
      where: {
        provider: provider,
        externalId: socialExtId
      },
      include: 'user'
    };
    // get the email from the auth0 (its expected from social providers)
    const email = ensureLowerCaseEmail(profile);

    if (!isEmail('' + email)) {
      throw wrapHandledError(
        new Error('invalid or empty email received from auth0'),
        {
          message: dedent`
    ${provider} did not return a valid email address.
    Please try again with a different account that has an
    email associated with it your update your settings on ${provider}, for us to be able to retrieve your email.
          `,
          type: 'info',
          redirectTo: '/'
        }
      );
    }

    if (provider === 'email') {
      return User.findOne$({ where: { email } })
        .flatMap(user => {
          return user
            ? Observable.of(user)
            : User.create$({ email }).toPromise();
        })
        .flatMap(user => {
          if (!user) {
            throw wrapHandledError(
              new Error('could not find or create a user'),
              {
                message: dedent`
    We could not find or create a user with that email address.
                `,
                type: 'info',
                redirectTo: '/'
              }
            );
          }
          const createToken = observeQuery(AccessToken, 'create', {
            userId: user.id,
            created: new Date(),
            ttl: user.constructor.settings.ttl
          });
          const updateUserPromise = new Promise((resolve, reject) =>
            user.updateAttributes(
              {
                emailVerified: true,
                emailAuthLinkTTL: null,
                emailVerifyTTL: null
              },
              err => {
                if (err) {
                  return reject(err);
                }
                return resolve();
              }
            )
          );
          return Observable.combineLatest(
            Observable.of(user),
            createToken,
            Observable.fromPromise(updateUserPromise),
            (user, token) => ({ user, token })
          );
        })
        .subscribe(({ user, token }) => cb(null, user, null, token), cb);
    } else {
      return UserIdent.findOne$(query)
        .flatMap(identity => {
          return identity
            ? Observable.of(identity.user())
            : User.findOne$({ where: { email } }).flatMap(user => {
                return user
                  ? Observable.of(user)
                  : User.create$({ email }).toPromise();
              });
        })
        .flatMap(user => {
          const createToken = observeQuery(AccessToken, 'create', {
            userId: user.id,
            created: new Date(),
            ttl: user.constructor.settings.ttl
          });
          const updateUser = new Promise((resolve, reject) =>
            user.updateAttributes(
              {
                email: email,
                emailVerified: true,
                emailAuthLinkTTL: null,
                emailVerifyTTL: null
              },
              err => {
                if (err) {
                  return reject(err);
                }
                return resolve();
              }
            )
          );
          return Observable.combineLatest(
            Observable.of(user),
            createToken,
            Observable.fromPromise(updateUser),
            (user, token) => ({ user, token })
          );
        })
        .subscribe(({ user, token }) => cb(null, user, null, token), cb);
    }
  };
}
