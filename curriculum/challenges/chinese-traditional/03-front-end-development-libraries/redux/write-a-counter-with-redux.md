---
id: 5a24c314108439a4d4036157
title: 用 Redux 寫一個計數器
challengeType: 6
forumTopicId: 301453
dashedName: write-a-counter-with-redux
---

# --description--

現在已經瞭解了 Redux 的所有核心原則！ 已經瞭解瞭如何創建 action 和 action creator，創建 Redux store，通過 store dispatch action，以及使用純粹的 reducer 設計狀態更新。 甚至已經看到過如何使用 reducer 組合管理複雜狀態並處理異步操作。 這些例子很簡單，但這些概念是 Redux 的核心原則。 如果已經理解這些，那麼就可以開始構建自己的 Redux 應用了。 接下來的挑戰包括關於 `state` 不變性的一些細節，但是，這裏是對到目前爲止學到的所有內容的回顧。

# --instructions--

在本課程中，將從頭開始使用 Redux 實現一個簡單的計數器。 基本知識在代碼編輯器中提供，但你必須完成細節！ 使用提供的名稱定義 `incAction` 和 `decAction` action creator，`counterReducer()`，`INCREMENT`和`DECREMENT` action 類型，以及 Redux `store`。 一旦完成，應該能夠 dispatch `INCREMENT` 或 `DECREMENT` 動作來增加或減少 `store` 中保存的狀態。 開始構建你的第一個 Redux 應用程序吧，編碼愉快！

# --hints--

action creator `incAction` 應該返回一個 `type` 等於 `INCREMENT` 的 action 對象。

```js
assert(incAction().type === INCREMENT);
```

action creator `decAction` 應該返回一個 `type` 等於 `DECREMENT` 的 action 對象。

```js
assert(decAction().type === DECREMENT);
```

Redux store 應該將 `state` 初始化爲 0。

```js
assert(store.getState() === 0);
```

在 Redux store 上 dispatch `incAction` 應該將 `state` 增加 1。

```js
assert(
  (function () {
    const initialState = store.getState();
    store.dispatch(incAction());
    const incState = store.getState();
    return initialState + 1 === incState;
  })()
);
```

在 Redux store 上 dispatch `decAction` 應該將 `state` 減少 1。

```js
assert(
  (function () {
    const initialState = store.getState();
    store.dispatch(decAction());
    const decState = store.getState();
    return initialState - 1 === decState;
  })()
);
```

`counterReducer` 必須是一個函數。

```js
assert(typeof counterReducer === 'function');
```

# --seed--

## --seed-contents--

```js
const INCREMENT = null; // Define a constant for increment action types
const DECREMENT = null; // Define a constant for decrement action types

const counterReducer = null; // Define the counter reducer which will increment or decrement the state based on the action it receives

const incAction = null; // Define an action creator for incrementing

const decAction = null; // Define an action creator for decrementing

const store = null; // Define the Redux store here, passing in your reducers
```

# --solutions--

```js
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

const counterReducer = (state = 0, action) => {
  switch(action.type) {
    case INCREMENT:
      return state + 1;
    case DECREMENT:
      return state - 1;
    default:
      return state;
  }
};

const incAction = () => {
  return {
    type: INCREMENT
  }
};

const decAction = () => {
  return {
    type: DECREMENT
  }
};

const store = Redux.createStore(counterReducer);
```
