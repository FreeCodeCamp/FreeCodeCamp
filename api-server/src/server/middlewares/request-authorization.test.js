/* global describe it expect */
import jwt from 'jsonwebtoken';
import sinon from 'sinon';
import { mockReq as mockRequest, mockRes } from 'sinon-express-mock';

import { homeLocation } from '../../../../config/env';
import createRequestAuthorization, {
  isAllowedPath
} from './request-authorization';

const validJWTSecret = 'this is a super secret string';
const invalidJWTSecret = 'This is not correct secret';
const now = new Date(Date.now());
const theBeginningOfTime = new Date(0);
const accessToken = {
  id: '123abc',
  userId: '456def',
  ttl: 60000,
  created: now
};
const users = {
  '456def': {
    username: 'camperbot',
    progressTimestamps: [1, 2, 3, 4]
  }
};
const mockGetUserById = id =>
  id in users ? Promise.resolve(users[id]) : Promise.reject('No user found');

const mockReq = args => {
  const mock = mockRequest(args);
  mock.header = () => homeLocation;
  return mock;
};

describe('request-authorization', () => {
  describe('isAllowedPath', () => {
    const authRE = /^\/auth\//;
    const confirmEmailRE = /^\/confirm-email$/;
    const newsShortLinksRE = /^\/n\/|^\/p\//;
    const publicUserRE = /^\/api\/users\/get-public-profile$/;
    const publicUsernameRE = /^\/api\/users\/exists$/;
    const resubscribeRE = /^\/resubscribe\//;
    const showCertRE = /^\/certificate\/showCert\//;
    // note: signin may not have a trailing slash
    const signinRE = /^\/signin/;
    const statusRE = /^\/status\/ping$/;
    const unsubscribedRE = /^\/unsubscribed\//;
    const unsubscribeRE = /^\/u\/|^\/unsubscribe\/|^\/ue\//;
    const updateHooksRE = /^\/hooks\/update-paypal$|^\/hooks\/update-stripe$/;

    const allowedPathsList = [
      authRE,
      confirmEmailRE,
      newsShortLinksRE,
      publicUserRE,
      publicUsernameRE,
      resubscribeRE,
      showCertRE,
      signinRE,
      statusRE,
      unsubscribedRE,
      unsubscribeRE,
      updateHooksRE
    ];

    it('returns a boolean', () => {
      const result = isAllowedPath();
      expect(typeof result).toBe('boolean');
    });

    it('returns true for a white listed path', () => {
      const resultA = isAllowedPath(
        '/auth/auth0/callback?code=yF_mGjswLsef-_RLo',
        allowedPathsList
      );
      const resultB = isAllowedPath(
        '/ue/WmjInLerysPrcon6fMb/',
        allowedPathsList
      );
      const resultC = isAllowedPath('/hooks/update-paypal', allowedPathsList);
      const resultD = isAllowedPath('/hooks/update-stripe', allowedPathsList);
      expect(resultA).toBe(true);
      expect(resultB).toBe(true);
      expect(resultC).toBe(true);
      expect(resultD).toBe(true);
    });

    it('returns false for a non-white-listed path', () => {
      const resultA = isAllowedPath('/hax0r-42/no-go', allowedPathsList);
      const resultB = isAllowedPath(
        '/update-current-challenge',
        allowedPathsList
      );
      expect(resultA).toBe(false);
      expect(resultB).toBe(false);
    });
  });

  describe('createRequestAuthorization', () => {
    const requestAuthorization = createRequestAuthorization({
      jwtSecret: validJWTSecret,
      getUserById: mockGetUserById
    });

    it('is a function', () => {
      expect(typeof requestAuthorization).toEqual('function');
    });

    describe('cookies', () => {
      it('throws when no access token is present', () => {
        expect.assertions(2);
        const req = mockReq({ path: '/some-path/that-needs/auth' });
        const res = mockRes();
        const next = sinon.spy();
        expect(() => requestAuthorization(req, res, next)).toThrowError(
          'Access token is required for this request'
        );
        expect(next.called).toBe(false);
      });

      it('throws when the access token is invalid', () => {
        expect.assertions(2);
        const invalidJWT = jwt.sign({ accessToken }, invalidJWTSecret);
        const req = mockReq({
          path: '/some-path/that-needs/auth',
          // eslint-disable-next-line camelcase
          cookie: { jwt_access_token: invalidJWT }
        });
        const res = mockRes();
        const next = sinon.spy();

        expect(() => requestAuthorization(req, res, next)).toThrowError(
          'Access token is invalid'
        );
        expect(next.called).toBe(false);
      });

      it('throws when the access token has expired', () => {
        expect.assertions(2);
        const invalidJWT = jwt.sign(
          { accessToken: { ...accessToken, created: theBeginningOfTime } },
          validJWTSecret
        );
        const req = mockReq({
          path: '/some-path/that-needs/auth',
          // eslint-disable-next-line camelcase
          cookie: { jwt_access_token: invalidJWT }
        });
        const res = mockRes();
        const next = sinon.spy();

        expect(() => requestAuthorization(req, res, next)).toThrowError(
          'Access token is no longer valid'
        );
        expect(next.called).toBe(false);
      });

      it('adds the user to the request object', async done => {
        expect.assertions(3);
        const validJWT = jwt.sign({ accessToken }, validJWTSecret);
        const req = mockReq({
          path: '/some-path/that-needs/auth',
          // eslint-disable-next-line camelcase
          cookie: { jwt_access_token: validJWT }
        });
        const res = mockRes();
        const next = sinon.spy();
        await requestAuthorization(req, res, next);
        expect(next.called).toBe(true);
        expect(req).toHaveProperty('user');
        expect(req.user).toEqual(users['456def']);
        return done();
      });

      it('adds the jwt to the headers', async done => {
        const validJWT = jwt.sign({ accessToken }, validJWTSecret);
        const req = mockReq({
          path: '/some-path/that-needs/auth',
          // eslint-disable-next-line camelcase
          cookie: { jwt_access_token: validJWT }
        });
        const res = mockRes();
        const next = sinon.spy();
        await requestAuthorization(req, res, next);
        expect(res.set.calledWith('X-fcc-access-token', validJWT)).toBe(true);
        return done();
      });

      it('calls next if request does not require authorization', async () => {
        // currently /unsubscribe does not require authorization
        const req = mockReq({ path: '/unsubscribe/another/route' });
        const res = mockRes();
        const next = sinon.spy();
        await requestAuthorization(req, res, next);
        expect(next.called).toBe(true);
      });
    });

    describe('Auth header', () => {
      it('throws when no access token is present', () => {
        expect.assertions(2);
        const req = mockReq({ path: '/some-path/that-needs/auth' });
        const res = mockRes();
        const next = sinon.spy();
        expect(() => requestAuthorization(req, res, next)).toThrowError(
          'Access token is required for this request'
        );
        expect(next.called).toBe(false);
      });

      it('throws when the access token is invalid', () => {
        expect.assertions(2);
        const invalidJWT = jwt.sign({ accessToken }, invalidJWTSecret);
        const req = mockReq({
          path: '/some-path/that-needs/auth',
          headers: { 'X-fcc-access-token': invalidJWT }
        });
        const res = mockRes();
        const next = sinon.spy();

        expect(() => requestAuthorization(req, res, next)).toThrowError(
          'Access token is invalid'
        );
        expect(next.called).toBe(false);
      });

      it('throws when the access token has expired', () => {
        expect.assertions(2);
        const invalidJWT = jwt.sign(
          { accessToken: { ...accessToken, created: theBeginningOfTime } },
          validJWTSecret
        );
        const req = mockReq({
          path: '/some-path/that-needs/auth',
          headers: { 'X-fcc-access-token': invalidJWT }
        });
        const res = mockRes();
        const next = sinon.spy();

        expect(() => requestAuthorization(req, res, next)).toThrowError(
          'Access token is no longer valid'
        );
        expect(next.called).toBe(false);
      });

      it('adds the user to the request object', async done => {
        expect.assertions(3);
        const validJWT = jwt.sign({ accessToken }, validJWTSecret);
        const req = mockReq({
          path: '/some-path/that-needs/auth',
          headers: { 'X-fcc-access-token': validJWT }
        });
        const res = mockRes();
        const next = sinon.spy();
        await requestAuthorization(req, res, next);
        expect(next.called).toBe(true);
        expect(req).toHaveProperty('user');
        expect(req.user).toEqual(users['456def']);
        return done();
      });

      it('adds the jwt to the headers', async done => {
        const validJWT = jwt.sign({ accessToken }, validJWTSecret);
        const req = mockReq({
          path: '/some-path/that-needs/auth',
          // eslint-disable-next-line camelcase
          cookie: { jwt_access_token: validJWT }
        });
        const res = mockRes();
        const next = sinon.spy();
        await requestAuthorization(req, res, next);
        expect(res.set.calledWith('X-fcc-access-token', validJWT)).toBe(true);
        return done();
      });

      it('calls next if request does not require authorization', async () => {
        // currently /unsubscribe does not require authorization
        const req = mockReq({ path: '/unsubscribe/another/route' });
        const res = mockRes();
        const next = sinon.spy();
        await requestAuthorization(req, res, next);
        expect(next.called).toBe(true);
      });
    });
  });
});
