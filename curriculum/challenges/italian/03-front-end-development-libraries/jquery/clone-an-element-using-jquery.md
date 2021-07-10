---
id: bad87fee1348bd9aed508826
title: Clonare un elemento usando jQuery
challengeType: 6
forumTopicId: 16780
dashedName: clone-an-element-using-jquery
---

# --description--

Oltre a spostare gli elementi, è anche possibile copiarli da una posizione all'altra.

jQuery ha una funzione chiamata `clone()` che fa la copia di un elemento.

Ad esempio, se volessimo copiare `target2` dal nostro `left-well` al nostro `right-well` potremmo utilizzare:

```js
$("#target2").clone().appendTo("#right-well");
```

Hai notato che abbiamo attaccato insieme due funzioni jQuery? Questo si chiama <dfn>concatenazione di funzioni</dfn> ed è un modo conveniente per fare le cose con jQuery.

Clona il tuo elemento `target5` e aggiungilo al tuo `left-well`.

# --hints--

Il tuo elemento `target5` dovrebbe essere all'interno del `right-well`.

```js
assert($('#right-well').children('#target5').length > 0);
```

Una copia del tuo elemento `target5` dovrebbe essere all'interno del `left-well`.

```js
assert($('#left-well').children('#target5').length > 0);
```

Dovresti usare solo jQuery per spostare questi elementi.

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
