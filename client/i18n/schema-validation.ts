/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable import/unambiguous */
import * as path from 'path';

const { availableLangs } = require('../../config/i18n/all-langs');
const translationsSchema = require('./locales/english/translations.json');
const trendingSchema = require('./locales/english/trending.json');
const motivationSchema = require('./locales/english/motivation.json');
const introSchema = require('./locales/english/intro.json');
const metaTagsSchema = require('./locales/english/meta-tags.json');
const linksSchema = require('./locales/english/links.json');

/**
 * Flattens a nested object structure into a single
 * object with property chains as keys.
 * @param {Object} obj Object to flatten
 * @param {String} namespace Used for property chaining
 */
const flattenAnObject = (obj: Record<string, unknown>, namespace = '') => {
  const flattened = {} as Record<string, unknown>;
  Object.keys(obj).forEach(key => {
    if (Array.isArray(obj[key])) {
      flattened[namespace ? `${namespace}.${key}` : key] = obj[key];
    } else if (typeof obj[key] === 'object') {
      Object.assign(
        flattened,
        flattenAnObject(
          obj[key] as Record<string, unknown>,
          namespace ? `${namespace}.${key}` : key
        )
      );
    } else {
      flattened[namespace ? `${namespace}.${key}` : key] = obj[key];
    }
  });
  return flattened;
};

/**
 * Checks if a translation object is missing keys
 * that are present in the schema.
 * @param {String[]} file Array of translation object's keys
 * @param {String[]} schema Array of matching schema's keys
 * @param {String} path string path to file
 */
const findMissingKeys = (file: string[], schema: string[], path: string) => {
  const missingKeys = [];
  for (const key of schema) {
    if (!file.includes(key)) {
      missingKeys.push(key);
    }
  }
  if (missingKeys.length) {
    console.warn(
      `${path} is missing these required keys: ${missingKeys.join(', ')}`
    );
  }
};

/**
 * Checks if a translation object has extra
 * keys which are NOT present in the schema.
 * @param {String[]} file Array of translation object's keys
 * @param {String[]} schema Array of matching schema's keys
 * @param {String} path string path to file
 */
const findExtraneousKeys = (file: string[], schema: string[], path: string) => {
  const extraKeys = [];
  for (const key of file) {
    if (!schema.includes(key)) {
      extraKeys.push(key);
    }
  }
  if (extraKeys.length) {
    console.warn(
      `${path} has these keys that are not in the schema: ${extraKeys.join(
        ', '
      )}`
    );
  }
};

/**
 * Validates that all values in the object are non-empty. Includes
 * validation of nested objects.
 * @param {Object} obj The object to check the values of
 * @param {String} namespace String for tracking nested properties
 */
