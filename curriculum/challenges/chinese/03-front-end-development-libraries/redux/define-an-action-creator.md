---
id: 5a24c314108439a4d403614e
title: 定义一个 Action Creator
challengeType: 6
forumTopicId: 301441
dashedName: define-an-action-creator
---

# --description--

创建 action 后要将 action 发送到 Redux store，以便它可以更新其状态。 在 Redux 中，可以定义动作创建器来完成此任务， action creator 只是一个返回动作的 JavaScript 函数， 换句话说，action creator 创建表示动作事件的对象。

# --instructions--

定义名为 `actionCreator()` 的函数，该函数在调用时返回 `action` 对象。

# --hints--

函数 `actionCreator` 应该存在。

```js
assert(typeof actionCreator === 'function');
```

运行 `actionCreator` 函数应返回 `action` 对象。

```js
assert(typeof action === 'object');
```

返回的 `action` 对象应该有一个值为 `LOGIN` 的 `type` 属性。

```js
assert(action.type === 'LOGIN');
```

# --seed--

## --seed-contents--

```js
const action = {
  type: 'LOGIN'
}
// Define an action creator here:
```

# --solutions--

```js
const action = {
  type: 'LOGIN'
}
const actionCreator = () => {
  return action;
};
```
