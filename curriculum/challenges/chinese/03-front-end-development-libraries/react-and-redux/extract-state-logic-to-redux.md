---
id: 5a24c314108439a4d4036143
title: 提取状态逻辑给 Redux
challengeType: 6
forumTopicId: 301429
dashedName: extract-state-logic-to-redux
---

# --description--

完成 React 组件后，我们需要把在本地 `state` 执行的逻辑移到 Redux 中， 这是为小规模 React 应用添加 Redux 的第一步。 该应用的唯一功能是把用户的新消息添加到无序列表中。 下面我们用简单的示例来演示 React 和 Redux 之间的配合。

# --instructions--

首先，定义 action 的类型 `ADD`，将其设置为常量 `ADD`。 接着，定义创建 action 的函数`addMessage()`，用该函数创建添加消息的 action， 把 `message` 传给创建 action 的函数并返回包含该消息的 `action`

接着，创建名为 `messageReducer()` 的 reducer 方法，为这些消息处理状态。 初始状态应为空数组。 reducer 向状态中的消息数组添加消息，或返回当前状态。 最后，创建 Redux store 并传给 reducer。

# --hints--

应存在一个值为字符串 `ADD` 的常量 `ADD`。

```js
assert(ADD === 'ADD');
```

创建 action 的函数 `addMessage` 应返回 `type` 等于 `ADD` 的对象，其返回的 `message` 即被传入的消息。

```js
assert(
  (function () {
    const addAction = addMessage('__TEST__MESSAGE__');
    return addAction.type === ADD && addAction.message === '__TEST__MESSAGE__';
  })()
);
```

`messageReducer` 应是一个函数。

```js
assert(typeof messageReducer === 'function');
```

存在一个 store 且其初始状态为空数组。

```js
assert(
  (function () {
    const initialState = store.getState();
    return typeof store === 'object' && initialState.length === 0;
  })()
);
```

分发 `addMessage` 到 store 应添加新消息到状态中消息数组。

```js
assert(
  (function () {
    const initialState = store.getState();
    const isFrozen = DeepFreeze(initialState);
    store.dispatch(addMessage('__A__TEST__MESSAGE'));
    const addState = store.getState();
    return isFrozen && addState[0] === '__A__TEST__MESSAGE';
  })()
);
```

`messageReducer` 被其它任何 actions 调用时应返回当前状态。

```js
assert(
  (function () {
    const addState = store.getState();
    store.dispatch({ type: 'FAKE_ACTION' });
    const testState = store.getState();
    return addState === testState;
  })()
);
```

# --seed--

## --seed-contents--

```jsx
// Define ADD, addMessage(), messageReducer(), and store here:
```

# --solutions--

```jsx
const ADD = 'ADD';

const addMessage = (message) => {
  return {
    type: ADD,
    message
  }
};

const messageReducer = (state = [], action) => {
  switch (action.type) {
    case ADD:
      return [
        ...state,
        action.message
      ];
    default:
      return state;
  }
};

const store = Redux.createStore(messageReducer);
```
