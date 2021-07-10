---
id: 5a24bbe0dba28a8d3cbd4c5f
title: 渲染 HTML 元素爲 DOM 樹
challengeType: 6
forumTopicId: 301406
dashedName: render-html-elements-to-the-dom
---

# --description--

到目前爲止，已經瞭解到 JSX 是一種在 JavaScript 中編寫可讀 HTML 的便捷工具。 在 React 中，可以使用它的的渲染 API（ReactDOM）將此 JSX 直接渲染到 HTML DOM。

ReactDOM 提供了一個簡單的方法來將 React 元素呈現給 DOM，如下所示：`ReactDOM.render(componentToRender, targetNode)`，其中第一個參數是要渲染的 React 元素或組件，第二個參數是組件將要渲染到的 DOM 節點。

如你所料，必須在 JSX 元素聲明之後調用 `ReactDOM.render()`，就像在使用變量之前必須聲明它一樣。

# --instructions--

代碼編輯器有一個簡單的 JSX 組件。 使用 `ReactDOM.render()` 方法將該組件渲染到頁面。 可以將定義好的 JSX 元素直接作爲第一個參數傳入，然後使用 `document.getElementById()` 來選擇要渲染到的 DOM 節點， 在這個挑戰中，請渲染到 `id='challenge-node'` 的 `div` 中。 確保沒有修改 `JSX` 常量。

# --hints--

常量 `JSX` 應該返回一個 `div` 元素。

```js
assert(JSX.type === 'div');
```

`div` 應該包含一個 `h1` 標籤作爲第一個元素。

```js
assert(JSX.props.children[0].type === 'h1');
```

`div` 應該包含一個 `p` 標籤作爲第二個元素。

```js
assert(JSX.props.children[1].type === 'p');
```

提供的 JSX 元素應該渲染到 id 爲 `challenge-node` 的 DOM 節點。

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
