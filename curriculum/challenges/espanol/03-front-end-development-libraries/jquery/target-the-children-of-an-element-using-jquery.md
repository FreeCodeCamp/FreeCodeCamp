---
id: bad87fee1348bd9aed208826
title: Apunta al hijo de un elemento usando jQuery
challengeType: 6
forumTopicId: 18320
dashedName: target-the-children-of-an-element-using-jquery
---

# --description--

Cuando los elementos HTML se colocan un nivel por debajo de otro, se denominan <dfn>hijos</dfn> de ese elemento. Por ejemplo, los elementos botón en este desafío con el texto `#target1`, `#target2`, y `#target3` son todos hijos del elemento `<div class="well" id="left-well">`.

jQuery tiene una función llamada `children()` que te permite acceder a los hijos del elemento que hayas seleccionado.

Aquí hay un ejemplo de cómo usarías la función `children()` para dar a los hijos de tu elemento `left-well` el color `blue`:

```js
$("#left-well").children().css("color", "blue")
```

# --instructions--

Dale a todos los hijos de tu elemento `right-well` el color naranja.

# --hints--

Todos los hijos de `#right-well` deben tener texto naranja.

```js
assert($('#right-well').children().css('color') === 'rgb(255, 165, 0)');
```

Debes usar la función `children()` para modificar estos elementos.

```js
assert(code.match(/\.children\(\)\.css/g));
```

Solo debes usar jQuery para agregar estas clases al elemento.

```js
assert(code.match(/<div class="well" id="right-well">/g));
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
    $("#target5").clone().appendTo("#left-well");
    $("#target1").parent().css("background-color", "red");

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
    $("#target1").parent().css("background-color", "red");
    $("#right-well").children().css("color", "orange");
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
