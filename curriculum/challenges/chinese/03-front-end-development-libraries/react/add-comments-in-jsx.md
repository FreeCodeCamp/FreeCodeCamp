---
id: 5a24bbe0dba28a8d3cbd4c5e
title: 在 JSX 中添加注释
challengeType: 6
forumTopicId: 301376
dashedName: add-comments-in-jsx
---

# --description--

JSX 是一种可以编译成 JavaScript 的语法。 有时，为了便于阅读，可能需要在代码中添加注释。 像大多数编程语言一样，JSX 也有自己的方法来实现这一点。

要将注释放在 JSX 中，可以使用 `{/* */}` 语法来包裹注释文本。

# --instructions--

代码编辑器中的 JSX 元素与在上一个挑战中创建的元素类似。 在提供的 `div` 元素里添加注释，不修改现有的 `h1` 或 `p` 元素。

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

当前的 `h1` 和 `p` 元素不能被修改。

```js
assert(
  JSX.props.children[0].props.children === 'This is a block of JSX' &&
    JSX.props.children[1].props.children === "Here's a subtitle"
);
```

`JSX` 应该包含一个注释。

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
