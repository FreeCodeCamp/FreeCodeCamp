---
id: 5a24c314108439a4d4036178
title: 創建一個可以控制的輸入框
challengeType: 6
forumTopicId: 301385
dashedName: create-a-controlled-input
---

# --description--

應用程序可能在 `state` 和渲染的 UI 之間有更復雜的交互。 例如，用於文本輸入的表單控件元素（如 `input` 和 `textarea`）在用戶鍵入時在 DOM 中維護自己的 state。 通過 React，可以將這種可變 state 轉移到 React 組件的 `state` 中。 用戶的輸入變成了應用程序 `state` 的一部分，因此 React 控制該輸入字段的值。 通常，如果 React 組件具有用戶可以鍵入的輸入字段，那麼它將是一個受控的輸入表單。

# --instructions--

代碼編輯器具有一個名爲 `ControlledInput` 的組件框架，用於創建受控的 `input` 元素。 組件的 `state` 已經被包含空字符串的 `input` 屬性初始化。 此值表示用戶在 `input` 字段中鍵入的文本。

首先，創建一個名爲 `handleChange()` 的方法，該方法具有一個名爲 `event` 的參數。 方法被調用時，它接收一個 `event` 對象，該對象包含一個來自 `input` 元素的字符串文本。 可以使用方法內的 `event.target.value` 來訪問這個字符串。 用這個新字符串更新組件的`state`的`input`屬性。

在 `render` 方法中的 `h4` 標籤之上創建 `input` 元素。 添加一個 `value` 屬性，使其等於組件 `state` 的 `input` 屬性。 然後將 `onChange()` 事件處理程序設置到 `handleChange()` 方法中。

在輸入框中鍵入時，文本由 `handleChange()` 方法處理，文本被設置爲本地 `state` 中的 `input` 屬性，並渲染在頁面上的 `input` 框中。 組件 `state` 是輸入數據的唯一真實來源。

最後，不要忘記在構造函數中添加必要的綁定。

# --hints--

`ControlledInput` 應該返回包含一個 `input` 標籤和 `p` 標籤的 `div` 元素。

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

`ControlledInput` 的 state 應該使用設置爲空字符串的 `input` 屬性初始化。

```js
assert.strictEqual(
  Enzyme.mount(React.createElement(ControlledInput)).state('input'),
  ''
);
```

Input 元素中的鍵入值應該更新 input 的 state 和值，並且 `p` 元素應該在輸入時呈現 state。

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
