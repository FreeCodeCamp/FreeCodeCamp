# Come testare le traduzioni in locale

> [!NOTE] Questo processo non è richiesto, ma documentato nel caso tu voglia vedere la preview delle tue traduzioni.

Se vuoi testare le tue traduzioni in una istanza locale della piattaforma `/learn` di freeCodeCamp, assicurati prima di aver [preparato il codebase](how-to-setup-freecodecamp-locally.md).

## Attivare una lingua

Ci sono alcuni step da fare per avere una build del codebase nella lingua di tua scelta.

Prima, visita il file `config/i18n/all-langs.js` per aggiungere la lingua alle lingue disponibili nella lista e configurare i valori. Ci sono quattro oggetti qui.

- `availableLangs`: Aggiungi il nome testuale della lingua agli array `client` e `curriculum`. Questo è il valore che sarà usato nel file `.env` più tardi.
- `i18nextCodes`: questi sono i codici ISO per le varie lingue. Dovrai aggiungere il codice ISO appropriato per la lingua che stai attivando. Questi devono essere unici per ogni lingua.
- `langDisplayNames`: Questi sono i nomi delle lingue visualizzati nel menù di navigazione.
- `langCodes`: Questi sono i codici delle lingue usati per formattare date e numeri. Questi devono essere codici Unicode CLDR invece di codici ISO.

Per esempio, se vuoi attivare la lingua Dothraki, il tuo oggetto `all-langs.js` dovrebbe essere come segue:

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

Successivamente, apri il file `client/src/utils/algolia-locale-setup.js`. Questi dati sono usati dalla barra di ricerca che carica gli articoli in `/news`. Anche se è poco probabile che tu stia testando questa funzione, se questi dati mancano per la tua lingua possono esserci degli errori nel costruire il codebase localmente.

Aggiungi un oggetto per la tua lingua all'oggetto `algoliaIndices`. Dovresti usare i valori dell'oggetto `english` per testare in locale, sostituiendo la chiave `english` con il valore della tua lingua in `availableLangs`.

Se volessi aggiungere Dothraki:

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

Quindi, devi dire al client quali certificazioni sono tradotte e quali sono ancora in inglese. Apri il file `utils/is-audited.js`. Aggiungi a `auditedCerts` una nuova chiave con il valore della tua lingua in `availableLangs`. Assegna a quella chiave un array contenente i _nomi con trattino_ per le certificazioni che sono state tradotte. Riferisciti ai dati esistenti per i nomi con trattino.

Continuando il lavoro per attivare Dothraki, abbiamo tradotto le prime tre certificazioni:

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

Infinine, nel file `.env`, dai a `CLIENT_LOCALE` e `CURRICULUM_LOCALE` il valore della tua nuova lingua (usando il valore in `availableLangs`.)

```txt
CLIENT_LOCALE="dothraki"
CURRICULUM_LOCALE="dothraki"
```

## Caricare le traduzioni

Poiché la lingua non è ancora stata approvata per la produzione, i nostri script ancora non scaricheranno automaticamente le traduzioni. Solo lo staff ha accesso al download diretto delle traduzioni - sei il benvenuto a rivolgerti a noi attraverso la [chat room per i contributori](https://chat.freecodecamp.org/channel/contributors), o puoi tradurre i file markdown inglesi per le esigenze di test.

Una volta che avrai i file, li dovrai mettere nelle cartelle giuste. Per le sfide del curriculum, dovresti mettere le cartelle dei certificati (ad esempio `01-responsive-web-design`) nella cartella `curriculum/challenges/{lang}`. Per la nostra traduzione in Dothraki, questo sarebbe `curriculum/challenges/dothraki`. I file `.json` con le traduzioni del client vanno nella cartella `client/i18n/locales/{lang}`.

Una volta che questi saranno in posizione, dovresti essere in grado di eseguire `npm run develop` per vedere la versione tradotta di freeCodeCamp.

> [!ATTENTION] Anche se puoi farei delle traduzioni localmente per i test, ricordiamo che le traduzioni _non_ devono essere inviate attraverso GitHub ma solo tramite Crowdin. Assicurati di resettare il tuo codebase locale dopo che avrai finito con i test.
