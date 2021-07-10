---
id: 5a24c314108439a4d403614c
title: 從 Redux Store 獲取狀態
challengeType: 6
forumTopicId: 301443
dashedName: get-state-from-the-redux-store
---

# --description--

Redux store 對象提供了幾種與之交互的方法， 比如，可以使用 `getState()` 方法檢索 Redux store 對象中保存的當前 `state`。

# --instructions--

在代碼編輯器中可以將上一個挑戰中的代碼更簡潔地重寫， 在 `store` 中使用 `store.getState()` 檢索`state`，並將其分配給新變量 `currentState`。

# --hints--

Redux store 的 state 應該有一個初始值 5。

```js
assert(store.getState() === 5);
```

應該存在一個變量 `currentState`，併爲其分配 Redux store 的當前狀態。

```js
(getUserInput) =>
  assert(
    currentState === 5 && getUserInput('index').includes('store.getState()')
  );
```

# --seed--

## --seed-contents--

```js
const store = Redux.createStore(
  (state = 5) => state
);

// Change code below this line
```

# --solutions--

```js
const store = Redux.createStore(
  (state = 5) => state
);

// Change code below this line
const currentState = store.getState();
```
