---
id: bad87fee1348bd9aec908848
title: Crea Bootstrap wells
challengeType: 0
forumTopicId: 16825
dashedName: create-bootstrap-wells
---

# --description--

Bootstrap tiene una clase llamada `well` (pozo) que puede crear una ilusión visual de profundidad en las columnas.

Incrusta un elemento `div` con la clase `well` en cada uno de los elementos `col-xs-6` y `div`.

# --hints--

Debes añadir un elemento `div` con la clase `well` dentro de cada uno de los elementos `div` con la clase `col-xs-6`

```js
assert($('div.col-xs-6').not(':has(>div.well)').length < 1);
```

Ambos elementos `div` con la clase `col-xs-6` deben estar incrustados en el elemento `div` con la clase `row`.

```js
assert($('div.row > div.col-xs-6').length > 1);
```

Todos los elementos `div` deben tener etiquetas de cierre.

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
    <div class="col-xs-6">

    </div>
    <div class="col-xs-6">

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
      <div class="well"></div>
    </div>
    <div class="col-xs-6">
      <div class="well"></div>
    </div>
  </div>
</div>
```
