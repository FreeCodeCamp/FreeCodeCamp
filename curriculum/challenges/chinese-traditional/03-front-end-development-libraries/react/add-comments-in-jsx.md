---
id: 5a24bbe0dba28a8d3cbd4c5e
title: 在 JSX 中添加註釋
challengeType: 6
forumTopicId: 301376
dashedName: add-comments-in-jsx
---

# --description--

JSX 是一種可以編譯成 JavaScript 的語法。 有時，爲了便於閱讀，可能需要在代碼中添加註釋。 像大多數編程語言一樣，JSX 也有自己的方法來實現這一點。

要將註釋放在 JSX 中，可以使用 `{/* */}` 語法來包裹註釋文本。

# --instructions--

代碼編輯器中的 JSX 元素與在上一個挑戰中創建的元素類似。 在提供的 `div` 元素裏添加註釋，不修改現有的 `h1` 或 `p` 元素。

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

當前的 `h1` 和 `p` 元素不能被修改。

```js
assert(
  JSX.props.children[0].props.children === 'This is a block of JSX' &&
    JSX.props.children[1].props.children === "Here's a subtitle"
);
```

`JSX` 應該包含一個註釋。

```js
assert(/<div>[\s\S]*{\s*\/\*[\s\S]*\*\/\s*}[\s\S]*<\/div>/.test(code));
```

# --seed--

## --after-user-code--

```jsx
ReactDOM.render(JSX, document.getElementById('root'))
```

## --seed-contents--

```jsx
const JSX = (
  <div>
    <h1>This is a block of JSX</h1>
    <p>Here's a subtitle</p>
  </div>
);
```

# --solutions--

```jsx
const JSX = (
<div>
  <h1>This is a block of JSX</h1>
  { /* this is a JSX comment */ }
  <p>Here's a subtitle</p>
</div>);
```
