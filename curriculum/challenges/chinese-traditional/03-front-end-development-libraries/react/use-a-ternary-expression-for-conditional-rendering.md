---
id: 5a24c314108439a4d4036187
title: 使用三元表達式進行條件渲染
challengeType: 6
forumTopicId: 301414
dashedName: use-a-ternary-expression-for-conditional-rendering
---

# --description--

在繼續使用動態渲染技術之前，還有最後一種方法可以渲染想要的東西，它使用內置的 JavaScript 條件：<dfn>三元運算符</dfn>。 三元運算符經常被用作 JavaScript 中 `if/else` 語句的縮寫。 它們不像傳統的 `if/else` 語句那樣強大，但是在 React 開發人員中非常流行， 原因之一就是 JSX 的編譯原理，`if/else` 語句不能直接插入到 JSX 代碼中。 可能你在前幾個挑戰就注意到了這一點——當需要 `if/else` 語句時，它總是在 `return` 語句的*外面*。 如果想在 JSX 中實現條件邏輯，三元表達式是一個很好的選擇。 回想一下，三元運算符有三個部分，但是可以將多個三元表達式組合在一起。 以下是基本語法：

```jsx
condition ? expressionIfTrue : expressionIfFalse;
```

# --instructions--

代碼編輯器在 `CheckUserAge` 組件的 `render()` 方法中定義了三個常量， 它們分別是 `buttonOne`、`buttonTwo` 和 `buttonThree`。 每個都分配了一個表示按鈕元素的簡單 JSX 表達式。 首先，使用 `input` 和 `userAge` 初始化 `CheckUserAge` 的 state，並將其值設置爲空字符串。

一旦組件將信息渲染給頁面，用戶應該有一種方法與之交互。 在組件的 `return` 語句中，設置一個實現以下邏輯的三元表達式：當頁面首次加載時，將提交按鈕 `buttonOne` 渲染到頁面。 然後，當用戶輸入年齡並點擊該按鈕時，根據年齡渲染不同的按鈕。 如果用戶輸入的數字小於`18`，則渲染`buttonThree`。 如果用戶輸入的數字大於或等於`18`，則渲染`buttonTwo`。

# --hints--

`CheckUserAge` 組件應該渲染出單個 `input` 元素和單個 `button` 元素。

```js
assert(
  Enzyme.mount(React.createElement(CheckUserAge)).find('div').find('input')
    .length === 1 &&
    Enzyme.mount(React.createElement(CheckUserAge)).find('div').find('button')
      .length === 1
);
```

`CheckUserAge` 組件的 state 應該用 `userAge` 屬性和 `input` 屬性初始化，並且這兩個屬性的值都被設置爲空字符串。

```js
assert(
  Enzyme.mount(React.createElement(CheckUserAge)).state().input === '' &&
    Enzyme.mount(React.createElement(CheckUserAge)).state().userAge === ''
);
```

當 `CheckUserAge` 組件首次渲染到 DOM 時，`button` 內部的文本應爲 Submit。

```js
assert(
  Enzyme.mount(React.createElement(CheckUserAge)).find('button').text() ===
    'Submit'
);
```

當小於 18 的數字輸入到 `input` 元素中，並點擊該`button` 時，該 `button` 的內部文本應該是 `You Shall Not Pass`。

```js
(() => {
  const mockedComponent = Enzyme.mount(React.createElement(CheckUserAge));
  const initialButton = mockedComponent.find('button').text();
  const enter3AndClickButton = () => {
    mockedComponent
      .find('input')
      .simulate('change', { target: { value: '3' } });
    mockedComponent.find('button').simulate('click');
    mockedComponent.update();
    return mockedComponent.find('button').text();
  };
  const enter17AndClickButton = () => {
    mockedComponent
      .find('input')
      .simulate('change', { target: { value: '17' } });
    mockedComponent.find('button').simulate('click');
    mockedComponent.update();
    return mockedComponent.find('button').text();
  };
  const userAge3 = enter3AndClickButton();
  const userAge17 = enter17AndClickButton();
  assert(
    initialButton === 'Submit' &&
      userAge3 === 'You Shall Not Pass' &&
      userAge17 === 'You Shall Not Pass'
  );
})();
```

當大於或等於 18 的數字輸入到 `input` 元素中，並點擊該 `button` 時，該 `button` 的內部文本應該是 `You May Enter`。

