---
id: 5a24c314108439a4d403616c
title: 覆盖默认的 Props
challengeType: 6
forumTopicId: 301399
dashedName: override-default-props
---

# --description--

在 React 中，设置默认的 props 是一个很有用的特性， 显式设置组件的 prop 值即可覆盖默认 props。

# --instructions--

`ShoppingCart` 组件现在渲染了一个子组件 `Items`。 该 `Items` 组件有一个默认 `quantity` prop，其值被设置为整数 `0`。 通过传入数值 `10` 来覆盖 `quantity` 的默认 prop。

**注意：** 请记住，向组件添加 prop 的语法与添加 HTML 属性类似。 但是，由于 `quantity` 的值是整数，所以它不会加引号，但应该用花括号括起来， 例如`{100}`。 这个语法告诉 JSX 直接将花括号中的值解释为 JavaScript。

# --hints--

应该渲染 `ShoppingCart` 组件。

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(ShoppingCart));
    return mockedComponent.find('ShoppingCart').length === 1;
  })()
);
```

应该渲染 `Items` 组件。

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(ShoppingCart));
    return mockedComponent.find('Items').length === 1;
  })()
);
```

`Items` 组件应该有一个 `{ quantity: 10 }` 的 prop，该 prop 是从 `ShoppingCart` 组件传递过去的。

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
