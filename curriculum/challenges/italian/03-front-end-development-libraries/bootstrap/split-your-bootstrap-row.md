---
id: bad87fee1348bd9aec908847
title: Dividere la riga di Bootrtrap
challengeType: 0
forumTopicId: 18306
dashedName: split-your-bootstrap-row
---

# --description--

Ora che abbiamo una riga di Bootstrap, dividiamola in due colonne per alloggiare i nostri elementi.

Crea due elementi `div` all'interno della tua riga, entrambi di classe `col-xs-6`.

# --hints--

Due elementi `div class="col-xs-6"` dovrebbero essere annidati all'interno dell'elemento `div class="row"`.

```js
assert($('div.row > div.col-xs-6').length > 1);
```

Tutti i tuoi elementi `div` dovrebbero avere un tag di chiusura.

```js
assert(
  code.match(/<\/div>/g) &&
    code.match(/<div/g) &&
    code.match(/<\/div>/g).length === code.match(/<div/g).length
);
```

# --seed--

## --seed-contents--

```html
<div class="container-fluid">
  <h3 class="text-primary text-center">jQuery Playground</h3>
  <div class="row">


  </div>
</div>
```

# --solutions--

```html
<div class="container-fluid">
  <h3 class="text-primary text-center">jQuery Playground</h3>
  <div class="row">
    <div class="col-xs-6"></div>
    <div class="col-xs-6"></div>
  </div>
</div>
```
