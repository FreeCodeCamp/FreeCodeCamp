---
id: 5a24c314108439a4d403614f
title: 分发 Action Event
challengeType: 6
forumTopicId: 301442
dashedName: dispatch-an-action-event
---

# --description--

`dispatch` 方法用于将 action 分派给 Redux store， 调用 `store.dispatch()` 将从 action creator 返回的值发送回 store。

回想一下，动作创建者返回一个具有 type 属性的对象，该属性指定已发生的动作。 然后该方法会将一个 action 对象发送到 Redux store。 基于上一个挑战的示例，下面的行是等效的，两者都会调度类 `LOGIN` 类型的 action：

```js
store.dispatch(actionCreator());
store.dispatch({ type: 'LOGIN' });
```

# --instructions--

代码编辑器中的 Redux store 具有初始化状过的 state，包含 `login` 属性当前设置为 `false`的对象， 还有一个名为 `loginAction()` 的 action creator，它返回类型为 `LOGIN` 的 action， 然后通过调用 `dispatch` 方法将 `LOGIN` 的 action dispatch 给 Redux store，并传入 `loginAction()` 创建的 action。

# --hints--

调用函数 `loginAction` 应该返回一个 `type` 属性设置为字符串 `LOGIN` 的对象。

```js
assert(loginAction().type === 'LOGIN');
```

store 应该用属性 `login` 设置为 `false` 的对象初始化。

```js
assert(store.getState().login === false);
```

`store.dispatch()` 方法应该被用于 dispatch 一个类型为 `LOGIN` 的 action。

```js
(getUserInput) =>
  assert(
    (function () {
      let noWhiteSpace = getUserInput('index').replace(/\s/g, '');
      return (
        noWhiteSpace.includes('store.dispatch(loginAction())') ||
        noWhiteSpace.includes("store.dispatch({type: 'LOGIN'})") === true
      );
    })()
  );
```

# --seed--

## --seed-contents--

```js
const store = Redux.createStore(
  (state = {login: false}) => state
);

const loginAction = () => {
  return {
    type: 'LOGIN'
  }
};

// Dispatch the action here:
```

# --solutions--

```js
const store = Redux.createStore(
  (state = {login: false}) => state
);

const loginAction = () => {
  return {
    type: 'LOGIN'
  }
};

store.dispatch(loginAction());
```
