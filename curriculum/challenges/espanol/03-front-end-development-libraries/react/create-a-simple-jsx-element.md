---
id: 587d7dbc367417b2b2512bb1
title: Crea un elemento JSX simple
challengeType: 6
forumTopicId: 301390
dashedName: create-a-simple-jsx-element
---

# --description--

React es una librería de vistas de código abierto creada y mantenida por Facebook. Es una gran herramienta para hacer la interfaz de usuario (UI) de aplicaciones web modernas.

React usa una extensión de sintaxis de JavaScript llamada JSX que te permite escribir HTML directamente dentro de JavaScript. Esto tiene muchos beneficios. Te permite utilizar el poder programático completo de JavaScript dentro de HTML, y ayuda a mantener tu código legible. En su mayor parte, JSX es similar al HTML que ya has aprendido. Sin embargo, hay algunas diferencias clave que se abordarán a lo largo de estos desafíos.

Por ejemplo, dado que JSX es una extensión sintáctica de JavaScript, se puede escribir JavaScript directamente dentro de JSX. Para hacer esto, simplemente incluye el código que deseas que sea tratado como JavaScript entre llaves: `{ 'this is treated as JavaScript code' }`. Ten esto en cuenta, ya que se utiliza en varios desafíos futuros.

Sin embargo, debido a que JSX no es JavaScript válido, el código JSX debe ser compilado en JavaScript. El transpilador Babel es una herramienta muy popular para este proceso. Para tu comodidad, ya se ha añadido tras bambalinas para estos desafíos. Si escribes JSX no válido sintácticamente, verás que la primera prueba de estos desafíos falla.

Vale la pena señalar que por debajo los desafíos están llamando `ReactDOM.render(JSX, document.getElementById('root'))`. Esta llamada de función es la que coloca tu JSX en la representación ligera del DOM de React. React entonces utiliza capturas instantáneas de su propio DOM para optimizar actualizando sólo partes específicas del DOM.

# --instructions--

El código actual utiliza JSX para asignar un elemento `div` a la constante `JSX`. Reemplaza el `div` por un elemento `h1` y añade el texto `Hello JSX!` dentro de él.

# --hints--

La constante `JSX` debe devolver un elemento `h1`.

```js
assert(JSX.type === 'h1');
```

La etiqueta `h1` debe incluir el texto `Hello JSX!`

```js
assert(Enzyme.shallow(JSX).contains('Hello JSX!'));
```

# --seed--

## --after-user-code--

```jsx
ReactDOM.render(JSX, document.getElementById('root'))
```

## --seed-contents--

```jsx
const JSX = <div></div>;
```

# --solutions--

```jsx
const JSX = <h1>Hello JSX!</h1>;
```
