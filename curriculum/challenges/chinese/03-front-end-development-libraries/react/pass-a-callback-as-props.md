---
id: 5a24c314108439a4d403617b
title: 传递回调作为 Props
challengeType: 6
forumTopicId: 301400
dashedName: pass-a-callback-as-props
---

# --description--

可以将 `state` 作为 props 传递给子组件，但不仅限于传递数据。 也可以将函数或在 React 组件中定义的任何方法传递给子组件。 这就是子组件与父组件交互的方式。 可以把方法像普通 prop 一样传递给子组件， 它会被分配一个名字，可以在子组件中的 `this.props` 下访问该方法的名字。

# --instructions--

代码编辑器中列出了三个组件。 `MyApp` 是父组件，`GetInput` 和`RenderInput` 是它将要渲染的子组件。 将 `GetInput` 组件添加到 `MyApp` 的 render 方法，然后将 `MyApp` 的 `state` 中的 `inputValue` 传入名为 `input` 的 prop。 还要创建一个名为 `handleChange` 的 prop，并将输入处理程序 `handleChange` 传递给它。

接下来，将 `RenderInput` 添加到 `MyApp` 中的 render 方法中，然后创建一个名为 `input` 的 prop，并将 `state` 中的 `inputValue` 传递给它。 完成后，可以在 `GetInput` 组件中的 `input` 字段中键入内容，然后该组件通过 props 调用其父组件中的处理函数方法。 这将更新处于父组件 `state` 中的 input，该 input 将作为 props 传递给两个子组件。 观察数据如何在组件之间流动，以及单一数据源如何保持父组件`state`。 诚然，这个示例有点做作，但是应该能用来说明数据和回调是如何在 React 组件之间传递的。

# --hints--

应该渲染 `MyApp` 组件。

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(MyApp));
    return mockedComponent.find('MyApp').length === 1;
  })()
);
```

应该渲染 `GetInput` 组件。

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(MyApp));
    return mockedComponent.find('GetInput').length === 1;
  })()
);
```

应该渲染 `RenderInput` 组件。

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(MyApp));
    return mockedComponent.find('RenderInput').length === 1;
  })()
);
```

`GetInput` 组件应该接收 `MyApp` 的 state 属性 `inputValue` 作为 props，并包含一个修改 `MyApp` state 的 `input` 元素。

```js
async () => {
  const waitForIt = (fn) =>
    new Promise((resolve, reject) => setTimeout(() => resolve(fn()), 250));
  const mockedComponent = Enzyme.mount(React.createElement(MyApp));
  const state_1 = () => {
    mockedComponent.setState({ inputValue: '' });
    return waitForIt(() => mockedComponent.state());
  };
  const state_2 = () => {
    mockedComponent
      .find('input')
      .simulate('change', { target: { value: 'TestInput' } });
    return waitForIt(() => mockedComponent.state());
  };
  const updated_1 = await state_1();
  const updated_2 = await state_2();
  assert(updated_1.inputValue === '' && updated_2.inputValue === 'TestInput');
};
```

`RenderInput` 组件应该接收 `MyApp` state 属性 `inputValue` 作为 props。

```js
async () => {
  const waitForIt = (fn) =>
    new Promise((resolve, reject) => setTimeout(() => resolve(fn()), 250));
  const mockedComponent = Enzyme.mount(React.createElement(MyApp));
  const state_1 = () => {
    mockedComponent.setState({ inputValue: 'TestName' });
    return waitForIt(() => mockedComponent);
  };
  const updated_1 = await state_1();
  assert(updated_1.find('p').text().includes('TestName'));
};
```

# --seed--

## --after-user-code--

```jsx
ReactDOM.render(<MyApp />, document.getElementById('root'))
```

## --seed-contents--

```jsx
class MyApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: ''
    }
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({
      inputValue: event.target.value
    });
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

class GetInput extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h3>Get Input:</h3>
        <input
          value={this.props.input}
          onChange={this.props.handleChange}/>
      </div>
    );
  }
};

class RenderInput extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h3>Input Render:</h3>
        <p>{this.props.input}</p>
      </div>
    );
  }
};
```

# --solutions--

```jsx
class MyApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: ''
    }
  this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({
      inputValue: event.target.value
    });
  }
  render() {
    return (
       <div>
         <GetInput
           input={this.state.inputValue}
           handleChange={this.handleChange}/>
         <RenderInput
           input={this.state.inputValue}/>
       </div>
    );
  }
};

class GetInput extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h3>Get Input:</h3>
        <input
          value={this.props.input}
          onChange={this.props.handleChange}/>
      </div>
    );
  }
};

class RenderInput extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h3>Input Render:</h3>
        <p>{this.props.input}</p>
      </div>
    );
  }
};
```
