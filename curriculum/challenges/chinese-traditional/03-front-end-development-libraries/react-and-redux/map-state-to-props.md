---
id: 5a24c314108439a4d4036145
title: 映射 State 到 Props
challengeType: 6
forumTopicId: 301433
dashedName: map-state-to-props
---

# --description--

`Provider`可向 React 組件提供 `state` 和 `dispatch` ，但必須確切地指定所需要的 state 和 actions， 以確保每個組件只能訪問所需的 state。 完成這個任務，需要創建兩個函數：`mapStateToProps()`、`mapDispatchToProps()`。

在這兩個函數中，聲明 state 中函數所要訪問的部分及需要 dispatch 的創建 action 的函數。 完成這些，我們就可以迎接下一個挑戰，學習如何使用 React Redux 的 `connect` 方法來把函數連接到組件了。

**注意：** 在幕後，React Redux 用 `store.subscribe()` 方法來實現 `mapStateToProps()`。

# --instructions--

創建 `mapStateToProps()` 函數， 以 `state` 爲參數，然後返回一個對象，該對象把 state 映射到特定屬性名上， 這些屬性能通過 `props` 訪問組件。 由於此示例把 app 應用的整個狀態保存在單一數組中，可把整個狀態傳給組件。 在返回的對象中創建 `messages` 屬性，並設置爲 `state`。

# --hints--

常量 `state` 應爲空數組。

```js
assert(Array.isArray(state) && state.length === 0);
```

`mapStateToProps` 應爲函數。

```js
assert(typeof mapStateToProps === 'function');
```

`mapStateToProps` 應返回一個對象。

```js
assert(typeof mapStateToProps() === 'object');
```

把 state 數組傳入 `mapStateToProps` 後應返回賦值給 `messages` 鍵的數組。

```js
assert(mapStateToProps(['messages']).messages.pop() === 'messages');
```

# --seed--

## --seed-contents--

```jsx
const state = [];

// Change code below this line
```

# --solutions--

```jsx
const state = [];

// Change code below this line

const mapStateToProps = (state) => {
  return {
    messages: state
  }
};
```
