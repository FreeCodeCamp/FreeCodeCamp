---
id: bad87fee1348bd9aec908856
title: Etichettare i bottoni di Bootstrap
challengeType: 0
forumTopicId: 18222
dashedName: label-bootstrap-buttons
---

# --description--

Proprio come abbiamo etichettato i nostri well, vogliamo etichettare i nostri pulsanti.

Dai a ciascuno dei tuoi elementi `button` un testo che corrisponda al suo selettore id.

# --hints--

Il tuo elemento `button` con l'id `target1` dovrebbe avere il testo `#target1`.

```js
assert(new RegExp('#target1', 'gi').test($('#target1').text()));
```

Il tuo elemento `button` con l'id `target2` dovrebbe avere il testo `#target2`.

```js
assert(new RegExp('#target2', 'gi').test($('#target2').text()));
```

Il tuo elemento `button` con l'id `target3` dovrebbe avere il testo `#target3`.

```js
assert(new RegExp('#target3', 'gi').test($('#target3').text()));
```

Il tuo elemento `button` con l'id `target4` dovrebbe avere il testo `#target4`.

```js
assert(new RegExp('#target4', 'gi').test($('#target4').text()));
```

Il tuo elemento `button` con l'id `target5` dovrebbe avere il testo `#target5`.

```js
assert(new RegExp('#target5', 'gi').test($('#target5').text()));
```

Il tuo elemento `button` con l'id `target6` dovrebbe avere il testo `#target6`.

```js
assert(new RegExp('#target6', 'gi').test($('#target6').text()));
```

# --seed--

## --seed-contents--

```html
<div class="container-fluid">
  <h3 class="text-primary text-center">jQuery Playground</h3>
  <div class="row">
    <div class="col-xs-6">
      <h4>#left-well</h4>
      <div class="well" id="left-well">
        <button class="btn btn-default target" id="target1"></button>
        <button class="btn btn-default target" id="target2"></button>
        <button class="btn btn-default target" id="target3"></button>
      </div>
    </div>
    <div class="col-xs-6">
      <h4>#right-well</h4>
      <div class="well" id="right-well">
        <button class="btn btn-default target" id="target4"></button>
        <button class="btn btn-default target" id="target5"></button>
        <button class="btn btn-default target" id="target6"></button>
      </div>
    </div>
  </div>
</div>
```

# --solutions--

```html
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
