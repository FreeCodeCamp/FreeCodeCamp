---
id: 5a24c314108439a4d403616e
title: 使用 this.props 訪問 Props
challengeType: 6
forumTopicId: 301375
dashedName: access-props-using-this-props
---

# --description--

前幾項挑戰涵蓋了將 props 傳遞給子組件的基本方法。 但是，倘若接收 prop 的子組件不是無狀態函數組件，而是一個 ES6 類組件又當如何呢？ ES6 類組件訪問 props 的方法略有不同。

任何時候，如果要引用類組件本身，可以使用 `this` 關鍵字。 要訪問類組件中的 props，需要在在訪問它的代碼前面添加 `this`。 例如，如果 ES6 類組件有一個名爲 `data` 的 prop，可以在 JSX 中這樣寫：`{this.props.data}`。

# --instructions--

在父組件 `ResetPassword` 中渲染 `ReturnTempPassword` 組件的一個實例。 在這裏，爲 `ReturnTempPassword` 提供一個 `tempPassword` prop，並賦值一個長度至少爲 8 個字符的字符串。 在子組件 `ReturnTempPassword` 中，訪問 `strong` 標籤中的 `tempPassword` prop，以確保用戶看到臨時密碼。

# --hints--

`ResetPassword` 組件應該返回單個 `div` 元素。

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(ResetPassword));
    return mockedComponent.children().type() === 'div';
  })()
);
```

`ResetPassword` 的第四個子組件應該是 `ReturnTempPassword` 組件。

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(ResetPassword));
    return (
      mockedComponent.children().childAt(3).name() === 'ReturnTempPassword'
    );
  })()
);
```

`ReturnTempPassword` 組件應該有一個名爲 `tempPassword` 的屬性。

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(ResetPassword));
    return mockedComponent.find('ReturnTempPassword').props().tempPassword;
  })()
);
```

`ReturnTempPassword` 組件的 `tempPassword` prop 值應該是一個字符串，至少爲 8 個字符。

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(ResetPassword));
    const temp = mockedComponent.find('ReturnTempPassword').props()
      .tempPassword;
    return typeof temp === 'string' && temp.length >= 8;
  })()
);
```

`ReturnTempPassword` 組件應該顯示作爲 `tempPassword` prop 創建的密碼，並且密碼被包裹在 `strong` 標籤中。

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(ResetPassword));
    return (
      mockedComponent.find('strong').text() ===
      mockedComponent.find('ReturnTempPassword').props().tempPassword
    );
  })()
);
```

# --seed--

## --after-user-code--

```jsx
ReactDOM.render(<ResetPassword />, document.getElementById('root'))
```

## --seed-contents--

```jsx
class ReturnTempPassword extends React.Component {
  constructor(props) {
    super(props);

  }
  render() {
    return (
        <div>
            { /* Change code below this line */ }
            <p>Your temporary password is: <strong></strong></p>
            { /* Change code above this line */ }
        </div>
    );
  }
};

class ResetPassword extends React.Component {
  constructor(props) {
    super(props);

  }
  render() {
    return (
        <div>
          <h2>Reset Password</h2>
          <h3>We've generated a new temporary password for you.</h3>
          <h3>Please reset this password from your account settings ASAP.</h3>
          { /* Change code below this line */ }

          { /* Change code above this line */ }
        </div>
    );
  }
};
```

# --solutions--

```jsx
class ReturnTempPassword extends React.Component {
  constructor(props) {
    super(props);

  }
  render() {
    return (
        <div>
            <p>Your temporary password is: <strong>{this.props.tempPassword}</strong></p>
        </div>
    );
  }
};

class ResetPassword extends React.Component {
  constructor(props) {
    super(props);

  }
  render() {
    return (
        <div>
          <h2>Reset Password</h2>
          <h3>We've generated a new temporary password for you.</h3>
          <h3>Please reset this password from your account settings ASAP.</h3>
          { /* Change code below this line */ }
          <ReturnTempPassword tempPassword="serrPbqrPnzc" />
          { /* Change code above this line */ }
        </div>
    );
  }
};
```
