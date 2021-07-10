---
id: 5a24bbe0dba28a8d3cbd4c5d
title: 創建一個複雜的 JSX 元素
challengeType: 6
forumTopicId: 301382
dashedName: create-a-complex-jsx-element
---

# --description--

上一個挑戰是 JSX 的一個簡單示例，但 JSX 也可以表示更復雜的 HTML。

關於嵌套的 JSX，需要知道的一件重要的事情，那就是它必須返回單個元素。

這個父元素將包裹所有其他級別的嵌套元素。

例如，幾個作爲兄弟元素編寫的 JSX 元素而沒有父元素包裹將不會被轉換。

這裏是一個示例：

**有效的 JSX：**

```jsx
<div>
  <p>Paragraph One</p>
  <p>Paragraph Two</p>
  <p>Paragraph Three</p>
</div>
```

**無效的 JSX：**

```jsx
<p>Paragraph One</p>
<p>Paragraph Two</p>
<p>Paragraph Three</p>
```

# --instructions--

定義一個新的常量 `JSX`，渲染一個 `div`，其中依次包含以下元素：

一個 `h1`，一個 `p`，一個包含三個 `li` 項的無序列表。 可以在每個元素中包含任意文本。

**注意：** 當像這樣渲染多個元素時，可以把它們都用圓括號括起來，但是這並不是必須的。 另外，此挑戰使用 `div` 標籤把所有子元素包裹在裏面。 如果刪除 `div`，JSX 將不會編譯這些元素。 請記住這一點，因爲在 React 組件中返回 JSX 元素時也適用。

# --hints--

常量 `JSX` 應該返回一個 `div` 元素。

```js
assert(JSX.type === 'div');
```

`div` 應該包含一個 `h1` 標籤作爲第一個元素。

```js
assert(JSX.props.children[0].type === 'h1');
```

`div`應該包含一個`p`標籤作爲第二個元素。

```js
assert(JSX.props.children[1].type === 'p');
```

`div` 應該包含一個 `ul` 標籤作爲第三個元素。

```js
assert(JSX.props.children[2].type === 'ul');
```

`ul` 應該包含三個 `li` 元素。

```js
assert(
  JSX.props.children
    .filter((ele) => ele.type === 'ul')[0]
    .props.children.filter((ele) => ele.type === 'li').length === 3
);
```

# --seed--

## --after-user-code--

```jsx
ReactDOM.render(JSX, document.getElementById('root'))
```

## --seed-contents--

```jsx

```

# --solutions--

```jsx
const JSX = (
<div>
  <h1>Hello JSX!</h1>
  <p>Some info</p>
  <ul>
    <li>An item</li>
    <li>Another item</li>
    <li>A third item</li>
  </ul>
</div>);
```
