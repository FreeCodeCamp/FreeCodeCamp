---
id: 5a24bbe0dba28a8d3cbd4c5f
title: 渲染 HTML 元素为 DOM 树
challengeType: 6
forumTopicId: 301406
dashedName: render-html-elements-to-the-dom
---

# --description--

到目前为止，已经了解到 JSX 是一种在 JavaScript 中编写可读 HTML 的便捷工具。 在 React 中，可以使用它的的渲染 API（ReactDOM）将此 JSX 直接渲染到 HTML DOM。

ReactDOM 提供了一个简单的方法来将 React 元素呈现给 DOM，如下所示：`ReactDOM.render(componentToRender, targetNode)`，其中第一个参数是要渲染的 React 元素或组件，第二个参数是组件将要渲染到的 DOM 节点。

如你所料，必须在 JSX 元素声明之后调用 `ReactDOM.render()`，就像在使用变量之前必须声明它一样。

# --instructions--

代码编辑器有一个简单的 JSX 组件。 使用 `ReactDOM.render()` 方法将该组件渲染到页面。 可以将定义好的 JSX 元素直接作为第一个参数传入，然后使用 `document.getElementById()` 来选择要渲染到的 DOM 节点， 在这个挑战中，请渲染到 `id='challenge-node'` 的 `div` 中。 确保没有修改 `JSX` 常量。

# --hints--

常量 `JSX` 应该返回一个 `div` 元素。

```js
assert(JSX.type === 'div');
```

`div` 应该包含一个 `h1` 标签作为第一个元素。

```js
assert(JSX.props.children[0].type === 'h1');
```

`div` 应该包含一个 `p` 标签作为第二个元素。

```js
assert(JSX.props.children[1].type === 'p');
```

提供的 JSX 元素应该渲染到 id 为 `challenge-node` 的 DOM 节点。

```js
assert(
  document.getElementById('challenge-node').childNodes[0].innerHTML ===
    '<h1>Hello World</h1><p>Lets render this to the DOM</p>'
);
```

# --seed--

## --seed-contents--

```jsx
const JSX = (
  <div>
    <h1>Hello World</h1>
    <p>Lets render this to the DOM</p>
  </div>
);
// Change code below this line
```

# --solutions--

```jsx
const JSX = (
<div>
  <h1>Hello World</h1>
  <p>Lets render this to the DOM</p>
</div>
);
// Change code below this line
ReactDOM.render(JSX, document.getElementById('challenge-node'));
```
