---
id: 5a24c314108439a4d4036146
title: 映射 Dispatch 到 Props
challengeType: 6
forumTopicId: 301432
dashedName: map-dispatch-to-props
---

# --description--

`mapDispatchToProps()` 函數可爲 React 組件提供特定的創建 action 的函數，以便組件可 dispatch actions，從而更改 Redux store 中的數據。 該函數的結構跟上一挑戰中的`mapStateToProps()`函數相似， 它返回一個對象，把 dispatch actions 映射到屬性名上，該屬性名成爲`props`。 然而，每個屬性都返回一個用 action creator 及與 action 相關的所有數據調用 `dispatch` 的函數，而不是返回 `state` 的一部分。 可以訪問 `dispatch`，因爲在定義函數時，我們以參數形式把它傳入 `mapDispatchToProps()` 了，這跟 `state` 傳入 `mapStateToProps()` 是一樣的。 在幕後，React Redux 用 Redux 的 `store.dispatch()` 來管理這些含 `mapDispatchToProps()` 的dispatches， 這跟它使用 `store.subscribe()` 來訂閱映射到 `state` 的組件的方式類似。

例如，創建 action 的函數 `loginUser()` 把 `username` 作爲 action payload， `mapDispatchToProps()` 返回給創建 action 的函數的對象如下：

```jsx
{
  submitLoginUser: function(username) {
    dispatch(loginUser(username));
  }
}
```

# --instructions--

編輯器上提供的是創建 action 的函數 `addMessage()`。 寫出接收 `dispatch` 爲參數的函數 `mapDispatchToProps()`，返回一個 dispatch 函數對象， 其屬性爲 `submitNewMessage`。該函數在 dispatch `addMessage()` 時爲新消息提供一個參數。

# --hints--

`addMessage` 應返回含 `type` 和 `message` 兩個鍵的對象。

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

`mapDispatchToProps` 應爲函數。

```js
assert(typeof mapDispatchToProps === 'function');
```

`mapDispatchToProps` 應返回一個對象。

```js
assert(typeof mapDispatchToProps() === 'object');
```

從 `mapDispatchToProps` 通過 `submitNewMessage` 分發 `addMessage`，應向 dispatch 函數返回一條消息。

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
