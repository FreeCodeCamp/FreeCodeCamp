---
id: 5a24c314108439a4d403616b
title: 使用默認的 Props
challengeType: 6
forumTopicId: 301418
dashedName: use-default-props
---

# --description--

React 還有一個設置默認 props 的選項。 可以將默認 props 作爲組件本身的屬性分配給組件，React 會在必要時分配默認 prop。 如果沒有顯式的提供任何值，這允許指定 prop 值應該是什麼。 例如，如果聲明 `MyComponent.defaultProps = { location: 'San Francisco' }`，即定義一個 location 屬性，並且其值在沒有另行制定的情況下被設置爲字符串 `San Francisco`。 如果 props 未定義，則 React 會分配默認 props，但如果你將 `null` 作爲 prop 的值，它將保持 `null`。

# --instructions--

代碼編輯器中有一個 `ShoppingCart` 組件。 在這個組件上定義默認 props，它指定一個 `items` prop，其值爲 `0`。

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

`ShoppingCart` 組件應該有一個 `{ items: 0 }` 的默認 prop。

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
