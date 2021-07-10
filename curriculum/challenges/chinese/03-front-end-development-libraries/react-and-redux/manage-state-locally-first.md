---
id: 5a24c314108439a4d4036142
title: 首先在本地管理状态
challengeType: 6
forumTopicId: 301431
dashedName: manage-state-locally-first
---

# --description--

这一关的任务是完成 `DisplayMessages` 组件的创建。

# --instructions--

首先，在 `render()` 方法中，让组件渲染 `input`、`button`、`ul` 三个元素。 `input` 元素的改变会触发 `handleChange()` 方法。 此外，`input` 元素会渲染组件状态中 `input` 的值。 点击按钮 `button` 需触发 `submitMessage()` 方法。

接着，写出这两种方法。 `handleChange()` 方法会更新 `input` 为用户正在输入的内容。 `submitMessage()` 方法把当前存储在 `input` 的消息与本地状态的 `messages` 数组连接起来，并清除 `input` 的值。

最后，在 `ul` 中展示 `messages` 数组，其中每个元素内容需放到 `li` 元素内。

# --hints--

`DisplayMessages` 组件的初始状态应是 `{ input: "", messages: [] }`。

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(DisplayMessages));
    const initialState = mockedComponent.state();
    return (
      typeof initialState === 'object' &&
      initialState.input === '' &&
      initialState.messages.length === 0
    );
  })()
);
```

`DisplayMessages` 组件应渲染含 `h2`、`button`、`ul`、`li` 四个子元素的`div`

```js
async () => {
  const mockedComponent = Enzyme.mount(React.createElement(DisplayMessages));
  const waitForIt = (fn) =>
    new Promise((resolve, reject) => setTimeout(() => resolve(fn()), 100));
  const state = () => {
    mockedComponent.setState({ messages: ['__TEST__MESSAGE'] });
    return waitForIt(() => mockedComponent);
  };
  const updated = await state();
  assert(
    updated.find('div').length === 1 &&
      updated.find('h2').length === 1 &&
      updated.find('button').length === 1 &&
      updated.find('ul').length === 1 &&
      updated.find('li').length > 0
  );
};
```

`.map` 应该用于 `messages` 数组。

```js
assert(code.match(/this\.state\.messages\.map/g));
```

`input` 元素应渲染本地状态中的 `input` 值。

```js
async () => {
  const mockedComponent = Enzyme.mount(React.createElement(DisplayMessages));
  const waitForIt = (fn) =>
    new Promise((resolve, reject) => setTimeout(() => resolve(fn()), 100));
  const causeChange = (c, v) =>
    c.find('input').simulate('change', { target: { value: v } });
  const testValue = '__TEST__EVENT__INPUT';
  const changed = () => {
    causeChange(mockedComponent, testValue);
    return waitForIt(() => mockedComponent);
  };
  const updated = await changed();
  assert(updated.find('input').props().value === testValue);
};
```

调用 `handleChange` 方法时应更新状态中的 `input` 值为当前输入。

```js
async () => {
  const mockedComponent = Enzyme.mount(React.createElement(DisplayMessages));
  const waitForIt = (fn) =>
    new Promise((resolve, reject) => setTimeout(() => resolve(fn()), 100));
  const causeChange = (c, v) =>
    c.find('input').simulate('change', { target: { value: v } });
  const initialState = mockedComponent.state();
  const testMessage = '__TEST__EVENT__MESSAGE__';
  const changed = () => {
    causeChange(mockedComponent, testMessage);
    return waitForIt(() => mockedComponent);
  };
  const afterInput = await changed();
  assert(
    initialState.input === '' &&
      afterInput.state().input === '__TEST__EVENT__MESSAGE__'
  );
};
```

单击 `Add message` 按钮应调用 `submitMessage` 方法，添加当前 `input` 到状态中的 `messages` 数组。

```js
async () => {
  const mockedComponent = Enzyme.mount(React.createElement(DisplayMessages));
  const waitForIt = (fn) =>
    new Promise((resolve, reject) => setTimeout(() => resolve(fn()), 100));
  const causeChange = (c, v) =>
    c.find('input').simulate('change', { target: { value: v } });
  const initialState = mockedComponent.state();
  const testMessage_1 = '__FIRST__MESSAGE__';
  const firstChange = () => {
    causeChange(mockedComponent, testMessage_1);
    return waitForIt(() => mockedComponent);
  };
  const firstResult = await firstChange();
  const firstSubmit = () => {
    mockedComponent.find('button').simulate('click');
    return waitForIt(() => mockedComponent);
  };
  const afterSubmit_1 = await firstSubmit();
  const submitState_1 = afterSubmit_1.state();
  const testMessage_2 = '__SECOND__MESSAGE__';
  const secondChange = () => {
    causeChange(mockedComponent, testMessage_2);
    return waitForIt(() => mockedComponent);
  };
  const secondResult = await secondChange();
  const secondSubmit = () => {
    mockedComponent.find('button').simulate('click');
    return waitForIt(() => mockedComponent);
  };
  const afterSubmit_2 = await secondSubmit();
  const submitState_2 = afterSubmit_2.state();
  assert(
    initialState.messages.length === 0 &&
      submitState_1.messages.length === 1 &&
      submitState_2.messages.length === 2 &&
      submitState_2.messages[1] === testMessage_2
  );
};
```

`submitMessage` 方法应清除当前输入。

```js
async () => {
  const mockedComponent = Enzyme.mount(React.createElement(DisplayMessages));
  const waitForIt = (fn) =>
    new Promise((resolve, reject) => setTimeout(() => resolve(fn()), 100));
  const causeChange = (c, v) =>
    c.find('input').simulate('change', { target: { value: v } });
  const initialState = mockedComponent.state();
  const testMessage = '__FIRST__MESSAGE__';
  const firstChange = () => {
    causeChange(mockedComponent, testMessage);
    return waitForIt(() => mockedComponent);
  };
  const firstResult = await firstChange();
  const firstState = firstResult.state();
  const firstSubmit = () => {
    mockedComponent.find('button').simulate('click');
    return waitForIt(() => mockedComponent);
  };
  const afterSubmit = await firstSubmit();
  const submitState = afterSubmit.state();
  assert(firstState.input === testMessage && submitState.input === '');
};
```

# --seed--

## --after-user-code--

```jsx
ReactDOM.render(<DisplayMessages />, document.getElementById('root'))
```

## --seed-contents--

```jsx
class DisplayMessages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      messages: []
    }
  }
  // Add handleChange() and submitMessage() methods here

  render() {
    return (
      <div>
        <h2>Type in a new Message:</h2>
        { /* Render an input, button, and ul below this line */ }

        { /* Change code above this line */ }
      </div>
    );
  }
};
```

# --solutions--

```jsx
class DisplayMessages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      messages: []
    }
 this.handleChange = this.handleChange.bind(this);
   this.submitMessage = this.submitMessage.bind(this);
 }
  handleChange(event) {
    this.setState({
      input: event.target.value
    });
  }
  submitMessage() {
    this.setState((state) => {
      const currentMessage = state.input;
      return {
        input: '',
        messages: state.messages.concat(currentMessage)
      };  
    });
  }
  render() {
    return (
      <div>
        <h2>Type in a new Message:</h2>
        <input
          value={this.state.input}
          onChange={this.handleChange}/><br/>
        <button onClick={this.submitMessage}>Submit</button>
        <ul>
          {this.state.messages.map( (message, idx) => {
              return (
                 <li key={idx}>{message}</li>
              )
            })
          }
        </ul>
      </div>
    );
  }
};
```
