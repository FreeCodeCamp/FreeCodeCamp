---
id: 5a24c314108439a4d4036151
title: 使用 Switch 语句处理多个 Actions
challengeType: 6
forumTopicId: 301449
dashedName: use-a-switch-statement-to-handle-multiple-actions
---

# --description--

可以定义 Redux store 处理多种 action 类型。 假设在 Redux store 中管理用户身份验证。 希望用状态表示用户登录和注销。 使用 state 的 `authenticated` 属性表示它。 还需要使用 action creators 创建与用户登录和用户注销相对应的 action，以及 action 对象本身。

# --instructions--

代码编辑器为你创建了 store、actions、action creators。 通过编写 `reducer` 函数来处理多个身份验证操作。 可以在 `reducer` 里通过使用 JavaScript 的 `switch` 来响应不同的 action 事件。 这是编写 Redux reducers 的标准模式。 switch 语句应该切换 `action.type` 并返回适当的身份验证状态。

**注意：** 此时，不要担心 state 的不变性，因为在这个示例中它很小而且很简单。 所以对于每个操作都可以返回一个新对象，比如 `{authenticated: true}`。 另外，不要忘记在 switch 语句中写一个 `default` case，返回当前的 `state`。 这是很重要的，因为当程序有多个 reducer，当每一个 action 被 dispatch 时它们都会运行，即使 action 与该 reducer 无关。 在这种情况下，你要确保返回当前的 `state`

# --hints--

调用函数 `loginUser` 应该返回一个 type 属性设置为字符串 `LOGIN` 的对象。

```js
assert(loginUser().type === 'LOGIN');
```

调用函数 `logoutUser` 应该返回一个 type 属性设置为字符串 `LOGOUT` 的对象。

```js
assert(logoutUser().type === 'LOGOUT');
```

store 应该设置一个 `authenticated` 属性设置为 `false` 的初始化对象。

```js
assert(store.getState().authenticated === false);
```

dispatch `loginUser`应该将 store 中的 state 的 `authenticated` 值更新为 `true`。

```js
assert(
  (function () {
    const initialState = store.getState();
    store.dispatch(loginUser());
    const afterLogin = store.getState();
    return (
      initialState.authenticated === false && afterLogin.authenticated === true
    );
  })()
);
```

dispatch `logoutUser` 应该将 store 中的 state 的 `authenticated` 值更新为 `false`。

```js
assert(
  (function () {
    store.dispatch(loginUser());
    const loggedIn = store.getState();
    store.dispatch(logoutUser());
    const afterLogout = store.getState();
    return (
      loggedIn.authenticated === true && afterLogout.authenticated === false
    );
  })()
);
```

`authReducer` 函数应该使用 `switch` 语句处理多个 action 类型。

```js
(getUserInput) =>
  assert(
    getUserInput('index').toString().includes('switch') &&
      getUserInput('index').toString().includes('case') &&
      getUserInput('index').toString().includes('default')
  );
```

# --seed--

## --seed-contents--

```js
const defaultState = {
  authenticated: false
};

const authReducer = (state = defaultState, action) => {
  // Change code below this line

  // Change code above this line
};

const store = Redux.createStore(authReducer);

const loginUser = () => {
  return {
    type: 'LOGIN'
  }
};

const logoutUser = () => {
  return {
    type: 'LOGOUT'
  }
};
```

# --solutions--

```js
const defaultState = {
  authenticated: false
};

const authReducer = (state = defaultState, action) => {

  switch (action.type) {

    case 'LOGIN':
      return {
        authenticated: true
      }

    case 'LOGOUT':
      return {
        authenticated: false
      }

    default:
      return state;

  }

};

const store = Redux.createStore(authReducer);

const loginUser = () => {
  return {
    type: 'LOGIN'
  }
};

const logoutUser = () => {
  return {
    type: 'LOGOUT'
  }
};
```
