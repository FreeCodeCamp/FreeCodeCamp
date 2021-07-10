---
id: bad87fee1348bd9aec908746
title: Aloja nuestra página dentro de un container-fluid de Bootstrap div
challengeType: 0
forumTopicId: 18198
dashedName: house-our-page-within-a-bootstrap-container-fluid-div
---

# --description--

Ahora asegurémonos de que todo el contenido de tu página sea compatible con dispositivos móviles.

Anidemos tu elemento `h3` dentro de un elemento `div` con la clase `container-fluid`.

# --hints--

Tu elemento `div` debe tener la clase `container-fluid`.

```js
assert($('div').hasClass('container-fluid'));
```

Cada uno de tus elementos `div` deben tener etiquetas de cierre.

```js
assert(
  code.match(/<\/div>/g) &&
    code.match(/<div/g) &&
    code.match(/<\/div>/g).length === code.match(/<div/g).length
);
```

Tu elemento `h3` debe estar anidado dentro de un elemento `div`.

```js
assert($('div').children('h3').length > 0);
```

# --seed--

## --seed-contents--

```html
<h3 class="text-primary text-center">jQuery Playground</h3>
```

# --solutions--

```html
<div class="container-fluid">
    <h3 class="text-primary text-center">jQuery Playground</h3>
</div>
```
