---
id: bad87fee1348bd9aed208826
title: Identificare i figli di un elemento usando jQuery
challengeType: 6
forumTopicId: 18320
dashedName: target-the-children-of-an-element-using-jquery
---

# --description--

Quando gli elementi HTML sono posizionati un livello sotto un altro, vengono chiamati <dfn>figli</dfn> di quell'elemento. Ad esempio, gli elementi button in questa sfida con il testo `#target1`, `#target2`, e `#target3` sono tutti figli dell'elemento `<div class="well" id="left-well">`.

jQuery ha una funzione chiamata `children()` che consente di accedere ai figli di qualsiasi elemento selezionato.

Ecco un esempio di come usare la funzione `children()` per dare ai figli del tuo elemento `left-well` il colore `blue`:

```js
$("#left-well").children().css("color", "blue")
```

# --instructions--

Dai a tutti i figli del tuo elemento `right-well` il colore arancione.

# --hints--

Tutti i figli di `#right-well` dovrebbero avere un testo arancione.

```js
assert($('#right-well').children().css('color') === 'rgb(255, 165, 0)');
```

Dovresti usare la funzione `children()` per modificare questi elementi.

```js
assert(code.match(/\.children\(\)\.css/g));
```

Dovresti usare solo jQuery per aggiungere queste classi all'elemento.

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
