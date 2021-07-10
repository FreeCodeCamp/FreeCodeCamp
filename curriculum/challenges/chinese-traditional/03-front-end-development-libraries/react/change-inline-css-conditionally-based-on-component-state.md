---
id: 5a24c314108439a4d4036189
title: 根據組件狀態有條件地更改內聯 CSS
challengeType: 6
forumTopicId: 301380
dashedName: change-inline-css-conditionally-based-on-component-state
---

# --description--

此時，已經看到了一些條件渲染的應用程序和內聯樣式的使用。 這裏還有一個將這兩個主題結合在一起的例子。 你也可以根據 React 組件的 state 有條件地渲染 CSS。 要執行此操作，請檢查條件，如果滿足該條件，則修改在 render 方法中分配給 JSX 元素的樣式對象。

理解這個模式很重要，因爲相比傳統的方式（這在 jQuery 中非常常見），直接修改 DOM 元素來應用樣式的方法是一個戲劇性的轉變。 在該方法中，必須跟蹤元素何時更改並直接處理實際操作。 跟蹤更改可能變得很困難，可能會使 UI無法預測。 當根據一個條件設置一個樣式對象時，描述了 UI 作爲應用程序的狀態函數應當如何展現。 如此便有一個清晰的單向流動的信息流。 這是使用 React 編寫應用程序時的首選方法。

# --instructions--

代碼編輯器有一個簡單的帶有邊框樣式的受控 input 組件。 如果用戶在輸入框中鍵入超過 15 個字符的文本，希望將此邊框變成紅色。 添加一個條件來檢查這一點，如果條件有效，則將 input 的邊框樣式設置爲`3px solid red`。 可以通過在 input 中輸入文本來檢測它。

# --hints--

`GateKeeper` 組件應該渲染一個 `div` 元素。

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(GateKeeper));
    return mockedComponent.find('div').length === 1;
  })()
);
```

`GateKeeper` 組件應使用初始爲空字符串的 `input` 進行初始化 state。

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(GateKeeper));
    return mockedComponent.state().input === '';
  })()
);
```

`GateKeeper` 組件應該渲染一個 `h3` 標籤和一個 `input` 標籤。

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(GateKeeper));
    return (
      mockedComponent.find('h3').length === 1 &&
      mockedComponent.find('input').length === 1
    );
  })()
);
```

`input` 標籤 `border` 屬性的樣式應該初始化爲 `1px solid black`。

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(GateKeeper));
    return (
      mockedComponent.find('input').props().style.border === '1px solid black'
    );
  })()
);
```

如果 state 中 input 的值超過 15 個字符，則 `input` 標籤的 border 樣式應爲 `3px solid red`。

```js
async () => {
  const waitForIt = (fn) =>
    new Promise((resolve, reject) => setTimeout(() => resolve(fn()), 100));
  const mockedComponent = Enzyme.mount(React.createElement(GateKeeper));
  const simulateChange = (el, value) =>
    el.simulate('change', { target: { value } });
  let initialStyle = mockedComponent.find('input').props().style.border;
  const state_1 = () => {
    mockedComponent.setState({ input: 'this is 15 char' });
    return waitForIt(() => mockedComponent.find('input').props().style.border);
  };
  const state_2 = () => {
    mockedComponent.setState({
      input: 'A very long string longer than 15 characters.'
    });
    return waitForIt(() => mockedComponent.find('input').props().style.border);
  };
  const style_1 = await state_1();
  const style_2 = await state_2();
  assert(
    initialStyle === '1px solid black' &&
      style_1 === '1px solid black' &&
      style_2 === '3px solid red'
  );
};
```

# --seed--

## --after-user-code--

```jsx
ReactDOM.render(<GateKeeper />, document.getElementById('root'))
```

## --seed-contents--

```jsx
class GateKeeper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({ input: event.target.value })
  }
  render() {
    let inputStyle = {
      border: '1px solid black'
    };
    // Change code below this line

    // Change code above this line
    return (
      <div>
        <h3>Don't Type Too Much:</h3>
        <input
          type="text"
          style={inputStyle}
          value={this.state.input}
          onChange={this.handleChange} />
      </div>
    );
  }
};
```

# --solutions--

```jsx
class GateKeeper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({ input: event.target.value })
  }
  render() {
    let inputStyle = {
      border: '1px solid black'
    };
    if (this.state.input.length > 15) {
      inputStyle.border = '3px solid red';
    };
    return (
      <div>
        <h3>Don't Type Too Much:</h3>
        <input
          type="text"
          style={inputStyle}
          value={this.state.input}
          onChange={this.handleChange} />
      </div>
    );
  }
};
```
