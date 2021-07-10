---
id: 5a24c314108439a4d403616c
title: Reemplaza las "props" predeterminadas
challengeType: 6
forumTopicId: 301399
dashedName: override-default-props
---

# --description--

La capacidad de establecer valores por defecto para las props es una característica útil en React. La manera de reemplazar las props predeterminadas es establecer explícitamente los valores de las props para un componente.

# --instructions--

El componente `ShoppingCart` ahora renderiza un componente hijo `Items`. Este componente `Items` tiene una prop predeterminada `quantity` establecida al entero `0`. Reemplaza la prop predeterminada pasando un valor de `10` para `quantity`.

**Nota:** Recuerda que la sintaxis para agregar una prop a un componente se parece a la sintaxis para agregar atributos en un elemento HTML. Sin embargo, dado que el valor de `quantity` es un entero, no irá entre comillas pero debe estar envuelto entre llaves. Por ejemplo, `{100}`. Esta sintaxis le dice a JSX que interprete el valor dentro de las llaves directamente como JavaScript.

# --hints--

El componente `ShoppingCart` debe renderizarse.

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(ShoppingCart));
    return mockedComponent.find('ShoppingCart').length === 1;
  })()
);
```

El componente `Items` debe renderizarse.

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(ShoppingCart));
    return mockedComponent.find('Items').length === 1;
  })()
);
```

El componente `Items` debe tener una prop de `{ quantity: 10 }` heredada desde el componente `ShoppingCart`.

```js
(getUserInput) =>
  assert(
    (function () {
      const mockedComponent = Enzyme.mount(React.createElement(ShoppingCart));
      return (
        mockedComponent.find('Items').props().quantity == 10 &&
        getUserInput('index')
          .replace(/ /g, '')
          .includes('<Itemsquantity={10}/>')
      );
    })()
  );
```

# --seed--

## --after-user-code--

```jsx
ReactDOM.render(<ShoppingCart />, document.getElementById('root'))
```

## --seed-contents--

```jsx
const Items = (props) => {
  return <h1>Current Quantity of Items in Cart: {props.quantity}</h1>
}

Items.defaultProps = {
  quantity: 0
}

class ShoppingCart extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    { /* Change code below this line */ }
    return <Items />
    { /* Change code above this line */ }
  }
};
```

# --solutions--

```jsx
const Items = (props) => {
  return <h1>Current Quantity of Items in Cart: {props.quantity}</h1>
}

Items.defaultProps = {
  quantity: 0
}

class ShoppingCart extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    { /* Change code below this line */ }
    return <Items quantity = {10} />
    { /* Change code above this line */ }
  }
};
```