const noEmptyObjectValues = (
  obj: Record<string, string>,
  namespace = ''
): unknown => {
  const emptyKeys = [];
  for (const key of Object.keys(obj)) {
    if (Array.isArray(obj[key])) {
      if (!obj[key].length) {
        emptyKeys.push(namespace ? `${namespace}.${key}` : key);
      }
    } else if (typeof obj[key] === 'object') {
      emptyKeys.push(
        noEmptyObjectValues(
          obj[key] as unknown as Record<string, string>,
          namespace ? `${namespace}.${key}` : key
        )
      );
    } else if (!obj[key]) {
      emptyKeys.push(namespace ? `${namespace}.${key}` : key);
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return emptyKeys.flat();
};

/**
 * Grab the schema keys once, to avoid overhead of
 * fetching within iterative function.
 */
const translationSchemaKeys = Object.keys(flattenAnObject(translationsSchema));
const trendingSchemaKeys = Object.keys(flattenAnObject(trendingSchema));
const motivationSchemaKeys = Object.keys(flattenAnObject(motivationSchema));
const introSchemaKeys = Object.keys(flattenAnObject(introSchema));
const metaTagsSchemaKeys = Object.keys(flattenAnObject(metaTagsSchema));
const linksSchemaKeys = Object.keys(flattenAnObject(linksSchema));

/**
 * Function that checks the translations.json file
 * for each available client language.
 * @param {String[]} languages List of languages to test
 */
const translationSchemaValidation = (languages: string[]) => {
  languages.forEach(language => {
    const filePath = path.join(
      __dirname,
      `/locales/${language}/translations.json`
    );
    const fileJson = require(filePath);
    const fileKeys = Object.keys(flattenAnObject(fileJson));
    findMissingKeys(
      fileKeys,
      translationSchemaKeys,
      `${language}/translations.json`
    );
    findExtraneousKeys(
      fileKeys,
      translationSchemaKeys,
      `${language}/translations.json`
    );
    const emptyKeys = noEmptyObjectValues(fileJson) as [];
    if (emptyKeys.length) {
      console.warn(
        `${language}/translation.json has these empty keys: ${emptyKeys.join(
          ', '
        )}`
      );
    }
    console.info(`${language} translation.json validation complete.`);
  });
};

/**
 * Function that checks the trending.json file
 * for each available client language.
 * @param {String[]} languages List of languages to test
 */
const trendingSchemaValidation = (languages: string[]) => {
  languages.forEach(language => {
    const filePath = path.join(__dirname, `/locales/${language}/trending.json`);
    const fileJson = require(filePath);
    const fileKeys = Object.keys(flattenAnObject(fileJson));
    findMissingKeys(fileKeys, trendingSchemaKeys, `${language}/trending.json`);
    findExtraneousKeys(
      fileKeys,
      trendingSchemaKeys,
      `${language}/trending.json`
    );
    const emptyKeys = noEmptyObjectValues(fileJson) as [];
    if (emptyKeys.length) {
      console.warn(
        `${language}/trending.json has these empty keys: ${emptyKeys.join(
          ', '
        )}`
      );
    }
    console.info(`${language} trending.json validation complete`);
  });
};

const motivationSchemaValidation = (languages: string[]) => {
  languages.forEach(language => {
    const filePath = path.join(
      __dirname,
      `/locales/${language}/motivation.json`
    );
    const fileJson = require(filePath);
    const fileKeys = Object.keys(flattenAnObject(fileJson));
    findMissingKeys(
      fileKeys,
      motivationSchemaKeys,
      `${language}/motivation.json`
    );
    findExtraneousKeys(
      fileKeys,
      motivationSchemaKeys,
      `${language}/motivation.json`
    );
    const emptyKeys = noEmptyObjectValues(fileJson) as [];
    if (emptyKeys.length) {
      console.warn(
        `${language}/motivation.json has these empty keys: ${emptyKeys.join(
          ', '
        )}`
      );
    }
    // Special line to assert that objects in motivational quote are correct
    if (
      !fileJson.motivationalQuotes.every(
        (object: { hasOwnProperty: (arg0: string) => any }) =>
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return
          object.hasOwnProperty('quote') && object.hasOwnProperty('author')
      )
    ) {
      console.warn(`${language}/motivation.json has malformed quote objects.`);
    }
    console.info(`${language} motivation.json validation complete`);
  });
};

/**
 * Function that checks the intro.json file
 * for each available client language.
 * @param {String[]} languages List of languages to test
 */
const introSchemaValidation = (languages: string[]) => {
  languages.forEach(language => {
    const filePath = path.join(__dirname, `/locales/${language}/intro.json`);
    const fileJson = require(filePath);
    const fileKeys = Object.keys(flattenAnObject(fileJson));
    findMissingKeys(fileKeys, introSchemaKeys, `${language}/intro.json`);
    findExtraneousKeys(fileKeys, introSchemaKeys, `${language}/intro.json`);
    const emptyKeys = noEmptyObjectValues(fileJson) as [];
    if (emptyKeys.length) {
      console.warn(
        `${language}/intro.json has these empty keys: ${emptyKeys.join(', ')}`
      );
    }
    console.info(`${language} intro.json validation complete`);
  });
};

const metaTagsSchemaValidation = (languages: string[]) => {
  languages.forEach(language => {
    const filePath = path.join(
      __dirname,
      `/locales/${language}/meta-tags.json`
    );
    const fileJson = require(filePath);
    const fileKeys = Object.keys(flattenAnObject(fileJson));
    findMissingKeys(fileKeys, metaTagsSchemaKeys, `${language}/meta-tags.json`);
    findExtraneousKeys(
      fileKeys,
      metaTagsSchemaKeys,
      `${language}/metaTags.json`
    );
    const emptyKeys = noEmptyObjectValues(fileJson) as [];
    if (emptyKeys.length) {
      console.warn(
        `${language}/metaTags.json has these empty keys: ${emptyKeys.join(
          ', '
        )}`
      );
    }
    console.info(`${language} metaTags.json validation complete`);
  });
};

const linksSchemaValidation = (languages: string[]) => {
  languages.forEach(language => {
    const filePath = path.join(__dirname, `/locales/${language}/links.json`);
    const fileJson = require(filePath);
    const fileKeys = Object.keys(flattenAnObject(fileJson));
    findMissingKeys(fileKeys, linksSchemaKeys, `${language}/links.json`);
    findExtraneousKeys(fileKeys, linksSchemaKeys, `${language}/links.json`);
    const emptyKeys = noEmptyObjectValues(fileJson) as [];
    if (emptyKeys.length) {
      console.warn(
        `${language}/links.json has these empty keys: ${emptyKeys.join(', ')}`
      );
    }
    console.info(`${language} links.json validation complete`);
  });
};

const translatedLangs = availableLangs.client.filter(
  (x: string) => x !== 'english'
);

translationSchemaValidation(translatedLangs);
trendingSchemaValidation(translatedLangs);
motivationSchemaValidation(translatedLangs);
introSchemaValidation(translatedLangs);
metaTagsSchemaValidation(translatedLangs);
linksSchemaValidation(translatedLangs);
