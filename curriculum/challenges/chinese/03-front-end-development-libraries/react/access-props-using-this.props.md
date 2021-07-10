---
id: 5a24c314108439a4d403616e
title: 使用 this.props 访问 Props
challengeType: 6
forumTopicId: 301375
dashedName: access-props-using-this-props
---

# --description--

前几项挑战涵盖了将 props 传递给子组件的基本方法。 但是，倘若接收 prop 的子组件不是无状态函数组件，而是一个 ES6 类组件又当如何呢？ ES6 类组件访问 props 的方法略有不同。

任何时候，如果要引用类组件本身，可以使用 `this` 关键字。 要访问类组件中的 props，需要在在访问它的代码前面添加 `this`。 例如，如果 ES6 类组件有一个名为 `data` 的 prop，可以在 JSX 中这样写：`{this.props.data}`。

# --instructions--

在父组件 `ResetPassword` 中渲染 `ReturnTempPassword` 组件的一个实例。 在这里，为 `ReturnTempPassword` 提供一个 `tempPassword` prop，并赋值一个长度至少为 8 个字符的字符串。 在子组件 `ReturnTempPassword` 中，访问 `strong` 标签中的 `tempPassword` prop，以确保用户看到临时密码。

# --hints--

`ResetPassword` 组件应该返回单个 `div` 元素。

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(ResetPassword));
    return mockedComponent.children().type() === 'div';
  })()
);
```

`ResetPassword` 的第四个子组件应该是 `ReturnTempPassword` 组件。

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

`ReturnTempPassword` 组件应该有一个名为 `tempPassword` 的属性。

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(ResetPassword));
    return mockedComponent.find('ReturnTempPassword').props().tempPassword;
  })()
);
```

`ReturnTempPassword` 组件的 `tempPassword` prop 值应该是一个字符串，至少为 8 个字符。

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

`ReturnTempPassword` 组件应该显示作为 `tempPassword` prop 创建的密码，并且密码被包裹在 `strong` 标签中。

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
