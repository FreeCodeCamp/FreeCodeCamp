---
id: 5a24c314108439a4d4036146
title: 映射 Dispatch 到 Props
challengeType: 6
forumTopicId: 301432
dashedName: map-dispatch-to-props
---

# --description--

`mapDispatchToProps()` 函数可为 React 组件提供特定的创建 action 的函数，以便组件可 dispatch actions，从而更改 Redux store 中的数据。 该函数的结构跟上一挑战中的`mapStateToProps()`函数相似， 它返回一个对象，把 dispatch actions 映射到属性名上，该属性名成为`props`。 然而，每个属性都返回一个用 action creator 及与 action 相关的所有数据调用 `dispatch` 的函数，而不是返回 `state` 的一部分。 可以访问 `dispatch`，因为在定义函数时，我们以参数形式把它传入 `mapDispatchToProps()` 了，这跟 `state` 传入 `mapStateToProps()` 是一样的。 在幕后，React Redux 用 Redux 的 `store.dispatch()` 来管理这些含 `mapDispatchToProps()` 的dispatches， 这跟它使用 `store.subscribe()` 来订阅映射到 `state` 的组件的方式类似。

例如，创建 action 的函数 `loginUser()` 把 `username` 作为 action payload， `mapDispatchToProps()` 返回给创建 action 的函数的对象如下：

```jsx
{
  submitLoginUser: function(username) {
    dispatch(loginUser(username));
  }
}
```

# --instructions--

编辑器上提供的是创建 action 的函数 `addMessage()`。 写出接收 `dispatch` 为参数的函数 `mapDispatchToProps()`，返回一个 dispatch 函数对象， 其属性为 `submitNewMessage`。该函数在 dispatch `addMessage()` 时为新消息提供一个参数。

# --hints--

`addMessage` 应返回含 `type` 和 `message` 两个键的对象。

```js
assert(
  (function () {
    const addMessageTest = addMessage();
    return (
      addMessageTest.hasOwnProperty('type') &&
      addMessageTest.hasOwnProperty('message')
    );
  })()
);
```

`mapDispatchToProps` 应为函数。

```js
assert(typeof mapDispatchToProps === 'function');
```

`mapDispatchToProps` 应返回一个对象。

```js
assert(typeof mapDispatchToProps() === 'object');
```

从 `mapDispatchToProps` 通过 `submitNewMessage` 分发 `addMessage`，应向 dispatch 函数返回一条消息。

```js
assert(
  (function () {
    let testAction;
    const dispatch = (fn) => {
      testAction = fn;
    };
    let dispatchFn = mapDispatchToProps(dispatch);
    dispatchFn.submitNewMessage('__TEST__MESSAGE__');
    return (
      testAction.type === 'ADD' && testAction.message === '__TEST__MESSAGE__'
    );
  })()
);
```

# --seed--

## --seed-contents--

```jsx
const addMessage = (message) => {
  return {
    type: 'ADD',
    message: message
  }
};

// Change code below this line
```

# --solutions--

```jsx
const addMessage = (message) => {
  return {
    type: 'ADD',
    message: message
  }
};

// Change code below this line

const mapDispatchToProps = (dispatch) => {
  return {
    submitNewMessage: function(message) {
      dispatch(addMessage(message));
    }
  }
};
```
