---
id: 5a24c314108439a4d403617b
title: 傳遞迴調作爲 Props
challengeType: 6
forumTopicId: 301400
dashedName: pass-a-callback-as-props
---

# --description--

可以將 `state` 作爲 props 傳遞給子組件，但不僅限於傳遞數據。 也可以將函數或在 React 組件中定義的任何方法傳遞給子組件。 這就是子組件與父組件交互的方式。 可以把方法像普通 prop 一樣傳遞給子組件， 它會被分配一個名字，可以在子組件中的 `this.props` 下訪問該方法的名字。

# --instructions--

代碼編輯器中列出了三個組件。 `MyApp` 是父組件，`GetInput` 和`RenderInput` 是它將要渲染的子組件。 將 `GetInput` 組件添加到 `MyApp` 的 render 方法，然後將 `MyApp` 的 `state` 中的 `inputValue` 傳入名爲 `input` 的 prop。 還要創建一個名爲 `handleChange` 的 prop，並將輸入處理程序 `handleChange` 傳遞給它。

接下來，將 `RenderInput` 添加到 `MyApp` 中的 render 方法中，然後創建一個名爲 `input` 的 prop，並將 `state` 中的 `inputValue` 傳遞給它。 完成後，可以在 `GetInput` 組件中的 `input` 字段中鍵入內容，然後該組件通過 props 調用其父組件中的處理函數方法。 這將更新處於父組件 `state` 中的 input，該 input 將作爲 props 傳遞給兩個子組件。 觀察數據如何在組件之間流動，以及單一數據源如何保持父組件`state`。 誠然，這個示例有點做作，但是應該能用來說明數據和回調是如何在 React 組件之間傳遞的。

# --hints--

應該渲染 `MyApp` 組件。

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(MyApp));
    return mockedComponent.find('MyApp').length === 1;
  })()
);
```

應該渲染 `GetInput` 組件。

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(MyApp));
    return mockedComponent.find('GetInput').length === 1;
  })()
);
```

應該渲染 `RenderInput` 組件。

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(MyApp));
    return mockedComponent.find('RenderInput').length === 1;
  })()
);
```

`GetInput` 組件應該接收 `MyApp` 的 state 屬性 `inputValue` 作爲 props，幷包含一個修改 `MyApp` state 的 `input` 元素。

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

`RenderInput` 組件應該接收 `MyApp` state 屬性 `inputValue` 作爲 props。

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
