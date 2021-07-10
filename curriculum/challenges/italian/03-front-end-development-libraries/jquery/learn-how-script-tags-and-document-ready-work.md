---
id: bad87fee1348bd9acdd08826
title: Funzionamento dei tag Script e di Document Ready
challengeType: 6
forumTopicId: 18224
dashedName: learn-how-script-tags-and-document-ready-work
---

# --description--

Ora siamo pronti ad apprendere jQuery, lo strumento JavaScript più popolare di tutti i tempi.

Prima di iniziare a usare jQuery, abbiamo bisogno di aggiungere alcune cose al nostro HTML.

Innanzitutto, aggiungi un elemento `script` nella parte superiore della pagina. Assicurati di chiuderlo sulla linea seguente.

Il tuo browser eseguirà qualsiasi codice JavaScript all'interno di un elemento `script`, incluso jQuery.

All'interno del tuo elemento `script` aggiungi questo codice: `$(document).ready(function() {`. Quindi chiudilo sulla riga seguente (ancora all'interno del tuo elemento `script`) con: `});`

Impareremo di più sulle `functions` (funzioni) successivamente. La cosa importante da sapere è che il codice che hai inserito all'interno di questa `function` verrà eseguito non appena il tuo browser avrà caricato la pagina.

Questo è importante perché senza la `document ready function`, il tuo codice potrebbe essere eseguito prima che il l'HTML venga presentato, causando dei bug.

# --hints--

Dovresti creare un elemento `script` assicurandoti che sia valido e abbia un tag di chiusura.

```js
assert(
  code.match(/<\/script\s*>/g) &&
    code.match(
      /<script(\sasync|\sdefer)*(\s(charset|src|type)\s*=\s*["\"]+[^"\"]*["\"]+)*(\sasync|\sdefer)*\s*>/g
    ) &&
    code.match(/<\/script\s*>/g).length ===
      code.match(
        /<script(\sasync|\sdefer)*(\s(charset|src|type)\s*=\s*["\"]+[^"\"]*["\"]+)*(\sasync|\sdefer)*\s*>/g
      ).length
);
```

Dovresti aggiungere `$(document).ready(function() {` all'inizio del tuo elemento `script`.

```js
assert(
  code.match(
    /\$\s*?\(\s*?document\s*?\)\.ready\s*?\(\s*?function\s*?\(\s*?\)\s*?\{/g
  )
);
```

Dovresti chiudere la tua funzione `$(document).ready(function() {` con `});`

```js
assert(code.match(/\n*?\s*?\}\s*?\);/g));
```

# --seed--

## --seed-contents--

```html
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
