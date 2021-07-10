---
id: bad87fee1348bd9bedc08826
title: Identificare gli elementi HTML con i selettori usando jQuery
challengeType: 6
forumTopicId: 18319
required:
  - 
    link: 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.2.0/animate.css'
dashedName: target-html-elements-with-selectors-using-jquery
---

# --description--

Ora abbiamo una `document ready function`.

Ora scriviamo la nostra prima istruzione jQuery. Tutte le funzioni di jQuery iniziano con un `$`, di solito indicato come operatore di segno del dollaro, o "bling".

jQuery identifica spesso un elemento HTML con un <dfn>selettore</dfn>, quindi fa qualcosa a quell'elemento.

Ad esempio, facciamo rimbalzare tutti gli elementi `button`. Basta aggiungere questo codice all'interno della document ready function:

```js
$("button").addClass("animated bounce");
```

Nota che abbiamo già incluso sia la libreria jQuery che la libreria Animate.css in background in modo che tu possa usarle nell'editor. Quindi stai usando jQuery per applicare la classe Animate.css `bounce` ai tuoi elementi `button`.

# --hints--

Dovresti usare la funzione jQuery `addClass()` per dare alle classi `animated` e `bounce` ai tuoi elementi `button`.

```js
assert($('button').hasClass('animated') && $('button').hasClass('bounce'));
```

Dovresti usare solo jQuery per aggiungere queste classi all'elemento.

```js
assert(!code.match(/class.*animated/g));
```

Il tuo codice jQuery dovrebbe essere all'interno della funzione `$(document).ready();`.

```js
assert(
  code.replace(/\s/g, '').match(/\$\(document\)\.ready\(function\(\)\{\$/g)
);
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
    $("button").addClass("animated bounce");
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
