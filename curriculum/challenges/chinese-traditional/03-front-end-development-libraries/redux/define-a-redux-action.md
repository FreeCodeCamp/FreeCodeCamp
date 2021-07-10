---
id: 5a24c314108439a4d403614d
title: 定義一個 Redux Action
challengeType: 6
forumTopicId: 301440
dashedName: define-a-redux-action
---

# --description--

由於 Redux 是一個狀態管理框架，因此更新狀態是其核心任務之一。 在 Redux 中，所有狀態更新都由 dispatch action 觸發， action 只是一個 JavaScript 對象，其中包含有關已發生的 action 事件的信息。 Redux store 接收這些 action 對象，然後更新相應的狀態。 有時，Redux action 也會攜帶一些數據。 例如，在用戶登錄後攜帶用戶名， 雖然數據是可選的，但 action 必須帶有 `type` 屬性，該屬性表示此 action 的類型。

我們可以將 Redux action 視爲信使，將有關應用程序中發生的事件信息提供給 Redux store， 然後 store 根據發生的 action 進行狀態的更新。

# --instructions--

編寫 Redux action 就像聲明具有 type 屬性的對象一樣簡單， 聲明一個對象 `action` 併爲它設置一個屬性 `type`，並將它的值設置成字符串`'LOGIN'`。

# --hints--

`action` 對象應該存在。

```js
assert(
  (function () {
    return typeof action === 'object';
  })()
);
```

`action` 對象應該有一個值爲 `LOGIN` 的 `type` 屬性。

```js
assert(
  (function () {
    return action.type === 'LOGIN';
  })()
);
```

# --seed--

## --seed-contents--

```js
// Define an action here:
```

# --solutions--

```js
const action = {
  type: 'LOGIN'
}
```
