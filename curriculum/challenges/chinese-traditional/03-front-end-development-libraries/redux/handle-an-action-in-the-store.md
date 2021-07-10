---
id: 5a24c314108439a4d4036150
title: 在 Store 裏處理 Action
challengeType: 6
forumTopicId: 301444
dashedName: handle-an-action-in-the-store
---

# --description--

在一個 action 被創建並 dispatch 之後，Redux store 需要知道如何響應該操作。 這就是 `reducer` 函數存在的意義。 Redux 中的 Reducers 負責響應 action 然後進行狀態的修改。 `reducer` 將 `state` 和 `action` 作爲參數，並且它總是返回一個新的 `state`。 我們要知道這是 reducer 的**唯一**的作用。 它不應有任何其他的作用：比如它不應調用 API 接口，也不應存在任何潛在的副作用。 reducer 只是一個接受狀態和動作，然後返回新狀態的純函數。

Redux 的另一個關鍵原則是 `state` 是隻讀的。 換句話說，`reducer` 函數必須**始終**返回一個新的 `state`，並且永遠不會直接修改狀態。 Redux 不強制改變狀態，但是需要在 reducer 函數的代碼中強制執行它， 以後的挑戰會練習這一點。

# --instructions--

代碼編輯器中具有前面的示例以及一個 `reducer` 函數。 需要完善 `reducer` 函數的內容，使得它如果收到類型爲`'LOGIN'`的action，它將返回一個將 `login` 設置爲 `true` 的 state 對象。 否則，它就返回當前的 `state`。 請注意，當前 `state` 和 dispatch 的 `action` 將被傳遞給 reducer，因此可以使用 `action.type` 直接獲取 action 的類型。

# --hints--

調用函數 `loginAction` 應該返回一個 type 屬性設置爲字符串 `LOGIN` 的對象。

```js
assert(loginAction().type === 'LOGIN');
```

store 應該用屬性 `login` 設置爲 `false` 的對象初始化。

```js
assert(store.getState().login === false);
```

dispatch `loginAction` 後應將 store 中 state 的 `login` 值更新爲 `true`。

```js
assert(
  (function () {
    const initialState = store.getState();
    store.dispatch(loginAction());
    const afterState = store.getState();
    return initialState.login === false && afterState.login === true;
  })()
);
```

如果 action 的類型不是 `LOGIN`，那麼 store 應返回當前的 state。

```js
assert(
  (function () {
    store.dispatch({ type: '__TEST__ACTION__' });
    let afterTest = store.getState();
    return typeof afterTest === 'object' && afterTest.hasOwnProperty('login');
  })()
);
```

# --seed--

## --seed-contents--

```js
const defaultState = {
  login: false
};

const reducer = (state = defaultState, action) => {
  // Change code below this line

  // Change code above this line
};

const store = Redux.createStore(reducer);

const loginAction = () => {
  return {
    type: 'LOGIN'
  }
};
```

# --solutions--

```js
const defaultState = {
  login: false
};

const reducer = (state = defaultState, action) => {

  if (action.type === 'LOGIN') {
    return {login: true}
  }

  else {
    return state
  }

};

const store = Redux.createStore(reducer);

const loginAction = () => {
  return {
    type: 'LOGIN'
  }
};
```
