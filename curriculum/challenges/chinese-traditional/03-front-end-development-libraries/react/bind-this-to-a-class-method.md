---
id: 5a24c314108439a4d4036174
title: 將 this 綁定到 Class 方法上
challengeType: 6
forumTopicId: 301379
dashedName: bind-this-to-a-class-method
---

# --description--

除了設置和更新 `state` 之外，還可以爲組件類定義方法。 類方法通常需要使用 `this` 關鍵字，以便它可以訪問方法中類的屬性（例如 `state` 和 `props`）。 有幾種方法可以讓類方法訪問 `this`。

一種常見的方法是在構造函數中顯式地綁定 `this`，這樣當組件初始化時，`this` 就會綁定到類方法。 你可能已經注意到上一個挑戰在構造函數中的 `handleClick` 方法使用了 `this.handleClick = this.handleClick.bind(this)`。 然後，當在類方法中調用像 `this.setState()` 這樣的函數時，`this` 指的是這個類，而不是 `undefined`。

**注意：** `this`關鍵字是 JavaScript 中最令人困惑的方面之一，但它在 React 中扮演着重要的角色。 雖然它的行爲在這裏是完全正常的，但是這些課程並不深入研究`this`，所以如果以上內容令你感到困惑，請參考其他課程！

# --instructions--

代碼編輯器有一個帶有 `state` 的組件，用於跟蹤項目計數。 它還有一個方法，允許設置文本爲 `You clicked!`。 但是，該方法不起作用，因爲它使用了未定義的 `this` 關鍵字。 可以通過將 `this` 顯式綁定到組件構造函數中的 `handleClick()`方法來修復它。

接下來，向 render 方法中的 `button` 元素添加一個單擊處理程序。 當按鈕接收到單擊事件時，它應該觸發 `handleClick()` 方法。 記住，傳遞給 `onClick` 處理程序的方法需要使用花括號，因爲它應該直接被解釋爲 JavaScript。

完成上述步驟後，可以單擊按鈕並看到 `You clicked!`。

# --hints--

`MyComponent` 應返回 `div` 元素，該元素按順序包含兩個元素，一個按鈕和一個 `h1` 元素。

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

`MyComponent` 的 state 應該使用鍵值對 `{ text: "Hello" }`，進行初始化。

```js
assert(
  Enzyme.mount(React.createElement(MyComponent)).state('text') === 'Hello'
);
```

單擊 `button` 元素應該運行 `handleClick` 方法，並使 state `text` 爲 `You clicked!`。

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
