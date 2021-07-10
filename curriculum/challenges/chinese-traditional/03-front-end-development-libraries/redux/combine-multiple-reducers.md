---
id: 5a24c314108439a4d4036154
title: 組合多個 Reducers
challengeType: 6
forumTopicId: 301436
dashedName: combine-multiple-reducers
---

# --description--

當應用程序的狀態開始變得越來越複雜時，可能會將 state 分成多個塊。 相反，請記住 Redux 的第一個原則：所有應用程序狀態都保存在 store 中的一個簡單的 state 對象中。 因此，Redux 提供 reducer 組合作爲複雜狀態模型的解決方案。 定義多個 reducer 來處理應用程序狀態的不同部分，然後將這些 reducer 組合成一個 root reducer。 然後將 root reducer 傳遞給 Redux `createStore()`方法。

爲了將多個 reducer 組合在一起，Redux 提供了`combineReducers()`方法。 該方法接受一個對象作爲參數，在該參數中定義一個屬性，該屬性將鍵與特定 reducer 函數關聯。 Redux 將使用給定的鍵值作爲關聯狀態的名稱。

通常情況下，當它們在某種程度上是獨一無二的，爲每個應用程序的 state 創建一個 reducer 是一個很好的做法。 例如，在一個帶有用戶身份驗證的記筆記應用程序中，一個 reducer 可以處理身份驗證而另一個處理用戶提交的文本和註釋。 對於這樣的應用程序，可能會編寫 `combineReducers()` 方法，如下所示：

```js
const rootReducer = Redux.combineReducers({
  auth: authenticationReducer,
  notes: notesReducer
});
```

現在，`notes` 鍵將包含與註釋相關聯的所有狀態，並由 `notesReducer` 處理。 這就是組合多個 reducer 來管理更復雜的應用程序狀態的方式， 在此示例中，Redux store 中保存的狀態將是一個包含 `auth` 和 `notes` 屬性的簡單對象。

# --instructions--

代碼編輯器中提供了 `counterReducer()` 和 `authReducer()` 函數以及 Redux store。 使用 `Redux.combineReducers()` 方法編寫完成 `rootReducer()` 函數。 將 `counterReducer` 分配給一個叫做 `count` 的鍵，將 `authReducer` 分配給一個叫做 `auth` 的鍵。

# --hints--

`counterReducer` 應該遞增和遞減 `state`。

```js
assert(
  (function () {
    const initialState = store.getState().count;
    store.dispatch({ type: INCREMENT });
    store.dispatch({ type: INCREMENT });
    const firstState = store.getState().count;
    store.dispatch({ type: DECREMENT });
    const secondState = store.getState().count;
    return firstState === initialState + 2 && secondState === firstState - 1;
  })()
);
```

`authReducer` 應該可以使 `authenticated` 的 `state` 值在 `true` 和 `false` 之間切換。

```js
assert(
  (function () {
    store.dispatch({ type: LOGIN });
    const loggedIn = store.getState().auth.authenticated;
    store.dispatch({ type: LOGOUT });
    const loggedOut = store.getState().auth.authenticated;
    return loggedIn === true && loggedOut === false;
  })()
);
```

store `state` 應該有兩個 key：一個是 `count`，它包含一個數字。 另一個 `auth`，它包含一個對象。 `auth` 對象應該具有 `authenticated` 的屬性，該屬性的值應該爲布爾值。

```js
assert(
  (function () {
    const state = store.getState();
    return (
      typeof state.auth === 'object' &&
      typeof state.auth.authenticated === 'boolean' &&
      typeof state.count === 'number'
    );
  })()
);
```

`rootReducer` 應該是一個合併了 `counterReducer` 和 `authReducer` 的函數。

```js
(getUserInput) =>
  assert(
    (function () {
      const noWhiteSpace = __helpers.removeWhiteSpace(getUserInput('index'));
      return (
        typeof rootReducer === 'function' &&
        noWhiteSpace.includes('Redux.combineReducers')
      );
    })()
  );
```

# --seed--

## --seed-contents--

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

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

const authReducer = (state = {authenticated: false}, action) => {
  switch(action.type) {
    case LOGIN:
      return {
        authenticated: true
      }
    case LOGOUT:
      return {
        authenticated: false
      }
    default:
      return state;
  }
};

const rootReducer = // Define the root reducer here

const store = Redux.createStore(rootReducer);
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

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

const authReducer = (state = {authenticated: false}, action) => {
  switch(action.type) {
    case LOGIN:
      return {
        authenticated: true
      }
    case LOGOUT:
      return {
        authenticated: false
      }
    default:
      return state;
  }
};

const rootReducer = Redux.combineReducers({
  count: counterReducer,
  auth: authReducer
});

const store = Redux.createStore(rootReducer);
```
