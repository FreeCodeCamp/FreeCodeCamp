---
id: 5a24c314108439a4d403615b
title: 使用 Object.assign 拷貝對象
challengeType: 6
forumTopicId: 301437
dashedName: copy-an-object-with-object-assign
---

# --description--

最後幾個挑戰適用於數組，但是當狀態是 `object` 時，有一些方法可以實現狀態不變性。 處理對象的一個常用的方法是 `Object.assign()`。 `Object.assign()` 獲取目標對象和源對象，並將源對象中的屬性映射到目標對象。 任何匹配的屬性都會被源對象中的屬性覆蓋。 通常用於通過傳遞一個空對象作爲第一個參數，然後是要用複製的對象來製作對象的淺表副本。 這是一個例子：

```js
const newObject = Object.assign({}, obj1, obj2);
```

這會創建 `newObject` 作爲新的 `object`，其中包含 `obj1` 和 `obj2` 中當前存在的屬性。

# --instructions--

Redux state 和 actions 被修改爲處理 `state` 的 `object` 。 編輯代碼，爲類型爲 `ONLINE` 的 actions 返回一個新的 `state` 對象，這個類型將 `status` 屬性設置爲 `online` 字符串。 嘗試使用 `Object.assign()` 來完成挑戰。

# --hints--

Redux store 應該存在，並使用與第一行聲明的 `defaultState` 對象相同的狀態進行初始化。

```js
assert(
  (function () {
    const expectedState = {
      user: 'CamperBot',
      status: 'offline',
      friends: '732,982',
      community: 'freeCodeCamp'
    };
    const initialState = store.getState();
    return DeepEqual(expectedState, initialState);
  })()
);
```

`wakeUp` 和 `immutableReducer` 都應該是函數。

```js
assert(typeof wakeUp === 'function' && typeof immutableReducer === 'function');
```

調用一個類型爲 `ONLINE` 的 action，應該將狀態中的 `status` 更新爲 `online`，並且不應該改變狀態。

```js
assert(
  (function () {
    const initialState = store.getState();
    const isFrozen = DeepFreeze(initialState);
    store.dispatch({ type: 'ONLINE' });
    const finalState = store.getState();
    const expectedState = {
      user: 'CamperBot',
      status: 'online',
      friends: '732,982',
      community: 'freeCodeCamp'
    };
    return isFrozen && DeepEqual(finalState, expectedState);
  })()
);
```

`Object.assign` 應該被用於返回一個新狀態。

```js
(getUserInput) => assert(getUserInput('index').includes('Object.assign'));
```

# --seed--

## --seed-contents--

```js
const defaultState = {
  user: 'CamperBot',
  status: 'offline',
  friends: '732,982',
  community: 'freeCodeCamp'
};

const immutableReducer = (state = defaultState, action) => {
  switch(action.type) {
    case 'ONLINE':
      // Don't mutate state here or the tests will fail
      return
    default:
      return state;
  }
};

const wakeUp = () => {
  return {
    type: 'ONLINE'
  }
};

const store = Redux.createStore(immutableReducer);
```

# --solutions--

```js
const defaultState = {
  user: 'CamperBot',
  status: 'offline',
  friends: '732,982',
  community: 'freeCodeCamp'
};

const immutableReducer = (state = defaultState, action) => {
  switch(action.type) {
    case 'ONLINE':
      return Object.assign({}, state, {
        status: 'online'
      });
    default:
      return state;
  }
};

const wakeUp = () => {
  return {
    type: 'ONLINE'
  }
};

const store = Redux.createStore(immutableReducer);
```
