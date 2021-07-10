---
id: 5a24c314108439a4d403616b
title: 使用默认的 Props
challengeType: 6
forumTopicId: 301418
dashedName: use-default-props
---

# --description--

React 还有一个设置默认 props 的选项。 可以将默认 props 作为组件本身的属性分配给组件，React 会在必要时分配默认 prop。 如果没有显式的提供任何值，这允许指定 prop 值应该是什么。 例如，如果声明 `MyComponent.defaultProps = { location: 'San Francisco' }`，即定义一个 location 属性，并且其值在没有另行制定的情况下被设置为字符串 `San Francisco`。 如果 props 未定义，则 React 会分配默认 props，但如果你将 `null` 作为 prop 的值，它将保持 `null`。

# --instructions--

代码编辑器中有一个 `ShoppingCart` 组件。 在这个组件上定义默认 props，它指定一个 `items` prop，其值为 `0`。

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

`ShoppingCart` 组件应该有一个 `{ items: 0 }` 的默认 prop。

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
