---
id: bad87fee1348bd9aec908849
title: Agregar elementos dentro de tus Bootstrap Wells
challengeType: 0
forumTopicId: 16636
dashedName: add-elements-within-your-bootstrap-wells
---

# --description--

Ahora estamos a varios elementos `div` de profundidad en cada columna de nuestras filas. Esto es todo lo que necesitamos. Ahora podemos agregar nuestros elementos `button`.

Anida tres elementos `button` dentro de cada uno de los elementos `div` que posean una clase `well`.

# --hints--

Tres elementos `button` deberían ser anidados cada uno dentro de elementos `div` con la clase `well`.

```js
assert(
  $('div.well:eq(0)').children('button').length === 3 &&
    $('div.well:eq(1)').children('button').length === 3
);
```

Debería haber un total de 6 elementos `button`.

```js
assert($('button') && $('button').length > 5);
```

Todos los elementos `button` deben tener etiqueta de cierre.

```js
assert(
  code.match(/<\/button>/g) &&
    code.match(/<button/g) &&
    code.match(/<\/button>/g).length === code.match(/<button/g).length
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



      </div>
    </div>
    <div class="col-xs-6">
      <div class="well">



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
      <div class="well">
        <button></button>
        <button></button>
        <button></button>
      </div>
    </div>
    <div class="col-xs-6">
      <div class="well">
        <button></button>
        <button></button>
        <button></button>
      </div>
    </div>
  </div>
</div>
```
