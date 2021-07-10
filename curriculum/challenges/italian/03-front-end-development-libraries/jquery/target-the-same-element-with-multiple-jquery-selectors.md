---
id: bad87fee1348bd9aed908626
title: Identificare lo stesso elemento con diversi selettori jQuery
challengeType: 6
forumTopicId: 18322
required:
  - 
    link: 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.2.0/animate.css'
dashedName: target-the-same-element-with-multiple-jquery-selectors
---

# --description--

Ora conosci tre modi per identificare gli elementi: per tipo: `$("button")`, per classe: `$(".btn")`, e per id `$("#target1")`.

Anche se è possibile aggiungere più classi in una singola chiamata di `.addClass()`, aggiungiamole allo stesso elemento in *tre modi diversi*.

Usando `.addClass()`, aggiungi una sola classe alla volta allo stesso elemento, in tre modi diversi:

Aggiungi la classe `animated` a tutti gli elementi di tipo `button`.

Aggiungi la classe `shake` a tutti i pulsanti di classe `.btn`.

Aggiungi la classe `btn-primary` al pulsante con id `#target1`.

**Nota:** Dovresti identificare un elemento e aggiungere una sola classe alla volta. Complessivamente, i tuoi tre selettori individuali finiranno per aggiungere le tre classi `shake`, `animated`e `btn-primary` a `#target1`.

# --hints--

Il tuo codice dovrebbe utilizzare il selettore `$("button")`.

```js
assert(code.match(/\$\s*?\(\s*?(?:'|")\s*?button\s*?(?:'|")/gi));
```

Il tuo codice dovrebbe utilizzare il selettore `$(".btn")`.

```js
assert(code.match(/\$\s*?\(\s*?(?:'|")\s*?\.btn\s*?(?:'|")/gi));
```

Il tuo codice dovrebbe utilizzare il selettore `$("#target1")`.

```js
assert(code.match(/\$\s*?\(\s*?(?:'|")\s*?#target1\s*?(?:'|")/gi));
```

Dovresti aggiungere una sola classe con ognuno dei tre selettori.

```js
assert(
  code.match(/addClass/g) &&
    code.match(/addClass\s*?\(\s*?('|")\s*?[\w-]+\s*?\1\s*?\)/g).length > 2
);
```

Il tuo elemento `#target1` dovrebbe avere le classi `animated`‚ `shake` e `btn-primary`.

```js
assert(
  $('#target1').hasClass('animated') &&
    $('#target1').hasClass('shake') &&
    $('#target1').hasClass('btn-primary')
);
```

Dovresti usare solo jQuery per aggiungere queste classi all'elemento.

```js
assert(!code.match(/class.*animated/g));
```

# --seed--

## --seed-contents--

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

# --solutions--

```html
<script>
  $(document).ready(function() {
    $("button").addClass("animated");
    $(".btn").addClass("shake");
    $("#target1").addClass("btn-primary");
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
