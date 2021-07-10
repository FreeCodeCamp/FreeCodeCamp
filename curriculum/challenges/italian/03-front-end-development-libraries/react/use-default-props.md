---
id: 5a24c314108439a4d403616b
title: Usare le proprietà predefinite
challengeType: 6
forumTopicId: 301418
dashedName: use-default-props
---

# --description--

React ha anche un'opzione per impostare props predefinite. È possibile assegnare props predefinite a un componente come una proprietà del componente stesso, in modo che React le assegni quando necessario. Questo ti permette di specificare quale valore dovrebbe avere una prop se nessun valore è esplicitamente fornito. Ad esempio, se dichiari `MyComponent.defaultProps = { location: 'San Francisco' }`, hai definito una prop location impostata sulla stringa `San Francisco`, a meno che non specifichi diversamente. React assegna le prop di default se non sono definite, ma se passi `null` come valore per una prop, essa rimarrà pari a `null`.

# --instructions--

L'editor di codice mostra un componente `ShoppingCart`. Definisci gli elementi predefiniti su questo componente in modo che specifichino una prop `items` con un valore di `0`.

# --hints--

Il componente `ShoppingCart` dovrebbe essere presentato.

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(ShoppingCart));
    return mockedComponent.find('ShoppingCart').length === 1;
  })()
);
```

Il componente `ShoppingCart` dovrebbe avere una prop predefinita di `{ items: 0 }`.

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(ShoppingCart));
    mockedComponent.setProps({ items: undefined });
    return mockedComponent.find('ShoppingCart').props().items === 0;
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
const ShoppingCart = (props) => {
  return (
    <div>
      <h1>Shopping Cart Component</h1>
    </div>
  )
};
// Change code below this line
```

# --solutions--

```jsx
const ShoppingCart = (props) => {
  return (
    <div>
      <h1>Shopping Cart Component</h1>
    </div>
  )
};

// Change code below this line
ShoppingCart.defaultProps = {
  items: 0
}
```
