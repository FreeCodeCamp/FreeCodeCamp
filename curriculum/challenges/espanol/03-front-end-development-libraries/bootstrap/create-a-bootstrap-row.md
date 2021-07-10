---
id: bad87fee1348bd9bec908846
title: Crea una fila Bootstrap
challengeType: 0
forumTopicId: 16813
dashedName: create-a-bootstrap-row
---

# --description--

Ahora crearemos una fila Bootstrap para nuestros elementos en línea.

Crea un elemento `div` debajo de la etiqueta `h3`, con la clase `row`.

# --hints--

Debes agregar un elemento `div` debajo de tu elemento `h3`.

```js
assert(
  $('div').length > 1 &&
    $('div.row h3.text-primary').length == 0 &&
    $('div.row + h3.text-primary').length == 0 &&
    $('h3.text-primary + div.row').length > 0
);
```

Tu elemento `div` debe tener la clase `row`

```js
assert($('div').hasClass('row'));
```

Tu `row div` debe estar anidado dentro de `container-fluid div`

```js
assert($('div.container-fluid div.row').length > 0);
```

Tu elemento `div` debe tener una etiqueta de cierre.

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

</div>
```

# --solutions--

```html
<div class="container-fluid">
  <h3 class="text-primary text-center">jQuery Playground</h3>
  <div class="row"></div>
</div>
```
