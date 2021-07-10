---
id: bad87fee1348bd9aec908854
title: Etiqueta Wells de Boostrap
challengeType: 0
forumTopicId: 18223
dashedName: label-bootstrap-wells
---

# --description--

Para mayor claridad, etiquetemos ambos `well` con sus ids.

Sobre tu "left-well", dentro del elemento `col-xs-6` `div`, agrega el elemento `h4` con el texto `#left-well`.

Sobre tu "right-well", dentro del elemento `col-xs-6` `div`, agrega el elemento `h4` con el texto `#right-well`.

# --hints--

Debes añadir un elemento `h4` para cada uno de sus elementos `<div class="col-xs-6">`.

```js
assert(
  $('.col-xs-6').children('h4') && $('.col-xs-6').children('h4').length > 1
);
```

Un elemento `h4` debe contener el texto `#left-well`.

```js
assert(new RegExp('#left-well', 'gi').test($('h4').text()));
```

Un elemento `h4` debe contener el texto `#right-well`.

```js
assert(new RegExp('#right-well', 'gi').test($('h4').text()));
```

Todos los elementos `h4` deben contener etiquetas de cierre.

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
