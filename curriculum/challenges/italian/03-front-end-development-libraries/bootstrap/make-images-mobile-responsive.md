---
id: bad87fee1348bd9acde08812
title: Rendi le immagini responsive sui dispositivi mobili
challengeType: 0
forumTopicId: 18232
dashedName: make-images-mobile-responsive
---

# --description--

Innanzitutto, aggiungi una nuova immagine sotto quella esistente. Imposta l'attributo `src` su `https://bit.ly/fcc-running-cats`.

Sarebbe bello se questa immagine potesse essere larga esattamente come lo schermo del nostro telefono.

Fortunatamente, con Bootstrap, tutto quello che dobbiamo fare è aggiungere la classe `img-responsive` alla tua immagine. Fai questo, e l'immagine dovrebbe adattarsi perfettamente alla larghezza della pagina.

# --hints--

Dovresti avere un totale di due immagini.

```js
assert($('img').length === 2);
```

La tua nuova immagine dovrebbe essere sotto la vecchia e avere la classe `img-responsive`.

```js
assert($('img:eq(1)').hasClass('img-responsive'));
```

La tua nuova immagine non dovrebbe avere la classe `smaller-image`.

```js
assert(!$('img:eq(1)').hasClass('smaller-image'));
```

La tua nuova immagine dovrebbe avere un `src` di `https://bit.ly/fcc-running-cats`.

```js
assert($('img:eq(1)').attr('src') === 'https://bit.ly/fcc-running-cats');
```

Il tuo nuovo elemento `img` dovrebbe avere una parentesi angolare di chiusura.

```js
assert(
  code.match(/<img/g) &&
    code.match(/<img[^<]*>/g).length === 2 &&
    code.match(/<img/g).length === 2
);
```

# --seed--

## --seed-contents--

```html
<link href="https://fonts.googleapis.com/css?family=Lobster" rel="stylesheet" type="text/css">
<style>
  .red-text {
    color: red;
  }

  h2 {
    font-family: Lobster, Monospace;
  }

  p {
    font-size: 16px;
    font-family: Monospace;
  }

  .thick-green-border {
    border-color: green;
    border-width: 10px;
    border-style: solid;
    border-radius: 50%;
  }

  .smaller-image {
    width: 100px;
  }
</style>

<div class="container-fluid">
  <h2 class="red-text">CatPhotoApp</h2>

  <p>Click here for <a href="#">cat photos</a>.</p>

  <a href="#"><img class="smaller-image thick-green-border" src="https://bit.ly/fcc-relaxing-cat" alt="A cute orange cat lying on its back."></a>

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
  .red-text {
    color: red;
  }

  h2 {
    font-family: Lobster, Monospace;
  }

  p {
    font-size: 16px;
    font-family: Monospace;
  }

  .thick-green-border {
    border-color: green;
    border-width: 10px;
    border-style: solid;
    border-radius: 50%;
  }

  .smaller-image {
    width: 100px;
  }
</style>

<div class="container-fluid">
  <h2 class="red-text">CatPhotoApp</h2>

  <p>Click here for <a href="#">cat photos</a>.</p>

  <a href="#"><img class="smaller-image thick-green-border" src="https://bit.ly/fcc-relaxing-cat" alt="A cute orange cat lying on its back."></a>
  <img src="https://bit.ly/fcc-running-cats" class="img-responsive">

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
