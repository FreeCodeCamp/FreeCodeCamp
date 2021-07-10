---
id: 5a24c314108439a4d4036160
title: Define una clase HTML en JSX
challengeType: 6
forumTopicId: 301393
dashedName: define-an-html-class-in-jsx
---

# --description--

Ahora que te sientes cómodo escribiendo JSX, te preguntarás cuanto difiere de HTML.

Hasta ahora, puede parecer que HTML y JSX son exactamente iguales.

Una diferencia clave en JSX es que ya no puedes usar la palabra `class` para definir clases HTML. Esto es debido a que `class` es una palabra reservada en JavaScript. En su lugar, JSX utiliza `className`.

De hecho, la convención de nomenclatura para todos los atributos HTML y referencias a eventos en JSX se convierte a camelCase. Por ejemplo, un evento de clic en JSX es `onClick`, en lugar de `onclick`. Del mismo modo, `onchange` se convierte en `onChange`. Si bien se trata de una diferencia sutil, es importante tenerlo en cuenta de ahora en adelante.

# --instructions--

Aplica una clase `myDiv` al `div` proporcionado en el código JSX.

# --hints--

La constante `JSX` debe devolver un elemento `div`.

```js
assert.strictEqual(JSX.type, 'div');
```

`div` debe tener una clase `myDiv`.

```js
assert.strictEqual(JSX.props.className, 'myDiv');
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
    <h1>Add a class to this div</h1>
  </div>
);
```

# --solutions--

```jsx
const JSX = (
<div className = 'myDiv'>
  <h1>Add a class to this div</h1>
</div>);
```
