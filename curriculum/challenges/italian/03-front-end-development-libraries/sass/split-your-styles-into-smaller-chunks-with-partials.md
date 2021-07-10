---
id: 587d7dbf367417b2b2512bbc
title: Dividi i tuoi stili in pezzi più piccoli con i partial
challengeType: 0
forumTopicId: 301459
dashedName: split-your-styles-into-smaller-chunks-with-partials
---

# --description--

I <dfn>Partials</dfn> in Sass sono file separati che contengono segmenti di codice CSS. Questi vengono importati e utilizzati in altri file Sass. Questo è un ottimo modo per raggruppare codice simile in un modulo per tenerlo organizzato.

I nomi dei partial iniziano con il carattere underscore (`_`), che dice a Sass che si tratta di un piccolo segmento di CSS e di non convertirlo in un file CSS. Inoltre, i file Sass terminano con l'estensione del file `.scss`. Per inserire il codice del partial in un altro file Sass, utilizza la direttiva `@import`.

Ad esempio, se tutti i mixin vengono salvati in un partial denominato "\_mixins.scss", e sono necessari nel file "main.scss", ecco come usarli nel file principale:

```scss
@import 'mixins'
```

Nota che l'underscore e l'estensione del file non sono necessari nell'istruzione `import` - Sass capisce che si tratta di un partial. Una volta che un partial viene importato in un file, tutte le variabili, i mixin e altro codice sono disponibili per l'uso.

# --instructions--

Scrivi una dichiarazione `@import` per importare un partial di nome `_variables.scss` nel file main.scss.

# --hints--

Il tuo codice dovrebbe utilizzare la direttiva `@import`, e non dovrebbe includere l'underscore nel nome del file.

```js
assert(code.match(/@import\s+?('|")variables\1/gi));
```

# --seed--

## --seed-contents--

```html
<!-- The main.scss file -->
```

# --solutions--

```html
@import 'variables'
```
