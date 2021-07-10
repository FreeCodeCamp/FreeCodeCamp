---
id: 5a24c314108439a4d403614e
title: 定義一個 Action Creator
challengeType: 6
forumTopicId: 301441
dashedName: define-an-action-creator
---

# --description--

創建 action 後要將 action 發送到 Redux store，以便它可以更新其狀態。 在 Redux 中，可以定義動作創建器來完成此任務， action creator 只是一個返回動作的 JavaScript 函數， 換句話說，action creator 創建表示動作事件的對象。

# --instructions--

定義名爲 `actionCreator()` 的函數，該函數在調用時返回 `action` 對象。

# --hints--

函數 `actionCreator` 應該存在。

```js
assert(typeof actionCreator === 'function');
```

運行 `actionCreator` 函數應返回 `action` 對象。

```js
assert(typeof action === 'object');
```

返回的 `action` 對象應該有一個值爲 `LOGIN` 的 `type` 屬性。

```js
assert(action.type === 'LOGIN');
```

# --seed--

## --seed-contents--

```js
const action = {
  type: 'LOGIN'
}
// Define an action creator here:
```

# --solutions--

```js
const action = {
  type: 'LOGIN'
}
const actionCreator = () => {
  return action;
};
```
