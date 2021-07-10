---
id: bad87fee1348bd9aedc08826
title: Individuare elementi per classe usando jQuery
challengeType: 6
forumTopicId: 18316
required:
  - 
    link: 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.2.0/animate.css'
dashedName: target-elements-by-class-using-jquery
---

# --description--

Vedi come abbiamo fatto rimbalzare tutti gli elementi del tuo `button`? Li abbiamo selezionati con `$("button")`, poi abbiamo aggiunto alcune classi CSS con `.addClass("animated bounce");`.

Hai appena usato la funzione `.addClass()` di jQuery, che ti permette di aggiungere classi agli elementi.

Innanzitutto, individuiamo bene gli elementi `div` con la classe `well` utilizzando il selettore `$(".well")`.

Nota che, proprio come con le dichiarazioni CSS, devi digitare un `.` prima del nome della classe.

Quindi usa la funzione `.addClass()` di jQuery per aggiungere le classi `animated` e `shake`.

Ad esempio, potresti scuotere tutti gli elementi di classe `text-primary` aggiungendo quanto segue alla tua `document ready function`:

```js
$(".text-primary").addClass("animated shake");
```

# --hints--

Dovresti usare la funzione jQuery `addClass()` per dare le classi `animated` e `shake` a tutti i tuoi elementi di classe `well`.

```js
assert($('.well').hasClass('animated') && $('.well').hasClass('shake'));
```

Dovresti usare solo jQuery per aggiungere queste classi all'elemento.

```js
assert(!code.match(/class\.\*animated/g));
```

# --seed--

## --seed-contents--

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

# --solutions--

```html
<script>
  $(document).ready(function() {
    $("button").addClass("animated bounce");
    $(".well").addClass("animated shake");
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
