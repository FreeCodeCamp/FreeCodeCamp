---
id: 587d781d367417b2b2512ac8
title: Ajusta el hover de una etiqueta anchor
challengeType: 0
videoUrl: 'https://scrimba.com/c/cakRGcm'
forumTopicId: 301035
dashedName: adjust-the-hover-state-of-an-anchor-tag
---

# --description--

Este desafío mostrará el uso de las pseudo-clases. Una pseudo-clase es una palabra clave que se puede agregar a los selectores para seleccionar un estado específico de un elemento.

Por ejemplo, el estilo de una etiqueta "anchor" puede ser cambiado por el estado de su hover utilizando el selector de pseudo-clase `:hover`. Aquí está el CSS para cambiar el color `color` de la etiqueta de "anchor" a rojo durante el estado hover:

```css
a:hover {
  color: red;
}
```

# --instructions--

El editor de código tiene una regla CSS para dar estilo a todas las etiquetas `a`  en negro. Añade una regla para que cuando el usuario pase sobre la etiqueta `a`, el color `` sea azul.

# --hints--

La etiqueta anchor `color` debe permanecer en negro, solo añade reglas CSS para el estado `:hover`.

```js
assert($('a').css('color') == 'rgb(0, 0, 0)');
```

La etiqueta "anchor" debe tener un `color` al pasar el ratón.

```js
assert(
  code.match(
    /a:hover\s*?{\s*?color:\s*?(blue|rgba\(\s*?0\s*?,\s*?0\s*?,\s*?255\s*?,\s*?1\s*?\)|#00F|rgb\(\s*?0\s*?,\s*?0\s*?,\s*?255\s*?\))\s*?;\s*?}/gi
  )
);
```

# --seed--

## --seed-contents--

```html
<style>
  a {
    color: #000;
  }



</style>
<a href="https://freecatphotoapp.com/" target="_blank">CatPhotoApp</a>
```

# --solutions--

```html
<style>
  a {
    color: #000;
  }
  a:hover {
    color: rgba(0,0,255,1);
  }
</style>
<a href="https://freecatphotoapp.com/" target="_blank">CatPhotoApp</a>
```
