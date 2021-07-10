---
id: 5a24c314108439a4d4036178
title: 创建一个可以控制的输入框
challengeType: 6
forumTopicId: 301385
dashedName: create-a-controlled-input
---

# --description--

应用程序可能在 `state` 和渲染的 UI 之间有更复杂的交互。 例如，用于文本输入的表单控件元素（如 `input` 和 `textarea`）在用户键入时在 DOM 中维护自己的 state。 通过 React，可以将这种可变 state 转移到 React 组件的 `state` 中。 用户的输入变成了应用程序 `state` 的一部分，因此 React 控制该输入字段的值。 通常，如果 React 组件具有用户可以键入的输入字段，那么它将是一个受控的输入表单。

# --instructions--

代码编辑器具有一个名为 `ControlledInput` 的组件框架，用于创建受控的 `input` 元素。 组件的 `state` 已经被包含空字符串的 `input` 属性初始化。 此值表示用户在 `input` 字段中键入的文本。

首先，创建一个名为 `handleChange()` 的方法，该方法具有一个名为 `event` 的参数。 方法被调用时，它接收一个 `event` 对象，该对象包含一个来自 `input` 元素的字符串文本。 可以使用方法内的 `event.target.value` 来访问这个字符串。 用这个新字符串更新组件的`state`的`input`属性。

在 `render` 方法中的 `h4` 标签之上创建 `input` 元素。 添加一个 `value` 属性，使其等于组件 `state` 的 `input` 属性。 然后将 `onChange()` 事件处理程序设置到 `handleChange()` 方法中。

在输入框中键入时，文本由 `handleChange()` 方法处理，文本被设置为本地 `state` 中的 `input` 属性，并渲染在页面上的 `input` 框中。 组件 `state` 是输入数据的唯一真实来源。

最后，不要忘记在构造函数中添加必要的绑定。

# --hints--

`ControlledInput` 应该返回包含一个 `input` 标签和 `p` 标签的 `div` 元素。

```js
assert(
  Enzyme.mount(React.createElement(ControlledInput))
    .find('div')
    .children()
    .find('input').length === 1 &&
    Enzyme.mount(React.createElement(ControlledInput))
      .find('div')
      .children()
      .find('p').length === 1
);
```

`ControlledInput` 的 state 应该使用设置为空字符串的 `input` 属性初始化。

```js
assert.strictEqual(
  Enzyme.mount(React.createElement(ControlledInput)).state('input'),
  ''
);
```

Input 元素中的键入值应该更新 input 的 state 和值，并且 `p` 元素应该在输入时呈现 state。

```js
async () => {
  const waitForIt = (fn) =>
    new Promise((resolve, reject) => setTimeout(() => resolve(fn()), 250));
  const mockedComponent = Enzyme.mount(React.createElement(ControlledInput));
  const _1 = () => {
    mockedComponent.setState({ input: '' });
    return waitForIt(() => mockedComponent.state('input'));
  };
  const _2 = () => {
    mockedComponent
      .find('input')
      .simulate('change', { target: { value: 'TestInput' } });
    return waitForIt(() => ({
      state: mockedComponent.state('input'),
      text: mockedComponent.find('p').text(),
      inputVal: mockedComponent.find('input').props().value
    }));
  };
  const before = await _1();
  const after = await _2();
  assert(
    before === '' &&
      after.state === 'TestInput' &&
      after.text === 'TestInput' &&
      after.inputVal === 'TestInput'
  );
};
```

# --seed--

## --after-user-code--

```jsx
ReactDOM.render(<ControlledInput />, document.getElementById('root'))
```

## --seed-contents--

```jsx
class ControlledInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ''
    };
    // Change code below this line

    // Change code above this line
  }
  // Change code below this line

  // Change code above this line
  render() {
    return (
      <div>
        { /* Change code below this line */}

        { /* Change code above this line */}
        <h4>Controlled Input:</h4>
        <p>{this.state.input}</p>
      </div>
    );
  }
};
```

# --solutions--

```jsx
class ControlledInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({
      input: event.target.value
    });
  }
  render() {
    return (
      <div>
        <input
          value={this.state.input}
          onChange={this.handleChange} />
        <h4>Controlled Input:</h4>

        <p>{this.state.input}</p>
      </div>
    );
  }
};
```
