import axios from 'axios';
import cookies from 'browser-cookies';
import Tokens from 'csrf';
import envData from '../../../config/env.json';

const { apiLocation } = envData;

const base = apiLocation;
const tokens = new Tokens();

axios.defaults.withCredentials = true;

// _csrf is passed to the client as a cookie. Tokens are sent back to the server
// via headers:
function setCSRFTokens() {
  const _csrf = typeof window !== 'undefined' && cookies.get('_csrf');
  if (!_csrf) return;
  axios.defaults.headers.post['CSRF-Token'] = tokens.create(_csrf);
  axios.defaults.headers.put['CSRF-Token'] = tokens.create(_csrf);
}

function get(path) {
  return axios.get(`${base}${path}`);
}

export function post(path, body) {
  setCSRFTokens();
  return axios.post(`${base}${path}`, body);
}

function put(path, body) {
  setCSRFTokens();
  return axios.put(`${base}${path}`, body);
}

// function del(path) {
//   return axios.delete(`${base}${path}`);
// }

/** GET **/

export function getSessionUser() {
  return get('/user/get-session-user');
}

export function getUserProfile(username) {
  return get(`/api/users/get-public-profile?username=${username}`);
}

export function getShowCert(username, cert) {
  return get(`/certificate/showCert/${username}/${cert}`);
}

export function getUsernameExists(username) {
  return get(`/api/users/exists?username=${username}`);
}

export function getArticleById(shortId) {
  return get(`/n/${shortId}`);
}

/** POST **/
export function postChargeStripe(body) {
  return post('/donate/charge-stripe', body);
}

export function addDonation(body) {
  return post('/donate/add-donation', body);
}

export function postCreateStripeSession(body) {
  return post('/donate/create-stripe-session', body);
}

export function putUpdateLegacyCert(body) {
  return post('/update-my-projects', body);
}

export function postReportUser(body) {
  return post('/user/report-user', body);
}

export function postDeleteAccount(body) {
  return post('/account/delete', body);
}

export function postResetProgress(body) {
  return post('/account/reset-progress', body);
}

/** PUT **/

export function putUpdateMyAbout(values) {
  return put('/update-my-about', { ...values });
}

export function putUpdateMyUsername(username) {
  return put('/update-my-username', { username });
}

export function putUpdateMyProfileUI(profileUI) {
  return put('/update-my-profileui', { profileUI });
}

export function putUpdateUserFlag(update) {
  return put('/update-user-flag', update);
}

export function putUserAcceptsTerms(quincyEmails) {
  return put('/update-privacy-terms', { quincyEmails });
}

export function putUserUpdateEmail(email) {
  return put('/update-my-email', { email });
}

export function putVerifyCert(superBlock) {
  return put('/certificate/verify', { superBlock });
}

/** DELETE **/
