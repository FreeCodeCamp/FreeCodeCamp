/* eslint-disable @typescript-eslint/ban-ts-comment */
/* global preval */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-floating-promises */

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const envData = require('../../config/env.json');
const { i18nextCodes } = require('../../config/i18n/all-langs');

const { clientLocale } = envData;

const i18nextCode = i18nextCodes[clientLocale];

i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  lng: i18nextCode,
  // we only load one language since each language will have it's own server
  // They need to be evaluated ahead of time, to prevent Webpack from bundling
  // the entire locales directory. To avoid double imports when the locale is
  // english, we simply export nothing from the preval
  resources: {
    [i18nextCode]: {
      // @ts-ignore
      translations: preval`
      const envData = require('../../config/env.json');
      const { clientLocale } = envData;
      if (clientLocale !== 'english') {
        module.exports = require('./locales/' + clientLocale + '/translations.json');
      }
    `,
      // @ts-ignore
      trending: preval`
      const envData = require('../../config/env.json');
      const { clientLocale } = envData;
      if (clientLocale !== 'english') {
        module.exports = require('./locales/' + clientLocale + '/trending.json');
      }
    `,
      // @ts-ignore
      intro: preval`
      const envData = require('../../config/env.json');
      const { clientLocale } = envData;
      if (clientLocale !== 'english') {
        module.exports = require('./locales/' + clientLocale + '/intro.json');
      }
    `,
      // @ts-ignore
      metaTags: preval`
      const envData = require('../../config/env.json');
      const { clientLocale } = envData;
      if (clientLocale !== 'english') {
        module.exports = require('./locales/' + clientLocale + '/meta-tags.json');
      }
    `,
      // @ts-ignore
      links: preval`
      const envData = require('../../config/env.json');
      const { clientLocale } = envData;
      if (clientLocale !== 'english') {
        module.exports = require('./locales/' + clientLocale + '/links.json');
      }
    `
    },
    en: {
      // @ts-ignore
      translations: preval`module.exports = require('./locales/english/translations.json')`,
      // @ts-ignore
      trending: preval`module.exports = require('./locales/english/trending.json')`,
      // @ts-ignore
      intro: preval`module.exports = require('./locales/english/intro.json')`,
      // @ts-ignore
      metaTags: preval`module.exports = require('./locales/english/meta-tags.json')`,
      // @ts-ignore
      links: preval`module.exports = require('./locales/english/links.json')`
    }
  },
  ns: ['translations', 'trending', 'intro', 'metaTags', 'links'],
  defaultNS: 'translations',
  returnObjects: true,
  // Uncomment the next line for debug logging
  // debug: true,
  interpolation: {
    escapeValue: false
  },
  react: {
    useSuspense: true
  }
});

i18n.languages = clientLocale;

export default i18n;
