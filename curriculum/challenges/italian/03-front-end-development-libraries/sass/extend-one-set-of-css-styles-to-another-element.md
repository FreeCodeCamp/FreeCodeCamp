---
id: 587d7fa5367417b2b2512bbd
title: Estendere un gruppo di stili CSS ad un altro elemento
challengeType: 0
forumTopicId: 301456
dashedName: extend-one-set-of-css-styles-to-another-element
---

# --description--

Sass ha una caratteristica chiamata `extend` che rende facile prendere in prestito le regole CSS da un elemento e partire da esse in un altro.

Per esempio, il seguente blocco di regole CSS stilizza una classe `.panel`. Esso specifica un `background-color`, un'`height` e un `border`.

```scss
.panel{
  background-color: red;
  height: 70px;
  border: 2px solid green;
}
```

Supponi ora di volere un altro pannello chiamato `.big-panel`. Ha le stesse proprietà di base di `.panel`, ma ha anche bisogno di `width` e `font-size`. È possibile copiare e incollare le regole CSS iniziali da `.panel`, ma il codice diventa ripetitivo mano a mano che si aggiungono altri tipi di pannelli. La direttiva `extend` è un modo semplice per riutilizzare le regole scritte per un elemento, aggiungendone alcune per un altro:

```scss
.big-panel{
  @extend .panel;
  width: 150px;
  font-size: 2em;
}
```

Il `.big-panel` avrà le stesse proprietà di `.panel` in aggiunta ai nuovi stili.

# --instructions--

Crea una classe `.info-important` che estende `.info` e ha anche un `background-color` impostato su magenta.

# --hints--

La tua classe `info-important` dovrebbe avere un `background-color` impostato su `magenta`.

```js
assert(
  code.match(
    /\.info-important\s*?{[\s\S]*background-color\s*?:\s*?magenta\s*?;[\s\S]*}/gi
  )
);
```

La tua classe `info-important` dovrebbe usare `@extend` per ereditare gli stili dalla classe `info`.

```js
assert(
  code.match(/\.info-important\s*?{[\s\S]*@extend\s*?.info\s*?;[\s\S]*/gi)
);
```

# --seed--

## --seed-contents--

```html
<style type='text/scss'>
  h3{
    text-align: center;
  }
  .info{
    width: 200px;
    border: 1px solid black;
    margin: 0 auto;
  }




</style>
<h3>Posts</h3>
<div class="info-important">
  <p>This is an important post. It should extend the class ".info" and have its own CSS styles.</p>
</div>

<div class="info">
  <p>This is a simple post. It has basic styling and can be extended for other uses.</p>
</div>
```

# --solutions--

```html
<style type='text/scss'>
  h3{
    text-align: center;
  }
  .info{
    width: 200px;
    border: 1px solid black;
    margin: 0 auto;
  }
  .info-important{
    @extend .info;
    background-color: magenta;
  }



</style>
<h3>Posts</h3>
<div class="info-important">
  <p>This is an important post. It should extend the class ".info" and have its own CSS styles.</p>
</div>

<div class="info">
  <p>This is a simple post. It has basic styling and can be extended for other uses.</p>
</div>
```
