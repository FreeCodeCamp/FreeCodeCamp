---
id: 5a24c314108439a4d4036159
title: 在數組中使用擴展運算符
challengeType: 6
forumTopicId: 301452
dashedName: use-the-spread-operator-on-arrays
---

# --description--

ES6 中有助於在 Redux 中強制執行狀態不變性的一個解決方案是擴展運算符：`...`。 擴展運算符具有很多的應用，其中一種非常適合通過一個已有的數組生成一個新數組。 這是相對較新的但常用的語法。 例如，如果你有一個數組 `myArray` 並寫：

```js
let newArray = [...myArray];
```

`newArray` 現在是 `myArray` 的克隆。 兩個數組仍然分別存在於內存中。 如果你執行像 `newArray.push(5)` 這樣的變異， `myArray` 不會改變。 `...` 有效將 `myArray` 中的值*展開*到一個新數組中。 要克隆數組，但在新數組中添加其他值，可以編寫 `[...myArray, 'new value']`。 這將返回一個由 `myArray` 中的值和字符串 `new value`（作爲最後一個值）組成的新數組。 擴展語法可以像這樣在數組組合中多次使用，但重要的是要注意它只是生成數組的淺拷貝副本。 也就是說，它只爲一維數組提供不可變的數組操作。

# --instructions--

添加待辦事項時，使用 spread 運算符返回新的狀態副本。

# --hints--

Redux store 應該在代碼編輯器中存在，並使用 `["Do not mutate state!"]` 進行狀態初始化。

```js
assert(
  (function () {
    const initialState = store.getState();
    return (
      Array.isArray(initialState) === true &&
      initialState[0] === 'Do not mutate state!'
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
    const expectedState = ['Do not mutate state!', '__TEST__TO__DO__'];
    return isFrozen && DeepEqual(finalState, expectedState);
  })()
);
```

應使用擴展運算符返回新的 state。

```js
(getUserInput) => assert(getUserInput('index').includes('...state'));
```

# --seed--

## --seed-contents--

```js
const immutableReducer = (state = ['Do not mutate state!'], action) => {
  switch(action.type) {
    case 'ADD_TO_DO':
      // Don't mutate state here or the tests will fail
      return
    default:
      return state;
  }
};

const addToDo = (todo) => {
  return {
    type: 'ADD_TO_DO',
    todo
  }
}

const store = Redux.createStore(immutableReducer);
```

# --solutions--

```js
const immutableReducer = (state = ['Do not mutate state!'], action) => {
  switch(action.type) {
    case 'ADD_TO_DO':
      return [
        ...state,
        action.todo
      ];
    default:
      return state;
  }
};

const addToDo = (todo) => {
  return {
    type: 'ADD_TO_DO',
    todo
  }
}

const store = Redux.createStore(immutableReducer);
```
