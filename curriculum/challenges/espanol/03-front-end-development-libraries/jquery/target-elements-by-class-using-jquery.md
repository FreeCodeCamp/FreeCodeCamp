---
id: bad87fee1348bd9aedc08826
title: Apunta a elementos por clase usando jQuery
challengeType: 6
forumTopicId: 18316
required:
  - 
    link: 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.2.0/animate.css'
dashedName: target-elements-by-class-using-jquery
---

# --description--

¿Ves como hicimos que todos tus elementos `button` reboten? Los seleccionamos con `$("button")`, luego agregamos algo de clases CSS a ellos con `.addClass("animated bounce");`.

Acabas de usar la función `.addClass()` de jQuery, que te permite añadir clases a los elementos.

Primero, apuntemos tus elementos `div` con la clase `well` usando el selector `$(".well")`.

Ten en cuenta que, al igual que con las declaraciones CSS, escribes un `.` antes del nombre de la clase.

Luego usa la función `.addClass()` de jQuery para añadir las clases `animated` y `shake`.

Por ejemplo, puedes hacer que todos los elementos con la clase `text-primary` se agiten agregando lo siguiente a tu función `document ready function`:

```js
$(".text-primary").addClass("animated shake");
```

# --hints--

Debes usar la función jQuery `addClass()` para dar las clases `animated` y `shake` a todos tus elementos con la clase `well`.

```js
assert($('.well').hasClass('animated') && $('.well').hasClass('shake'));
```

Solo debes usar jQuery para añadir estas clases al elemento.

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
