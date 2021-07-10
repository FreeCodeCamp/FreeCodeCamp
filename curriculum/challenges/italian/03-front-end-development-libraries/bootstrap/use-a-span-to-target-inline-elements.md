---
id: bad87fee1348bd9aedf08845
title: Usare un intervallo per selezionare gli elementi in linea
challengeType: 0
forumTopicId: 18370
dashedName: use-a-span-to-target-inline-elements
---

# --description--

È possibile utilizzare gli intervalli (span) per creare degli elementi in linea. Ricordi quando abbiamo usato la classe `btn-block` per fare in modo che il bottone riempisse l'intera riga?

<button class='btn' style='background-color: rgb(0, 100, 0);  color: rgb(255, 255, 255);'>bottone normale</button>

<button class='btn btn-block' style='background-color: rgb(0, 100, 0);  color: rgb(255, 255, 255);'>bottone btn-block</button>

Questo mostra la differenza tra un elemento "inline" e un elemento "block".

Utilizzando l'elemento inline `span`, puoi inserire diversi elementi sulla stessa linea, e anche stilizzare diverse parti della stessa linea in modo diverso.

Usando un elemento `span`, annida la parola `love` all'interno dell'elemento `p` che al momento ha il testo `Things cats love`. Quindi dai allo `span` la classe `text-danger` per rendere il testo rosso.

Ecco come faresti questo per l'elemento `p` che ha il testo `Top 3 things cats hate`:

```html
<p>Top 3 things cats <span class="text-danger">hate:</span></p>
```

# --hints--

Il tuo elemento `span` dovrebbe essere all'interno dell'elemento `p`.

```js
assert($('p span') && $('p span').length > 0);
```

Il tuo elemento `span` dovrebbe avere solo il testo `love`.

```js
assert(
  $('p span') &&
    $('p span').text().match(/love/i) &&
    !$('p span')
      .text()
      .match(/Things cats/i)
);
```

Il tuo elemento `span` dovrebbe essere di classe `text-danger`.

```js
assert($('span').hasClass('text-danger'));
```

Il tuo elemento `span` dovrebbe avere un tag di chiusura.

```js
assert(
  code.match(/<\/span>/g) &&
    code.match(/<span/g) &&
    code.match(/<\/span>/g).length === code.match(/<span/g).length
);
```

# --seed--

## --seed-contents--

```html
<link href="https://fonts.googleapis.com/css?family=Lobster" rel="stylesheet" type="text/css">
<style>

  h2 {
    font-family: Lobster, Monospace;
  }

  .thick-green-border {
    border-color: green;
    border-width: 10px;
    border-style: solid;
    border-radius: 50%;
  }

</style>

<div class="container-fluid">
  <h2 class="text-primary text-center">CatPhotoApp</h2>

  <a href="#"><img class="img-responsive thick-green-border" src="https://bit.ly/fcc-relaxing-cat" alt="A cute orange cat lying on its back."></a>

  <img src="https://bit.ly/fcc-running-cats" class="img-responsive" alt="Three kittens running towards the camera.">
  <div class="row">
    <div class="col-xs-4">
      <button class="btn btn-block btn-primary">Like</button>
    </div>
    <div class="col-xs-4">
      <button class="btn btn-block btn-info">Info</button>
    </div>
    <div class="col-xs-4">
      <button class="btn btn-block btn-danger">Delete</button>
    </div>
  </div>
  <p>Things cats love:</p>
  <ul>
    <li>cat nip</li>
    <li>laser pointers</li>
    <li>lasagna</li>
  </ul>
  <p>Top 3 things cats hate:</p>
  <ol>
    <li>flea treatment</li>
    <li>thunder</li>
    <li>other cats</li>
  </ol>
  <form action="https://freecatphotoapp.com/submit-cat-photo">
    <label><input type="radio" name="indoor-outdoor"> Indoor</label>
    <label><input type="radio" name="indoor-outdoor"> Outdoor</label>
    <label><input type="checkbox" name="personality"> Loving</label>
    <label><input type="checkbox" name="personality"> Lazy</label>
    <label><input type="checkbox" name="personality"> Crazy</label>
    <input type="text" placeholder="cat photo URL" required>
    <button type="submit">Submit</button>
  </form>
</div>
```

# --solutions--

```html
<link href="https://fonts.googleapis.com/css?family=Lobster" rel="stylesheet" type="text/css">
<style>

  h2 {
    font-family: Lobster, Monospace;
  }

  .thick-green-border {
    border-color: green;
    border-width: 10px;
    border-style: solid;
    border-radius: 50%;
  }

</style>

<div class="container-fluid">
  <h2 class="text-primary text-center">CatPhotoApp</h2>

  <a href="#"><img class="img-responsive thick-green-border" src="https://bit.ly/fcc-relaxing-cat" alt="A cute orange cat lying on its back."></a>

  <img src="https://bit.ly/fcc-running-cats" class="img-responsive" alt="Three kittens running towards the camera.">
  <div class="row">
    <div class="col-xs-4">
      <button class="btn btn-block btn-primary">Like</button>
    </div>
    <div class="col-xs-4">
      <button class="btn btn-block btn-info">Info</button>
    </div>
    <div class="col-xs-4">
      <button class="btn btn-block btn-danger">Delete</button>
    </div>
  </div>
  <p>Things cats <span class="text-danger">love</span>:</p>
  <ul>
    <li>cat nip</li>
    <li>laser pointers</li>
    <li>lasagna</li>
  </ul>
  <p>Top 3 things cats hate:</p>
  <ol>
    <li>flea treatment</li>
    <li>thunder</li>
    <li>other cats</li>
  </ol>
  <form action="https://freecatphotoapp.com/submit-cat-photo">
    <label><input type="radio" name="indoor-outdoor"> Indoor</label>
    <label><input type="radio" name="indoor-outdoor"> Outdoor</label>
    <label><input type="checkbox" name="personality"> Loving</label>
    <label><input type="checkbox" name="personality"> Lazy</label>
    <label><input type="checkbox" name="personality"> Crazy</label>
    <input type="text" placeholder="cat photo URL" required>
    <button type="submit">Submit</button>
  </form>
</div>
```
