---
id: 587d7dbf367417b2b2512bba
title: Usare @each per iterare sugli elementi in una lista
challengeType: 0
forumTopicId: 301461
dashedName: use-each-to-map-over-items-in-a-list
---

# --description--

L'ultima sfida ha mostrato come la direttiva `@for` utilizzi un valore iniziale e finale per ripetere un ciclo per un determinato numero di volte. Sass offre anche la direttiva `@each` che ripete il ciclo per ogni elemento in una lista o mappa. Ad ogni iterazione, la variabile viene assegnata al valore corrente preso dalla lista o dalla mappa.

```scss
@each $color in blue, red, green {
  .#{$color}-text {color: $color;}
}
```

Una mappa ha una sintassi leggermente diversa. Ecco un esempio:

```scss
$colors: (color1: blue, color2: red, color3: green);

@each $key, $color in $colors {
  .#{$color}-text {color: $color;}
}
```

Nota che la variabile `$key` è necessaria per fare riferimento alle chiavi nella mappa. Altrimenti, il CSS compilato avrebbe `color1`, `color2`... al suo interno. Entrambi gli esempi del codice qui sopra sono convertiti nel seguente CSS:

```scss
.blue-text {
  color: blue;
}

.red-text {
  color: red;
}

.green-text {
  color: green;
}
```

# --instructions--

Scrivi una direttiva `@each` che itera attraverso una lista: `blue, black, red` e assegna ogni variabile a una classe `.color-bg`, dove la parte `color` cambia per ogni elemento. Ogni classe dovrebbe impostare il `background-color` al rispettivo colore.

# --hints--

Il tuo codice dovrebbe utilizzare la direttiva `@each`.

```js
assert(code.match(/@each /g));
```

La tua classe `.blue-bg` dovrebbe avere un `background-color` blu.

```js
assert($('.blue-bg').css('background-color') == 'rgb(0, 0, 255)');
```

La classe `.black-bg` dovrebbe avere un `background-color` nero.

```js
assert($('.black-bg').css('background-color') == 'rgb(0, 0, 0)');
```

La classe `.red-bg` dovrebbe avere un `background-color` rosso.

```js
assert($('.red-bg').css('background-color') == 'rgb(255, 0, 0)');
```

# --seed--

## --seed-contents--

```html
<style type='text/scss'>



  div {
    height: 200px;
    width: 200px;
  }
</style>

<div class="blue-bg"></div>
<div class="black-bg"></div>
<div class="red-bg"></div>
```

# --solutions--

```html
<style type='text/scss'>

  @each $color in blue, black, red {
    .#{$color}-bg {background-color: $color;}
  }

  div {
    height: 200px;
    width: 200px;
  }
</style>

<div class="blue-bg"></div>
<div class="black-bg"></div>
<div class="red-bg"></div>
```

---

```html
<style type='text/scss'>

  $colors: (color1: blue, color2: black, color3: red);

  @each $key, $color in $colors {
    .#{$color}-bg {background-color: $color;}
  }

  div {
    height: 200px;
    width: 200px;
  }
</style>

<div class="blue-bg"></div>
<div class="black-bg"></div>
<div class="red-bg"></div>
```
