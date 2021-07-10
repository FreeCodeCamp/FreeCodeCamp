---
id: 5a24c314108439a4d4036153
title: 註冊 Store 監聽器
challengeType: 6
forumTopicId: 301446
dashedName: register-a-store-listener
---

# --description--

在 Redux `store` 對象上訪問數據的另一種方法是 `store.subscribe()`。 這允許將監聽器函數訂閱到 store，只要 action 被 dispatch 就會調用它們。 這個方法的一個簡單用途是爲 store 訂閱一個函數，它只是在每次收到一個 action 並且更新 store 時記錄一條消息。

# --instructions--

編寫一個回調函數，每次 store 收到一個 action 時，它會遞增全局變量 `count`，並將此函數傳遞給 `store.subscribe()` 方法。 將會看到 `store.dispatch()` 連續三次被調用，每次都直接傳入一個 action 對象。 觀察 dispatch action 之間的控制檯輸出，看看是否發生了更新。

# --hints--

在 store 上 dispatch `ADD` action 應該使計數器增加 `1`。

```js
assert(
  (function () {
    const initialState = store.getState();
    store.dispatch({ type: 'ADD' });
    const newState = store.getState();
    return newState === initialState + 1;
  })()
);
```

應該有一個監聽函數 `store.subscribe` 訂閱 store。

```js
(getUserInput) => assert(getUserInput('index').match(/store\s*\.\s*subscribe\(/gm));
```

`store.subscribe` 應該收到一個函數。

```js
(getUserInput) => assert(getUserInput('index').match(/(\s*function\s*)|(\s*\(\s*\)\s*=>)/gm)) 
```

在更新 store 時，`store.subscribe` 應該在回調中使全局變量 `count` 的值增加。

```js
assert(store.getState() === count);
```

# --seed--

## --before-user-code--

```js
count = 0;
```

## --seed-contents--

```js
const ADD = 'ADD';

const reducer = (state = 0, action) => {
  switch(action.type) {
    case ADD:
      return state + 1;
    default:
      return state;
  }
};

const store = Redux.createStore(reducer);

// Global count variable:
let count = 0;

// Change code below this line

// Change code above this line

store.dispatch({type: ADD});
console.log(count);
store.dispatch({type: ADD});
console.log(count);
store.dispatch({type: ADD});
console.log(count);
```

# --solutions--

```js
const ADD = 'ADD';

const reducer = (state = 0, action) => {
  switch(action.type) {
    case ADD:
      return state + 1;
    default:
      return state;
  }
};

const store = Redux.createStore(reducer);
 let count = 0;
// Change code below this line

store.subscribe( () =>
 {
 count++;
 }
);

// Change code above this line

store.dispatch({type: ADD});
store.dispatch({type: ADD});
store.dispatch({type: ADD});
```
