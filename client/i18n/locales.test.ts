/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  availableLangs,
  langDisplayNames,
  langCodes
} from '../../config/i18n/all-langs';

const fs = require('fs');
const { setup } = require('jest-json-schema-extended');

setup();

const filesThatShouldExist = [
  {
    name: 'translations.json'
  },
  {
    name: 'motivation.json'
  },
  {
    name: 'trending.json'
  },
  {
    name: 'intro.json'
  },
  {
    name: 'meta-tags.json'
  },
  {
    name: 'links.json'
  }
];

const path = `${__dirname}/locales`;

describe('Locale tests:', () => {
  availableLangs.client.forEach(lang => {
    describe(`-- ${lang} --`, () => {
      filesThatShouldExist.forEach(file => {
        // check that each json file exists
        test(`${file.name} file exists`, () => {
          const exists = fs.existsSync(`${path}/${lang}/${file.name}`);
          expect(exists).toBeTruthy();
        });
      });

      test(`has an entry in the langDisplayNames variable`, () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        expect(langDisplayNames[lang].length).toBeGreaterThan(0);
      });

      test(`has an entry in the langCodes variable`, () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        expect(langCodes[lang].length).toBeGreaterThan(0);
      });
    });
  });
});
