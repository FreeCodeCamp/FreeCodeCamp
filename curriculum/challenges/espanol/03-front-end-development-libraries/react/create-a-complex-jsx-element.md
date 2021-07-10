---
id: 5a24bbe0dba28a8d3cbd4c5d
title: Crea un elemento JSX complejo
challengeType: 6
forumTopicId: 301382
dashedName: create-a-complex-jsx-element
---

# --description--

El último desafío fue un ejemplo sencillo de JSX, pero JSX también puede representar HTML más complejo.

Una cosa importante que debes saber sobre JSX anidado es que debe devolver un solo elemento.

Este elemento principal contendría a todos los demás niveles de elementos anidados.

Por ejemplo, varios elementos JSX escritos al mismo nivel sin elemento contenedor principal no se transpilarán.

Aquí va un ejemplo:

**JSX válido:**

```jsx
<div>
  <p>Paragraph One</p>
  <p>Paragraph Two</p>
  <p>Paragraph Three</p>
</div>
```

**JSX inválido:**

```jsx
<p>Paragraph One</p>
<p>Paragraph Two</p>
<p>Paragraph Three</p>
```

# --instructions--

Define una nueva constante `JSX` que renderice un `div` que contenga los siguientes elementos en orden:

Un `h1`, un `p` y una lista desordenada que contiene tres elementos `li`. Puedes incluir cualquier texto que desees dentro de cada elemento.

**Nota: **Al renderizar varios elementos de esta forma, puedes envolverlos todos entre paréntesis, pero no es estrictamente necesario. Observa también que este desafío usa una etiqueta `div` para envolver a todos los elementos hijos dentro de un solo elemento principal. Si eliminas el `div`, JSX ya no se podrá transpilar. Ten esto en cuenta, ya que también será así cuando devuelvas elementos JSX en los componentes de React.

# --hints--

La constante `JSX` debe devolver un elemento `div`.

```js
assert(JSX.type === 'div');
```

El `div` debe contener una etiqueta `h1` como primer elemento.

```js
assert(JSX.props.children[0].type === 'h1');
```

El `div` debe contener una etiqueta `p` como segundo elemento.

```js
assert(JSX.props.children[1].type === 'p');
```

El `div` debe contener una etiqueta `ul` como tercer elemento.

```js
assert(JSX.props.children[2].type === 'ul');
```

El `ul` debe contener tres elementos `li`.

```js
assert(
  JSX.props.children
    .filter((ele) => ele.type === 'ul')[0]
    .props.children.filter((ele) => ele.type === 'li').length === 3
);
```

# --seed--

## --after-user-code--

```jsx
ReactDOM.render(JSX, document.getElementById('root'))
```

## --seed-contents--

```jsx

```

# --solutions--

```jsx
const JSX = (
<div>
  <h1>Hello JSX!</h1>
  <p>Some info</p>
  <ul>
    <li>An item</li>
    <li>Another item</li>
    <li>A third item</li>
  </ul>
</div>);
```
