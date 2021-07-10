---
id: 5a24c314108439a4d403616c
title: Sovrascrivere le proprietà predefinite
challengeType: 6
forumTopicId: 301399
dashedName: override-default-props
---

# --description--

La possibilità di impostare delle proprietà predefinite è una caratteristica utile in React. Per sovrascrivere gli elementi predefiniti si devono impostare esplicitamente i valori delle proprietà per un componente.

# --instructions--

Il componente `ShoppingCart` ora presenta un componente figlio `Items`. Questo componente `Items` ha una proprietà di default `quantity` impostata all'intero `0`. Sovrascrivi la proprietà predefinita passando un valore di `10` per `quantity`.

**Nota:** Ricorda che la sintassi per aggiungere una proprietà a un componente è simile a quella degli attributi HTML. Tuttavia, poiché il valore per la `quantity` è un numero intero, non andrà tra virgolette ma dovrebbe essere racchiusa tra parentesi graffe. Ad esempio, `{100}`. Questa sintassi dice a JSX di interpretare il valore all'interno delle parentesi graffe direttamente come JavaScript.

# --hints--

Il componente `ShoppingCart` dovrebbe effettuare il render.

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(ShoppingCart));
    return mockedComponent.find('ShoppingCart').length === 1;
  })()
);
```

Il componente `Items` dovrebbe effettuare il render.

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(ShoppingCart));
    return mockedComponent.find('Items').length === 1;
  })()
);
```

Il componente `Items` dovrebbe avere una proprietà di `{ quantity: 10 }` passata dal componente `ShoppingCart`.

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
