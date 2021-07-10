---
id: 5a24c314108439a4d4036161
title: 瞭解 JSX 的自動閉合
challengeType: 6
forumTopicId: 301396
dashedName: learn-about-self-closing-jsx-tags
---

# --description--

到目前爲止，已經看到 JSX 與 HTML 的關鍵不同在於使用 `className` 還是 `class` 來定義 HTML 的 class。

JSX 不同於 HTML 的另一個重要方面是自閉合標籤。

在HTML中，幾乎所有的標籤都有一個開始和結束標籤：`<div></div>`，結束標籤在你要關閉的標籤名之前始終具有正斜槓。 但是，HTML 中有一些稱爲 “自閉合標籤” 的特殊實例，它們在另一個標籤開始之前，不需要開始和結束標籤都存在。

例如，換行標籤可以寫成 `<br>` 或者 `<br />`，但是不應該寫成 `<br></br>`，因爲它不包含任何內容。

在 JSX 中，規則略有不同。 任何 JSX 元素都可以使用自閉合標籤編寫，並且每個元素都必須關閉。 例如，爲了通過編譯換行標籤必須始終編寫爲 `<br />`。 另一方面 `<div>` 可以寫成 `<div />` 或者 `<div></div>`。 不同之處在於，在第一個語法版本中，無法在 `<div />` 中包含任何內容。 在後面的挑戰中你會發現，這種語法在渲染 React 組件時非常有用。

# --instructions--

修復代碼編輯器中的錯誤，使其成爲有效的 JSX 併成功編譯。 確保不更改任何內容 -- 只需要在需要的地方關閉標籤。

# --hints--

常量 `JSX` 應該返回一個 `div` 元素。

```js
assert.strictEqual(JSX.type, 'div');
```

`div` 應該包含一個 `br` 標籤。

```js
assert(Enzyme.shallow(JSX).find('br').length === 1);
```

`div` 應該包含一個 `hr` 標籤。

```js
assert(Enzyme.shallow(JSX).find('hr').length === 1);
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
    <h2>Welcome to React!</h2> <br >
    <p>Be sure to close all tags!</p>
    <hr >
  </div>
);
```

# --solutions--

```jsx
const JSX = (
<div>
  <h2>Welcome to React!</h2> <br />
  <p>Be sure to close all tags!</p>
  <hr />
</div>
);
```
