---
id: 5a24c314108439a4d4036168
title: 从零开始写一个 React 组件
challengeType: 6
forumTopicId: 301424
dashedName: write-a-react-component-from-scratch
---

# --description--

你已经了解了 JSX 和 React 组件的基础知识，是时候自己编写一个组件了。 React 组件是 React 应用程序的核心组成部分，因此熟练编写它们是非常重要的。 记住，典型的 React 组件是 ES6 `class`，它扩展了 `React.Component`。 它有一个返回 HTML（从 JSX 返回）或 `null` 的渲染方法， 这是 React 组件的基本形式。 理解了这一点之后，就可以开始构建更复杂的 React 项目了。

# --instructions--

定义一个 `MyComponent` 类，它是 `React.Component` 的扩展。 它的渲染方法应该返回一个 `div`，其中包含一个 `h1` 标签，标签文本为：`My First React Component!`。 准确使用此文本，大小写和标点符号也要考虑。 确保也调用组件的构造器。

使用 `ReactDOM.render()` 把该组件渲染到 DOM 中。 有一个 `id='challenge-node'` 的 `div` 可供渲染。

# --hints--

应该有一个名为 `MyComponent` 的 React 组件。

```js
(getUserInput) =>
  assert(
    __helpers
      .removeWhiteSpace(getUserInput('index'))
      .includes('classMyComponentextendsReact.Component{')
  );
```

`MyComponent` 应该包含一个 `h1` 标签，标签的文本为 `My First React Component!`，区分大小写并有标点符号。

```js
assert(
  (function () {
    const mockedComponent = Enzyme.mount(React.createElement(MyComponent));
    return mockedComponent.find('h1').text() === 'My First React Component!';
  })()
);
```

`MyComponent` 应该渲染到 DOM。

```js
assert(document.getElementById('challenge-node').childNodes.length === 1);
```

`MyComponent` 应该有一个构造器，里面调用了传参 `props` 的 `super` 函数。

```js
assert(
  MyComponent.toString().includes('MyComponent(props)') &&
    MyComponent.toString().includes('_super.call(this, props)')
);
```

# --seed--

## --seed-contents--

```jsx
// Change code below this line
```

# --solutions--

```jsx
// Change code below this line
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h1>My First React Component!</h1>
      </div>
    );
  }
};

ReactDOM.render(<MyComponent />, document.getElementById('challenge-node'));
```
