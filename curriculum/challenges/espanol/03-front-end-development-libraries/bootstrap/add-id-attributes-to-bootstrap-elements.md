---
id: bad87fee1348bd9aec908853
title: Añade atributos de identificación a elementos de Bootstrap
challengeType: 0
forumTopicId: 16639
dashedName: add-id-attributes-to-bootstrap-elements
---

# --description--

Recuerda que además de los atributos de clase, puedes darle a cada elemento un atributo `id`.

Cada "id" debe ser único en un elemento específico y utilizarse una sola vez por página.

Vamos a dar un "id" único a cada uno de nuestros elementos `div` de la clase `well`.

Recuerda que puedes dar un "id" a un elemento de esta manera:

```html
<div class="well" id="center-well">
```

Agrega el "id" `left-well` al elemento de la izquierda de la clase "well". Agrega el "id" `right-well` al elemento de la derecha de la clase "well".

# --hints--

El elemento de la izquierda de la clase `well` deberá tener el "id" `left-well`.

```js
assert(
  $('.col-xs-6').children('#left-well') &&
    $('.col-xs-6').children('#left-well').length > 0
);
```

El elemento de la derecha de la clase `well` deberá tener el "id" `right-well`.

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
