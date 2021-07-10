---
id: 5a24c314108439a4d4036153
title: 注册 Store 监听器
challengeType: 6
forumTopicId: 301446
dashedName: register-a-store-listener
---

# --description--

在 Redux `store` 对象上访问数据的另一种方法是 `store.subscribe()`。 这允许将监听器函数订阅到 store，只要 action 被 dispatch 就会调用它们。 这个方法的一个简单用途是为 store 订阅一个函数，它只是在每次收到一个 action 并且更新 store 时记录一条消息。

# --instructions--

编写一个回调函数，每次 store 收到一个 action 时，它会递增全局变量 `count`，并将此函数传递给 `store.subscribe()` 方法。 将会看到 `store.dispatch()` 连续三次被调用，每次都直接传入一个 action 对象。 观察 dispatch action 之间的控制台输出，看看是否发生了更新。

# --hints--

在 store 上 dispatch `ADD` action 应该使计数器增加 `1`。

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

应该有一个监听函数 `store.subscribe` 订阅 store。

```js
(getUserInput) => assert(getUserInput('index').match(/store\s*\.\s*subscribe\(/gm));
```

`store.subscribe` 应该收到一个函数。

```js
(getUserInput) => assert(getUserInput('index').match(/(\s*function\s*)|(\s*\(\s*\)\s*=>)/gm)) 
```

在更新 store 时，`store.subscribe` 应该在回调中使全局变量 `count` 的值增加。

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
