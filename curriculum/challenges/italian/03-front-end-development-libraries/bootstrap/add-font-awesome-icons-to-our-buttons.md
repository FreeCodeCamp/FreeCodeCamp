---
id: bad87fee1348bd9aedd08845
title: Aggiungere le icone Font Awesome ai bottoni
challengeType: 0
forumTopicId: 16638
required:
  - 
    link: 'https://use.fontawesome.com/releases/v5.8.1/css/all.css'
    raw: true
dashedName: add-font-awesome-icons-to-our-buttons
---

# --description--

Font Awesome è una comoda libreria di icone. Queste icone possono essere font web o grafica vettoriale. Queste icone sono trattate proprio come i caratteri. Puoi specificare la loro dimensione usando i pixel, e assumeranno la dimensione del carattere degli elementi HTML genitori.

Puoi includere Font Awesome in qualsiasi app aggiungendo il seguente codice alla parte superiore del tuo HTML:

```html
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous">
```

In questo caso, lo abbiamo già aggiunto per te a questa pagina dietro le quinte.

L'elemento `i` era originariamente utilizzato per rendere corsivi altri elementi, ma ora è comunemente usato per le icone. Puoi aggiungere le classi Font Awesome all'elemento `i` per trasformarlo in un'icona, ad esempio:

```html
<i class="fas fa-info-circle"></i>
```

Nota che anche l'elemento `span` è accettabile per l'uso con le icone.

# --instructions--

Usa Font Awesome per aggiungere un'icona `thumbs-up` al tuo pulsante like inserendo un elemento `i` con le classi `fas` e `fa-thumbs-up`. Assicurati di mantenere il testo `Like` accanto all'icona.

# --hints--

Dovresti aggiungere un elemento `i` con le classi `fas` e `fa-thumbs-up`.

```js
assert($('i').is('.fas.fa-thumbs-up') || $('span').is('.fas.fa-thumbs-up'));
```

L'icona `fa-thumbs-up` dovrebbe essere posizionata all'interno del pulsante Like.

```js
assert(
  ($('i.fa-thumbs-up').parent().text().match(/Like/gi) &&
    $('.btn-primary > i').is('.fas.fa-thumbs-up')) ||
    ($('span.fa-thumbs-up').parent().text().match(/Like/gi) &&
      $('.btn-primary > span').is('.fas.fa-thumbs-up'))
);
```

Il tuo elemento `i` dovrebbe essere annidato all'interno dell'elemento `button`.

```js
assert(
  $('button').children('i').length > 0 ||
    $('button').children('span').length > 0
);
```

Il tuo elemento icon dovrebbe avere un tag di chiusura.

```js
assert(code.match(/<\/i>|<\/span>/g));
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
  <div class="row">
    <div class="col-xs-8">
      <h2 class="text-primary text-center">CatPhotoApp</h2>
    </div>
    <div class="col-xs-4">
      <a href="#"><img class="img-responsive thick-green-border" src="https://bit.ly/fcc-relaxing-cat" alt="A cute orange cat lying on its back."></a>
    </div>
  </div>
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
  <p>Things cats <span class="text-danger">love:</span></p>
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
  <div class="row">
    <div class="col-xs-8">
      <h2 class="text-primary text-center">CatPhotoApp</h2>
    </div>
    <div class="col-xs-4">
      <a href="#"><img class="img-responsive thick-green-border" src="https://bit.ly/fcc-relaxing-cat" alt="A cute orange cat lying on its back."></a>
    </div>
  </div>
  <img src="https://bit.ly/fcc-running-cats" class="img-responsive" alt="Three kittens running towards the camera.">
  <div class="row">
    <div class="col-xs-4">
      <button class="btn btn-block btn-primary"><i class="fas fa-thumbs-up"></i> Like</button>
    </div>
    <div class="col-xs-4">
      <button class="btn btn-block btn-info">Info</button>
    </div>
    <div class="col-xs-4">
      <button class="btn btn-block btn-danger">Delete</button>
    </div>
  </div>
  <p>Things cats <span class="text-danger">love:</span></p>
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
