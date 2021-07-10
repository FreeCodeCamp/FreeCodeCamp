---
id: 5a24c314108439a4d4036174
title: 将 this 绑定到 Class 方法上
challengeType: 6
forumTopicId: 301379
dashedName: bind-this-to-a-class-method
---

# --description--

除了设置和更新 `state` 之外，还可以为组件类定义方法。 类方法通常需要使用 `this` 关键字，以便它可以访问方法中类的属性（例如 `state` 和 `props`）。 有几种方法可以让类方法访问 `this`。

一种常见的方法是在构造函数中显式地绑定 `this`，这样当组件初始化时，`this` 就会绑定到类方法。 你可能已经注意到上一个挑战在构造函数中的 `handleClick` 方法使用了 `this.handleClick = this.handleClick.bind(this)`。 然后，当在类方法中调用像 `this.setState()` 这样的函数时，`this` 指的是这个类，而不是 `undefined`。

**注意：** `this`关键字是 JavaScript 中最令人困惑的方面之一，但它在 React 中扮演着重要的角色。 虽然它的行为在这里是完全正常的，但是这些课程并不深入研究`this`，所以如果以上内容令你感到困惑，请参考其他课程！

# --instructions--

代码编辑器有一个带有 `state` 的组件，用于跟踪项目计数。 它还有一个方法，允许设置文本为 `You clicked!`。 但是，该方法不起作用，因为它使用了未定义的 `this` 关键字。 可以通过将 `this` 显式绑定到组件构造函数中的 `handleClick()`方法来修复它。

接下来，向 render 方法中的 `button` 元素添加一个单击处理程序。 当按钮接收到单击事件时，它应该触发 `handleClick()` 方法。 记住，传递给 `onClick` 处理程序的方法需要使用花括号，因为它应该直接被解释为 JavaScript。

完成上述步骤后，可以单击按钮并看到 `You clicked!`。

# --hints--

`MyComponent` 应返回 `div` 元素，该元素按顺序包含两个元素，一个按钮和一个 `h1` 元素。

```js
assert(
  Enzyme.mount(React.createElement(MyComponent)).find('div').length === 1 &&
    Enzyme.mount(React.createElement(MyComponent))
      .find('div')
      .childAt(0)
      .type() === 'button' &&
    Enzyme.mount(React.createElement(MyComponent))
      .find('div')
      .childAt(1)
      .type() === 'h1'
);
```

`MyComponent` 的 state 应该使用键值对 `{ text: "Hello" }`，进行初始化。

```js
assert(
  Enzyme.mount(React.createElement(MyComponent)).state('text') === 'Hello'
);
```

单击 `button` 元素应该运行 `handleClick` 方法，并使 state `text` 为 `You clicked!`。

```js
async () => {
  const waitForIt = (fn) =>
    new Promise((resolve, reject) => setTimeout(() => resolve(fn()), 250));
  const mockedComponent = Enzyme.mount(React.createElement(MyComponent));
  const first = () => {
    mockedComponent.setState({ text: 'Hello' });
    return waitForIt(() => mockedComponent.state('text'));
  };
  const second = () => {
    mockedComponent.find('button').simulate('click');
    return waitForIt(() => mockedComponent.state('text'));
  };
  const firstValue = await first();
  const secondValue = await second();
  assert(firstValue === 'Hello' && secondValue === 'You clicked!');
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
      text: "Hello"
    };
    // Change code below this line

    // Change code above this line
  }
  handleClick() {
    this.setState({
      text: "You clicked!"
    });
  }
  render() {
    return (
      <div>
        { /* Change code below this line */ }
        <button>Click Me</button>
        { /* Change code above this line */ }
        <h1>{this.state.text}</h1>
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
      text: "Hello"
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState({
      text: "You clicked!"
    });
  }
  render() {
    return (
      <div>
        <button onClick = {this.handleClick}>Click Me</button>
        <h1>{this.state.text}</h1>
      </div>
    );
  }
};
```
