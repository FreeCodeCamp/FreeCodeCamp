---
id: 5a24c314108439a4d403614d
title: 定义一个 Redux Action
challengeType: 6
forumTopicId: 301440
dashedName: define-a-redux-action
---

# --description--

由于 Redux 是一个状态管理框架，因此更新状态是其核心任务之一。 在 Redux 中，所有状态更新都由 dispatch action 触发， action 只是一个 JavaScript 对象，其中包含有关已发生的 action 事件的信息。 Redux store 接收这些 action 对象，然后更新相应的状态。 有时，Redux action 也会携带一些数据。 例如，在用户登录后携带用户名， 虽然数据是可选的，但 action 必须带有 `type` 属性，该属性表示此 action 的类型。

我们可以将 Redux action 视为信使，将有关应用程序中发生的事件信息提供给 Redux store， 然后 store 根据发生的 action 进行状态的更新。

# --instructions--

编写 Redux action 就像声明具有 type 属性的对象一样简单， 声明一个对象 `action` 并为它设置一个属性 `type`，并将它的值设置成字符串`'LOGIN'`。

# --hints--

`action` 对象应该存在。

```js
assert(
  (function () {
    return typeof action === 'object';
  })()
);
```

`action` 对象应该有一个值为 `LOGIN` 的 `type` 属性。

```js
assert(
  (function () {
    return action.type === 'LOGIN';
  })()
);
```

# --seed--

## --seed-contents--

```js
// Define an action here:
```

# --solutions--

```js
const action = {
  type: 'LOGIN'
}
```
