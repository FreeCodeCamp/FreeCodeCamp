---
id: 5a24c314108439a4d403616c
title: 覆蓋默認的 Props
challengeType: 6
forumTopicId: 301399
dashedName: override-default-props
---

# --description--

在 React 中，設置默認的 props 是一個很有用的特性， 顯式設置組件的 prop 值即可覆蓋默認 props。

# --instructions--

`ShoppingCart` 組件現在渲染了一個子組件 `Items`。 該 `Items` 組件有一個默認 `quantity` prop，其值被設置爲整數 `0`。 通過傳入數值 `10` 來覆蓋 `quantity` 的默認 prop。

**注意：** 請記住，向組件添加 prop 的語法與添加 HTML 屬性類似。 但是，由於 `quantity` 的值是整數，所以它不會加引號，但應該用花括號括起來， 例如`{100}`。 這個語法告訴 JSX 直接將花括號中的值解釋爲 JavaScript。

# --hints--

應該渲染 `ShoppingCart` 組件。

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(ShoppingCart));
    return mockedComponent.find('ShoppingCart').length === 1;
  })()
);
```

應該渲染 `Items` 組件。

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(ShoppingCart));
    return mockedComponent.find('Items').length === 1;
  })()
);
```

`Items` 組件應該有一個 `{ quantity: 10 }` 的 prop，該 prop 是從 `ShoppingCart` 組件傳遞過去的。

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
