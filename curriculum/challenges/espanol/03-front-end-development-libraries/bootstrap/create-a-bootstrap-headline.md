---
id: bad87fee1348bd9aec908846
title: Crear un encabezado de Bootstrap
challengeType: 0
forumTopicId: 16812
dashedName: create-a-bootstrap-headline
---

# --description--

Ahora construyamos algo desde cero para practicar nuestras habilidades de HTML, CSS y Bootstrap.

Construiremos una zona de juegos de jQuery, que pronto utilizaremos en nuestros desafíos de jQuery.

Para empezar, crea un elemento `h3`, con el texto `jQuery Playground`.

Colorea tu elemento `h3` con la clase `text-primary` y céntralo con la clase `text-center` de Bootstrap.

# --hints--

Debes agregar un elemento `h3` a tu página.

```js
assert($('h3') && $('h3').length > 0);
```

Tu elemento `h3` debe tener una etiqueta de cierre.

```js
assert(
  code.match(/<\/h3>/g) &&
    code.match(/<h3/g) &&
    code.match(/<\/h3>/g).length === code.match(/<h3/g).length
);
```

Tu elemento `h3` debe estar coloreado al aplicar la clase `text-primary`

```js
assert($('h3').hasClass('text-primary'));
```

Tu elemento `h3` debe estar centrado al aplicar la clase `text-center`

```js
assert($('h3').hasClass('text-center'));
```

Tu elemento `h3` debe tener el texto `jQuery Playground`.

```js
assert.isTrue(/jquery(\s)+playground/gi.test($('h3').text()));
```

# --seed--

## --seed-contents--

```html

```

# --solutions--

```html
<h3 class="text-primary text-center">jQuery Playground</h3>
```
