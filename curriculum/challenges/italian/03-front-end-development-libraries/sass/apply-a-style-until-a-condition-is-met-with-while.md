---
id: 587d7dbf367417b2b2512bbb
title: Applicare uno stile finché una condizione è soddisfatta con @while
challengeType: 0
forumTopicId: 301454
dashedName: apply-a-style-until-a-condition-is-met-with-while
---

# --description--

La direttiva `@while` è un'opzione con funzionalità simili al ciclo `while` di JavaScript. Essa crea delle regole CSS finché una condizione è soddisfatta.

La sfida `@for` ha mostrato un esempio che creava un semplice sistema di griglia. Questo si può fare anche con `@while`.

```scss
$x: 1;
@while $x < 13 {
  .col-#{$x} { width: 100%/12 * $x;}
  $x: $x + 1;
}
```

Innanzitutto, definisci una variabile `$x` e impostala a 1. Successivamente, utilizzare la direttiva `@while` per creare il sistema di griglia finché (*while*) `$x` è minore di 13. Dopo aver impostato la regola CSS per `width`, `$x` viene incrementata di 1 per evitare un ciclo infinito.

# --instructions--

Usa `@while` per creare una serie di classi con diversi `font-sizes` (dimensioni dei caratteri).

Ci dovrebbero essere 5 classi diverse da `text-1` a `text-5`. Quindi imposta `font-size` a `15px` moltiplicato per il numero index corrente. Assicurati di evitare un ciclo infinito!

# --hints--

Il tuo codice dovrebbe utilizzare la direttiva `@while`.

```js
assert(code.match(/@while /g));
```

Il tuo codice dovrebbe usare una variabile index che inizia da un indice di 1.

```js
assert(code.match(/\$.*:\s*?1;/gi));
```

Il tuo codice dovrebbe incrementare la variabile del contatore.

```js
assert(code.match(/\$(.*)\s*?:\s*\$\1\s*\+\s*1\s*;/gi));
```

La tua classe `.text-1` dovrebbe avere un `font-size` di `15px`.

```js
assert($('.text-1').css('font-size') == '15px');
```

La tua classe `.text-2` dovrebbe avere un `font-size` di `30px`.

```js
assert($('.text-2').css('font-size') == '30px');
```

La tua classe `.text-3` dovrebbe avere un `font-size` di `45px`.

```js
assert($('.text-3').css('font-size') == '45px');
```

La tua classe `.text-4` dovrebbe avere un `font-size` di `60px`.

```js
assert($('.text-4').css('font-size') == '60px');
```

La tua classe `.text-5` dovrebbe avere un `font-size` di `75px`.

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
  $x: 1;
  @while $x < 6 {
    .text-#{$x}{
      font-size: 15px * $x;
    }
    $x: $x + 1;
  }
</style>

<p class="text-1">Hello</p>
<p class="text-2">Hello</p>
<p class="text-3">Hello</p>
<p class="text-4">Hello</p>
<p class="text-5">Hello</p>
```
