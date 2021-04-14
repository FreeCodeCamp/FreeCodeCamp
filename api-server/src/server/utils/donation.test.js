/* eslint-disable camelcase */
/* global describe it expect */
/* global jest*/

import axios from 'axios';
import keys from '../../../../config/secrets';
import {
  mockApp,
  createDonationMockFn,
  createUserMockFn,
  updateDonationAttr,
  updateUserAttr
} from '../boot_tests/fixtures';
import { mockActivationHook, mockCancellationHook } from './__mocks__/donation';
import {
  getAsyncPaypalToken,
  verifyWebHook,
  updateUser,
  capitalizeKeys,
  createDonationObj
} from './donation';

jest.mock('axios');

const verificationUrl = `https://api.sandbox.paypal.com/v1/notifications/verify-webhook-signature`;
const tokenUrl = `https://api.sandbox.paypal.com/v1/oauth2/token`;
const {
  body: activationHookBody,
  headers: activationHookHeaders
} = mockActivationHook;

describe('donation', () => {
  describe('getAsyncPaypalToken', () => {
    it('call paypal api for token ', async () => {
      const res = {
        data: {
          access_token: 'token'
        }
      };

      axios.post.mockImplementationOnce(() => Promise.resolve(res));

      await expect(getAsyncPaypalToken()).resolves.toEqual(
        res.data.access_token
      );

      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(axios.post).toHaveBeenCalledWith(tokenUrl, null, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        auth: {
          username: keys.paypal.client,
          password: keys.paypal.secret
        },
        params: {
          grant_type: 'client_credentials'
        }
      });
    });
  });

  describe('verifyWebHook', () => {
    // normalize headers
    capitalizeKeys(activationHookHeaders);
    const mockWebhookId = 'qwdfq;3w12341dfa4';
    const mockAccessToken = '241231223$!@$#1243';
    const mockPayLoad = {
      auth_algo: activationHookHeaders['PAYPAL-AUTH-ALGO'],
      cert_url: activationHookHeaders['PAYPAL-CERT-URL'],
      transmission_id: activationHookHeaders['PAYPAL-TRANSMISSION-ID'],
      transmission_sig: activationHookHeaders['PAYPAL-TRANSMISSION-SIG'],
      transmission_time: activationHookHeaders['PAYPAL-TRANSMISSION-TIME'],
      webhook_id: mockWebhookId,
      webhook_event: activationHookBody
    };
    const failedVerificationErr = {
      message: `Failed token verification.`,
      type: 'FailedPaypalTokenVerificationError'
    };
    const axiosOptions = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${mockAccessToken}`
      }
    };
    const successVerificationResponce = {
      data: {
        verification_status: 'SUCCESS'
      }
    };
    const failedVerificationResponce = {
      data: {
        verification_status: 'FAILED'
      }
    };

    it('calls paypal for Webhook verification', async () => {
      axios.post.mockImplementationOnce(() =>
        Promise.resolve(successVerificationResponce)
      );

      await expect(
        verifyWebHook(
          activationHookHeaders,
          activationHookBody,
          mockAccessToken,
          mockWebhookId
        )
      ).resolves.toEqual(activationHookBody);

      expect(axios.post).toHaveBeenCalledWith(
        verificationUrl,
        mockPayLoad,
        axiosOptions
      );
    });
    it('throws error if verification not successful', async () => {
      axios.post.mockImplementationOnce(() =>
        Promise.resolve(failedVerificationResponce)
      );

      await expect(
        verifyWebHook(
          activationHookHeaders,
          activationHookBody,
          mockAccessToken,
          mockWebhookId
        )
      ).rejects.toEqual(failedVerificationErr);
    });
  });

  describe('updateUser', () => {
    it('created a donation when a machting user found', () => {
      updateUser(activationHookBody, mockApp);
      expect(createDonationMockFn).toHaveBeenCalledTimes(1);
      expect(createDonationMockFn).toHaveBeenCalledWith(
        createDonationObj(activationHookBody)
      );
    });
    it('create a user and donation when no machting user found', () => {
      let newActivationHookBody = activationHookBody;
      newActivationHookBody.resource.subscriber.email_address =
        'new@freecodecamp.org';
      updateUser(newActivationHookBody, mockApp);
      expect(createUserMockFn).toHaveBeenCalledTimes(1);
    });

    it('modify user and donation records on cancellation', () => {
      const { body: cancellationHookBody } = mockCancellationHook;
      const {
        resource: { status_update_time = new Date(Date.now()).toISOString() }
      } = cancellationHookBody;

      updateUser(cancellationHookBody, mockApp);
      expect(updateDonationAttr).toHaveBeenCalledWith({
        endDate: new Date(status_update_time).toISOString()
      });
      expect(updateUserAttr).not.toHaveBeenCalled();
    });
  });
});
