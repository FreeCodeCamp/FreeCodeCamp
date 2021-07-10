---
id: bad87fee1348bd9aec908853
title: Aggiungere attributi id agli elementi di Bootstrap
challengeType: 0
forumTopicId: 16639
dashedName: add-id-attributes-to-bootstrap-elements
---

# --description--

Ricorda che oltre agli attributi di classe, puoi dare a ciascuno dei tuoi elementi un attributo `id`.

Ogni id deve essere unico per uno specifico elemento e dev'essere usato una sola volta per pagina.

Diamo un id unico a ciascuno dei nostri elementi `div` di classe `well`.

Ricorda che puoi dare ad un elemento un id come questo:

```html
<div class="well" id="center-well">
```

Dai all'elemento well sulla sinistra l'id di `left-well`. Dai all'elemento well sulla destra l'id di `right-well`.

# --hints--

Il tuo `well` di sinistra dovrebbe avere l'id di `left-well`.

```js
assert(
  $('.col-xs-6').children('#left-well') &&
    $('.col-xs-6').children('#left-well').length > 0
);
```

Il tuo `well` di destra dovrebbe avere l'id di `right-well`.

```js
assert(
  $('.col-xs-6').children('#right-well') &&
    $('.col-xs-6').children('#right-well').length > 0
);
```

# --seed--

## --seed-contents--

```html
<div class="container-fluid">
  <h3 class="text-primary text-center">jQuery Playground</h3>
  <div class="row">
    <div class="col-xs-6">
      <div class="well">
        <button class="btn btn-default target"></button>
        <button class="btn btn-default target"></button>
        <button class="btn btn-default target"></button>
      </div>
    </div>
    <div class="col-xs-6">
      <div class="well">
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
