---
id: 587d7dbc367417b2b2512bb1
title: 创建一个简单的 JSX 元素
challengeType: 6
forumTopicId: 301390
dashedName: create-a-simple-jsx-element
---

# --description--

简介：React 是由 Facebook 创建和维护的开源视图库。 它是渲染现代 Web 应用程序用户界面（UI）的好工具。

React 使用名为 JSX 的 JavaScript 语法扩展，可以直接在 JavaScript 中编写 HTML。 这有几个好处。 可以在 HTML 中使用 JavaScript 的完整程序功能，并有助于保持代码的可读性。 在大多数情况下，JSX 类似于已经学过的 HTML，但是在这些挑战中将会涉及一些关键差异。

例如，因为 JSX 是 JavaScript 的语法扩展，所以实际上可以直接在 JSX 中编写 JavaScript。 要做到这一点，只需在花括号中包含希望被视为 JavaScript 的代码：`{ 'this is treated as JavaScript code' }`（这被视为 JavaScript 代码）。 请牢记这个写法，将会在接下来的挑战中使用。

但是，由于浏览器不能解析 JSX，因此必须将 JSX 代码编译为 JavaScript。 在这个过程中，转换器 Babel 是一个很受欢迎的工具。 后续挑战已经在后台引入了 Babel，可以直接写 JSX 代码。 如果代码不符合 JSX 语法，那么挑战中的第一个测试就不会通过。

值得注意的是，这些挑战在底层调用 `ReactDOM.render(JSX, document.getElementById('root'))`。 这个函数调用将 JSX 置于 React 自己的轻量级 DOM 中。 然后，React 使用自己的 DOM 快照来实现增量更新。

# --instructions--

当前代码使用 JSX 将 `div` 元素赋值给常量 `JSX`。 将 `div` 替换为 `h1` 元素，并在其中添加文本 `Hello JSX!`。

# --hints--

常量 `JSX` 应该返回一个 `h1` 元素。

```js
assert(JSX.type === 'h1');
```

`h1` 标签应该包含文本 `Hello JSX!`。

```js
assert(Enzyme.shallow(JSX).contains('Hello JSX!'));
```

# --seed--

## --after-user-code--

```jsx
ReactDOM.render(JSX, document.getElementById('root'))
```

## --seed-contents--

```jsx
const JSX = <div></div>;
```

# --solutions--

```jsx
const JSX = <h1>Hello JSX!</h1>;
```
