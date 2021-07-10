---
id: 5a24c314108439a4d4036171
title: 在用户界面中渲染状态
challengeType: 6
forumTopicId: 301409
dashedName: render-state-in-the-user-interface
---

# --description--

定义了组件的初始 state 之后，就可以在要渲染的 UI 中显示它。 如果组件是有状态的，它将始终可以访问 `render()` 方法中 `state` 的数据。 就可以使用 `this.state` 访问数据。

如果想在 render 方法的 `return` 中访问 state 值，必须把这个值用花括号括起来。

`state` 是 React 组件中最强大的特性之一， 它可以跟踪应用程序中的重要数据，并根据数据的变化渲染 UI。 如果数据发生变化，UI 也会随之改变。 React 使用所谓的虚拟 DOM 来跟踪幕后的变化。 当 state 数据更新时，它会使用该数据触发组件的重新渲染 -- 包括接收 prop 数据的子组件。 React 只在必要的时候更新实际的 DOM， 这意味着你不必担心 DOM 的变更， 只需声明 UI 的外观即可。

注意，如果组件是有状态的，其它组件并不知道它的 `state`。 它的 `state` 是完全封装的，或者是局限于组件本身的，除非你将 state 数据作为 `props` 传递给子组件。 封装 `state` 的概念非常重要，因为它允许编写特定的逻辑，然后将该逻辑包含并隔离在代码中的某个位置。

# --instructions--

在代码编辑器中，`MyComponent` 是一个有状态组件， 在组件的 render 方法中定义一个`h1`标签，该方法从组件的 state 渲染 `name` 的值。

**注意：** `h1` 应该只渲染来自 `state` 的值。 在 JSX 中，使用花括号 `{ }` 编写的任何代码都将被视为 JavaScript。 因此，要访问 `state` 中的值，只需将引用括在花括号中即可。

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

渲染的 `h1` 标题中应该只包含一段文本，这段文本是从组件的 state 中渲染出来的。

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
  const getValue = firstValue.replace(/\s/g, '');
  assert(getValue === '<div><h1>TestName</h1></div>');
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
    return (
      <div>
        { /* Change code below this line */ }
        <h1>{this.state.name}</h1>
        { /* Change code above this line */ }
      </div>
    );
  }
};
```
