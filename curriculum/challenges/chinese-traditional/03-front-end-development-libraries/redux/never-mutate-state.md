---
id: 5a24c314108439a4d4036158
title: 永不改變狀態
challengeType: 6
forumTopicId: 301445
dashedName: never-mutate-state
---

# --description--

這些最後的挑戰描述了在 Redux 中強制執行狀態不變性關鍵原則的幾種方法。 不可變狀態意味着永遠不直接修改狀態，而是返回一個新的狀態副本。

如果拍攝 Redux 應用程序一段時間狀態的快照，會看到類似 `state 1`，`state 2`，`state 3`，`state 4`，`...`等等，每個狀態可能與最後一個狀態相似，但每個狀態都是一個獨特的數據。 事實上，這種不變性提供了時間旅行調試等功能。

Redux 並沒有主動地在其 store 或者 reducer 中強制執行狀態不變性，責任落在程序員身上。 幸運的是，JavaScript（尤其是 ES6）提供了一些有用的工具，可以用來強制執行狀態的不變性，無論是 `string`，`number`，`array` 或 `object`。 請注意，字符串和數字是原始值，並且本質上是不可變的。 換句話說，3 總是 3， 不能改變數字 3 的值。 然而，`array` 或 `object` 是可變的。 實際上，狀態可能會包括 `array` 或 `object`，因爲它們經常用來描述一些代表信息的數據結構。

# --instructions--

代碼編輯器中有一個 `store` 和 `reducer`，用於管理待辦事項。 完成 reducer 裏的 `ADD_TO_DO` 用例，使其可以將一個新的待辦事項附加到 state。 使用通過標準 JavaScript 或 ES6 的一些方法實現此目的。 看看是否可以找到一種方法來返回一個新數組，其中來自 `action.todo` 的項目添加到數組的末尾。

# --hints--

Redux store 應該在代碼編輯器中存在並使用名字爲 `todos` 的數組進行狀態初始化。

```js
assert(
  (function () {
    const todos = [
      'Go to the store',
      'Clean the house',
      'Cook dinner',
      'Learn to code'
    ];
    const initialState = store.getState();
    return (
      Array.isArray(initialState) && initialState.join(',') === todos.join(',')
    );
  })()
);
```

`addToDo` 和 `immutableReducer` 都應該是函數。

```js
assert(typeof addToDo === 'function' && typeof immutableReducer === 'function');
```

在 Redux store 上 dispatch 一個類型爲 `ADD_TO_DO` 的 aciton，應該添加一個 `todo` 項，並且不應該改變 state。

```js
assert(
  (function () {
    const initialState = store.getState();
    const isFrozen = DeepFreeze(initialState);
    store.dispatch(addToDo('__TEST__TO__DO__'));
    const finalState = store.getState();
    const expectedState = [
      'Go to the store',
      'Clean the house',
      'Cook dinner',
      'Learn to code',
      '__TEST__TO__DO__'
    ];
    return isFrozen && DeepEqual(finalState, expectedState);
  })()
);
```

# --seed--

## --seed-contents--

```js
const ADD_TO_DO = 'ADD_TO_DO';

// A list of strings representing tasks to do:
const todos = [
  'Go to the store',
  'Clean the house',
  'Cook dinner',
  'Learn to code',
];

const immutableReducer = (state = todos, action) => {
  switch(action.type) {
    case ADD_TO_DO:
      // Don't mutate state here or the tests will fail
      return
    default:
      return state;
  }
};

const addToDo = (todo) => {
  return {
    type: ADD_TO_DO,
    todo
  }
}

const store = Redux.createStore(immutableReducer);
```

# --solutions--

```js
const ADD_TO_DO = 'ADD_TO_DO';

const todos = [
  'Go to the store',
  'Clean the house',
  'Cook dinner',
  'Learn to code',
];

const immutableReducer = (state = todos, action) => {
  switch(action.type) {
    case ADD_TO_DO:
      return state.concat(action.todo);
    default:
      return state;
  }
};

const addToDo = (todo) => {
  return {
    type: ADD_TO_DO,
    todo
  }
}

const store = Redux.createStore(immutableReducer);
```
