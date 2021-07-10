---
id: 5a24c314108439a4d4036185
title: Use && for a More Concise Conditional
challengeType: 6
forumTopicId: 301413
dashedName: use--for-a-more-concise-conditional
---

# --description--

`if/else` 语句在上一次挑战中是有效的，但是有一种更简洁的方法可以达到同样的结果。 假设正在跟踪组件中的几个条件，并且希望根据这些条件中的每一个来渲染不同的元素。 如果你写了很多 `else if` 语句来返回稍微不同的 UI，你可能会写很多重复代码，这就留下了出错的空间。 相反，你可以使用 `&&` 逻辑运算符以更简洁的方式执行条件逻辑。 这是完全可行的，因为你希望检查条件是否为 `true`。如果是，则返回一些标记。 这里有一个例子：

```jsx
{condition && <p>markup</p>}
```

如果 `condition` 为 `true`，则返回标记。 如果条件为 `false` ，则在评估 `condition` 后操作将立即返回 `false`，并且不返回任何内容。 可以将这些语句直接包含在 JSX 中，并通过在每个条件后面写 `&&` 来将多个条件串在一起。 这允许你在 `render()` 方法中处理更复杂的条件逻辑，而无需重复大量代码。

# --instructions--

再来看看前面的示例，`h1` 还是在 `display` 为 `true` 时渲染，但使用 `&&` 逻辑运算符代替 `if/else` 语句。

# --hints--

`MyComponent` 应该存在并渲染。

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(MyComponent));
    return mockedComponent.find('MyComponent').length;
  })()
);
```

当 `display` 被设置为 `true` 时，`div`、`button` 和 `h1` 标签应该渲染。

```js
async () => {
  const waitForIt = (fn) =>
    new Promise((resolve, reject) => setTimeout(() => resolve(fn()), 250));
  const mockedComponent = Enzyme.mount(React.createElement(MyComponent));
  const state_1 = () => {
    mockedComponent.setState({ display: true });
    return waitForIt(() => mockedComponent);
  };
  const updated = await state_1();
  assert(
    updated.find('div').length === 1 &&
      updated.find('div').children().length === 2 &&
      updated.find('button').length === 1 &&
      updated.find('h1').length === 1
  );
};
```

当 `display` 被设置为 `false` 时，只有 `div` 和 `button` 应该渲染。

```js
async () => {
  const waitForIt = (fn) =>
    new Promise((resolve, reject) => setTimeout(() => resolve(fn()), 250));
  const mockedComponent = Enzyme.mount(React.createElement(MyComponent));
  const state_1 = () => {
    mockedComponent.setState({ display: false });
    return waitForIt(() => mockedComponent);
  };
  const updated = await state_1();
  assert(
    updated.find('div').length === 1 &&
      updated.find('div').children().length === 1 &&
      updated.find('button').length === 1 &&
      updated.find('h1').length === 0
  );
};
```

render 方法应该使用 `&&` 逻辑运算符来检查 `this.state.display` 的条件。

```js
(getUserInput) => assert(getUserInput('index').includes('&&'));
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
      display: true
    }
    this.toggleDisplay = this.toggleDisplay.bind(this);
  }
  toggleDisplay() {
    this.setState(state => ({
      display: !state.display
    }));
  }
  render() {
    // Change code below this line
    return (
       <div>
         <button onClick={this.toggleDisplay}>Toggle Display</button>
         <h1>Displayed!</h1>
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
      display: true
    }
 this.toggleDisplay = this.toggleDisplay.bind(this);
  }
  toggleDisplay() {
    this.setState(state => ({
      display: !state.display
    }));
  }
  render() {
    // Change code below this line
    return (
       <div>
         <button onClick={this.toggleDisplay}>Toggle Display</button>
         {this.state.display && <h1>Displayed!</h1>}
       </div>
    );
  }
};
```
