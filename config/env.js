const path = require('path');

const envPath = path.resolve(__dirname, '../.env');
const { error } = require('dotenv').config({ path: envPath });

if (error) {
  if (process.env.FREECODECAMP_NODE_ENV === 'development') {
    console.warn('.env not found, please copy sample.env to .env');
  } else {
    console.warn(`.env not found. If env vars are not being set another way,
this could be a problem.`);
  }
}

const {
  HOME_LOCATION: homeLocation,
  API_LOCATION: apiLocation,
  FORUM_LOCATION: forumLocation,
  NEWS_LOCATION: newsLocation,
  RADIO_LOCATION: radioLocation,
  CLIENT_LOCALE: clientLocale,
  CURRICULUM_LOCALE: curriculumLocale,
  SHOW_LOCALE_DROPDOWN_MENU: showLocaleDropdownMenu,
  STRIPE_PUBLIC_KEY: stripePublicKey,
  ALGOLIA_APP_ID: algoliaAppId,
  ALGOLIA_API_KEY: algoliaAPIKey,
  PAYPAL_CLIENT_ID: paypalClientId,
  DEPLOYMENT_ENV: deploymentEnv,
  SHOW_UPCOMING_CHANGES: showUpcomingChanges
} = process.env;

const locations = {
  homeLocation,
  apiLocation,
  forumLocation,
  newsLocation,
  radioLocation: !radioLocation
    ? 'https://coderadio.freecodecamp.org'
    : radioLocation
};

module.exports = Object.assign(locations, {
  clientLocale,
  curriculumLocale,
  showLocaleDropdownMenu: showLocaleDropdownMenu === 'true',
  deploymentEnv,
  environment: process.env.FREECODECAMP_NODE_ENV || 'development',
  stripePublicKey:
    !stripePublicKey || stripePublicKey === 'pk_from_stripe_dashboard'
      ? null
      : stripePublicKey,
  algoliaAppId:
    !algoliaAppId || algoliaAppId === 'app_id_from_algolia_dashboard'
      ? null
      : algoliaAppId,
  algoliaAPIKey:
    !algoliaAPIKey || algoliaAPIKey === 'api_key_from_algolia_dashboard'
      ? null
      : algoliaAPIKey,
  paypalClientId:
    !paypalClientId || paypalClientId === 'id_from_paypal_dashboard'
      ? null
      : paypalClientId,
  showUpcomingChanges: showUpcomingChanges === 'true'
});
