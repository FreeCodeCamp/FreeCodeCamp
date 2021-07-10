---
id: bad87fee1348bd9aec908857
title: Usare i commenti per chiarire il codice
challengeType: 0
forumTopicId: 18347
dashedName: use-comments-to-clarify-code
---

# --description--

Quando inizieremo a usare jQuery, modificheremo gli elementi HTML senza doverli cambiare effettivamente usando l'HTML.

Facciamo in modo che tutti sappiano che non dovrebbero modificare niente di questo codice in modo diretto.

Ricorda che puoi iniziare un commento con `<!--` e terminarlo con `-->`

Aggiungi un commento nella parte superiore del tuo HTML che dica `Code below this line should not be changed`

# --hints--

Dovresti iniziare un commento con `<!--` nella parte superiore del tuo HTML.

```js
assert(code.match(/^\s*<!--/));
```

Il tuo commento dovrebbe avere il testo `Code below this line should not be changed`.

```js
assert(code.match(/<!--(?!(>|->|.*-->.*this line))\s*.*this line.*\s*-->/gi));
```

Dovresti chiudere il tuo commento con `-->`.

```js
assert(code.match(/-->.*\n+.+/g));
```

Dovresti avere lo stesso numero di aperture e chiusure di commenti.

```js
assert(code.match(/<!--/g).length === code.match(/-->/g).length);
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
<!-- Code below this line should not be changed -->
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
