import debug from 'debug';
import { Observable } from 'rx';

import {
  createUserUpdatesFromProfile,
  getSocialProvider
} from '../../server/utils/auth';
import { observeMethod, observeQuery } from '../../server/utils/rx';

const log = debug('fcc:models:UserCredential');
module.exports = function (UserCredential) {
  UserCredential.link = function (
    userId,
    _provider,
    authScheme,
    profile,
    credentials,
    options = {},
    cb
  ) {
    if (typeof options === 'function' && !cb) {
      cb = options;
      options = {};
    }
    const User = UserCredential.app.models.User;
    const findCred = observeMethod(UserCredential, 'findOne');
    const createCred = observeMethod(UserCredential, 'create');

    const provider = getSocialProvider(_provider);
    const query = {
      where: {
        provider: provider,
        externalId: profile.id
      }
    };

    // find createCred if they exist
    // if not create it
    // if yes, update credentials
    // also if github
    //  update profile
    //  update username
    //  update picture
    log('link query', query);
    return findCred(query)
      .flatMap(_credentials => {
        const modified = new Date();
        const updateUser = new Promise((resolve, reject) => {
          User.find({ id: userId }, (err, user) => {
            if (err) {
              return reject(err);
            }
            return user.updateAttributes(
              createUserUpdatesFromProfile(provider, profile),
              updateErr => {
                if (updateErr) {
                  return reject(updateErr);
                }
                return resolve();
              }
            );
          });
        });
        let updateCredentials;
        if (!_credentials) {
          updateCredentials = createCred({
            provider,
            externalId: profile.id,
            authScheme,
            // we no longer want to keep the profile
            // this is information we do not need or use
            profile: null,
            credentials,
            userId,
            created: modified,
            modified
          });
        } else {
          _credentials.credentials = credentials;
          updateCredentials = observeQuery(_credentials, 'updateAttributes', {
            profile: null,
            credentials,
            modified
          });
        }
        return Observable.combineLatest(
          Observable.fromPromise(updateUser),
          updateCredentials,
          (_, credentials) => credentials
        );
      })
      .subscribe(credentials => cb(null, credentials), cb);
  };
};
