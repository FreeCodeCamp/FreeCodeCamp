---
id: bad87fee1348bd9acdd08826
title: Aprende como funciona la etiqueta script y la función "document ready"
challengeType: 6
forumTopicId: 18224
dashedName: learn-how-script-tags-and-document-ready-work
---

# --description--

Ahora estamos listos para aprender jQuery, la herramienta de JavaScript más popular de todos los tiempos.

Antes de empezar a usar jQuery, necesitamos añadir algunas cosas a nuestro HTML.

Primero, añade un elemento `script` en la parte superior de tu página. Asegúrate de cerrarlo en la siguiente línea.

Tu navegador ejecutará cualquier JavaScript dentro de un elemento `script`, incluyendo jQuery.

Dentro de tu elemento `script`, añade este código: `$(document).ready(function() {` a tu `script`. Luego ciérralo en la siguiente línea (todavía dentro de tu elemento `script`) con: `});`

Aprenderemos más sobre `functions` más tarde. Lo importante a saber es que el código que pongas dentro de esta `function` (función) se ejecutará tan pronto como tu navegador haya cargado tu página.

Esto es importante porque sin tu `document ready function`, tu código podría ejecutarse antes de que se procese tu HTML, lo que causaría errores.

# --hints--

Debes crear un elemento `script` asegurándote de que sea válido y tenga una etiqueta de cierre.

```js
assert(
  code.match(/<\/script\s*>/g) &&
    code.match(
      /<script(\sasync|\sdefer)*(\s(charset|src|type)\s*=\s*["\"]+[^"\"]*["\"]+)*(\sasync|\sdefer)*\s*>/g
    ) &&
    code.match(/<\/script\s*>/g).length ===
      code.match(
        /<script(\sasync|\sdefer)*(\s(charset|src|type)\s*=\s*["\"]+[^"\"]*["\"]+)*(\sasync|\sdefer)*\s*>/g
      ).length
);
```

Debes añadir `$(document).ready(function() {` al principio de tu elemento `script`.

```js
assert(
  code.match(
    /\$\s*?\(\s*?document\s*?\)\.ready\s*?\(\s*?function\s*?\(\s*?\)\s*?\{/g
  )
);
```

Debes cerrar tu función `$(document).ready(function() {` con `});`

```js
assert(code.match(/\n*?\s*?\}\s*?\);/g));
```

# --seed--

## --seed-contents--

```html
<!-- Only change code above this line -->

<div class="container-fluid">
  <h3 class="text-primary text-center">jQuery Playground</h3>
  <div class="row">
    <div class="col-xs-6">
      <h4>#left-well</h4>
      <div class="well" id="left-well">
        <button class="btn btn-default target" id="target1">#target1</button>
        <button class="btn btn-default target" id="target2">#target2</button>
        <button class="btn btn-default target" id="target3">#target3</button>
      </div>
    </div>
    <div class="col-xs-6">
      <h4>#right-well</h4>
      <div class="well" id="right-well">
        <button class="btn btn-default target" id="target4">#target4</button>
        <button class="btn btn-default target" id="target5">#target5</button>
        <button class="btn btn-default target" id="target6">#target6</button>
      </div>
    </div>
  </div>
</div>
```

# --solutions--

```html
<script>
  $(document).ready(function() {
  });
</script>
<!-- Only change code above this line -->

<div class="container-fluid">
  <h3 class="text-primary text-center">jQuery Playground</h3>
  <div class="row">
    <div class="col-xs-6">
      <h4>#left-well</h4>
      <div class="well" id="left-well">
        <button class="btn btn-default target" id="target1">#target1</button>
        <button class="btn btn-default target" id="target2">#target2</button>
        <button class="btn btn-default target" id="target3">#target3</button>
      </div>
    </div>
    <div class="col-xs-6">
      <h4>#right-well</h4>
      <div class="well" id="right-well">
        <button class="btn btn-default target" id="target4">#target4</button>
        <button class="btn btn-default target" id="target5">#target5</button>
        <button class="btn btn-default target" id="target6">#target6</button>
      </div>
    </div>
  </div>
</div>
```
