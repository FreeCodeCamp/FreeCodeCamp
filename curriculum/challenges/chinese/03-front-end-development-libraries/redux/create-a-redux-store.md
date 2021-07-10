---
id: 5a24c314108439a4d403614b
title: 创建一个 Redux Store
challengeType: 6
forumTopicId: 301439
dashedName: create-a-redux-store
---

# --description--

Redux 是一个状态管理框架，可以与包括 React 在内的许多不同的 Web 技术一起使用。

在 Redux 中，有一个状态对象负责应用程序的整个状态， 这意味着如果你有一个包含十个组件且每个组件都有自己的本地状态的 React 项目，那么这个项目的整个状态将通过 Redux `store` 被定义为单个状态对象， 这是学习 Redux 时要理解的第一个重要原则：Redux store 是应用程序状态的唯一真实来源。

这也意味着，如果应用程序想要更新状态，**只能**通过 Redux store 执行， 单向数据流可以更轻松地对应用程序中的状态进行监测管理。

# --instructions--

Redux `store` 是一个保存和管理应用程序状态的`state`， 可以使用 Redux 对象中的 `createStore()` 来创建一个 redux `store`， 此方法将 `reducer` 函数作为必需参数， `reducer` 函数将在后面的挑战中介绍。该函数已在代码编辑器中为你定义， 它只需将 `state` 作为参数并返回一个 `state` 即可。

声明一个 `store` 变量并把它分配给 `createStore()` 方法，然后把 `reducer` 作为一个参数传入即可。

**注意**: 编辑器中的代码使用 ES6 默认参数语法将 state 的值初始化为 `5`， 如果你不熟悉默认参数，你可以参考[ES6 全部课程](https://learn.freecodecamp.org/javascript-algorithms-and-data-structures/es6/set-default-parameters-for-your-functions)，它里面涵盖了这个内容。

# --hints--

Redux store 应当存在。

```js
assert(typeof store.getState === 'function');
```

Redux store 的 state 的值应该为 5。

```js
assert(store.getState() === 5);
```

# --seed--

## --seed-contents--

```js
const reducer = (state = 5) => {
  return state;
}

// Redux methods are available from a Redux object
// For example: Redux.createStore()
// Define the store here:
```

# --solutions--

```js
const reducer = (state = 5) => {
  return state;
}

const store = Redux.createStore(reducer);
```
