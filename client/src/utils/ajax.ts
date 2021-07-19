import envData from '../../../config/env.json';
import cookies from 'browser-cookies';

import type { UserType } from '../redux/prop-types';

const { apiLocation } = envData;

const base = apiLocation;

const defaultOptions: RequestInit = {
  credentials: 'include'
};

// csrf_token is passed to the client as a cookie. The client must send
// this back as a header.
function getCSRFToken() {
  const token =
    typeof window !== 'undefined' ? cookies.get('csrf_token') : null;
  return token ?? '';
}

async function get<T>(path: string): Promise<T> {
  return fetch(`${base}${path}`, defaultOptions).then<T>(res => res.json());
}

export function post<T = void>(path: string, body: unknown): Promise<T> {
  return request('POST', path, body);
}

function put<T = void>(path: string, body: unknown): Promise<T> {
  return request('PUT', path, body);
}

async function request<T>(
  method: 'POST' | 'PUT',
  path: string,
  body: unknown
): Promise<T> {
  const options: RequestInit = {
    ...defaultOptions,
    method,
    headers: {
      'CSRF-Token': getCSRFToken(),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  };
  return fetch(`${base}${path}`, options).then<T>(res => res.json());
}

/** GET **/

interface SessionUser {
  user: UserType;
  sessionMeta: { activeDonations: number };
  result: string;
}
export function getSessionUser(): Promise<SessionUser> {
  return get('/user/get-session-user');
}

export function getUserProfile(username: string): Promise<UserType> {
  return get(`/api/users/get-public-profile?username=${username}`);
}

interface Cert {
  certTitle: string;
  username: string;
  date: Date;
  completionTime: string;
}
export function getShowCert(username: string, certSlug: string): Promise<Cert> {
  return get(`/certificate/showCert/${username}/${certSlug}`);
}

export function getUsernameExists(username: string): Promise<boolean> {
  return get(`/api/users/exists?username=${username}`);
}

// TODO: Does a GET return a bolean?
export function getVerifyCanClaimCert(
  username: string,
  superBlock: string
): Promise<boolean> {
  return get(
    `/certificate/verify-can-claim-cert?username=${username}&superBlock=${superBlock}`
  );
}

/** POST **/

interface Donation {
  email: string;
  amount: number;
  duration: string;
  provider: string;
  subscriptionId: string;
  customerId: string;
  startDate: Date;
}
export function addDonation(body: Donation): Promise<void> {
  return post('/donate/add-donation', body);
}

interface Report {
  username: string;
  reportDescription: string;
}
export function postReportUser(body: Report): Promise<void> {
  return post('/user/report-user', body);
}

// Both are called without a payload in danger-zone-saga,
// which suggests both are sent without any body
// TODO: Convert to DELETE
export function postDeleteAccount(): Promise<void> {
  return post('/account/delete', {});
}

export function postResetProgress(): Promise<void> {
  return post('/account/reset-progress', {});
}

/** PUT **/

interface MyAbout {
  name: string;
  location: string;
  about: string;
  picture: string;
}
export function putUpdateMyAbout(values: MyAbout): Promise<void> {
  return put('/update-my-about', { ...values });
}

export function putUpdateMyUsername(username: string): Promise<void> {
  return put('/update-my-username', { username });
}

export function putUpdateMyProfileUI(
  profileUI: UserType['profileUI']
): Promise<void> {
  return put('/update-my-profileui', { profileUI });
}

// Update should contain only one flag and one new value
// It's possible to constrain to only one key with TS, but is overkill for this
// https://stackoverflow.com/a/60807986
export function putUpdateUserFlag(
  update: Record<string, string>
): Promise<void> {
  return put('/update-user-flag', update);
}

export function putUserUpdateEmail(email: string): Promise<void> {
  return put('/update-my-email', { email });
}

export function putVerifyCert(certSlug: string): Promise<void> {
  return put('/certificate/verify', { certSlug });
}
