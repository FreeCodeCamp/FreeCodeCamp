---
id: bad87fee1348bd9aed008826
title: Apunta a elementos pares utilizando jQuery
challengeType: 6
forumTopicId: 18318
required:
  - 
    link: 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.2.0/animate.css'
dashedName: target-even-elements-using-jquery
---

# --description--

También puedes apuntar a elementos basado en sus posiciones, usando los selectores `:odd` o `:even`.

Ten en cuenta que jQuery es indexado desde el cero, lo que significa que el primer elemento de una selección tiene la posición 0. Esto puede ser un poco confuso, ya que contra-intuitivamente, `:odd` selecciona el segundo elemento (posición 1), cuarto elemento (posición 3), y así sucesivamente.

Así es como apuntas a todos los elementos impares con la clase `target` y les das clases:

```js
$(".target:odd").addClass("animated shake");
```

Intenta seleccionar todos los elementos pares `target` y darle las clases de `animated` y `shake`. Recuerda que **even** se refiere a la posición de los elementos con un sistema de indexado desde cero en mente.

# --hints--

Todos los elementos `target` que jQuery considera que son pares deberían agitarse.

```js
assert(
  $('.target:even').hasClass('animated') && $('.target:even').hasClass('shake')
);
```

Debes usar el selector `:even` para modificar estos elementos.

```js
assert(code.match(/\:even/g));
```

Solo debes usar jQuery para añadir estas clases al elemento.

```js
assert(
  code.match(/\$\(".target:even"\)/g) ||
    code.match(/\$\('.target:even'\)/g) ||
    code.match(/\$\(".target"\).filter\(":even"\)/g) ||
    code.match(/\$\('.target'\).filter\(':even'\)/g)
);
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
    $("#right-well").children().css("color", "orange");
    $("#left-well").children().css("color", "green");
    $(".target:nth-child(2)").addClass("animated bounce");

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
    $("#left-well").children().css("color", "green");
    $(".target:nth-child(2)").addClass("animated bounce");
    $(".target:even").addClass("animated shake");
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
