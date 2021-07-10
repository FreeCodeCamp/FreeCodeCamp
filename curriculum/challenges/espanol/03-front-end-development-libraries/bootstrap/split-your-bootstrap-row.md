---
id: bad87fee1348bd9aec908847
title: Divide tu fila de Bootstrap
challengeType: 0
forumTopicId: 18306
dashedName: split-your-bootstrap-row
---

# --description--

Ahora que tenemos una fila de Bootstrap, vamos a dividirla en dos columnas para albergar nuestros elementos.

Crea dos elementos `div` dentro de tu fila, ambos con la clase `col-xs-6`.

# --hints--

Dos elementos `div class="col-xs-6"` deben estar anidados dentro de tu elemento `div class="row"`.

```js
assert($('div.row > div.col-xs-6').length > 1);
```

Todos tus elementos `div` deben tener etiquetas de cierre.

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
