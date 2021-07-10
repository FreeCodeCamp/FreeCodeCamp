---
id: 5a24c314108439a4d4036160
title: 在 JSX 中定義一個 HTML Class
challengeType: 6
forumTopicId: 301393
dashedName: define-an-html-class-in-jsx
---

# --description--

現在已經習慣了編寫 JSX，可能想知道它與 HTML 有什麼不同。

到目前爲止，HTML 和 JSX 似乎完全相同。

JSX 的一個關鍵區別是你不能再使用 `class` 這個單詞來做爲 HTML 的 class 名。 這是因爲 `class` 是 JavaScript 中的關鍵字。 而 JSX 使用 `className` 來代替。

事實上，JSX 中所有 HTML 屬性和事件引用的命名約定都變成了駝峯式。 例如，JSX 中的單擊事件是 `onClick`，而不是 `onclick`。 同樣，`onchange` 變成了`onChange`。 雖然這是一個微小的差異，但請你一定要記住。

# --instructions--

將 class `myDiv` 應用於 JSX 提供的 `div`上。

# --hints--

常量`JSX`應該返回一個`div`元素。

```js
assert.strictEqual(JSX.type, 'div');
```

`div` 應該有一個 `myDiv` class。

```js
assert.strictEqual(JSX.props.className, 'myDiv');
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
    <h1>Add a class to this div</h1>
  </div>
);
```

# --solutions--

```jsx
const JSX = (
<div className = 'myDiv'>
  <h1>Add a class to this div</h1>
</div>);
```
