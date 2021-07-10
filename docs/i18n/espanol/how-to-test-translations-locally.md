# How to Test Translations Locally

> [!NOTE] This process is not required, but documented in case you would like to preview what your translations will look like.

If you would like to test your translations on a local instance of the freeCodeCamp `/learn` site, first ensure you have [set up the codebase](how-to-setup-freecodecamp-locally.md).

## Enabling a Language

There are a few steps to take in order to allow the codebase to build in your desired language.

First, visit the `config/i18n/all-langs.js` file to add the language to the available languages list and configure the values. There are four objects here.

- `availableLangs`: For both the `client` and `curriculum` arrays, add the text name of the language. This is the value that will be used in the `.env` file later.
- `i18nextCodes`: These are the ISO language codes for each language. You will need to add the appropriate ISO code for the language you are enabling. These do need to be unique for each language.
- `langDisplayNames`: These are the display names for the language selector in the navigation menu.
- `langCodes`: These are the language codes used for formatting dates and numbers. These should be Unicode CLDR codes instead of ISO codes.

As an example, if you wanted to enable Dothraki as a language, your `all-langs.js` objects should look like this:

```js
const availableLangs = {
  client: ['english', 'espanol', 'chinese', 'chinese-traditional', 'dothraki'],
  curriculum: [
    'english',
    'espanol',
    'chinese',
    'chinese-traditional',
    'dothraki'
  ]
};

const i18nextCodes = {
  english: 'en',
  espanol: 'es',
  chinese: 'zh',
  'chinese-traditional': 'zh-Hant',
  dothraki: 'mis'
};

const langDisplayNames = {
  english: 'English',
  espanol: 'Español',
  chinese: '中文（简体字）',
  'chinese-traditional': '中文（繁體字）',
  dothraki: 'Dothraki'
};

const langCodes = {
  english: 'en-US',
  espanol: 'es-419',
  chinese: 'zh',
  'chinese-traditional': 'zh-Hant',
  dothraki: 'mis'
};
```

Next, open the `client/src/utils/algolia-locale-setup.js` file. This data is used for the search bar that loads `/news` articles. While it is unlikely that you are going to test this functionality, missing the data for your language can lead to errors when attempting to build the codebase locally.

Add an object for your language to the `algoliaIndices` object. You should use the values for the `english` object for local testing, replacing the `english` key with your language's `availableLangs` value.

If you were to add Dothraki:

```js
const algoliaIndices = {
  english: {
    name: 'news',
    searchPage: 'https://www.freecodecamp.org/news/search/'
  },
  espanol: {
    name: 'news-es',
    searchPage: 'https://www.freecodecamp.org/espanol/news/search/'
  },
  chinese: {
    name: 'news-zh',
    searchPage: 'https://chinese.freecodecamp.org/news/search/'
  },
  'chinese-traditional': {
    name: 'news-zh',
    searchPage: 'https://chinese.freecodecamp.org/news/search'
  },
  dothraki: {
    name: 'news',
    searchPage: 'https://www.freecodecamp.org/news/search/'
  }
};
```

Next, you will need to tell the client which certifications are translated, and which are still in English. Open the `utils/is-audited.js` file. Within the `auditedCerts`, add a new key with your language's `availableLangs` value. Assign the value of that key to an array containing the _dashed names_ for the certifications that have been translated. Refer to the existing data for those dashed names.

Continuing the work to enable Dothraki - we have translated the first three certifications:

```js
const auditedCerts = {
  espanol: [
    'responsive-web-design',
    'javascript-algorithms-and-data-structures'
  ],
  chinese: [
    'responsive-web-design',
    'javascript-algorithms-and-data-structures',
    'front-end-development-libraries',
    'data-visualization',
    'back-end-development-and-apis',
    'quality-assurance'
  ],
  'chinese-traditional': [
    'responsive-web-design',
    'javascript-algorithms-and-data-structures',
    'front-end-development-libraries',
    'data-visualization',
    'back-end-development-and-apis',
    'quality-assurance'
  ],
  dothraki: [
    'responsive-web-design',
    'javascript-algorithms-and-data-structures',
    'front-end-development-libraries'
  ]
};
```

Finally, in your `.env` file, set `CLIENT_LOCALE` and `CURRICULUM_LOCALE` to your new language (use the `availableLangs` value.)

```txt
CLIENT_LOCALE="dothraki"
CURRICULUM_LOCALE="dothraki"
```

## Loading Translations

Because the language has not been approved for production, our scripts are not automatically downloading the translations yet. Only staff have the access to directly download the translations - you are welcome to reach out to us in our [contributors chat room](https://chat.freecodecamp.org/channel/contributors), or you can translate the English markdown files locally for testing purposes.

Once you have the files, you will need to place them in the correct directory. For the curriculum challenges, you should place the certification folders (i.e. `01-responsive-web-design`) within the `curriculum/challenges/{lang}` directory. For our Dothraki translations, this would be `curriculum/challenges/dothraki`. The client translation `.json` files will go in the `client/i18n/locales/{lang}` directory.

Once these are in place, you should be able to run `npm run develop` to view your translated version of freeCodeCamp.

> [!ATTENTION] While you may perform translations locally for the purpose of testing, we remind everyone that translations should _not_ be submitted through GitHub and should only be done through Crowdin. Be sure to reset your local codebase after you are done testing.
