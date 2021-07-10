---
id: 5a24bbe0dba28a8d3cbd4c5f
title: Renderiza elementos HTML al DOM
challengeType: 6
forumTopicId: 301406
dashedName: render-html-elements-to-the-dom
---

# --description--

Hasta ahora, has aprendido que JSX es una herramienta conveniente para escribir HTML legible dentro de JavaScript. Con React, podemos renderizar este JSX directamente al DOM HTML usando la API de renderizado de React conocida como ReactDOM.

ReactDOM ofrece un método simple para renderizar elementos React al DOM que se ve así: `ReactDOM.render(componentToRender, targetNode)`, donde el primer argumento es el elemento o componente React que deseas renderizar, y el segundo argumento es el nodo DOM al que se quiere renderizar el componente.

Como era de esperarse, `ReactDOM.render()` debe llamarse después de las declaraciones de los elementos JSX, al igual que hay que declarar las variables antes de usarlas.

# --instructions--

El editor de código tiene un componente JSX simple. Usa el método `ReactDOM.render()` para renderizar este componente a la página. Puedes pasar elementos JSX definidos directamente como el primer argumento y utilizar `document.getElementById()` para seleccionar el nodo DOM al que renderizar. Hay un `div` con `id='challenge-node'` disponible para que lo uses. Asegúrate de no cambiar la constante `JSX`.

# --hints--

La constante `JSX` debe devolver un elemento `div`.

```js
assert(JSX.type === 'div');
```

El `div` debe contener una etiqueta `h1` como primer elemento.

```js
assert(JSX.props.children[0].type === 'h1');
```

El elemento `div` debe contener una etiqueta `p` como segundo elemento.

```js
assert(JSX.props.children[1].type === 'p');
```

El elemento JSX proporcionado debe renderizarse al nodo DOM con id `challenge-node`.

```js
assert(
  document.getElementById('challenge-node').childNodes[0].innerHTML ===
    '<h1>Hello World</h1><p>Lets render this to the DOM</p>'
);
```

# --seed--

## --seed-contents--

```jsx
const JSX = (
  <div>
    <h1>Hello World</h1>
    <p>Lets render this to the DOM</p>
  </div>
);
// Change code below this line
```

# --solutions--

```jsx
const JSX = (
<div>
  <h1>Hello World</h1>
  <p>Lets render this to the DOM</p>
</div>
);
// Change code below this line
ReactDOM.render(JSX, document.getElementById('challenge-node'));
```
