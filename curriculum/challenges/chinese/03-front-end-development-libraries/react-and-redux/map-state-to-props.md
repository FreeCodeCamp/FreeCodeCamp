---
id: 5a24c314108439a4d4036145
title: 映射 State 到 Props
challengeType: 6
forumTopicId: 301433
dashedName: map-state-to-props
---

# --description--

`Provider`可向 React 组件提供 `state` 和 `dispatch` ，但必须确切地指定所需要的 state 和 actions， 以确保每个组件只能访问所需的 state。 完成这个任务，需要创建两个函数：`mapStateToProps()`、`mapDispatchToProps()`。

在这两个函数中，声明 state 中函数所要访问的部分及需要 dispatch 的创建 action 的函数。 完成这些，我们就可以迎接下一个挑战，学习如何使用 React Redux 的 `connect` 方法来把函数连接到组件了。

**注意：** 在幕后，React Redux 用 `store.subscribe()` 方法来实现 `mapStateToProps()`。

# --instructions--

创建 `mapStateToProps()` 函数， 以 `state` 为参数，然后返回一个对象，该对象把 state 映射到特定属性名上， 这些属性能通过 `props` 访问组件。 由于此示例把 app 应用的整个状态保存在单一数组中，可把整个状态传给组件。 在返回的对象中创建 `messages` 属性，并设置为 `state`。

# --hints--

常量 `state` 应为空数组。

```js
assert(Array.isArray(state) && state.length === 0);
```

`mapStateToProps` 应为函数。

```js
assert(typeof mapStateToProps === 'function');
```

`mapStateToProps` 应返回一个对象。

```js
assert(typeof mapStateToProps() === 'object');
```

把 state 数组传入 `mapStateToProps` 后应返回赋值给 `messages` 键的数组。

```js
assert(mapStateToProps(['messages']).messages.pop() === 'messages');
```

# --seed--

## --seed-contents--

```jsx
const state = [];

// Change code below this line
```

# --solutions--

```jsx
const state = [];

// Change code below this line

const mapStateToProps = (state) => {
  return {
    messages: state
  }
};
```
