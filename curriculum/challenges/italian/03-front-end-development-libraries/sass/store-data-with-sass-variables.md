---
id: 587d7dbd367417b2b2512bb4
title: Memorizzare dati con le variabili Sass
challengeType: 0
forumTopicId: 301460
dashedName: store-data-with-sass-variables
---

# --description--

Una caratteristica di Sass che è diversa da CSS è che utilizza le variabili. Esse sono dichiarate e impostate per memorizzare i dati, come in JavaScript.

In JavaScript, le variabili sono definite utilizzando le parole chiave `let` e `const`. In Sass, le variabili iniziano con un `$` seguito dal nome della variabile.

Ecco alcuni esempi:

```scss
$main-fonts: Arial, sans-serif;
$headings-color: green;
```

E per usare le variabili:

```scss
h1 {
  font-family: $main-fonts;
  color: $headings-color;
}
```

Un esempio in cui le variabili sono utili è quando un certo numero di elementi deve avere lo stesso colore. Se quel colore viene cambiato, l'unico punto da modificare nel codice è il valore della variabile.

# --instructions--

Crea una variabile `$text-color` e impostala su `red`. Quindi cambiare il valore della proprietà `color` per il `.blog-post` e per `h2` impostandoli alla variabile `$text-color`.

# --hints--

Il tuo codice dovrebbe avere una variabile Sass dichiarata per `$text-color` con un valore di `red`.

```js
assert(code.match(/\$text-color\s*:\s*?red\s*;/g));
```

Il tuo codice dovrebbe utilizzare la variabile `$text-color` per cambiare il `color` per gli elementi `.blog-post` e `h2`.

```js
assert(code.match(/color\s*:\s*\$text-color\s*;?/g));
```

Il tuo elemento `.blog-post` dovrebbe avere un `color` rosso.

```js
assert($('.blog-post').css('color') == 'rgb(255, 0, 0)');
```

I tuoi elementi `h2` dovrebbero avere un `color` rosso.

```js
assert($('h2').css('color') == 'rgb(255, 0, 0)');
```

# --seed--

## --seed-contents--

```html
<style type='text/scss'>


  .header{
    text-align: center;
  }
  .blog-post, h2 {
    color: red;
  }
</style>

<h1 class="header">Learn Sass</h1>
<div class="blog-post">
  <h2>Some random title</h2>
  <p>This is a paragraph with some random text in it</p>
</div>
<div class="blog-post">
  <h2>Header #2</h2>
  <p>Here is some more random text.</p>
</div>
<div class="blog-post">
  <h2>Here is another header</h2>
  <p>Even more random text within a paragraph</p>
</div>
```

# --solutions--

```html
<style type='text/scss'>
  $text-color: red;

  .header{
    text-align: center;
  }
  .blog-post, h2 {
    color: $text-color;
  }
</style>

<h1 class="header">Learn Sass</h1>
<div class="blog-post">
  <h2>Some random title</h2>
  <p>This is a paragraph with some random text in it</p>
</div>
<div class="blog-post">
  <h2>Header #2</h2>
  <p>Here is some more random text.</p>
</div>
<div class="blog-post">
  <h2>Here is another header</h2>
  <p>Even more random text within a paragraph</p>
</div>
```
