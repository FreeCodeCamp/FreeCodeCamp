import { homeLocation, apiLocation } from '../../../config/env';
import { auth0 } from '../../../config/secrets';

const { clientID, clientSecret, domain } = auth0;

// These don't seem to be used, can they go?
const successRedirect = `${homeLocation}/learn`;
const failureRedirect = `${homeLocation}/signin`;

// TODO: can we remove passport-mock-strategy entirely in prod? That would let
// us make passport-mock-strategy a dev dep, as it should be.
const passportProviders = {
  devlogin: {
    authScheme: 'mock',
    provider: 'dev',
    module: 'passport-mock-strategy'
  },
  local: {
    provider: 'local',
    module: 'passport-local',
    usernameField: 'email',
    passwordField: 'password',
    authPath: '/auth/local',
    successRedirect: successRedirect,
    failureRedirect: failureRedirect,
    session: true,
    failureFlash: true
  },
  'auth0-login': {
    provider: 'auth0',
    module: 'passport-auth0',
    clientID,
    clientSecret,
    domain,
    cookieDomain: process.env.COOKIE_DOMAIN || 'localhost',
    callbackURL: `${apiLocation}/auth/auth0/callback`,
    authPath: '/auth/auth0',
    callbackPath: '/auth/auth0/callback',
    useCustomCallback: true,
    passReqToCallback: true,
    state: false,
    successRedirect: successRedirect,
    failureRedirect: failureRedirect,
    scope: ['openid profile email'],
    failureFlash: true
  }
};

export default passportProviders;
