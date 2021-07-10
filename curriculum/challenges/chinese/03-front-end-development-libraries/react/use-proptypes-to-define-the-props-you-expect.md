---
id: 5a24c314108439a4d403616d
title: 使用 PropTypes 来定义 Props 的类型
challengeType: 6
forumTopicId: 301419
dashedName: use-proptypes-to-define-the-props-you-expect
---

# --description--

React 提供了有用的类型检查特性，以验证组件是否接收了正确类型的 props。 例如，应用程序调用 API 来检索数据是否是数组，然后将数据作为 prop 传递给组件。 可以在组件上设置 `propTypes`，以要求数据的类型为 `array`。 当数据是任何其它类型时，都会抛出警告。

当提前知道 prop 的类型时，最佳实践是设置其 `propTypes`。 可以为组件定义 `propTypes` 属性，方法与定义 `defaultProps` 相同。 这样做将检查给定键的 prop 是否是给定类型。 这里有一个示例，表示名为 `handleClick` 的 prop 应为 `function` 类型：

```js
MyComponent.propTypes = { handleClick: PropTypes.func.isRequired }
```

在上面的示例中，`PropTypes.func` 部分检查 `handleClick` 是否为函数。 添加 `isRequired`，告诉 React `handleClick` 是该组件的必需属性。 如果没有那个属性，将出现警告。 还要注意 `func` 代表 `function` 。 在 7 种 JavaScript 原语类型中， `function` 和 `boolean` （写为 `bool` ）是唯一使用异常拼写的两种类型。 除了原始类型，还有其他类型可用。 例如，你可以检查 prop 是否为 React 元素。 请参阅[文档](https://reactjs.org/docs/jsx-in-depth.html#specifying-the-react-element-type)以获取所有选项。

**注意：**在 React v15.5.0 中, `PropTypes` 可以从 React 中单独引入，例如：`import PropTypes from 'prop-types';`。

# --instructions--

为 `Items` 组件定义 `propTypes`，以要求 `quantity` 作为 prop，并验证它是否为 `number` 类型。

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

`Items` 组件应该包含一个 `propTypes`，要求 `quantity` 有一个 number 类型的值。

```js
(getUserInput) =>
  assert(
    (function () {
      const noWhiteSpace = __helpers.removeWhiteSpace(getUserInput('index'));
      return (
        noWhiteSpace.includes('quantity:PropTypes.number.isRequired') &&
        noWhiteSpace.includes('Items.propTypes=')
      );
    })()
  );
```

# --seed--

## --before-user-code--

```jsx
var PropTypes = {
  number: { isRequired: true }
};
```

## --after-user-code--

```jsx
ReactDOM.render(<ShoppingCart />, document.getElementById('root'))
```

## --seed-contents--

```jsx
const Items = (props) => {
  return <h1>Current Quantity of Items in Cart: {props.quantity}</h1>
};

// Change code below this line

// Change code above this line

Items.defaultProps = {
  quantity: 0
};

class ShoppingCart extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <Items />
  }
};
```

# --solutions--

```jsx
const Items = (props) => {
  return <h1>Current Quantity of Items in Cart: {props.quantity}</h1>
};

// Change code below this line
Items.propTypes = {
  quantity: PropTypes.number.isRequired
};
// Change code above this line

Items.defaultProps = {
  quantity: 0
};

class ShoppingCart extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <Items />
  }
};
```
