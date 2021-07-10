---
id: bad87fee1348bd9aec908854
title: Etichettare gli elementi incassati
challengeType: 0
forumTopicId: 18223
dashedName: label-bootstrap-wells
---

# --description--

Per motivi di chiarezza, etichettiamo entrambi i nostri well con i loro id.

Sopra il well di sinistra, all'interno del `div` di classe `col-xs-6`, aggiungi un elemento `h4` con il testo `#left-well`.

Sopra il well di destra, all'interno del suo elemento `div` di classe `col-xs-6`, aggiungi un elemento `h4` con il testo `#right-well`.

# --hints--

Dovresti aggiungere un elemento `h4` a ciascuno dei tuoi elementi `<div class="col-xs-6">`.

```js
assert(
  $('.col-xs-6').children('h4') && $('.col-xs-6').children('h4').length > 1
);
```

Un elemento `h4` dovrebbe avere il testo `#left-well`.

```js
assert(new RegExp('#left-well', 'gi').test($('h4').text()));
```

Un elemento `h4` dovrebbe avere il testo `#right-well`.

```js
assert(new RegExp('#right-well', 'gi').test($('h4').text()));
```

Tutti i tuoi elementi `h4` dovrebbero avere un tag di chiusura.

```js
assert(
  code.match(/<\/h4>/g) &&
    code.match(/<h4/g) &&
    code.match(/<\/h4>/g).length === code.match(/<h4/g).length
);
```

# --seed--

## --seed-contents--

```html
<div class="container-fluid">
  <h3 class="text-primary text-center">jQuery Playground</h3>
  <div class="row">
    <div class="col-xs-6">

      <div class="well" id="left-well">
        <button class="btn btn-default target"></button>
        <button class="btn btn-default target"></button>
        <button class="btn btn-default target"></button>
      </div>
    </div>
    <div class="col-xs-6">

      <div class="well" id="right-well">
        <button class="btn btn-default target"></button>
        <button class="btn btn-default target"></button>
        <button class="btn btn-default target"></button>
      </div>
    </div>
  </div>
</div>
```

# --solutions--

```html
<div class="container-fluid">
  <h3 class="text-primary text-center">jQuery Playground</h3>
  <div class="row">
    <div class="col-xs-6">
      <h4>#left-well</h4>
      <div class="well" id="left-well">
        <button class="btn btn-default target"></button>
        <button class="btn btn-default target"></button>
        <button class="btn btn-default target"></button>
      </div>
    </div>
    <div class="col-xs-6">
      <h4>#right-well</h4>
      <div class="well" id="right-well">
        <button class="btn btn-default target"></button>
        <button class="btn btn-default target"></button>
        <button class="btn btn-default target"></button>
      </div>
    </div>
  </div>
</div>
```
