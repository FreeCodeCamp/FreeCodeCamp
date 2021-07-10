---
id: 564944c91be2204b269d51e3
title: Cambiare il testo di un elemento usando jQuery
challengeType: 6
forumTopicId: 16773
dashedName: change-text-inside-an-element-using-jquery
---

# --description--

Utilizzando jQuery, è possibile modificare il testo tra i tag di inizio e fine di un elemento. Puoi anche cambiare il markup HTML.

jQuery ha una funzione chiamata `.html()` che consente di aggiungere tag HTML e testo all'interno di un elemento. Qualsiasi contenuto esistente in precedenza all'interno dell'elemento verrà completamente sostituito con il contenuto fornito utilizzando questa funzione.

Ecco come riscrivere e sottolineare il testo della nostra intestazione:

```js
$("h3").html("<em>jQuery Playground</em>");
```

jQuery ha anche una funzione simile chiamata `.text()` che modifica solo il testo senza aggiungere tag. In altre parole, questa funzione non valuterà alcun tag HTML che le sarà passato, ma lo tratterà invece come il testo con cui desideri sostituire il contenuto esistente.

Cambia il pulsante con id `target4` enfatizzando il suo testo.

[Vedi il nostro articolo delle news su &lt;em>](https://www.freecodecamp.org/news/html-elements-explained-what-are-html-tags/#em-element) per comprendere la differenza tra `<i>` e `<em>` e quando usarli.

Nota che il tag `<i>` era tradizionalmente utilizzato per mettere in corsivo il testo, ma oggi è usato come tag per le icone. Il tag `<em>` è ora ampiamente accettato come tag per l'enfasi. Entrambi funzioneranno per questa sfida.

# --hints--

Dovresti enfatizzare il testo nel tuo pulsante `target4` aggiungendo dei tag HTML.

```js
assert.isTrue(
  /<em>|<i>\s*#target4\s*<\/em>|<\/i>/gi.test($('#target4').html())
);
```

Il testo dovrebbe rimanere invariato.

```js
assert($('#target4') && $('#target4').text().trim() === '#target4');
```

Non dovresti modificare nessun altro testo.

```js
assert.isFalse(/<em>|<i>/gi.test($('h3').html()));
```

Dovresti usare `.html()` e non `.text()`.

```js
assert(code.match(/\.html\(/g));
```

Dovresti selezionare `button id="target4"` con jQuery.

```js
assert(code.match(/\$\(\s*?(\"|\')#target4(\"|\')\s*?\)\.html\(/));
```

# --seed--

## --seed-contents--

```html
<script>
  $(document).ready(function() {
    $("#target1").css("color", "red");

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
    $("#target4").html('<em>#target4</em>');
  });
</script>

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