```js
(() => {
  const mockedComponent = Enzyme.mount(React.createElement(CheckUserAge));
  const initialButton = mockedComponent.find('button').text();
  const enter18AndClickButton = () => {
    mockedComponent
      .find('input')
      .simulate('change', { target: { value: '18' } });
    mockedComponent.find('button').simulate('click');
    mockedComponent.update();
    return mockedComponent.find('button').text();
  };
  const enter35AndClickButton = () => {
    mockedComponent
      .find('input')
      .simulate('change', { target: { value: '35' } });
    mockedComponent.find('button').simulate('click');
    mockedComponent.update();
    return mockedComponent.find('button').text();
  };
  const userAge18 = enter18AndClickButton();
  const userAge35 = enter35AndClickButton();
  assert(
    initialButton === 'Submit' &&
      userAge18 === 'You May Enter' &&
      userAge35 === 'You May Enter'
  );
})();
```

提交了一個數字之後，並再次更改了 `input` 的值，該 `button` 內部文本應該變回 `Submit`。

```js
(() => {
  const mockedComponent = Enzyme.mount(React.createElement(CheckUserAge));
  const enter18AndClickButton = () => {
    mockedComponent
      .find('input')
      .simulate('change', { target: { value: '18' } });
    mockedComponent.find('button').simulate('click');
    mockedComponent.update();
    return mockedComponent.find('button').text();
  };
  const changeInputDontClickButton = () => {
    mockedComponent
      .find('input')
      .simulate('change', { target: { value: '5' } });
    mockedComponent.update();
    return mockedComponent.find('button').text();
  };
  const enter10AndClickButton = () => {
    mockedComponent
      .find('input')
      .simulate('change', { target: { value: '10' } });
    mockedComponent.find('button').simulate('click');
    mockedComponent.update();
    return mockedComponent.find('button').text();
  };
  const userAge18 = enter18AndClickButton();
  const changeInput1 = changeInputDontClickButton();
  const userAge10 = enter10AndClickButton();
  const changeInput2 = changeInputDontClickButton();
  assert(
    userAge18 === 'You May Enter' &&
      changeInput1 === 'Submit' &&
      userAge10 === 'You Shall Not Pass' &&
      changeInput2 === 'Submit'
  );
})();
```

你的代碼不應該包含任何 `if/else` 語句。

```js
assert(
  new RegExp(/(\s|;)if(\s|\()/).test(
    Enzyme.mount(React.createElement(CheckUserAge)).instance().render.toString()
  ) === false
);
```

# --seed--

## --after-user-code--

```jsx
ReactDOM.render(<CheckUserAge />, document.getElementById('root'));
```

## --seed-contents--

```jsx
const inputStyle = {
  width: 235,
  margin: 5
};

class CheckUserAge extends React.Component {
  constructor(props) {
    super(props);
    // Change code below this line

    // Change code above this line
    this.submit = this.submit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.setState({
      input: e.target.value,
      userAge: ''
    });
  }
  submit() {
    this.setState(state => ({
      userAge: state.input
    }));
  }
  render() {
    const buttonOne = <button onClick={this.submit}>Submit</button>;
    const buttonTwo = <button>You May Enter</button>;
    const buttonThree = <button>You Shall Not Pass</button>;
    return (
      <div>
        <h3>Enter Your Age to Continue</h3>
        <input
          style={inputStyle}
          type='number'
          value={this.state.input}
          onChange={this.handleChange}
        />
        <br />
        {/* Change code below this line */}

        {/* Change code above this line */}
      </div>
    );
  }
}
```

# --solutions--

```jsx
const inputStyle = {
  width: 235,
  margin: 5
};

class CheckUserAge extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userAge: '',
      input: ''
    };
    this.submit = this.submit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.setState({
      input: e.target.value,
      userAge: ''
    });
  }
  submit() {
    this.setState(state => ({
      userAge: state.input
    }));
  }
  render() {
    const buttonOne = <button onClick={this.submit}>Submit</button>;
    const buttonTwo = <button>You May Enter</button>;
    const buttonThree = <button>You Shall Not Pass</button>;
    return (
      <div>
        <h3>Enter Your Age to Continue</h3>
        <input
          style={inputStyle}
          type='number'
          value={this.state.input}
          onChange={this.handleChange}
        />
        <br />
        {this.state.userAge === ''
          ? buttonOne
          : this.state.userAge >= 18
          ? buttonTwo
          : buttonThree}
      </div>
    );
  }
}
```
