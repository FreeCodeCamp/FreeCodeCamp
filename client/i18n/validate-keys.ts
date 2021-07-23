/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable import/unambiguous */
import * as path from 'path';

const fs = require('fs');
const translationsObject = require('./locales/english/translations.json');
const introObject = require('./locales/english/intro.json');
const metaObject = require('./locales/english/meta-tags.json');
const motivationObject = require('./locales/english/motivation.json');
const trendingObject = require('./locales/english/trending.json');
const linksObject = require('./locales/english/links.json');

/**
 * Function to flatten a nested object. Written specifically for
 * our translation flow, the `namespace` value is used to create the
 * property chains that are used in the i18n replacement scripts.
 * @param {Object} obj
 * @param {string} namespace
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

const translationKeys = Object.keys(flattenAnObject(translationsObject));
const metaKeys = Object.keys(flattenAnObject(metaObject));
const motivationKeys = Object.keys(flattenAnObject(motivationObject));
const introKeys = Object.keys(flattenAnObject(introObject));
const trendingKeys = Object.keys(flattenAnObject(trendingObject));
const linksKeys = Object.keys(flattenAnObject(linksObject));

/**
 * Recursively read through the directory, grabbing .js files
 * in each nested subdirectory and concatenating them all in
 * to one string.
 * @param {String} filePath
 */
const readComponentCode = (filePath: string) => {
  let code = '';
  const isItFolder = fs.lstatSync(filePath).isDirectory();
  if (isItFolder) {
    const contents = fs.readdirSync(filePath);
    contents.forEach((file: string) => {
      code += readComponentCode(path.join(filePath + '/' + file));
    });
  } else {
    if (!filePath.endsWith('.js') || filePath.endsWith('.test.js')) {
      return '';
    }
    code += fs.readFileSync(filePath);
  }
  return code;
};

const clientCodebase = readComponentCode(path.join(process.cwd() + '/src'));
const serverCodebase = readComponentCode(
  path.join(process.cwd() + '/../api-server/src/server')
);

for (const key of translationKeys) {
  if (!clientCodebase.includes(key) && !serverCodebase.includes(key)) {
    console.warn(`The translation key '${key}' appears to be unused.`);
  }
}
for (const key of motivationKeys) {
  if (!clientCodebase.includes(key) && !serverCodebase.includes(key)) {
    console.warn(`The motivation key '${key}' appears to be unused.`);
  }
}
for (const key of metaKeys) {
  if (!clientCodebase.includes(key) && !serverCodebase.includes(key)) {
    console.warn(`The meta key '${key}' appears to be unused.`);
  }
}
for (const key of introKeys) {
  if (!clientCodebase.includes(key) && !serverCodebase.includes(key)) {
    console.warn(`The intro key '${key}' appears to be unused.`);
  }
}
for (const key of trendingKeys) {
  if (!clientCodebase.includes(key) && !serverCodebase.includes(key)) {
    console.warn(`The trending key '${key}' appears to be unused.`);
  }
}
for (const key of linksKeys) {
  if (!clientCodebase.includes(key) && !serverCodebase.includes(key)) {
    console.warn(`The links key '${key}' appears to be unused.`);
  }
}
