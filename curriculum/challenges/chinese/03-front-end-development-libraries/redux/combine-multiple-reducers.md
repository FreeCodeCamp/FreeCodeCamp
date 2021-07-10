---
id: 5a24c314108439a4d4036154
title: 组合多个 Reducers
challengeType: 6
forumTopicId: 301436
dashedName: combine-multiple-reducers
---

# --description--

当应用程序的状态开始变得越来越复杂时，可能会将 state 分成多个块。 相反，请记住 Redux 的第一个原则：所有应用程序状态都保存在 store 中的一个简单的 state 对象中。 因此，Redux 提供 reducer 组合作为复杂状态模型的解决方案。 定义多个 reducer 来处理应用程序状态的不同部分，然后将这些 reducer 组合成一个 root reducer。 然后将 root reducer 传递给 Redux `createStore()`方法。

为了将多个 reducer 组合在一起，Redux 提供了`combineReducers()`方法。 该方法接受一个对象作为参数，在该参数中定义一个属性，该属性将键与特定 reducer 函数关联。 Redux 将使用给定的键值作为关联状态的名称。

通常情况下，当它们在某种程度上是独一无二的，为每个应用程序的 state 创建一个 reducer 是一个很好的做法。 例如，在一个带有用户身份验证的记笔记应用程序中，一个 reducer 可以处理身份验证而另一个处理用户提交的文本和注释。 对于这样的应用程序，可能会编写 `combineReducers()` 方法，如下所示：

```js
const rootReducer = Redux.combineReducers({
  auth: authenticationReducer,
  notes: notesReducer
});
```

现在，`notes` 键将包含与注释相关联的所有状态，并由 `notesReducer` 处理。 这就是组合多个 reducer 来管理更复杂的应用程序状态的方式， 在此示例中，Redux store 中保存的状态将是一个包含 `auth` 和 `notes` 属性的简单对象。

# --instructions--

代码编辑器中提供了 `counterReducer()` 和 `authReducer()` 函数以及 Redux store。 使用 `Redux.combineReducers()` 方法编写完成 `rootReducer()` 函数。 将 `counterReducer` 分配给一个叫做 `count` 的键，将 `authReducer` 分配给一个叫做 `auth` 的键。

# --hints--

`counterReducer` 应该递增和递减 `state`。

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

`authReducer` 应该可以使 `authenticated` 的 `state` 值在 `true` 和 `false` 之间切换。

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

store `state` 应该有两个 key：一个是 `count`，它包含一个数字。 另一个 `auth`，它包含一个对象。 `auth` 对象应该具有 `authenticated` 的属性，该属性的值应该为布尔值。

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

`rootReducer` 应该是一个合并了 `counterReducer` 和 `authReducer` 的函数。

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
