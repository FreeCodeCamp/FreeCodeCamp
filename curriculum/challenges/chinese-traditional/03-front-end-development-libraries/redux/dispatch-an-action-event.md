---
id: 5a24c314108439a4d403614f
title: 分發 Action Event
challengeType: 6
forumTopicId: 301442
dashedName: dispatch-an-action-event
---

# --description--

`dispatch` 方法用於將 action 分派給 Redux store， 調用 `store.dispatch()` 將從 action creator 返回的值發送回 store。

回想一下，動作創建者返回一個具有 type 屬性的對象，該屬性指定已發生的動作。 然後該方法會將一個 action 對象發送到 Redux store。 基於上一個挑戰的示例，下面的行是等效的，兩者都會調度類 `LOGIN` 類型的 action：

```js
store.dispatch(actionCreator());
store.dispatch({ type: 'LOGIN' });
```

# --instructions--

代碼編輯器中的 Redux store 具有初始化狀過的 state，包含 `login` 屬性當前設置爲 `false`的對象， 還有一個名爲 `loginAction()` 的 action creator，它返回類型爲 `LOGIN` 的 action， 然後通過調用 `dispatch` 方法將 `LOGIN` 的 action dispatch 給 Redux store，並傳入 `loginAction()` 創建的 action。

# --hints--

調用函數 `loginAction` 應該返回一個 `type` 屬性設置爲字符串 `LOGIN` 的對象。

```js
assert(loginAction().type === 'LOGIN');
```

store 應該用屬性 `login` 設置爲 `false` 的對象初始化。

```js
assert(store.getState().login === false);
```

`store.dispatch()` 方法應該被用於 dispatch 一個類型爲 `LOGIN` 的 action。

```js
(getUserInput) =>
  assert(
    (function () {
      let noWhiteSpace = getUserInput('index').replace(/\s/g, '');
      return (
        noWhiteSpace.includes('store.dispatch(loginAction())') ||
        noWhiteSpace.includes("store.dispatch({type: 'LOGIN'})") === true
      );
    })()
  );
```

# --seed--

## --seed-contents--

```js
const store = Redux.createStore(
  (state = {login: false}) => state
);

const loginAction = () => {
  return {
    type: 'LOGIN'
  }
};

// Dispatch the action here:
```

# --solutions--

```js
const store = Redux.createStore(
  (state = {login: false}) => state
);

const loginAction = () => {
  return {
    type: 'LOGIN'
  }
};

store.dispatch(loginAction());
```
