---
id: 5a24c314108439a4d4036172
title: 以另一种方式在用户界面中渲染状态
challengeType: 6
forumTopicId: 301408
dashedName: render-state-in-the-user-interface-another-way
---

# --description--

还有另一种方法可以访问组件中的 `state`。 在 `render()` 方法中，在 `return` 语句之前，可以直接编写 JavaScript。 例如，可以声明函数、从 `state` 或 `props` 中访问数据、对此数据执行计算等。 然后，可以将任何数据赋值给 `return` 语句中可以访问的变量。

# --instructions--

在 `MyComponent` 的 render 方法中，定义一个名为 `name` 的 `const`（常量），并将其设置为组件 `state` 中的 name 值。 因为可以直接在代码部分编写 JavaScript，所以不需要用大括号括起来。

接下来，在 return 语句中，在 `h1` 标签中渲染变量 `name` 的值。 记住，在 return 语句中需要使用 JSX 语法（用到 JavaScript 的花括号）。

# --hints--

`MyComponent` 应该有一个键 `name`，其值 `freeCodeCamp` 存储在其 state 中。

```js
assert(
  Enzyme.mount(React.createElement(MyComponent)).state('name') ===
    'freeCodeCamp'
);
```

`MyComponent` 应该在 `div` 中渲染一个 `h1` 标题。

```js
assert(
  /<div><h1>.*<\/h1><\/div>/.test(
    Enzyme.mount(React.createElement(MyComponent)).html()
  )
);
```

渲染的 `h1` 标签应该包含 `{name}` 的引用。

```js
(getUserInput) =>
  assert(/<h1>\n*\s*\{\s*name\s*\}\s*\n*<\/h1>/.test(getUserInput('index')));
```

渲染的 `h1` 标题中应该包含一段文本，这段文本是从组件的 state 中渲染出来的。

```js
async () => {
  const waitForIt = (fn) =>
    new Promise((resolve, reject) => setTimeout(() => resolve(fn()), 250));
  const mockedComponent = Enzyme.mount(React.createElement(MyComponent));
  const first = () => {
    mockedComponent.setState({ name: 'TestName' });
    return waitForIt(() => mockedComponent.html());
  };
  const firstValue = await first();
  assert(firstValue === '<div><h1>TestName</h1></div>');
};
```

# --seed--

## --after-user-code--

```jsx
ReactDOM.render(<MyComponent />, document.getElementById('root'))
```

## --seed-contents--

```jsx
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'freeCodeCamp'
    }
  }
  render() {
    // Change code below this line

    // Change code above this line
    return (
      <div>
        { /* Change code below this line */ }

        { /* Change code above this line */ }
      </div>
    );
  }
};
```

# --solutions--

```jsx
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'freeCodeCamp'
    }
  }
  render() {
    // Change code below this line
    const name = this.state.name;
    // Change code above this line
    return (
      <div>
        { /* Change code below this line */ }
        <h1>{name}</h1>
        { /* Change code above this line */ }
      </div>
    );
  }
};
```
