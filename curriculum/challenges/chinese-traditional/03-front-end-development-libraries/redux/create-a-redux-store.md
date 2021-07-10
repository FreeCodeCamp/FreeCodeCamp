---
id: 5a24c314108439a4d403614b
title: 創建一個 Redux Store
challengeType: 6
forumTopicId: 301439
dashedName: create-a-redux-store
---

# --description--

Redux 是一個狀態管理框架，可以與包括 React 在內的許多不同的 Web 技術一起使用。

在 Redux 中，有一個狀態對象負責應用程序的整個狀態， 這意味着如果你有一個包含十個組件且每個組件都有自己的本地狀態的 React 項目，那麼這個項目的整個狀態將通過 Redux `store` 被定義爲單個狀態對象， 這是學習 Redux 時要理解的第一個重要原則：Redux store 是應用程序狀態的唯一真實來源。

這也意味着，如果應用程序想要更新狀態，**只能**通過 Redux store 執行， 單向數據流可以更輕鬆地對應用程序中的狀態進行監測管理。

# --instructions--

Redux `store` 是一個保存和管理應用程序狀態的`state`， 可以使用 Redux 對象中的 `createStore()` 來創建一個 redux `store`， 此方法將 `reducer` 函數作爲必需參數， `reducer` 函數將在後面的挑戰中介紹。該函數已在代碼編輯器中爲你定義， 它只需將 `state` 作爲參數並返回一個 `state` 即可。

聲明一個 `store` 變量並把它分配給 `createStore()` 方法，然後把 `reducer` 作爲一個參數傳入即可。

**注意**: 編輯器中的代碼使用 ES6 默認參數語法將 state 的值初始化爲 `5`， 如果你不熟悉默認參數，你可以參考[ES6 全部課程](https://learn.freecodecamp.org/javascript-algorithms-and-data-structures/es6/set-default-parameters-for-your-functions)，它裏面涵蓋了這個內容。

# --hints--

Redux store 應當存在。

```js
assert(typeof store.getState === 'function');
```

Redux store 的 state 的值應該爲 5。

```js
assert(store.getState() === 5);
```

# --seed--

## --seed-contents--

```js
const reducer = (state = 5) => {
  return state;
}

// Redux methods are available from a Redux object
// For example: Redux.createStore()
// Define the store here:
```

# --solutions--

```js
const reducer = (state = 5) => {
  return state;
}

const store = Redux.createStore(reducer);
```
