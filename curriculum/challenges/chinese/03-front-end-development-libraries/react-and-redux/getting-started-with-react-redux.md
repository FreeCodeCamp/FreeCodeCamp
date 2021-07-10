---
id: 5a24c314108439a4d4036141
title: React 和 Redux 入门
challengeType: 6
forumTopicId: 301430
dashedName: getting-started-with-react-redux
---

# --description--

这一系列挑战介绍的是 Redux 和 React 的配合， 我们先来回顾一下这两种技术的关键原则是什么。 React 是提供数据的视图库，能以高效、可预测的方式渲染视图。 Redux 是状态管理框架，可用于简化 APP 应用状态的管理。 在 React Redux app 应用中，通常可创建单一的 Redux store 来管理整个应用的状态。 React 组件仅订阅 store 中与其角色相关的数据， 可直接从 React 组件中分发 actions 以触发 store 对象的更新。

React 组件可以在本地管理自己的状态，但是对于复杂的应用来说，它的状态最好是用 Redux 保存在单一位置，有特定本地状态的独立组件例外。 当单个组件可能仅具有特定于其的本地状态时，算是例外。 最后一点是，Redux 没有内置的 React 支持，需要安装 `react-redux`包， 通过这个方式把 Redux 的 `state` 和 `dispatch` 作为 `props` 传给组件。

在接下来的挑战中，先要创建一个可输入新文本消息的 React 组件， 添加这些消息到数组里，在视图上显示数组。 这应该是 React 课程中的一个很好的回顾。 接着，创建 Redux store 和 actions 来管理消息数组的状态。 最后，使用 `react-redux` 连接 Redux store 和组件，从而将本地状态提取到 Redux store 中。

# --instructions--

从 `DisplayMessages` 组件开始。 把构造函数添加到此组件中，使用含两个属性的状态初始化该组件，这两个属性为：`input`（设置为空字符串），`messages`（设置为空数组）。

# --hints--

`DisplayMessages` 组件应渲染空的 `div` 元素。

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(DisplayMessages));
    return mockedComponent.find('div').text() === '';
  })()
);
```

`DisplayMessages` 组件的构造函数应调用 `super`，传入 `props`。

```js
(getUserInput) =>
  assert(
    (function () {
      const noWhiteSpace = __helpers.removeWhiteSpace(getUserInput('index'));
      return (
        noWhiteSpace.includes('constructor(props)') &&
        noWhiteSpace.includes('super(props')
      );
    })()
  );
```

`DisplayMessages` 组件的初始状态应是 `{input: "", messages: []}`。

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(DisplayMessages));
    const initialState = mockedComponent.state();
    return (
      typeof initialState === 'object' &&
      initialState.input === '' &&
      Array.isArray(initialState.messages) &&
      initialState.messages.length === 0
    );
  })()
);
```

# --seed--

## --after-user-code--

```jsx
ReactDOM.render(<DisplayMessages />, document.getElementById('root'))
```

## --seed-contents--

```jsx
class DisplayMessages extends React.Component {
  // Change code below this line

  // Change code above this line
  render() {
    return <div />
  }
};
```

# --solutions--

```jsx
class DisplayMessages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      messages: []
    }
  }
  render() {
    return <div/>
  }
};
```
