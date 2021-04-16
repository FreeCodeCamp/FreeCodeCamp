---
id: bad87fee1348bd9aed508826
title: Clona un elemento usando jQuery
challengeType: 6
forumTopicId: 16780
dashedName: clone-an-element-using-jquery
---

# --description--

Además de mover elementos, también puedes copiarlos de un lugar a otro.

jQuery tiene una función llamada `clone()` que hace una copia de un elemento.

Por ejemplo, si quisiéramos copìar `target2` de nuestro `left-well` a nuestro `right-well`, usaríamos:

```js
$("#target2").clone().appendTo("#right-well");
```

¿Notaste que esto implica usar dos funciones jQuery juntas? Esto es llamado <dfn>function chaining</dfn> (encadenamiento de funciones) y es una forma conveniente de hacer cosas con jQuery.

Clona tu elemento `target5` y añadelo a tu `left-well`.

# --hints--

Tu elemento `target5` debe estar dentro de `right-well`.

```js
assert($('#right-well').children('#target5').length > 0);
```

Una copia de tu elemento `target5` también debe estar dentro de `left-well`.

```js
assert($('#left-well').children('#target5').length > 0);
```

Sólo debes usar jQuery para mover estos elementos.

```js
assert(!code.match(/class.*animated/g));
```

# --seed--

## --seed-contents--

```html
<script>
  $(document).ready(function() {
    $("#target1").css("color", "red");
    $("#target1").prop("disabled", true);
    $("#target4").remove();
    $("#target2").appendTo("#right-well");

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

# --solutions--

```html
<script>
  $(document).ready(function() {
    $("#target1").css("color", "red");
    $("#target1").prop("disabled", true);
    $("#target4").remove();
    $("#target2").appendTo("#right-well");
    $("#target5").clone().appendTo("#left-well");
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
