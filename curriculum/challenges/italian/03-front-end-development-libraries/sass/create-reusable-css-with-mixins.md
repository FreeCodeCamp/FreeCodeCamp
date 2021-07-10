---
id: 587d7dbd367417b2b2512bb6
title: Creare CSS riutilizzabile con i mixin
challengeType: 0
forumTopicId: 301455
dashedName: create-reusable-css-with-mixins
---

# --description--

In Sass, un <dfn>mixin</dfn> è un gruppo di dichiarazioni CSS che possono essere riutilizzate in tutto il foglio di stile.

Ci vuole tempo prima che le nuove funzionalità di CSS siano completamente adottate e utilizzabili in tutti i browser. Poiché le funzionalità vengono inizialmente aggiunte ai singoli browser, le regole CSS che le utilizzano potrebbero avere bisogno di prefissi del fornitore. Considera `box-shadow`:

```scss
div {
  -webkit-box-shadow: 0px 0px 4px #fff;
  -moz-box-shadow: 0px 0px 4px #fff;
  -ms-box-shadow: 0px 0px 4px #fff;
  box-shadow: 0px 0px 4px #fff;
}
```

Ci sarebbe molto da digitare per riscrivere questa regola per tutti gli elementi che hanno una `box-shadow`, o per modificare ogni valore per testare effetti differenti. I mixin sono come funzioni per il CSS. Ecco come scriverne uno:

```scss
@mixin box-shadow($x, $y, $blur, $c){ 
  -webkit-box-shadow: $x $y $blur $c;
  -moz-box-shadow: $x $y $blur $c;
  -ms-box-shadow: $x $y $blur $c;
  box-shadow: $x $y $blur $c;
}
```

La definizione inizia con `@mixin` seguito da un nome personalizzato. I parametri ( `$x`, `$y`, `$blur`e `$c` nell'esempio sopra) sono opzionali. Ora ogni volta che è necessaria una regola `box-shadow`, invece di dover digitare tutti i prefissi dei venditori dovremo solo scrivere una singola linea che chiama il mixin. Un mixin è chiamato con la direttiva `@include`:

```scss
div {
  @include box-shadow(0px, 0px, 4px, #fff);
}
```

# --instructions--

Scrivi un mixin per `border-radius` e dagli un parametro `$radius`. Dovrebbe usare tutti i prefissi del fornitore dell'esempio. Quindi usa il mixin `border-radius` per dare all'elemento `#awesome` un raggio di curvatura di `15px`.

# --hints--

Il tuo codice dovrebbe dichiarare un mixin chiamato `border-radius` che ha un parametro denominato `$radius`.

```js
assert(code.match(/@mixin\s+?border-radius\s*?\(\s*?\$radius\s*?\)\s*?{/gi));
```

Il tuo codice dovrebbe includere il prefisso del fornitore `-webkit-border-radius` che utilizza il parametro `$radius`.

```js
assert(
  __helpers.removeWhiteSpace(code).match(/-webkit-border-radius:\$radius;/gi)
);
```

Il tuo codice dovrebbe includere il prefisso del fornitore `-moz-border-radius` che utilizza il parametro `$radius`.

```js
assert(
  __helpers.removeWhiteSpace(code).match(/-moz-border-radius:\$radius;/gi)
);
```

Il tuo codice dovrebbe includere il prefisso del fornitore `-ms-border-radius` che utilizza il parametro `$radius`.

```js
assert(__helpers.removeWhiteSpace(code).match(/-ms-border-radius:\$radius;/gi));
```

Il tuo codice dovrebbe includere la regola generale `border-radius` che utilizza il parametro `$radius`.

```js
assert(
  __helpers.removeWhiteSpace(code).match(/border-radius:\$radius;/gi).length ==
    4
);
```

Il tuo codice dovrebbe chiamare il `border-radius mixin` usando la parola chiave `@include`, con un raggio di `15px`.

```js
assert(code.match(/@include\s+?border-radius\(\s*?15px\s*?\)\s*;/gi));
```

# --seed--

## --seed-contents--

```html
<style type='text/scss'>



  #awesome {
    width: 150px;
    height: 150px;
    background-color: green;

  }
</style>

<div id="awesome"></div>
```

# --solutions--

```html
<style type='text/scss'>
  @mixin border-radius($radius) {
    -webkit-border-radius: $radius;
    -moz-border-radius: $radius;
    -ms-border-radius: $radius;
    border-radius: $radius;
  }

  #awesome {
    width: 150px;
    height: 150px;
    background-color: green;
    @include border-radius(15px);
  }
</style>

<div id="awesome"></div>
```
