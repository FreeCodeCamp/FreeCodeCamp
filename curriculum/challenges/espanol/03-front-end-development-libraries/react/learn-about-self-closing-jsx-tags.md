---
id: 5a24c314108439a4d4036161
title: Aprende sobre las etiquetas JSX auto-cerradas
challengeType: 6
forumTopicId: 301396
dashedName: learn-about-self-closing-jsx-tags
---

# --description--

Hasta ahora, has visto cómo JSX difiere de HTML de una manera clave con el uso de `className` vs. `class` para definir clases HTML.

Otra forma importante en la que JSX difiere de HTML está en la idea de la etiqueta de auto-cierre.

En HTML, casi todas las etiquetas tienen una etiqueta de apertura y cierre: `<div></div>`; la etiqueta de cierre siempre tiene una barra inclinada antes del nombre de la etiqueta que está cerrando. Sin embargo, hay instancias especiales en HTML llamadas “etiquetas auto-cerradas”, o etiquetas que no requieren una etiqueta de apertura y cierre antes de que otra etiqueta pueda comenzar.

Por ejemplo, la etiqueta salto de línea puede escribirse como `<br>` o como `<br />`, pero nunca debería escribirse como `<br></br>`, ya que no contiene ningún contenido.

En JSX, las reglas son un poco diferentes. Cualquier elemento JSX se puede escribir con una etiqueta de auto-cierre, y cada elemento debe ser cerrado. La etiqueta de salto de línea, por ejemplo, siempre debe escribirse como `<br />` para ser un JSX válido que puede ser transpilado. Por otra parte, un `<div>` puede escribirse como `<div />` o `<div></div>`. La diferencia es que en la primera versión de sintaxis no hay forma de incluir nada en la `<div />`. Verás en desafíos posteriores que esta sintaxis es útil al renderizar componentes de React.

# --instructions--

Corrige los errores en el editor de código para que sea JSX válido y se transpile exitosamente. Asegúrate de no cambiar nada del contenido: sólo tienes que cerrar las etiquetas donde se necesite.

# --hints--

La constante `JSX` debe devolver un elemento `div`.

```js
assert.strictEqual(JSX.type, 'div');
```

El `div` debe contener una etiqueta `br`.

```js
assert(Enzyme.shallow(JSX).find('br').length === 1);
```

El `div` debe contener una etiqueta `hr`.

```js
assert(Enzyme.shallow(JSX).find('hr').length === 1);
```

# --seed--

## --after-user-code--

```jsx
ReactDOM.render(JSX, document.getElementById('root'))
```

## --seed-contents--

```jsx
const JSX = (
  <div>
    <h2>Welcome to React!</h2> <br >
    <p>Be sure to close all tags!</p>
    <hr >
  </div>
);
```

# --solutions--

```jsx
const JSX = (
<div>
  <h2>Welcome to React!</h2> <br />
  <p>Be sure to close all tags!</p>
  <hr />
</div>
);
```
