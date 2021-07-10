---
id: 587d7dbe367417b2b2512bb8
title: Usare @if e @else per aggiungere logica ai tuoi stili
challengeType: 0
forumTopicId: 301463
dashedName: use-if-and-else-to-add-logic-to-your-styles
---

# --description--

La direttiva `@if` in Sass è utile per valutare un caso specifico - funziona come l'istruzione `if` in JavaScript.

```scss
@mixin make-bold($bool) {
  @if $bool == true {
    font-weight: bold;
  }
}
```

E proprio come in JavaScript, `@else if` e `@else` valutano ulteriori condizioni:

```scss
@mixin text-effect($val) {
  @if $val == danger {
    color: red;
  }
  @else if $val == alert {
    color: yellow;
  }
  @else if $val == success {
    color: green;
  }
  @else {
    color: black;
  }
}
```

# --instructions--

Crea un mixin chiamato `border-stroke` che prende un parametro `$val`. Il mixin dovrebbe controllare le seguenti condizioni usando `@if`, `@else if`e `@else`:

```scss
light - 1px solid black
medium - 3px solid black
heavy - 6px solid black
```

Se `$val` non è `light`, `medium`, o `heavy`, il bordo dovrebbe essere impostato a `none`.

# --hints--

Il tuo codice dovrebbe dichiarare un mixin chiamato `border-stroke` che ha un parametro chiamato `$val`.

```js
assert(code.match(/@mixin\s+?border-stroke\s*?\(\s*?\$val\s*?\)\s*?{/gi));
```

Il tuo mixin dovrebbe avere un'istruzione `@if` per controllare se `$val` è `light`, e per impostare il `border` a `1px solid black`.

```js
assert(
  code.match(
    /@if\s+?\$val\s*?===?\s*?light\s*?{\s*?border\s*?:\s*?1px\s+?solid\s+?black\s*?;\s*?}/gi
  )
);
```

Il tuo mixin dovrebbe avere un'istruzione `@else if` per controllare se `$val` è `medium`, e per impostare il `border` a `3px solid black`.

```js
assert(
  code.match(
    /@else\s+?if\s+?\$val\s*?===?\s*?medium\s*?{\s*?border\s*?:\s*?3px\s+?solid\s+?black\s*?;\s*?}/gi
  )
);
```

Il tuo mixin dovrebbe avere un'istruzione `@else if` per controllare se `$val` è `heavy`, e per impostare il `border` a `6px solid black`.

```js
assert(
  code.match(
    /@else\s+?if\s+?\$val\s*?===?\s*?heavy\s*?{\s*?border\s*?:\s*?6px\s+?solid\s+?black\s*?;\s*?}/gi
  )
);
```

Il mixin dovrebbe avere un'istruzione `@else` per impostare il `border` a `none`.

```js
assert(code.match(/@else\s*?{\s*?border\s*?:\s*?none\s*?;\s*?}/gi));
```

# --seed--

## --seed-contents--

```html
<style type='text/scss'>



  #box {
    width: 150px;
    height: 150px;
    background-color: red;
    @include border-stroke(medium);
  }
</style>

<div id="box"></div>
```

# --solutions--

```html
<style type='text/scss'>
  @mixin border-stroke($val) {
    @if $val == light {
      border: 1px solid black;
    }
    @else if $val == medium {
      border: 3px solid black;
    }
    @else if $val == heavy {
      border: 6px solid black;
    }
    @else {
      border: none;
    }
  }


  #box {
    width: 150px;
    height: 150px;
    background-color: red;
    @include border-stroke(medium);
  }
</style>

<div id="box"></div>
```
