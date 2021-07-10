---
id: 5a24c314108439a4d4036173
title: 用 this.setState 設置狀態
challengeType: 6
forumTopicId: 301412
dashedName: set-state-with-this-setstate
---

# --description--

前面的挑戰涵蓋了組件的 `state` 以及如何在 `constructor` 中初始化 state。 還有一種方法可以更改組件的 `state`， React 提供了 `setState` 方法來更新組件的 `state`。 在組件類中調用 `setState` 方法如下所示：`this.setState()`，傳入鍵值對的對象， 其中鍵是 state 屬性，值是更新後的 state 數據。 例如，如果我們在 state 中存儲 `username`，並想要更新它，代碼如下所示：

```jsx
this.setState({
  username: 'Lewis'
});
```

React 要求永遠不要直接修改 `state`，而是在 state 發生改變時始終使用 `this.setState()`。 此外，應該注意，React 可以批量處理多個 state 更新以提高性能。 這意味着通過 `setState` 方法進行的 state 更新可以是異步的。 `setState` 方法有一種替代語法可以解決異步問題， 雖然這很少用到，但是最好還是記住它！ 有關詳細信息，請參閱[React 文檔](https://facebook.github.io/react/docs/state-and-lifecycle.html)。

# --instructions--

代碼編輯器中有一個 `button` 元素，它有一個 `onClick()` 處理程序。 當 `button` 在瀏覽器中接收到單擊事件時觸發此處理程序，並運行 `MyComponent` 中定義的 `handleClick` 方法。 在 `handleClick` 方法中，使用 `this.setState()` 更新組件的 `state`。 設置 `state` 中的 `name` 屬性爲字符串 `React Rocks!`。

單擊按鈕查看渲染的 state 的更新。 如果不完全理解單擊處理程序代碼在此時的工作方式，請不要擔心。 在接下來的挑戰中會有講述。

# --hints--

`MyComponent` 的 state 應該使用鍵值對 `{ name: Initial State }` 來初始化。

```js
assert(
  Enzyme.mount(React.createElement(MyComponent)).state('name') ===
    'Initial State'
);
```

`MyComponent` 應該渲染一個 `h1` 標題。

```js
assert(Enzyme.mount(React.createElement(MyComponent)).find('h1').length === 1);
```

渲染的 `h1` 標題中應該包含一段文本，這段文本是從組件的 state 中渲染出來的。

```js
async () => {
  const waitForIt = (fn) =>
    new Promise((resolve, reject) => setTimeout(() => resolve(fn()), 250));
  const mockedComponent = Enzyme.mount(React.createElement(MyComponent));
  const first = () => {
    mockedComponent.setState({ name: 'TestName' });
    return waitForIt(() => mockedComponent.html());
  };
  const firstValue = await first();
  assert(/<h1>TestName<\/h1>/.test(firstValue));
};
```

調用 `MyComponent` 的 `handleClick` 方法應該將 state 的 name 屬性設置爲 `React Rocks!`。

```js
async () => {
  const waitForIt = (fn) =>
    new Promise((resolve, reject) => setTimeout(() => resolve(fn()), 250));
  const mockedComponent = Enzyme.mount(React.createElement(MyComponent));
  const first = () => {
    mockedComponent.setState({ name: 'Before' });
    return waitForIt(() => mockedComponent.state('name'));
  };
  const second = () => {
    mockedComponent.instance().handleClick();
    return waitForIt(() => mockedComponent.state('name'));
  };
  const firstValue = await first();
  const secondValue = await second();
  assert(firstValue === 'Before' && secondValue === 'React Rocks!');
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
      name: 'Initial State'
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    // Change code below this line

    // Change code above this line
  }
  render() {
    return (
      <div>
        <button onClick={this.handleClick}>Click Me</button>
        <h1>{this.state.name}</h1>
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
      name: 'Initial State'
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
     // Change code below this line
    this.setState({
      name: 'React Rocks!'
    });
    // Change code above this line
  }
  render() {
    return (
      <div>
        <button onClick = {this.handleClick}>Click Me</button>
        <h1>{this.state.name}</h1>
      </div>
    );
  }
};
```
