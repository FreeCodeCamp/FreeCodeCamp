---
id: 587d7dbe367417b2b2512bb9
title: Usare @for per creare un ciclo in Sass
challengeType: 0
forumTopicId: 301462
dashedName: use-for-to-create-a-sass-loop
---

# --description--

La direttiva `@for` aggiunge stili in un ciclo, in modo molto simile a un ciclo `for` di JavaScript.

`@for` è usato in due modi: "start through end" o "start to end". La differenza principale è che "start **to** end" *esclude* il numero finale dal conteggio, mentre "start **through** end" *include* il numero finale nel conteggio.

Ecco un esempio di start **through** end:

```scss
@for $i from 1 through 12 {
  .col-#{$i} { width: 100%/12 * $i; }
}
```

La parte `#{$i}` è la sintassi che combina una variabile (`i`) con il testo per formare una stringa. Quando il file Sass viene convertito in CSS, appare così:

```scss
.col-1 {
  width: 8.33333%;
}

.col-2 {
  width: 16.66667%;
}

...

.col-12 {
  width: 100%;
}
```

Questo è un modo potente per creare un layout griglia. Ora hai dodici opzioni per le larghezze delle colonne disponibili come classi CSS.

# --instructions--

Scrivi una direttiva `@for` che usa una variabile `$j` che va da 1 **a** 6.

Dovrebbe creare 5 classi chiamate da `.text-1` a `.text-5` dove ognuna ha una `font-size` impostata a 15px moltiplicata per l'indice.

# --hints--

Il tuo codice dovrebbe utilizzare la direttiva `@for`.

```js
assert(code.match(/@for /g));
```

La tua classe `.text-1` dovrebbe avere un `font-size` di 15px.

```js
assert($('.text-1').css('font-size') == '15px');
```

La tua classe `.text-2` dovrebbe avere un `font-size` di 30px.

```js
assert($('.text-2').css('font-size') == '30px');
```

La tua classe `.text-3` dovrebbe avere un `font-size` di 45px.

```js
assert($('.text-3').css('font-size') == '45px');
```

La tua classe `.text-4` dovrebbe avere un `font-size` di 60px.

```js
assert($('.text-4').css('font-size') == '60px');
```

La tua classe `.text-5` dovrebbe avere un `font-size` di 75px.

```js
assert($('.text-5').css('font-size') == '75px');
```

# --seed--

## --seed-contents--

```html
<style type='text/scss'>



</style>

<p class="text-1">Hello</p>
<p class="text-2">Hello</p>
<p class="text-3">Hello</p>
<p class="text-4">Hello</p>
<p class="text-5">Hello</p>
```

# --solutions--

```html
<style type='text/scss'>

@for $i from 1 through 5 {
  .text-#{$i} { font-size: 15px * $i; }
}

</style>

<p class="text-1">Hello</p>
<p class="text-2">Hello</p>
<p class="text-3">Hello</p>
<p class="text-4">Hello</p>
<p class="text-5">Hello</p>
```

---

```html
<style type='text/scss'>

@for $i from 1 to 6 {
  .text-#{$i} { font-size: 15px * $i; }
}

</style>

<p class="text-1">Hello</p>
<p class="text-2">Hello</p>
<p class="text-3">Hello</p>
<p class="text-4">Hello</p>
<p class="text-5">Hello</p>
```
